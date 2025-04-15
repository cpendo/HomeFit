const { Category } = require("../models/index");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ attributes: ["name"] });

    if (categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }

    
    const names = categories.map((cat) => cat.name);
    res.status(200).json({ data: names });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getCategories };
