const db = require('../config/db');

exports.getLeaderboard = async (req, res) => {
  try {
    const { type } = req.query; // 'day', 'month', 'all'
    let query = '';

    if (type === 'day') {
      // Xếp hạng theo ngày: Mỗi bài học hoàn thành trong ngày hôm nay = 10 XP
      query = `
        SELECT 
          u.id, 
          u.username AS name, 
          COALESCE(COUNT(p.id) * 10, 0) AS points
        FROM users u
        INNER JOIN user_lesson_progress p ON u.id = p.user_id
        WHERE p.is_completed = 1 
          AND DATE(p.completed_at) = CURDATE()
        GROUP BY u.id, u.username
        ORDER BY points DESC, u.id ASC
        LIMIT 20
      `;
    } else if (type === 'month') {
      // Xếp hạng theo tháng: Mỗi bài hoàn thành trong tháng hiện tại = 10 XP
      query = `
        SELECT 
          u.id, 
          u.username AS name, 
          COALESCE(COUNT(p.id) * 10, 0) AS points
        FROM users u
        INNER JOIN user_lesson_progress p ON u.id = p.user_id
        WHERE p.is_completed = 1 
          AND MONTH(p.completed_at) = MONTH(CURDATE()) 
          AND YEAR(p.completed_at) = YEAR(CURDATE())
        GROUP BY u.id, u.username
        ORDER BY points DESC, u.id ASC
        LIMIT 20
      `;
    } else {
      // Tổng: Lấy trực tiếp từ trường xp tích lũy trong bảng users
      query = `
        SELECT 
          id, 
          username AS name, 
          COALESCE(xp, 0) AS points
        FROM users
        ORDER BY points DESC, id ASC
        LIMIT 20
      `;
    }

    const [rankings] = await db.query(query);

    res.status(200).json({
      success: true,
      data: rankings
    });
  } catch (error) {
    console.error('Lỗi SQL Ranking:', error);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ', error: error.message });
  }
};