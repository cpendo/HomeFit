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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    difficulty: {
      type: DataTypes.ENUM("easy", "medium", "hard"),
      allowNull: false,
    },
    suggested_reps: {
      type: DataTypes.STRING,
      allowNull: true,
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
    youtube_video_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_ai_generated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
        fields: ["difficulty"],
        name: "difficulty_index",
      },
    ],
  }
);

module.exports = Workout;
