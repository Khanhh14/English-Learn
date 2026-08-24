const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// 1. ĐĂNG KÝ
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin!' });
    }

    // Kiểm tra trùng username hoặc email
    const [existingUsers] = await db.query(
      'SELECT id FROM users WHERE email = ? OR username = ?',
      [email, username]
    );
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Email hoặc Username đã tồn tại!' });
    }

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Thêm user mới (các trường streak_count, daily_goal để mặc định)
    await db.query(
      'INSERT INTO users (username, email, password, role, streak_count, daily_goal) VALUES (?, ?, ?, ?, ?, ?)',
      [username, email, hashedPassword, 'user', 0, 10]
    );

    res.status(201).json({ message: 'Đăng ký tài khoản thành công!' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server!', error: error.message });
  }
};

// 2. ĐĂNG NHẬP
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm user theo email
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ message: 'Email hoặc mật khẩu không chính xác!' });
    }

    const user = users[0];

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email hoặc mật khẩu không chính xác!' });
    }

    // Tạo JWT Token
    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Đăng nhập thành công!',
      token,
      user: {
        id: user.id,
        name: user.username,
        username: user.username,
        email: user.email,
        role: user.role,
        streak: user.streak_count || 0,
        level: user.level || 1,
        points: user.points || user.xp || 0,
        totalWords: user.total_words || 0,
        totalLessons: user.total_lessons || 0,
        joinDate: user.created_at || user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server!', error: error.message });
  }
};

// 3. LẤY THÔNG TIN USER HIỆN TẠI (GET /api/auth/me)
exports.getMe = async (req, res) => {
  try {
    const userId = req.user.id; // Lấy từ auth middleware (req.user)

    const [users] = await db.query(
      'SELECT id, username, email, role, streak_count, daily_goal, created_at FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng!' });
    }

    const user = users[0];

    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        name: user.username,
        username: user.username,
        email: user.email,
        role: user.role,
        streak: user.streak_count || 0,
        dailyGoal: user.daily_goal || 10,
        level: 1,
        points: 0,
        totalWords: 0,
        totalLessons: 0,
        progress: 0,
        joinDate: user.created_at
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server!', error: error.message });
  }
};

// 4. CẬP NHẬT THÔNG TIN CÁ NHÂN (PUT /api/users/profile hoặc PUT /api/auth/profile)
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, currentPassword, newPassword } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Tên hiển thị không được để trống!' });
    }

    // Nếu có yêu cầu đổi mật khẩu kèm theo
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ message: 'Vui lòng cung cấp mật khẩu hiện tại!' });
      }

      const [users] = await db.query('SELECT password FROM users WHERE id = ?', [userId]);
      if (users.length === 0) {
        return res.status(404).json({ message: 'Người dùng không tồn tại!' });
      }

      const isMatch = await bcrypt.compare(currentPassword, users[0].password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Mật khẩu hiện tại không chính xác!' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await db.query('UPDATE users SET username = ?, password = ? WHERE id = ?', [name, hashedPassword, userId]);
    } else {
      // Chỉ cập nhật username/tên
      await db.query('UPDATE users SET username = ? WHERE id = ?', [name, userId]);
    }

    res.status(200).json({
      success: true,
      message: 'Cập nhật thông tin thành công!',
      data: { name }
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server!', error: error.message });
  }
};

// 5. ĐỔI MẬT KHẨU (Khi đã đăng nhập)
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    const [users] = await db.query('SELECT password FROM users WHERE id = ?', [userId]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'Người dùng không tồn tại!' });
    }

    const isMatch = await bcrypt.compare(oldPassword, users[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mật khẩu cũ không chính xác!' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId]);

    res.status(200).json({ message: 'Đổi mật khẩu thành công!' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server!', error: error.message });
  }
};

// 6. QUÊN MẬT KHẨU (Gửi token reset qua email)
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (users.length === 0) {
      return res.status(404).json({ message: 'Email không tồn tại trong hệ thống!' });
    }

    const user = users[0];
    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const resetLink = `http://localhost:4000/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Yêu cầu đặt lại mật khẩu - Vocab Master',
      html: `<p>Nhấn vào link dưới đây để đặt lại mật khẩu (hết hạn sau 15 phút):</p><a href="${resetLink}">${resetLink}</a>`
    });

    res.status(200).json({ message: 'Link đặt lại mật khẩu đã được gửi về email!' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server!', error: error.message });
  }
};

// 7. ĐẶT LẠI MẬT KHẨU MỚI (Từ link gửi qua email)
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, decoded.id]);

    res.status(200).json({ message: 'Đặt lại mật khẩu thành công!' });
  } catch (error) {
    res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn!' });
  }
};