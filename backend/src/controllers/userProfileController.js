const { UserProfile, Goal } = require("../models/index");

const getAllGoals = async (req, res) => {
  try {
    const goals = await Goal.findAll({ attributes: ["label", "id"] });

    return res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createProfile = async (req, res) => {
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
      include: [{ model: Goal, as: "goal", attributes: ["id", "label"] }],
      attributes: ["weight", "height", "age"],
    });
    return res.status(200).json(profile);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error - getProfile", error: error.message });
  }
};

const updateProfile = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  const { id } = req.params;
  const { weight, height, goal_id } = req.body;

  if (req.user.id !== parseInt(id))
    return res.status(401).json({ message: "Unauthorized" });

  if (
    !weight?.toString().trim() &&
    !height?.toString().trim() &&
    !goal_id?.toString().trim()
  ) {
    return res
      .status(400)
      .json({ message: "At least one field is required to update" });
  }

  const updateFields = {};
  if (weight?.toString().trim()) updateFields.weight = parseInt(weight.toString().trim());
  if (height?.toString().trim()) updateFields.height = parseInt(height.toString().trim());
  if (goal_id?.toString().trim()) updateFields.goal_id = parseInt(goal_id.toString().trim());

  try {
    const [affectedRows] = await UserProfile.update(updateFields, {
      where: { user_id: id },
    });

    if (affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "User Profile not found or unchanged" });
    }

    res.status(200).json({ message: "User Profile updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = { getAllGoals, createProfile, getProfile, updateProfile };
