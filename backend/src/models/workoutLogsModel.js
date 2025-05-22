const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/sequelize");

const WorkoutLogs = sequelize.define(
  "WorkoutLogs",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      name: "fk_workout_logs_user_id",
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    workout_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      name: "fk_workout_logs_workout_id",
      references: {
        model: "workouts",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    performed_reps: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    performed_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    equipment_used: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    mood_before: {
      type: DataTypes.ENUM("low", "okay", "good", "great"),
      allowNull: true,
    },
    mood_after: {
      type: DataTypes.ENUM("low", "okay", "good", "great"),
      allowNull: true,
    },
    effort_rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "workout_logs",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      {
        fields: ["user_id"],
        name: "user_id_index",
      },
      {
        fields: ["workout_id"],
        name: "workout_id_index",
      },
    ],
  }
);

module.exports = WorkoutLogs;
