const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/sequelize");

const Set = sequelize.define(
  "set",
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
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "sets",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

const SetWorkout = sequelize.define(
  "set_workout",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    set_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "sets",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    workout_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "workouts",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    reps: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "set_workouts",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = { Set, SetWorkout };
