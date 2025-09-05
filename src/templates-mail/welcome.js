exports.welcomeEmailTemplate = (firstname) => ({
  subject: "Bienvenue sur notre plateforme !",
  text: `Bonjour ${firstname},\n\nMerci de vous être inscrit.`,
  html: `
    <p>Bonjour <strong>${firstname}</strong>,</p>
    <p>Merci de vous être inscrit sur notre plateforme.</p>
  `
});