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

// 2. Lấy danh sách Decks
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

// 3. Lấy danh sách từ vựng thuộc Deck (Đã loại bỏ cột audio_url không có trong bảng words)
const getWordsByDeck = async (req, res) => {
  try {
    const { deckId } = req.params;
    const [words] = await pool.execute(
      `SELECT w.id, w.term, w.vietnamese_meaning AS definition, w.vietnamese_meaning, dw.deck_id 
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

// 4. Lấy danh sách câu mẫu (Ưu tiên theo Deck, fallback ngẫu nhiên từ bảng sentences)
const getSentencesByDeck = async (req, res) => {
  try {
    const { deckId } = req.params;

    // Truy vấn câu qua bảng liên kết word_sentences
    let [sentences] = await pool.execute(
      `SELECT DISTINCT s.id, s.english, s.vietnamese, s.audio_url, s.difficulty_level 
       FROM sentences s
       JOIN word_sentences ws ON s.id = ws.sentence_id
       JOIN deck_words dw ON ws.word_id = dw.word_id
       WHERE dw.deck_id = ?
       LIMIT 6`,
      [deckId]
    );

    // Nếu Deck chưa gán câu, lấy ngẫu nhiên 5 câu từ bảng sentences
    if (!sentences.length) {
      const [allSentences] = await pool.execute(
        `SELECT id, english, vietnamese, audio_url, difficulty_level 
         FROM sentences 
         ORDER BY RAND() 
         LIMIT 5`
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

module.exports = {
  getWordDetail,
  getDecks,
  getWordsByDeck,
  getSentencesByDeck
};