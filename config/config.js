require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "Test-123",
    database: process.env.DB_NAME || "base_example_development",
    host: process.env.DB_HOST || "pma.local",
    dialect: "mysql"
  },
  test: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "Test-123",
    database: process.env.DB_NAME || "base_example_test",
    host: process.env.DB_HOST || "pma.local",
    dialect: "mysql"
  },
  production: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "Test-123",
    database: process.env.DB_NAME || "base_example_production",
    host: process.env.DB_HOST || "pma.local",
    dialect: "mysql"
  }
};