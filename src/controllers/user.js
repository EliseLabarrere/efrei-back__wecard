const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { User } = require("../../models");
const { sendEmail } = require("../services/email");

const profileUpdateEmail = require("../templates-mail/profileUpdateEmail");
const resetPasswordEmail = require("../templates-mail/resetPasswordEmail");

module.exports = {
  getMyInfos: (req, res) => {
    res.send({
      id: req.user.id,
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      email: req.user.email
    });
  },

  editProfile: async (req, res, next) => {
    const dataToUpdate = { ...req.body };

    if (dataToUpdate.secretAnswer) {
      dataToUpdate.secretAnswer = await bcrypt.hash(dataToUpdate.secretAnswer, 10);
    }

    await User.update(dataToUpdate, {
      where: { id: req.user.id }
    });

    const updatedUser = await User.findByPk(req.user.id);

    if (process.env.USE_MAIL === "true") {
      const { subject, text, html } = profileUpdateEmail(updatedUser);
      await sendEmail({ to: updatedUser.email, subject, text, html });
    }

    res.send({ message: "Profile updated successfully", user: updatedUser });
  },

  getAllUsers: async (req, res) => {
    if (!req.user.isAdmin) {
      return res.status(403).send({ message: "Accès refusé" });
    }

    const users = await User.findAll({
      attributes: { exclude: ["password", "secretAnswer"] }
    });

    res.send(users);
  },


  forgotPassword: async (req, res, next) => {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    if (process.env.USE_MAIL === "true") {
      const token = crypto.randomBytes(32).toString("hex");
      const expires = new Date(Date.now() + 3600000); // 1h

      user.resetPasswordToken = token;
      user.resetPasswordExpires = expires;
      await user.save();

      const resetUrl = `${process.env.FRONT_URL || "http://localhost:3000"}/reset-password/${token}`;
      const { subject, text, html } = resetPasswordEmail(user.firstname, resetUrl);

      await sendEmail({ to: user.email, subject, text, html });

      return res.json({ message: "Un email de réinitialisation a été envoyé." });
    }

    // Fallback question secrète
    if (!user.secretQuestion) {
      return res.status(400).send({ message: "Question secrète non configurée." });
    }

    res.send({
      message: "Répondez à la question secrète pour réinitialiser votre mot de passe.",
      question: user.secretQuestion
    });
  },

  resetPasswordByMail: async (req, res, next) => {
    const { password, confirmPassword } = req.body;
    const { token } = req.params;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });
    }

    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: new Date() }
      }
    });

    if (!user) {
      return res.status(400).json({ message: "Lien invalide ou expiré." });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.json({ message: "Mot de passe mis à jour avec succès." });
  },

  resetPasswordBySecretQuestion: async (req, res, next) => {
    const { email, answer, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).send({ message: "Les mots de passe ne correspondent pas." });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).send({ message: "Utilisateur non trouvé." });

    const isMatch = await bcrypt.compare(answer, user.secretAnswer);
    if (!isMatch) return res.status(403).send({ message: "Mauvaise réponse à la question secrète." });

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.send({ message: "Mot de passe mis à jour avec succès." });
  },

  deleteProfile : async (req, res) => {
    const { id } = req.params;

    // Récupérer l'utilisateur cible
    const targetUser = await User.findByPk(id);

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Vérification : propriétaire ou admin
    if (req.user.id !== targetUser.id && !req.user.isAdmin) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // Suppression manuelle des relations si pas en CASCADE
    await Comment.destroy({ where: { userId: targetUser.id } });
    await Post.destroy({ where: { userId: targetUser.id } });
    await Order.destroy({ where: { userId: targetUser.id } });

    // Suppression du compte
    await targetUser.destroy();

    res.json({ message: "User and related data deleted successfully" });
  }
};
