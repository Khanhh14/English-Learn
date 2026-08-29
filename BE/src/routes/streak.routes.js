const express = require('express');
const router = express.Router();

// Kiểm tra đường dẫn tới file streak.controller.js
const streakController = require('../controllers/streak.controller');

// Đảm bảo streakController.getUserStreak không bị undefined
router.get('/', streakController.getUserStreak);
router.post('/record', streakController.recordDailyActivity);

module.exports = router;