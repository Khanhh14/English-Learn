const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendResetCodeEmail = async (to, code) => {
  const mailOptions = {
    from: `"Vocab Master" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Mã xác thực đặt lại mật khẩu',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
        <h2 style="color: #4f46e5;">Đặt lại mật khẩu</h2>
        <p>Bạn vừa yêu cầu mã xác nhận để đặt lại mật khẩu.</p>
        <p>Mã OTP của bạn là:</p>
        <div style="background: #f3f4f6; padding: 12px 24px; font-size: 24px; font-weight: bold; letter-spacing: 4px; display: inline-block; border-radius: 8px; color: #1f2937;">
          ${code}
        </div>
        <p style="color: #ef4444; font-size: 13px; margin-top: 15px;">* Mã này có hiệu lực trong vòng 2 phút.</p>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendResetCodeEmail };