const express = require("express");
const {
  getWorkoutLogs,
  addWorkoutLog,
  deleteWorkoutLog,
} = require("../controllers/workoutLogsController");
const router = express.Router();

router.get("/", getWorkoutLogs);
router.post("/", addWorkoutLog);
router.delete("/:id", deleteWorkoutLog);

module.exports = router;
