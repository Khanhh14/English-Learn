const express = require('express');
const router = express.Router();
const vocabController = require('../controllers/vocab.controller');
const verifyToken = require('../middleware/auth.middleware');

// Decks & Words
router.get('/decks', vocabController.getDecks);
router.get('/decks/:deckId/words', vocabController.getWordsByDeck);
router.get('/decks/:deckId/sentences', vocabController.getSentencesByDeck);
router.get('/words/:term', vocabController.getWordDetail);

// Progress
router.get('/user-progress', verifyToken, vocabController.getUserProgress);
router.post('/complete-lesson', verifyToken, vocabController.completeLesson);

module.exports = router;