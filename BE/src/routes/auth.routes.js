// D:\English-Web\BE\src\routes\auth.routes.js
const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller'); 
const verifyToken = require('../middleware/auth.middleware'); 

// Authen & Profile
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', verifyToken, authController.getMe);
router.put('/profile', verifyToken, authController.updateProfile);
router.post('/change-password', verifyToken, authController.changePassword);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// Shop & Avatar APIs
router.get('/avatars/shop', authController.getShopAvatars); // Endpoint lấy danh sách avatar bày bán
router.post('/avatars/purchase', verifyToken, authController.purchaseAvatar); // Mua avatar
router.put('/avatar', verifyToken, authController.setAvatar); // Đặt avatar làm đại diện

module.exports = router;