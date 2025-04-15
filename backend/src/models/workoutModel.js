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
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      name: "fk_workouts_category_id",
      references: {
        model: "categories",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      name: "fk_workouts_creator_id",
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    difficulty_level: {
      type: DataTypes.ENUM("beginner", "intermediate", "advanced"),
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
