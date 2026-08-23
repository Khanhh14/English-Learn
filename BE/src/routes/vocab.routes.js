const express = require('express');
const router = express.Router();
const vocabController = require('../controllers/vocab.controller');

router.get('/decks', vocabController.getDecks);
router.get('/decks/:deckId/words', vocabController.getWordsByDeck);
router.get('/word/:term', vocabController.getWordDetail);

// Bắt buộc phải có dòng này:
module.exports = router;