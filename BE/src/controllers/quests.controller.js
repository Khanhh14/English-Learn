// Import pool kết nối database từ thư mục config của bạn
const pool = require('../config/db'); // hoặc đường dẫn tới file config db của bạn

const QUEST_TITLE_PATTERNS = {
  newLesson: ['%hoàn thành 1 bài học%'],
  xp: ['%kiếm 20 xp%'],
  review: ['%ôn tập%'],
  practice: ['%luyện tập%']
};

exports.incrementQuestProgress = async (executor, userId, questType, amount = 1) => {
  const titlePatterns = QUEST_TITLE_PATTERNS[questType];
  if (!titlePatterns || amount <= 0) return;
  const questTitleCondition = titlePatterns
    .map(() => '(LOWER(CONVERT(q.title USING utf8mb4)) LIKE ? OR LOWER(CONVERT(q.description USING utf8mb4)) LIKE ?)')
    .join(' OR ');

  await executor.query(`
    UPDATE user_quests uq
    JOIN quests q ON q.id = uq.quest_id
    SET uq.current_progress = LEAST(COALESCE(uq.current_progress, 0) + ?, q.target_count),
        uq.is_completed = (
          LEAST(COALESCE(uq.current_progress, 0) + ?, q.target_count) >= q.target_count
        )
    WHERE uq.user_id = ?
      AND uq.quest_date = CURDATE()
      AND uq.is_claimed = 0
      AND (${questTitleCondition})
  `, [
    amount,
    amount,
    userId,
    ...titlePatterns.flatMap((pattern) => [pattern, pattern])
  ]);

  // Tự động nhận coin ngay khi nhiệm vụ đạt đủ mục tiêu, mỗi nhiệm vụ chỉ nhận một lần.
  await executor.query(`
    UPDATE users u
    JOIN user_quests uq ON uq.user_id = u.id
    JOIN quests q ON q.id = uq.quest_id
    SET u.coins = COALESCE(u.coins, 0) + q.reward_coins,
        uq.is_claimed = 1
    WHERE uq.user_id = ?
      AND uq.quest_date = CURDATE()
      AND uq.is_claimed = 0
      AND uq.is_completed = 1
  `, [userId]);
};

// Lấy danh sách nhiệm vụ và tiến độ
exports.getUserMissions = async (req, res) => {
  const { userId } = req.params;

  if (!Number.isInteger(Number(userId)) || Number(userId) <= 0) {
    return res.status(400).json({ message: 'Mã người dùng không hợp lệ' });
  }

  try {
    // Tự động gán nhiệm vụ ngày hôm nay nếu chưa có
    await pool.query(`
      INSERT IGNORE INTO user_quests (user_id, quest_id, quest_date, current_progress, is_completed, is_claimed)
      SELECT ?, q.id, CURDATE(), 0, FALSE, FALSE FROM quests q
    `, [userId]);

    // Đồng bộ và nhận các nhiệm vụ đã đủ tiến độ từ trước nhưng chưa được nhận coin.
    await pool.query(`
      UPDATE users u
      JOIN user_quests uq ON uq.user_id = u.id
      JOIN quests q ON q.id = uq.quest_id
      SET u.coins = COALESCE(u.coins, 0) + q.reward_coins,
          uq.is_completed = 1,
          uq.is_claimed = 1
      WHERE uq.user_id = ?
        AND uq.quest_date = CURDATE()
        AND uq.is_claimed = 0
        AND uq.current_progress >= q.target_count
    `, [userId]);

    const [missions] = await pool.query(`
      SELECT 
        q.id, q.title AS name,
        q.description,
        q.type,
        q.reward_coins AS reward, q.target_count AS total,
        COALESCE(uq.current_progress, 0) AS progress,
        (uq.is_completed = 1 OR uq.current_progress >= q.target_count) AS isCompleted,
        (uq.is_claimed = 1) AS completed
      FROM quests q
      JOIN user_quests uq ON q.id = uq.quest_id
      WHERE uq.user_id = ? AND uq.quest_date = CURDATE()
      ORDER BY q.id ASC
    `, [userId]);

    const [[user]] = await pool.query(`SELECT coins FROM users WHERE id = ?`, [userId]);

    return res.json({
      missions,
      totalCoins: user ? user.coins : 0
    });
  } catch (error) {
    console.error('Lỗi lấy dữ liệu nhiệm vụ:', error);
    return res.status(500).json({ message: 'Lỗi lấy dữ liệu nhiệm vụ', error: error.message });
  }
};

// Nhận thưởng nhiệm vụ
exports.claimMissionReward = async (req, res) => {
  const { userId, questId } = req.body;
  let conn;

  try {
    if (!Number.isInteger(Number(userId)) || !Number.isInteger(Number(questId))) {
      return res.status(400).json({ message: 'Thông tin nhiệm vụ không hợp lệ' });
    }

    conn = await pool.getConnection();
    await conn.beginTransaction();

    const [quest] = await conn.query(`
      SELECT uq.id, uq.current_progress, uq.is_claimed, q.target_count, q.reward_coins
      FROM user_quests uq
      JOIN quests q ON q.id = uq.quest_id
      WHERE uq.user_id = ? AND uq.quest_id = ? AND uq.quest_date = CURDATE()
      FOR UPDATE
    `, [userId, questId]);

    if (!quest.length) {
      await conn.rollback();
      return res.status(404).json({ message: 'Không tìm thấy nhiệm vụ' });
    }

    const item = quest[0];
    if (item.is_claimed) {
      await conn.rollback();
      return res.status(400).json({ message: 'Nhiệm vụ này đã nhận thưởng rồi' });
    }
    if (item.current_progress < item.target_count) {
      await conn.rollback();
      return res.status(400).json({ message: 'Chưa đủ điều kiện nhận thưởng' });
    }

    // Cập nhật trạng thái nhận thưởng
    await conn.query(`
      UPDATE user_quests 
      SET is_completed = TRUE, is_claimed = TRUE 
      WHERE id = ?
    `, [item.id]);

    // Cộng phần thưởng vào số xu hiện có của người dùng.
    await conn.query(`
      UPDATE users 
      SET coins = COALESCE(coins, 0) + ?
      WHERE id = ?
    `, [item.reward_coins, userId]);

    await conn.commit();
    const [[user]] = await conn.query('SELECT coins FROM users WHERE id = ?', [userId]);
    return res.json({
      success: true,
      reward: item.reward_coins,
      totalCoins: user?.coins || 0
    });
  } catch (error) {
    if (conn) {
      await conn.rollback();
    }
    console.error('Lỗi nhận thưởng nhiệm vụ:', error);
    return res.status(500).json({ message: 'Giao dịch thất bại', error: error.message });
  } finally {
    if (conn) {
      conn.release();
    }
  }
};
