const { Set, SetWorkout } = require("../models/index");

const getWorkoutLogs = async (req, res) => {
  try {
    const workoutLogs = await WorkoutLogs.findAll({
      include: [
        {
          model: Workout,
          as: "workouts",
          attributes: ["name", "difficulty_level"],
          include: [{ model: Category, as: "category", attributes: ["name"] }],
        },
      ],
      attributes: ["id", "reps", "duration", "performed_at"],
      order: [["performed_at", "ASC"]],
    });
    res.status(200).json(workoutLogs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getSets = async (req, res) => {
  try {
    const sets = await Set.findAll();

    res.status(200).json(sets)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });

  }
};

const addSet = async (req,res) => {}

module.exports = {getSets, addSet}