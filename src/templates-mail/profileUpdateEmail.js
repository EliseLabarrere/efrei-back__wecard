module.exports = (user) => ({
  subject: "Mise à jour de votre profil",
  text: `Bonjour ${user.firstname},\n\nVos informations ont été mises à jour.\nNom: ${user.lastname}\nPrénom: ${user.firstname}\nEmail: ${user.email}`,
  html: `
    <p>Bonjour <strong>${user.firstname}</strong>,</p>
    <p>Vos informations ont bien été mises à jour :</p>
    <ul>
      <li><strong>Nom :</strong> ${user.lastname}</li>
      <li><strong>Prénom :</strong> ${user.firstname}</li>
      <li><strong>Email :</strong> ${user.email}</li>
    </ul>
  `
});
