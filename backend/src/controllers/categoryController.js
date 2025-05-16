const { Category } = require("../models/index");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ attributes: ["id","name", "slug"] });

    if (categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }

    const names = categories.map((cat) => ({
      label: cat.name,
      value: cat.id,
    }));
    res.status(200).json(names);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getCategories };
