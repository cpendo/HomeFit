const User = require("./userModel");
const { validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const sendVerificationEmail = require("../utils/sendVerificationEmail");

const createUser = async (req, res) => {
  const { first_name, last_name, email, password } = matchedData(req);
  const verificationPin = Math.floor(
    100000 + Math.random() * 900000
  ).toString(); // 6-digit
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 60 * 60 * 1000); // 60 mins later

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password,
      email_pin: verificationPin,
      pin_expires_at: expiresAt,
    });

    await sendVerificationEmail(
      newUser.email,
      newUser.first_name,
      verificationPin
    );

    return res.status(201).json({
      message: "User registered. Verification pin sent.",
      email: newUser.email,
    });
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

const loginUser = async (req, res, next) => {
  passport.authenticate(
    "local",
    { failureMessage: true },
    (err, user, info) => {
      if (err) {
        return next(err); // Handle unexpected errors
      }

      if (!user) {
        return res.status(401).json({ message: info.message }); // Send failure message to client
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err); // Handle login error
        }
        return res.status(200).json({ message: "Logged In" });
      });
    }
  )(req, res, next);
};

module.exports = {
  loginUser,
};

module.exports = { createUser, verifyUser, loginUser };
