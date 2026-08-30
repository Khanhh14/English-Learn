const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    let token = null;

    if (authHeader && typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    // Lọc bỏ trường hợp token bị lưu thành chuỗi 'null', 'undefined'
    if (!token || token === 'null' || token === 'undefined') {
      req.user = null;
      return next();
    }

    const secretKey = process.env.JWT_SECRET || 'your_fallback_jwt_secret_key';
    const verified = jwt.verify(token, secretKey);
    req.user = verified;
    next();
  } catch (err) {
    // Nếu token lỗi hoặc hết hạn, không làm sập request mà để fallback sang query param
    req.user = null;
    next();
  }
};