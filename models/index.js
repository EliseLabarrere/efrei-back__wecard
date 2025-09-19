const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false
    // logging: console.log
  }
);

// Import des modèles
const User = require("./user")(sequelize, Sequelize);
const WewardChapter = require("./wewardChapter")(sequelize, Sequelize);
const UserWewardChapter = require("./userWewardChapter")(sequelize, Sequelize);

// Associations (gérées dans chaque modèle via .associate)
User.associate({ UserWewardChapter });
WewardChapter.associate({ UserWewardChapter });
UserWewardChapter.associate({ User, WewardChapter });

// Synchronisation BDD
sequelize.sync({ alter: true })
  .then(() => console.log("✅ Tables synchronized successfully."))
  .catch((error) => console.error("❌ Error synchronizing tables:", error));

module.exports = {
  User,
  WewardChapter,
  UserWewardChapter,
  sequelize,
  Sequelize,
};
