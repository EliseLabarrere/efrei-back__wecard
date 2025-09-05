const nodemailer = require('nodemailer');

const options = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false,
};

// ✅ N'ajoute `auth` que si USER et PASS sont définis
if (process.env.SMTP_USER && process.env.SMTP_PASS) {
  options.auth = {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  };
}

const transporter = nodemailer.createTransport(options);

module.exports = transporter;
