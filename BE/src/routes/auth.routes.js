// D:\English-Web\BE\src\routes\auth.routes.js
const express = require('express');
const router = express.Router();

// 1. Kiểm tra lại tên file controller trong BE/src/controllers/
// Nếu file của bạn là auth.controller.js thì để '../controllers/auth.controller'
// Nếu file của bạn là authController.js thì để '../controllers/authController'
const authController = require('../controllers/auth.controller'); 

// 2. Import middleware xác thực Token
// Kiểm tra thư mục chứa file middleware là 'middleware' hay 'middlewares'
const verifyToken = require('../middleware/auth.middleware'); 

// Các Endpoints
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', verifyToken, authController.getMe);
router.put('/profile', verifyToken, authController.updateProfile);
router.post('/change-password', verifyToken, authController.changePassword);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;