const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];

    if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Vui lòng đăng nhập để tiếp tục!' });
    }

    const token = authHeader.slice('Bearer '.length).trim();
    if (!token || token === 'null' || token === 'undefined') {
      return res.status(401).json({ message: 'Token không hợp lệ!' });
    }

    const secretKey = process.env.JWT_SECRET || 'secretkey';
    const verified = jwt.verify(token, secretKey);
    req.user = verified;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn!' });
  }
};