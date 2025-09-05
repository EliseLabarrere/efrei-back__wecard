require("dotenv").config();
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require('../services/email');
const { welcomeEmailTemplate } = require('../templates-mail/welcome');

module.exports = {
  register: async (req, res, next) => {
    const {
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
      secretQuestion,
      secretAnswer
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).send({ message: "Passwords aren't equal" });
    }

    if (process.env.USE_MAIL !== 'true') {
      if (!secretQuestion || !secretAnswer) {
        return res.status(400).send({ message: "Secret question and answer are required when USE_MAIL is false." });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedSecretAnswer = secretAnswer
      ? await bcrypt.hash(secretAnswer, 10)
      : null;

    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      secretQuestion: secretQuestion || null,
      secretAnswer: hashedSecretAnswer
    });

    if (process.env.USE_MAIL === 'true') {
      const { subject, text, html } = welcomeEmailTemplate(firstname);
      await sendEmail({ to: email, subject, text, html });

      const admins = await User.findAll({ where: { isAdmin: 1 } });
      for (const admin of admins) {
        await sendEmail({
          to: admin.email,
          subject: `Nouvel utilisateur inscrit`,
          text: `${firstname} ${lastname} vient de créer un compte.`,
          html: `<p>${firstname} ${lastname} vient de créer un compte.</p>`
        });
      }
    }

    res.status(201).send({
      success: true,
      user: { id: user.id, firstname, lastname, email }
    });
  },

  login: async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ message: "Email or Password wrong" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).send({
      message: "Successfully logged in",
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        token
      }
    });
  }
};
