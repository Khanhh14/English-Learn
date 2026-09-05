// Import pool kết nối database từ thư mục config của bạn
const pool = require('../config/db'); // hoặc đường dẫn tới file config db của bạn

// Lấy danh sách nhiệm vụ và tiến độ
exports.getUserMissions = async (req, res) => {
  const { userId } = req.params;
  const today = new Date().toISOString().slice(0, 10);

  try {
    // Tự động gán nhiệm vụ ngày hôm nay nếu chưa có
    await pool.query(`
      INSERT IGNORE INTO user_quests (user_id, quest_id, quest_date, current_progress, is_completed, is_claimed)
      SELECT ?, q.id, ?, 0, FALSE, FALSE FROM quests q
    `, [userId, today]);

    const [missions] = await pool.query(`
      SELECT 
        q.id, q.title AS name, q.icon, q.description, 
        q.reward_coins AS reward, q.target_count AS total,
        uq.current_progress AS progress, uq.is_claimed AS completed
      FROM quests q
      JOIN user_quests uq ON q.id = uq.quest_id
      WHERE uq.user_id = ? AND uq.quest_date = ?
    `, [userId, today]);

    const [[user]] = await pool.query(`SELECT coins FROM users WHERE id = ?`, [userId]);

    return res.json({
      missions,
      totalCoins: user ? user.coins : 0
    });
  } catch (error) {
    return res.status(500).json({ message: 'Lỗi lấy dữ liệu nhiệm vụ', error: error.message });
  }
};

// Nhận thưởng nhiệm vụ
exports.claimMissionReward = async (req, res) => {
  const { userId, questId } = req.body;
  const today = new Date().toISOString().slice(0, 10);
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    const [quest] = await conn.query(`
      SELECT uq.id, uq.current_progress, uq.is_claimed, q.target_count, q.reward_coins
      FROM user_quests uq
      JOIN quests q ON q.id = uq.quest_id
      WHERE uq.user_id = ? AND uq.quest_id = ? AND uq.quest_date = ?
      FOR UPDATE
    `, [userId, questId, today]);

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

    // Cộng xu cho user
    await conn.query(`
      UPDATE users 
      SET coins = coins + ? 
      WHERE id = ?
    `, [item.reward_coins, userId]);

    await conn.commit();
    return res.json({ success: true, reward: item.reward_coins });
  } catch (error) {
    await conn.rollback();
    return res.status(500).json({ message: 'Giao dịch thất bại', error: error.message });
  } finally {
    conn.release();
  }
};