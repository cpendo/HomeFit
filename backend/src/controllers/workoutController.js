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

  if (difficulty) where.difficulty_level = difficulty;
  if (search) where.name = { [Op.like]: `%${search}%` };
  if (category) {
    const categoryArray = Array.isArray(category)
      ? category
      : category.split(",");

    where["$category.name$"] = { [Op.in]: categoryArray };
  }

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
      order: [["name", "ASC"]],
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
          attributes: ["name"],
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
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getWorkouts,
  getWorkoutById,
  getSimilarWorkouts,
  addWorkout,
};
