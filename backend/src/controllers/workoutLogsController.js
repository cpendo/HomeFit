const { WorkoutLogs, Workout, Category } = require("../models/index");

const getWorkoutLogs = async (req, res) => {
  const { page = 1 } = req.query; // default to page 1
  const limit = 7; // default to 7 logs per page
  const offset = (parseInt(page) - 1) * limit;

  try {
    const workoutLogs = await WorkoutLogs.findAndCountAll({
      include: [
        {
          model: Workout,
          as: "workouts",
          attributes: ["name", "difficulty"],
          include: [{ model: Category, as: "category", attributes: ["name"] }],
        },
      ],
      attributes: ["id", "performed_reps", "duration", "performed_at"],
      order: [["performed_at", "ASC"]],
      limit,
      offset,
    });
    res
      .status(200)
      .json({
        logs: workoutLogs.rows,
        total: workoutLogs.count,
        currentPage: page,
        totalPages: Math.ceil(workoutLogs.count / limit),
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const addWorkoutLog = async (req, res) => {
  const { id, duration, duration_unit, ...body } = req.body;

  let multiplier = 1;

  if (duration_unit === "m") multiplier = 60;
  else if (duration_unit === "h") multiplier = 3600;

  const durationInSeconds = parseInt(duration) * multiplier;
  if (!req.user || req.user?.id !== id)
    return res.status(401).json({ message: "Unauthorized" });

  try {
    await WorkoutLogs.create({
      ...body,
      effort_rating: parseInt(body.effort_rating),
      user_id: req.user?.id,
      duration: durationInSeconds,
    });

    return res.status(201).json({ message: "Workout logged!" });
  } catch (error) {
    console.error("Error adding log:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getWorkoutLogs, addWorkoutLog };
