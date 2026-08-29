const db = require('../config/db');

// --- HÀM TÍNH CHUỖI NGÀY HỌC LIÊN TIẾP (STREAK) ---
async function calculateUserStreak(userId) {
  // Định dạng ngày thành chuỗi 'YYYY-MM-DD' để tránh lỗi lệch múi giờ
  const [rows] = await db.query(
    `SELECT DISTINCT DATE_FORMAT(study_date, '%Y-%m-%d') AS study_date
     FROM user_daily_stats
     WHERE user_id = ?
     ORDER BY study_date DESC`,
    [userId]
  );

  if (!rows.length) return 0;

  // Lấy ngày hiện tại chuẩn từ DB
  const [[{ today }]] = await db.query(`SELECT DATE_FORMAT(CURDATE(), '%Y-%m-%d') AS today`);

  const dates = rows.map((r) => r.study_date);
  const mostRecentDateStr = dates[0];

  const diffMs = new Date(today) - new Date(mostRecentDateStr);
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  // Nếu ngày học gần nhất cách hôm nay từ 2 ngày trở lên -> đứt chuỗi
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

    // Kiểm tra xem hôm nay người dùng đã có hoạt động học chưa
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

// [POST] /api/streak/record
exports.recordDailyActivity = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId || 1;
    const { wordsLearned = 0, correctAnswers = 0, wrongAnswers = 0 } = req.body;

    // Ghi nhận hoặc cộng dồn chỉ số học tập trong ngày hôm nay
    const query = `
      INSERT INTO user_daily_stats (user_id, study_date, words_learned, correct_answers, wrong_answers)
      VALUES (?, CURDATE(), ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        words_learned = words_learned + VALUES(words_learned),
        correct_answers = correct_answers + VALUES(correct_answers),
        wrong_answers = wrong_answers + VALUES(wrong_answers)
    `;

    await db.query(query, [userId, wordsLearned, correctAnswers, wrongAnswers]);

    const streak = await calculateUserStreak(userId);

    return res.status(200).json({
      success: true,
      message: 'Cập nhật tiến độ ngày thành công',
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