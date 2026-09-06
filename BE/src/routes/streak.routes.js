const express = require('express');
const router = express.Router();

// Kiểm tra đường dẫn tới file streak.controller.js
const streakController = require('../controllers/streak.controller');
const verifyToken = require('../middleware/auth.middleware');

// Đảm bảo streakController.getUserStreak không bị undefined
router.get('/', verifyToken, streakController.getUserStreak);
router.post('/record', verifyToken, streakController.recordDailyActivity);

module.exports = router;