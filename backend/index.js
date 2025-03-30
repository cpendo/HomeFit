const express = require("express");
require("dotenv").config();
const { sequelize, connectDB } = require("./config/sequelize");
const userRoutes = require("./src/users/userRoutes");

const app = express();

//Middleware
app.use(express.json());

//Routes
app.use("/api/users", userRoutes);

//Start Server and Connect to DB
const startServer = async () => {
  await connectDB();
  await sequelize.sync({ alter: true }); // Ensures models match database schema
  console.log("All models synced with database.");

  app.listen(process.env.PORT, () =>
    console.log("Server running on port 5000")
  );
};

startServer();
