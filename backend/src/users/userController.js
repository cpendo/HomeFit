const User = require("./userModel");
const { validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendVerificationEmail = require("../utils/sendVerificationEmail");

const createUser = async (req, res) => {
  const { first_name, last_name, email, password } = matchedData(req);

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password,
    });

    await sendVerificationEmail(newUser.id, newUser.email, newUser.first_name);

    return res
      .status(201)
      .json({ message: "User registered. Check your email for verification." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const verifyUser = async (req, res) => {
  const { token } = req.params;
  if (!token) return res.status(400).json({ message: "Token is required." });

  try {
    const verificationToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { id: verificationToken.id } });

    if (!user) return res.status(404).json({ message: "User not found." });

    await user.update({ is_verified: true });

    return res.json({ message: "Verification successful!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const loginUser = async (req, res) => {
  if (req.session.messages) {
    const messages = req.session.messages;
    req.session.messages = []; // Clear messages after accessing
    return res.status(401).json({ message: messages });
  }
  res.status(200).json({ message: "Logged In" });
};

module.exports = { createUser, verifyUser, loginUser };
