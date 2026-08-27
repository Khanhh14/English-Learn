const DictionaryService = require('../services/dictionary.service');
const pool = require('../config/db');

const dictService = new DictionaryService(pool);

// 1. Lấy chi tiết từ vựng (kèm IPA, Audio, Cache)
const getWordDetail = async (req, res) => {
  try {
    const { term } = req.params;
    if (!term) {
      return res.status(400).json({ success: false, message: 'Thiếu từ vựng cần tra cứu' });
    }

    const data = await dictService.getWordDetails(term);
    if (!data) {
      return res.status(404).json({ success: false, message: `Không tìm thấy thông tin cho từ "${term}"` });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Lỗi tại getWordDetail:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Lỗi server khi lấy chi tiết từ vựng' 
    });
  }
};

// 2. Lấy danh sách Decks kèm tổng số từ thực tế
const getDecks = async (req, res) => {
  try {
    const [decks] = await pool.execute(`
      SELECT 
        d.id, 
        d.title, 
        d.description,
        COUNT(dw.word_id) AS totalWords
      FROM decks d
      LEFT JOIN deck_words dw ON d.id = dw.deck_id
      WHERE d.status = 'published'
      GROUP BY d.id
      ORDER BY d.id ASC
    `);
    return res.status(200).json({ success: true, data: decks });
  } catch (error) {
    console.error('Lỗi tại getDecks:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Lỗi server khi lấy danh sách decks' 
    });
  }
};

// 3. Lấy danh sách từ vựng thuộc Deck (Loại bỏ audio_url, xáo trộn ngẫu nhiên)
const getWordsByDeck = async (req, res) => {
  try {
    const { deckId } = req.params;
    const [words] = await pool.execute(
      `SELECT 
        w.id, 
        w.term, 
        w.vietnamese_meaning AS definition, 
        w.vietnamese_meaning, 
        dw.deck_id 
       FROM words w 
       JOIN deck_words dw ON w.id = dw.word_id 
       WHERE dw.deck_id = ?
       ORDER BY RAND()`,
      [deckId]
    );
    return res.status(200).json({ success: true, data: words });
  } catch (error) {
    console.error('Lỗi tại getWordsByDeck:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Lỗi server khi lấy danh sách từ trong deck' 
    });
  }
};

// 4. Lấy danh sách câu mẫu
const getSentencesByDeck = async (req, res) => {
  try {
    const deckId = parseInt(req.params.deckId, 10);
    const limit = parseInt(req.query.limit, 10) || 6;

    // 1. Truy vấn câu theo Deck (Ghép limit trực tiếp dạng số an toàn)
    let [sentences] = await pool.execute(
      `SELECT DISTINCT 
         s.id, 
         s.english, 
         s.vietnamese, 
         s.difficulty_level 
       FROM sentences s
       JOIN word_sentences ws ON s.id = ws.sentence_id
       JOIN deck_words dw ON ws.word_id = dw.word_id
       WHERE dw.deck_id = ?
       ORDER BY RAND()
       LIMIT ${limit}`,
      [deckId]
    );

    // 2. Fallback nếu chưa có câu gán
    if (!sentences.length) {
      const [allSentences] = await pool.execute(
        `SELECT 
           id, 
           english, 
           vietnamese, 
           difficulty_level 
         FROM sentences 
         ORDER BY RAND() 
         LIMIT ${limit}`
      );
      sentences = allSentences;
    }

    return res.status(200).json({ success: true, data: sentences });
  } catch (error) {
    console.error('Lỗi tại getSentencesByDeck:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Lỗi server khi lấy danh sách câu mẫu' 
    });
  }
};

// 5. Lấy danh sách key bài học đã hoàn thành theo User
const getUserProgress = async (req, res) => {
  try {
    const userId = req.user?.id || req.query.userId || 1;

    const [rows] = await pool.execute(
      `SELECT CONCAT(deck_id, '-', lesson_id) AS lesson_key
       FROM user_lesson_progress
       WHERE user_id = ? AND is_completed = 1`,
      [userId]
    );

    const completedKeys = rows.map((item) => item.lesson_key);

    return res.status(200).json({
      success: true,
      data: completedKeys
    });
  } catch (error) {
    console.error('Lỗi tại getUserProgress:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Lỗi server khi lấy tiến độ bài học' 
    });
  }
};

// 6. Ghi nhận bài học hoàn thành vào CSDL
const completeLesson = async (req, res) => {
  try {
    const { deckId, lessonId } = req.body;
    const userId = req.user?.id || req.body.userId || 1;

    if (!deckId || !lessonId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Thiếu deckId hoặc lessonId' 
      });
    }

    await pool.execute(
      `INSERT INTO user_lesson_progress (user_id, deck_id, lesson_id, is_completed, completed_at)
       VALUES (?, ?, ?, 1, NOW())
       ON DUPLICATE KEY UPDATE 
         is_completed = 1,
         completed_at = NOW()`,
      [userId, deckId, lessonId]
    );

    return res.status(200).json({
      success: true,
      message: 'Ghi nhận hoàn thành bài học thành công'
    });
  } catch (error) {
    console.error('Lỗi tại completeLesson:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Lỗi server khi lưu tiến độ bài học' 
    });
  }
};

module.exports = {
  getWordDetail,
  getDecks,
  getWordsByDeck,
  getSentencesByDeck,
  getUserProgress,
  completeLesson
};