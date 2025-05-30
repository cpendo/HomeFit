const { Workout, Category } = require("../models/index");
const { Op } = require("sequelize");

const getWorkouts = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const { page = 1, difficulty, category, search } = req.query;
  const limit = 7;
  const offset = (parseInt(page) - 1) * limit;

  const where = {
    [Op.or]: [{ creator_id: req.user.id }, { creator_id: 2 }],
  };

  if (difficulty) where.difficulty = difficulty;
  if (search) where.name = { [Op.like]: `%${search}%` };
  
  try {
    const workouts = await Workout.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name"],
          ...(category && { where: { id: category } }),
        },
      ],
      attributes: [
        "id",
        "name",
        "difficulty",
        "suggested_reps",
        "is_ai_generated",
        "creator_id",
      ],
      order: [["created_at", "ASC"]],
    });
    res.status(200).json({
      data: workouts.rows,
      total: workouts.count,
      page,
      totalPages: Math.ceil(workouts.count / limit),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getWorkoutById = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const { id } = req.params;
  try {
    const workout = await Workout.findByPk(parseInt(id), {
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id","name"],
        },
      ],
      attributes: [
        "id",
        "name",
        "difficulty",
        "suggested_reps",
        "creator_id",
        "youtube_video_id",
      ],
    });
    if (!workout) return res.status(404).json({ message: "Workout not found" });

    return res.status(200).json(workout);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getSimilarWorkouts = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  const { id, difficulty } = req.query;

  if (!id || !difficulty) {
    return res.status(400).json({ message: "Missing id or difficulty" });
  }

  try {
    const similarWorkouts = await Workout.findAll({
      where: {
        difficulty,
        id: { [Op.ne]: parseInt(id) }, // exclude current workout
      },
      limit: 5,
      attributes: ["id", "name", "difficulty", "suggested_reps"],
    });

    return res.status(200).json(similarWorkouts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const addWorkout = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const { name, difficulty, suggested_reps } = req.body;

  if (!name || !difficulty || !suggested_reps) {
    return res.status(400).json({ message: "Missing required workout fields" });
  }

  try {
    const workout = await Workout.create({
      creator_id: req.user?.id,
      name,
      difficulty,
      suggested_reps,
      ...req.body,
    });

    return res
      .status(201)
      .json({ message: `${workout.name} added to your workouts!` });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.findAll({
      attributes: ["id", "name"],
      order: [["name", "ASC"]],
    });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateWorkout = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const { id } = req.params;
  const updates = req.body;

  if (!id) return res.status(400).json({ message: "Workout ID is required" });

  try {
    const workout = await Workout.findByPk(id);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    if (workout.creator_id !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await workout.update(updates);

    return res.status(200).json({
      message: `${workout.name} has been updated`,
      workout,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteWorkout = async (req, res) => {
  const logId = parseInt(req.params.id);
  const userId = req.user?.id;

  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const workout = await Workout.findByPk(parseInt(logId));
    if (!workout) return res.status(404).json({ message: "Workout not Found" });

    if (workout.creator_id !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await workout.destroy();

    return res.status(200).json({ message: "Workout deleted!" });
  } catch (error) {
    console.error("Error deleting workout:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = {
  getWorkouts,
  getWorkoutById,
  getSimilarWorkouts,
  addWorkout,
  getAllWorkouts,
  updateWorkout,
  deleteWorkout
};
