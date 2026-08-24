const express = require('express');
const router = express.Router();
const vocabController = require('../controllers/vocab.controller');

router.get('/decks', vocabController.getDecks);
router.get('/decks/:deckId/words', vocabController.getWordsByDeck);
router.get('/decks/:deckId/sentences', vocabController.getSentencesByDeck);
router.get('/sentences', vocabController.getSentencesByDeck); // Cho phép gọi trực tiếp /api/vocab/sentences
router.get('/word/:term', vocabController.getWordDetail);

module.exports = router;