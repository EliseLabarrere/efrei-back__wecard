const transporter = require('../config/email');

const sendEmail = async ({ to, subject, text, html }) => {
  const mailOptions = {
    from: `"Mon App" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendEmail,
};
