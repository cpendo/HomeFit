const express = require("express");
const {
  getWorkoutLogs,
  addWorkoutLog,
  deleteWorkoutLog,
  getStreakDates,
} = require("../controllers/workoutLogsController");
const router = express.Router();

router.get("/", getWorkoutLogs);
router.get("/streak-dates", getStreakDates);
router.post("/", addWorkoutLog);
router.delete("/:id", deleteWorkoutLog);

module.exports = router;
