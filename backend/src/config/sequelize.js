const { Sequelize } = require("sequelize");
const path = require("path");

// SQLite by default (great for demo/portfolio deploys with a persistent volume).
// Falls back to MySQL when DB_DIALECT=mysql is set explicitly (legacy local dev).
const dialect = process.env.DB_DIALECT || "sqlite";

const sequelize =
  dialect === "mysql"
    ? new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USERNAME,
        process.env.DB_PASSWORD,
        {
          host: process.env.DB_HOST || "localhost",
          dialect: "mysql",
          logging: false,
        }
      )
    : new Sequelize({
        dialect: "sqlite",
        storage:
          process.env.SQLITE_PATH ||
          path.join(__dirname, "..", "..", "data.sqlite"),
        logging: false,
      });

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Database connected (${dialect}).`);
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
