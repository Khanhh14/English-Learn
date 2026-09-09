const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendResetCodeEmail } = require('../services/emailService');
const { calculateUserStreak } = require('./streak.controller');

const otpStore = new Map();

// Tự động kiểm tra và khởi tạo bảng nếu chưa có
async function ensureAvatarTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS shop_avatars (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      avatar VARCHAR(255) NOT NULL,
      description VARCHAR(255) DEFAULT '',
      price INT DEFAULT 300,
      is_active TINYINT(1) DEFAULT 1
    )
  `);

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

// ==================== CÁC API AVATAR & SHOP ====================

// Lấy danh sách avatar đang bán trong shop
exports.getShopAvatars = async (req, res) => {
  try {
    await ensureAvatarTable();
    const [items] = await db.query(
      'SELECT id, name, avatar, description, price FROM shop_avatars WHERE is_active = 1'
    );
    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    return res.status(500).json({ message: 'Lỗi khi tải cửa hàng!', error: error.message });
  }
};

// Mua avatar từ cửa hàng
exports.purchaseAvatar = async (req, res) => {
  const { avatar } = req.body;
  if (!avatar) {
    return res.status(400).json({ message: 'Vui lòng chọn avatar cần mua!' });
  }

  const connection = await db.getConnection();
  try {
    await ensureAvatarTable();

    // 1. Kiểm tra avatar có trong shop không và lấy giá
    const [shopRows] = await connection.query(
      'SELECT price, name FROM shop_avatars WHERE avatar = ? AND is_active = 1',
      [avatar]
    );
    if (shopRows.length === 0) {
      return res.status(400).json({ message: 'Avatar không tồn tại hoặc đã ngừng bán!' });
    }
    const itemPrice = Number(shopRows[0].price);

    await connection.beginTransaction();

    // 2. Kiểm tra người dùng đã sở hữu avatar này chưa
    const [ownedRows] = await connection.query(
      'SELECT avatar FROM user_avatars WHERE user_id = ? AND avatar = ? FOR UPDATE',
      [req.user.id, avatar]
    );
    if (ownedRows.length > 0) {
      await connection.rollback();
      return res.status(409).json({ message: 'Bạn đã sở hữu avatar này!' });
    }

    // 3. Kiểm tra số dư coin của user
    const [userRows] = await connection.query(
      'SELECT coins FROM users WHERE id = ? FOR UPDATE',
      [req.user.id]
    );
    if (userRows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ message: 'Người dùng không tồn tại!' });
    }

    const currentCoins = Number(userRows[0].coins || 0);
    if (currentCoins < itemPrice) {
      await connection.rollback();
      return res.status(400).json({ message: 'Bạn không đủ COIN để mua avatar!' });
    }

    // 4. Lưu quyền sở hữu và trừ coin
    await connection.query(
      'INSERT INTO user_avatars (user_id, avatar) VALUES (?, ?)',
      [req.user.id, avatar]
    );
    await connection.query(
      'UPDATE users SET coins = coins - ? WHERE id = ?',
      [itemPrice, req.user.id]
    );

    await connection.commit();

    const ownedAvatars = await getOwnedAvatars(req.user.id);
    return res.status(200).json({
      message: `Mua thành công ${shopRows[0].name}!`,
      data: { 
        coins: currentCoins - itemPrice, 
        ownedAvatars 
      }
    });
  } catch (error) {
    await connection.rollback();
    return res.status(500).json({ message: 'Không thể mua avatar!', error: error.message });
  } finally {
    connection.release();
  }
};

// Đặt avatar đã sở hữu làm avatar đại diện
exports.setAvatar = async (req, res) => {
  const { avatar } = req.body;
  if (!avatar) {
    return res.status(400).json({ message: 'Vui lòng chọn avatar!' });
  }

  try {
    await ensureAvatarTable();

    // Kiểm tra xem user đã sở hữu ảnh này chưa
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

// ==================== AUTH & PROFILE ====================

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
        coins: user.coins || 0,
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
        coins: user.coins || 0,
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