const DictionaryService = require('../services/dictionary.service');
const pool = require('../config/db'); // Kiểm tra file kết nối DB của bạn (db.js hoặc database.js)

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

// 2. Lấy danh sách Decks (Chủ đề bài học)
const getDecks = async (req, res) => {
  try {
    const [decks] = await pool.execute('SELECT id, title, description FROM decks WHERE status = "published"');
    return res.status(200).json({ success: true, data: decks });
  } catch (error) {
    console.error('Lỗi tại getDecks:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Lỗi server khi lấy danh sách decks' 
    });
  }
};

// 3. Lấy danh sách từ vựng thuộc Deck
const getWordsByDeck = async (req, res) => {
  try {
    const { deckId } = req.params;
    const [words] = await pool.execute(
      `SELECT w.id, w.term, dw.deck_id 
       FROM words w 
       JOIN deck_words dw ON w.id = dw.word_id 
       WHERE dw.deck_id = ?`,
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

module.exports = {
  getWordDetail,
  getDecks,
  getWordsByDeck
};