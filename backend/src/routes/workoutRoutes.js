const express = require("express");
const { getWorkouts, getWorkoutById } = require("../controllers/workoutController");
const router = express.Router();

router.get("/", getWorkouts);
router.post("/:id", getWorkoutById);

module.exports = router;