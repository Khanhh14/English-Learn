// src/services/dictionary.service.js
const axios = require('axios');

class DictionaryService {
  constructor(dbPool) {
    this.db = dbPool;
  }

  // 1. Gọi Free Dictionary API
  async fetchFromFreeDictionary(term) {
    try {
      const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(term)}`, {
        timeout: 5000
      });
      const data = res.data[0];

      const phonetic = data.phonetic || (data.phonetics?.find(p => p.text) || {}).text || '';
      const audioObj = data.phonetics?.find(p => p.audio && p.audio.trim().length > 0);
      const audio = audioObj ? audioObj.audio : '';

      return {
        phonetic,
        audio_url: audio,
        raw_data: data
      };
    } catch (err) {
      return null;
    }
  }

  // 2. Tra cứu có kiểm tra Cache theo word_id
  async getWordDetails(term) {
    const cleanTerm = term.toLowerCase().trim();

    try {
      // Tìm word_id trong bảng words
      const [words] = await this.db.execute(
        'SELECT id, term FROM words WHERE term = ? LIMIT 1',
        [cleanTerm]
      );

      let wordId = null;
      if (words.length > 0) {
        wordId = words[0].id;

        // Kiểm tra xem đã có trong word_cache chưa
        const [cached] = await this.db.execute(
          'SELECT phonetic, audio_url, raw_data FROM word_cache WHERE word_id = ?',
          [wordId]
        );

        if (cached.length > 0) {
          const cacheItem = cached[0];
          return {
            term: cleanTerm,
            phonetic: cacheItem.phonetic,
            audio_url: cacheItem.audio_url,
            raw_data: typeof cacheItem.raw_data === 'string' ? JSON.parse(cacheItem.raw_data) : cacheItem.raw_data
          };
        }
      }

      // Nếu chưa có cache -> Gọi API ngoài
      const apiData = await this.fetchFromFreeDictionary(cleanTerm);

      if (apiData) {
        // Nếu từ chưa có trong bảng words thì thêm mới
        if (!wordId) {
          const [insertWord] = await this.db.execute(
            `INSERT INTO words (api_id, term, source_api, last_synced_at, created_at) 
             VALUES (?, ?, 'dictionaryapi', NOW(), NOW())`,
            [cleanTerm, cleanTerm]
          );
          wordId = insertWord.insertId;
        }

        // Lưu vào bảng word_cache
        await this.db.execute(
          `INSERT INTO word_cache (word_id, phonetic, audio_url, raw_data, updated_at) 
           VALUES (?, ?, ?, ?, NOW()) 
           ON DUPLICATE KEY UPDATE 
             phonetic = VALUES(phonetic), 
             audio_url = VALUES(audio_url), 
             raw_data = VALUES(raw_data), 
             updated_at = NOW()`,
          [wordId, apiData.phonetic, apiData.audio_url, JSON.stringify(apiData.raw_data)]
        );

        return {
          term: cleanTerm,
          phonetic: apiData.phonetic,
          audio_url: apiData.audio_url,
          raw_data: apiData.raw_data
        };
      }

      return null;
    } catch (dbError) {
      console.error('Lỗi xử lý DictionaryService:', dbError);
      throw dbError;
    }
  }
}

module.exports = DictionaryService;