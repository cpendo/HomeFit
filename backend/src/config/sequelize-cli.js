require("dotenv").config();
const path = require("path");

const dialect = process.env.DB_DIALECT || "sqlite";

const config =
  dialect === "mysql"
    ? {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST || "localhost",
        dialect: "mysql",
      }
    : {
        dialect: "sqlite",
        storage:
          process.env.SQLITE_PATH ||
          path.join(__dirname, "..", "..", "data.sqlite"),
      };

module.exports = {
  development: config,
  production: config,
};
