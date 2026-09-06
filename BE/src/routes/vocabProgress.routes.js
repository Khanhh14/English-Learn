const express = require('express');
const router = express.Router();
const vocabProgressController = require('../controllers/vocabProgress.controller');
const verifyToken = require('../middleware/auth.middleware');

// Lấy danh sách key các bài đã hoàn thành
router.get('/user-progress', verifyToken, vocabProgressController.getUserProgress);

// Đánh dấu hoàn thành bài học
router.post('/complete-lesson', verifyToken, vocabProgressController.completeLesson);

module.exports = router;