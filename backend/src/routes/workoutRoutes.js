const express = require("express");
const { getWorkouts, getWorkoutById } = require("../controllers/workoutController");
const router = express.Router();

router.get("/", getWorkouts);
router.get("/:id", getWorkoutById);

module.exports = router;