const express = require('express');
const router = express.Router();
const questsController = require('../controllers/quests.controller');

// GET: /api/quests/user/:userId
router.get('/user/:userId', questsController.getUserMissions);

// POST: /api/quests/claim
router.post('/claim', questsController.claimMissionReward);

module.exports = router;