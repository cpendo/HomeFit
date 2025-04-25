const { WorkoutLogs, Workout, Category } = require("../models/index");

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
      order: [["performed_at", "ASC"]]
    });
    res.status(200).json(workoutLogs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const addWorkoutLog = async (req, res) => {
  const { workout_id, reps, duration, duration_unit, performed_at } = req.body;

  let multiplier = 1;

  if (duration_unit === "m") multiplier = 60;
  else if (duration_unit === "h") multiplier = 3600;

  const durationInSeconds = parseInt(duration) * multiplier;
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  try {
    await WorkoutLogs.create({
      user_id: req.user?.id,
      workout_id,
      reps,
      duration: durationInSeconds,
      performed_at,
    });

    return res.status(201).json({ message: "Workout logged!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getWorkoutLogs, addWorkoutLog };
