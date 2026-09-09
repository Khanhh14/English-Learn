const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendResetCodeEmail } = require('../services/emailService');
const { calculateUserStreak } = require('./streak.controller');

const otpStore = new Map();
const AVATAR_PRICE = 300;
const AVAILABLE_AVATARS = [
  '/image/Tom Aura в TikTok.jpg',
  '/image/IShowClutch florkofcows logo.jpg',
  '/image/download.jpg',
  '/image/Avata shin.jpg'
];

async function ensureAvatarTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS user_avatars (
      user_id BIGINT NOT NULL,
      avatar VARCHAR(255) NOT NULL,
      purchased_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (user_id, avatar)
    )
  `);
}

async function getOwnedAvatars(userId) {
  await ensureAvatarTable();
  const [rows] = await db.query(
    'SELECT avatar FROM user_avatars WHERE user_id = ? ORDER BY purchased_at ASC',
    [userId]
  );
  return rows.map((row) => row.avatar);
}

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
    const ownedAvatars = await getOwnedAvatars(user.id);

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
        avatar: user.avatar || '',
        ownedAvatars,
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
    const userId = req.user.id;

    // Bổ sung coins vào câu SELECT
    const [users] = await db.query(
      'SELECT id, username, email, role, streak_count, daily_goal, xp, coins, avatar, created_at FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng!' });
    }

    const user = users[0];
    const stats = await getUserStats(user.id);
    const ownedAvatars = await getOwnedAvatars(user.id);

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
        avatar: user.avatar || '',
        ownedAvatars,
        joinDate: user.created_at,
        ...stats
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server!', error: error.message });
  }
};

exports.purchaseAvatar = async (req, res) => {
  const { avatar } = req.body;
  if (!AVAILABLE_AVATARS.includes(avatar)) {
    return res.status(400).json({ message: 'Avatar không hợp lệ!' });
  }

  const connection = await db.getConnection();
  try {
    await ensureAvatarTable();
    await connection.beginTransaction();

    const [ownedRows] = await connection.query(
      'SELECT avatar FROM user_avatars WHERE user_id = ? AND avatar = ? FOR UPDATE',
      [req.user.id, avatar]
    );
    if (ownedRows.length > 0) {
      await connection.rollback();
      return res.status(409).json({ message: 'Bạn đã sở hữu avatar này!' });
    }

    const [userRows] = await connection.query(
      'SELECT coins FROM users WHERE id = ? FOR UPDATE',
      [req.user.id]
    );
    if (userRows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ message: 'Người dùng không tồn tại!' });
    }
    if (Number(userRows[0].coins || 0) < AVATAR_PRICE) {
      await connection.rollback();
      return res.status(400).json({ message: 'Bạn không đủ COIN để mua avatar!' });
    }

    await connection.query(
      'INSERT INTO user_avatars (user_id, avatar) VALUES (?, ?)',
      [req.user.id, avatar]
    );
    await connection.query(
      'UPDATE users SET coins = coins - ? WHERE id = ?',
      [AVATAR_PRICE, req.user.id]
    );
    await connection.commit();

    const ownedAvatars = await getOwnedAvatars(req.user.id);
    return res.status(200).json({
      message: 'Mua avatar thành công!',
      data: { coins: Number(userRows[0].coins) - AVATAR_PRICE, ownedAvatars }
    });
  } catch (error) {
    await connection.rollback();
    return res.status(500).json({ message: 'Không thể mua avatar!', error: error.message });
  } finally {
    connection.release();
  }
};

exports.setAvatar = async (req, res) => {
  const { avatar } = req.body;
  if (!AVAILABLE_AVATARS.includes(avatar)) {
    return res.status(400).json({ message: 'Avatar không hợp lệ!' });
  }

  try {
    await ensureAvatarTable();
    const [ownedRows] = await db.query(
      'SELECT avatar FROM user_avatars WHERE user_id = ? AND avatar = ?',
      [req.user.id, avatar]
    );
    if (ownedRows.length === 0) {
      return res.status(403).json({ message: 'Bạn chưa sở hữu avatar này!' });
    }

    await db.query('UPDATE users SET avatar = ? WHERE id = ?', [avatar, req.user.id]);
    return res.status(200).json({ message: 'Đã cập nhật avatar!', data: { avatar } });
  } catch (error) {
    return res.status(500).json({ message: 'Không thể cập nhật avatar!', error: error.message });
  }
};

// 4. CẬP NHẬT THÔNG TIN CÁ NHÂN
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
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