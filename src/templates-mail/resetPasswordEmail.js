module.exports = (firstname, resetUrl) => ({
  subject: "Réinitialisation de votre mot de passe",
  text: `Bonjour ${firstname},\n\nCliquez sur ce lien pour réinitialiser votre mot de passe : ${resetUrl}`,
  html: `
    <p>Bonjour <strong>${firstname}</strong>,</p>
    <p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
    <p><a href="${resetUrl}">${resetUrl}</a></p>
  `
});
