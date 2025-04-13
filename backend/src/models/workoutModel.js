const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/sequelize");

const Workout = sequelize.define(
  "Workout",
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
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,     
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    difficulty_level: {
      type: DataTypes.ENUM("beginner", "intermediate", "advanced"),
      allowNull: false,
    },
    muscles_targeted: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    visibility: {
      type: DataTypes.ENUM("public", "private"),
      allowNull: false,
    },
  },
  {
    tableName: "workouts",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      {
        fields: ["category_id"],
        name: "category_id_index",
      },
      {
        fields: ["creator_id"],
        name: "creator_id_index",
      },
      {
        fields: ["difficulty_level"],
        name: "difficulty_level_index",
      },
    ],
  }
);

module.exports = Workout;