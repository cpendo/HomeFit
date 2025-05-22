const express = require("express");
const { getWorkouts, getWorkoutById, getSimilarWorkouts, addWorkout, getAllWorkouts } = require("../controllers/workoutController");
const router = express.Router();

router.get("/", getWorkouts);
router.get("/similar", getSimilarWorkouts);
router.get("/all", getAllWorkouts)
router.get("/:id", getWorkoutById);
router.post("/", addWorkout);

module.exports = router;