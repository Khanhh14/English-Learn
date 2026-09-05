const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendResetCodeEmail } = require('../services/emailService');
const { calculateUserStreak } = require('./streak.controller');

const otpStore = new Map();

async function getUserStats(userId) {
  const [lessonRows] = await db.query(
    'SELECT COUNT(*) AS total_completed FROM user_lesson_progress WHERE user_id = ? AND is_completed = 1',
    [userId]
  );
  const totalLessons = Number(lessonRows[0]?.total_completed) || 0;
  const streak = await calculateUserStreak(userId);
  const progress = Math.min(Math.round((totalLessons / 100) * 100), 100);

  return { totalLessons, streak, progress };
}

// 1. ĐĂNG KÝ
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin!' });
    }

    const [existingUsers] = await db.query(
      'SELECT id FROM users WHERE email = ? OR username = ?',
      [email, username]
    );
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Email hoặc Username đã tồn tại!' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Thêm coins mặc định là 0
    await db.query(
      'INSERT INTO users (username, email, password, role, streak_count, daily_goal, xp, coins) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [username, email, hashedPassword, 'user', 0, 10, 0, 0]
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

    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ message: 'Email hoặc mật khẩu không chính xác!' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email hoặc mật khẩu không chính xác!' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1d' }
    );

    const stats = await getUserStats(user.id);

    res.status(200).json({
      message: 'Đăng nhập thành công!',
      token,
      user: {
        id: user.id,
        name: user.username,
        username: user.username,
        email: user.email,
        role: user.role,
        xp: user.xp || 0,
        points: user.xp || 0,
        coins: user.coins || 0, // Trả về số xu
        joinDate: user.created_at,
        ...stats
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server!', error: error.message });
  }
};

// 3. LẤY THÔNG TIN USER HIỆN TẠI
exports.getMe = async (req, res) => {
  try {
    const userId = req.user?.id || req.query.userId || 1;

    // Bổ sung coins vào câu SELECT
    const [users] = await db.query(
      'SELECT id, username, email, role, streak_count, daily_goal, xp, coins, created_at FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng!' });
    }

    const user = users[0];
    const stats = await getUserStats(user.id);

    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        name: user.username,
        username: user.username,
        email: user.email,
        role: user.role,
        dailyGoal: user.daily_goal || 10,
        xp: user.xp || 0,
        points: user.xp || 0,
        coins: user.coins || 0, // Trả về số xu
        joinDate: user.created_at,
        ...stats
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server!', error: error.message });
  }
};

// 4. CẬP NHẬT THÔNG TIN CÁ NHÂN
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId || 1;
    const { name, currentPassword, newPassword } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Tên hiển thị không được để trống!' });
    }

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

// 5. ĐỔI MẬT KHẨU
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId || 1;
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

// 6. QUÊN MẬT KHẨU
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Vui lòng cung cấp email!' });

    const [users] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'Email không tồn tại trong hệ thống!' });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 2 * 60 * 1000;

    otpStore.set(email, { code, expiresAt });
    await sendResetCodeEmail(email, code);

    res.status(200).json({ message: 'Mã xác thực đã được gửi về email của bạn!' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server!', error: error.message });
  }
};

// 7. ĐẶT LẠI MẬT KHẨU
exports.resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
      return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin!' });
    }

    const record = otpStore.get(email);
    if (!record || record.code !== code) {
      return res.status(400).json({ message: 'Mã xác thực không chính xác!' });
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ message: 'Mã xác thực đã hết hạn!' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await db.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email]);
    otpStore.delete(email);

    res.status(200).json({ message: 'Đặt lại mật khẩu thành công!' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server!', error: error.message });
  }
};