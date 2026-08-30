const db = require('../config/db'); // Đường dẫn tới file kết nối pool MySQL (mysql2/promise)

const LESSON_SEQUENCE = ['new-1', 'new-2', 'review-1', 'summary'];

async function hasCompletedLesson(userId, deckId, lessonId) {
  const [rows] = await db.query(
    `SELECT 1
     FROM user_lesson_progress
     WHERE user_id = ? AND deck_id = ? AND lesson_id = ? AND is_completed = 1
     LIMIT 1`,
    [userId, deckId, lessonId]
  );
  return rows.length > 0;
}

async function canCompleteLesson(userId, deckId, lessonId) {
  const lessonIndex = LESSON_SEQUENCE.indexOf(lessonId);
  if (lessonIndex < 0) return false;

  if (lessonIndex > 0 && !(await hasCompletedLesson(userId, deckId, LESSON_SEQUENCE[lessonIndex - 1]))) {
    return false;
  }

  const [decks] = await db.query(
    `SELECT id
     FROM decks
     WHERE status = 'published'
     ORDER BY id ASC`
  );
  const deckIndex = decks.findIndex((deck) => Number(deck.id) === Number(deckId));
  if (deckIndex <= 0) return true;

  const previousDeckId = decks[deckIndex - 1].id;
  return LESSON_SEQUENCE.every((previousLessonId) =>
    hasCompletedLesson(userId, previousDeckId, previousLessonId)
  );
}

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

    if (!(await canCompleteLesson(userId, deckId, lessonId))) {
      return res.status(409).json({
        success: false,
        message: 'Bạn cần hoàn thành bài học trước theo đúng lộ trình'
      });
    }

    // 1. Kiểm tra xem bài học này đã từng hoàn thành trước đó chưa
    const isAlreadyCompleted = await hasCompletedLesson(userId, deckId, lessonId);

    // 2. Lưu/Cập nhật tiến độ bài học
    const queryProgress = `
      INSERT INTO user_lesson_progress (user_id, deck_id, lesson_id, is_completed, completed_at)
      VALUES (?, ?, ?, 1, NOW())
      ON DUPLICATE KEY UPDATE 
        is_completed = 1,
        completed_at = NOW()
    `;
    await db.query(queryProgress, [userId, deckId, lessonId]);

    let earnedXp = 0;

    // 3. Nếu là lần đầu hoàn thành -> Cộng 10 XP vào users và cập nhật user_daily_stats
    if (!isAlreadyCompleted) {
      earnedXp = 10;

      // Cộng 10 XP vào bảng users
      await db.query(
        'UPDATE users SET xp = COALESCE(xp, 0) + 10 WHERE id = ?',
        [userId]
      );

      // Cập nhật thống kê ngày vào user_daily_stats
      await db.query(`
        INSERT INTO user_daily_stats (user_id, study_date, words_learned, correct_answers, wrong_answers)
        VALUES (?, CURDATE(), 6, 6, 0)
        ON DUPLICATE KEY UPDATE 
          words_learned = words_learned + 6,
          correct_answers = correct_answers + 6
      `, [userId]);
    }

    return res.status(200).json({
      success: true,
      message: isAlreadyCompleted 
        ? 'Ôn tập bài học thành công!' 
        : 'Chúc mừng! Bạn đã hoàn thành bài học mới và nhận được 10 XP.',
      earnedXp
    });
  } catch (error) {
    console.error('Lỗi cập nhật tiến độ học & XP:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Lỗi máy chủ khi lưu tiến độ học' 
    });
  }
};