const { UserProfile, Goal } = require("../models/index");

const getAllGoals = async (req, res) => {
  try {
    const goals = await Goal.findAll({ attributes: ["label", "id"] });

    return res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateProfile = async (req, res) => {
  const { age, weight, height, goal_id } = req.body;

  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const [profile, created] = await UserProfile.findOrCreate({
      where: { user_id: req.user.id },
      defaults: { weight, height, goal_id, age },
    });

    if (!created) {
      return res.status(409).json({ message: "Profile already exists" });
    }

    return res.status(201).json({ message: "User Profile Created!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getProfile = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const profile = await UserProfile.findOne({
      where: { user_id: req.user?.id },
      attributes: [age, weight, height, goal_id]
    });
    return res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getAllGoals, updateProfile, getProfile };
