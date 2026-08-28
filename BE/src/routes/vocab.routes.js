const express = require('express');
const router = express.Router();
const vocabController = require('../controllers/vocab.controller');

// Decks & Words
router.get('/decks', vocabController.getDecks);
router.get('/decks/:deckId/words', vocabController.getWordsByDeck);
router.get('/decks/:deckId/sentences', vocabController.getSentencesByDeck);
router.get('/words/:term', vocabController.getWordDetail);

module.exports = router;