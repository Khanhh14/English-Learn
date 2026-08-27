const express = require('express');
const router = express.Router();
const vocabProgressController = require('../controllers/vocabProgress.controller');

// Lấy danh sách key các bài đã hoàn thành
router.get('/user-progress', vocabProgressController.getUserProgress);

// Đánh dấu hoàn thành bài học
router.post('/complete-lesson', vocabProgressController.completeLesson);

module.exports = router;