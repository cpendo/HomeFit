const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/sequelize");
const Workout = require("./workoutModel")

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "categories",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Category.hasMany(Workout, { foreignKey: 'category_id', as: 'workouts' });

module.exports = Category;