const db = require('../config/db');

// --- HÀM TÍNH CHUỖI NGÀY HỌC LIÊN TIẾP (STREAK) ---
async function calculateUserStreak(userId) {
  const [rows] = await db.query(
    `SELECT DISTINCT DATE_FORMAT(study_date, '%Y-%m-%d') AS study_date
     FROM user_daily_stats
     WHERE user_id = ?
     ORDER BY study_date DESC`,
    [userId]
  );

  if (!rows.length) return 0;

  const [[{ today }]] = await db.query(`SELECT DATE_FORMAT(CURDATE(), '%Y-%m-%d') AS today`);

  const dates = rows.map((r) => r.study_date);
  const mostRecentDateStr = dates[0];

  const diffMs = new Date(today) - new Date(mostRecentDateStr);
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays > 1) {
    return 0;
  }

  let streak = 0;
  let cursorDate = new Date(mostRecentDateStr);

  for (const dateStr of dates) {
    const expectedStr = cursorDate.toISOString().slice(0, 10);
    if (dateStr === expectedStr) {
      streak++;
      cursorDate.setDate(cursorDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

// [GET] /api/streak
exports.getUserStreak = async (req, res) => {
  try {
    const userId = req.user?.id || req.query.userId || 1;
    const currentStreak = await calculateUserStreak(userId);

    const [todayActivity] = await db.query(
      `SELECT 1 
       FROM user_daily_stats 
       WHERE user_id = ? AND study_date = CURDATE() 
       LIMIT 1`,
      [userId]
    );

    return res.status(200).json({
      success: true,
      data: {
        currentStreak,
        isCompletedToday: todayActivity.length > 0
      }
    });
  } catch (error) {
    console.error('Lỗi khi lấy thông tin streak:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi máy chủ khi lấy chuỗi streak'
    });
  }
};

// [POST] /api/streak/record (Ghi nhận hoạt động, Streak và cộng XP)
exports.recordDailyActivity = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId || 1;
    const { wordsLearned = 0, correctAnswers = 0, wrongAnswers = 0, earnedXp = 0 } = req.body;

    // 1. Cập nhật bảng user_daily_stats
    const query = `
      INSERT INTO user_daily_stats (user_id, study_date, words_learned, correct_answers, wrong_answers)
      VALUES (?, CURDATE(), ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        words_learned = words_learned + VALUES(words_learned),
        correct_answers = correct_answers + VALUES(correct_answers),
        wrong_answers = wrong_answers + VALUES(wrong_answers)
    `;
    await db.query(query, [userId, wordsLearned, correctAnswers, wrongAnswers]);

    // 2. Cộng XP tích lũy trực tiếp vào bảng users
    if (earnedXp > 0) {
      await db.query('UPDATE users SET xp = xp + ? WHERE id = ?', [earnedXp, userId]);
    }

    // 3. Tính toán lại streak thực tế
    const streak = await calculateUserStreak(userId);
    await db.query('UPDATE users SET streak_count = ? WHERE id = ?', [streak, userId]);

    return res.status(200).json({
      success: true,
      message: 'Cập nhật tiến độ ngày & XP thành công',
      data: {
        currentStreak: streak
      }
    });
  } catch (error) {
    console.error('Lỗi ghi nhận thống kê ngày:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi máy chủ khi cập nhật dữ liệu ngày'
    });
  }
};

exports.calculateUserStreak = calculateUserStreak;