const { Workout, Category } = require("../models/index");
const { Op } = require('sequelize');


const getWorkouts = async (req, res) => {
  const { page = 1, difficulty, category, search } = req.query;
  const limit = 8;
  const offset = (page - 1) * limit;
  const where = {};
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
      attributes: ["id", "name", "difficulty_level"],
    });
    res.status(200).json({ data: workouts.rows, total: workouts.count });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getWorkoutById = async (req, res) => {
  const { id } = req.body;
  try {
    const workout = await Workout.findByPk(id, {
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
      ],
      attributes: ["name", "difficulty_level"],
    });
    if (!workout) return res.status(404).json({ message: "Workout not found" });

    return res.status(200).json({ message: workout });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getWorkouts, getWorkoutById };
