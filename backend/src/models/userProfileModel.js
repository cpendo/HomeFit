const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/sequelize");

const UserProfile = sequelize.define(
  "user_profile",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    goal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "goals",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE", // or CASCADE depending on your logic
    },
  },
  {
    tableName: "user_profiles",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      {
        fields: ["user_id"],
        name: "user_id_index",
      },
    ],
  }
);

const Goal = sequelize.define(
  "goal",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "goals",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = { Goal, UserProfile };
