const express = require("express");
const { getWorkouts, getWorkoutById, getSimilarWorkouts, addWorkout } = require("../controllers/workoutController");
const router = express.Router();

router.get("/", getWorkouts);
router.get("/similar", getSimilarWorkouts);
router.get("/:id", getWorkoutById);
router.post("/", addWorkout);

module.exports = router;