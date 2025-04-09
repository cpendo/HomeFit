const express = require("express");
require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const passport = require("./strategies/local-strategy");
const { sequelize, connectDB } = require("./config/sequelize");
const userRoutes = require("./users/userRoutes");

const app = express();

//Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(
  session({
    secret: "Dev Test",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 60000 * 60, //1h,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/api/users", userRoutes);

//Start Server and Connect to DB
const startServer = async () => {
  await connectDB();
  await sequelize.sync({ force: true }); // Ensures models match database schema
  console.log("All models synced with database.");

  app.listen(process.env.PORT, () =>
    console.log("Server running on port 5000")
  );
};

startServer();
