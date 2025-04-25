const express = require("express");
const { getWorkouts, getWorkoutById, getAllWorkouts } = require("../controllers/workoutController");
const router = express.Router();

router.get("/", getWorkouts);
router.get("/all", getAllWorkouts)
router.get("/:id", getWorkoutById);

module.exports = router;