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
    rep: {
      type: DataTypes.INTEGER,
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
