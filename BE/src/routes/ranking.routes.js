const express = require('express');
const router = express.Router();

// Import controller xử lý bảng xếp hạng
const rankingController = require('../controllers/ranking.controller');


router.get('/', rankingController.getLeaderboard);

module.exports = router;