const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const { sequelize } = require("../config/sequelize");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "member"),
      allowNull: false,
      defaultValue: "member",
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Define named hooks
const processUserData = async (user) => {
  if (user.first_name) user.first_name = user.first_name.toLowerCase();
  if (user.last_name) user.last_name = user.last_name.toLowerCase();
  if (user.email) user.email = user.email.toLowerCase();

  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
};

// Attach hooks
User.addHook("beforeCreate", "lowercaseHook", processUserData);
User.addHook("beforeUpdate", "lowercaseHook", processUserData);

module.exports = User;
