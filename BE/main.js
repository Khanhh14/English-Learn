const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Khởi tạo Express app
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware phân tích dữ liệu và chia sẻ tài nguyên (CORS)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cấu hình static folder để truy cập file/ảnh từ thư mục public/uploads
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Import Routes
const authRoutes = require('./src/routes/auth.routes');
const vocabRoutes = require('./src/routes/vocab.routes');
const vocabProgressRoutes = require('./src/routes/vocabProgress.routes');

// Đăng ký API Routes
app.use('/api/auth', authRoutes);
app.use('/api/vocab', vocabRoutes);
app.use('/api/vocab', vocabProgressRoutes); // hỗ trợ cả /api/vocab/user-progress
app.use('/api/vocab-progress', vocabProgressRoutes); // giữ tương thích path cũ

// Endpoint kiểm tra hoạt động của server
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Vocab Master Backend is running smoothly!'
  });
});

// Middleware xử lý lỗi 404 (Route không tồn tại)
app.use((req, res) => {
  res.status(404).json({ message: 'Đường dẫn không tồn tại trên hệ thống!' });
});

// Khởi chạy máy chủ
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});