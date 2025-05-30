const express = require("express");
const {
  getWorkouts,
  getWorkoutById,
  getSimilarWorkouts,
  addWorkout,
  getAllWorkouts,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");
const router = express.Router();

router.get("/", getWorkouts);
router.get("/similar", getSimilarWorkouts);
router.get("/all", getAllWorkouts);
router.get("/:id", getWorkoutById);
router.post("/", addWorkout);
router.patch("/:id", updateWorkout);
router.delete("/:id", deleteWorkout);

module.exports = router;
