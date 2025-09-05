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
  }
);

const User = require("./User")(sequelize, Sequelize);

// Define relations
// // One User can have many CostSheets
// User.hasMany(CostSheet, { foreignKey: "idUser", onDelete: "CASCADE" });
// CostSheet.belongsTo(User, { foreignKey: "idUser" });


// Synchronise database
sequelize.sync({ alter: true })
  .then(() => console.log("✅ Tables synchronized successfully."))
  .catch((error) => console.error("❌ Error synchronizing tables:", error));

module.exports = {
  User,
  sequelize,
  Sequelize,
};