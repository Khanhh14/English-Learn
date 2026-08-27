const db = require('../config/db'); // Đường dẫn tới file kết nối pool MySQL (mysql2/promise)

// [GET] /api/vocab/user-progress
exports.getUserProgress = async (req, res) => {
  try {
    // Lấy userId từ auth middleware hoặc query param (mặc định = 1 để test)
    const userId = req.user?.id || req.query.userId || 1;

    const query = `
      SELECT CONCAT(deck_id, '-', lesson_id) AS lesson_key
      FROM user_lesson_progress
      WHERE user_id = ? AND is_completed = 1
    `;

    const [rows] = await db.query(query, [userId]);
    
    // Chuyển kết quả thành mảng chuỗi: ['4-new-1', '4-new-2', ...]
    const completedKeys = rows.map(item => item.lesson_key);

    return res.status(200).json({
      success: true,
      data: completedKeys
    });
  } catch (error) {
    console.error('Lỗi khi lấy tiến độ học:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Lỗi máy chủ khi lấy tiến độ học' 
    });
  }
};

// [POST] /api/vocab/complete-lesson
exports.completeLesson = async (req, res) => {
  try {
    const { deckId, lessonId } = req.body;
    const userId = req.user?.id || req.body.userId || 1;

    if (!deckId || !lessonId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Thiếu deckId hoặc lessonId' 
      });
    }

    const query = `
      INSERT INTO user_lesson_progress (user_id, deck_id, lesson_id, is_completed, completed_at)
      VALUES (?, ?, ?, 1, NOW())
      ON DUPLICATE KEY UPDATE 
        is_completed = 1,
        completed_at = NOW()
    `;

    await db.query(query, [userId, deckId, lessonId]);

    return res.status(200).json({
      success: true,
      message: 'Ghi nhận hoàn thành bài học thành công'
    });
  } catch (error) {
    console.error('Lỗi cập nhật tiến độ học:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Lỗi máy chủ khi lưu tiến độ học' 
    });
  }
};