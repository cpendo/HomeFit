const express = require("express");
const { getWorkoutLogs, addWorkoutLog } = require("../controllers/workoutLogsController");
const router = express.Router();

router.get("/", getWorkoutLogs);
router.post("/", addWorkoutLog);

module.exports = router;
