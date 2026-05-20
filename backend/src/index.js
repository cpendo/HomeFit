const express = require("express");
require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const passport = require("./strategies/local-strategy");
const { sequelize, connectDB } = require("./config/sequelize");
require("./models"); // ensure associations are registered before sync
const seedDemo = require("./utils/seedDemo");
const externalRoutes = require("./routes/externalRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const workoutLogsRoutes = require("./routes/workoutLogsRoutes");
const userProfileRoutes = require("./routes/userProfileRoutes");

const app = express();
const isProd = process.env.NODE_ENV === "production";

// Behind a proxy in production (Fly.io / similar) — required for secure cookies
if (isProd) app.set("trust proxy", 1);

const allowedOrigins = (process.env.FRONTEND_URL || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      // No origin (curl/server-to-server) — allow
      if (!origin) return callback(null, true);
      // In dev, allow any localhost / 127.0.0.1 port
      if (!isProd && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
        return callback(null, true);
      }
      // In prod, strictly check the whitelist
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev-session-secret-change-me",
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Health check (useful for Fly.io)
app.get("/health", (_req, res) => res.json({ ok: true }));

// Routes
app.use("/api", externalRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/workout-logs", workoutLogsRoutes);
app.use("/api/user-profiles", userProfileRoutes);

const startServer = async () => {
  await connectDB();
  // Create tables from models if they don't exist; safe on SQLite for a demo.
  await sequelize.sync();
  console.log("All models synced with database.");

  // Seed demo data on first startup (no-op if data already exists).
  try {
    await seedDemo();
  } catch (err) {
    console.error("Seed error:", err);
  }

  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
};

startServer();
