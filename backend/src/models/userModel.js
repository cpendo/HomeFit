const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const { sequelize } = require("../config/sequelize");
const Workout = require("./workoutModel");

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
    email_pin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pin_expires_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

User.hasMany(Workout, { foreignKey: "creator_id", as: "workouts" });


// Define named hooks
const processUserData = async (user) => {
  if (user.first_name) user.first_name = user.first_name.toLowerCase();
  if (user.last_name) user.last_name = user.last_name.toLowerCase();
  if (user.email) user.email = user.email.toLowerCase();

  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 12);
  }

  if (user.email_pin) {
    user.email_pin = await bcrypt.hash(user.email_pin, 12)
  }
};

// Attach hooks
User.addHook("beforeCreate", "lowercaseHook", processUserData);
User.addHook("beforeUpdate", "lowercaseHook", processUserData);

module.exports = User;
