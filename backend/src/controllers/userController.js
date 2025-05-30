const { User, Workout } = require("../models/index");
const { matchedData } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const generatePin = require("../utils/generatePin");
const sendVerificationEmail = require("../utils/sendVerificationEmail");
const generateVerifyToken = require("../utils/generateVerifyToken");
const forgotPasswordEmail = require("../utils/forgotPasswordEmail");

const JWT_SECRET = process.env.JWT_SECRET;

const createUser = async (req, res) => {
  const { first_name, last_name, email, password } = matchedData(req);
  const { pin, pinExpiry } = generatePin();

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password,
      email_pin: pin,
      pin_expires_at: pinExpiry,
      is_verified: false,
    });

    const jwtToken = generateVerifyToken(newUser.id);

    await sendVerificationEmail(newUser.email, pin);

    return res.status(201).json({ token: jwtToken });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const checkUserToken = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ message: "Token missing" });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(payload.user_id);

    if (!user || user.verified) {
      return res.status(403).json({ message: "Invalid or already verified" });
    }

    return res.status(200).json({ message: "Token is valid" });
  } catch (err) {
    return res.status(401).json({ message: "Token is invalid or expired" });
  }
};

const verifyUser = async (req, res) => {
  const { token, pin } = req.body;

  if (!token || !pin) {
    return res.status(400).json({ message: "Missing token or PIN" });
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  try {
    const user = await User.findByPk(payload.user_id);
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found", redirect: true });
    if (user.is_verified)
      return res.status(400).json({ message: "User already verified." });

    const now = new Date();
    if (now > user.pin_expires_at) {
      return res.status(400).json({
        title: "Pin expired.",
        message: "Click resend button to get a new one",
      });
    }

    const matchPin = await bcrypt.compare(pin, user.email_pin);
    if (!matchPin)
      return res.status(400).json({ message: "Invalid verification pin." });

    await user.update({
      is_verified: true,
      email_pin: null,
      pin_expires_at: null,
    });
    res.status(200).json({ message: "Account verified!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const resendPin = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: "Missing token or PIN" });
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  try {
    const user = await User.findByPk(payload.user_id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.is_verified) {
      return res
        .status(400)
        .json({ message: "User is already verified", redirect: true });
    }

    const { pin: newPin, pinExpiry } = generatePin();

    await user.update({ email_pin: newPin, pin_expires_at: pinExpiry });

    await sendVerificationEmail(user.email, newPin);

    res.status(200).json({ message: "New PIN sent to your email." });
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
        const { message, token } = info;

        if (token) {
          // User exists but is not verified
          return res.status(403).json({
            message,
            redirect: true,
            token,
          });
        }

        return res.status(401).json({ message }); // Send failure message to client
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err); // Handle login error
        }

        req.session.save((err) => {
          if (err) {
            console.error("Error saving session:", err);
            return res.status(500).json({ message: "Error saving session" }); // Or handle appropriately
          }

          return res.status(200).json({ message: "Logged In" });
        });
      });
    }
  )(req, res, next);
};

const forgotPassword = async (req, res) => {
  const { email } = matchedData(req);

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      await forgotPasswordEmail(existingUser.id, existingUser.email);
    }

    return res.status(200).json({
      message:
        "If an account with that email exists, a reset link has been sent.",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = matchedData(req);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) return res.status(404).json({ message: "User not found." });

    await user.update({ password: newPassword });

    return res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ message: "Reset link has expired." });
    }

    return res.status(400).json({ message: "Invalid or expired token." });
  }
};

const updateUser = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const { id } = req.params;
  const { first_name, last_name } = req.body;

  if (req.user.id !== parseInt(id))
    return res.status(401).json({ message: "Unauthorized" });

  if (!first_name?.trim() && !last_name?.trim()) {
    return res
      .status(400)
      .json({ message: "At least one field is required to update" });
  }

  const updateFields = {};
  if (first_name?.trim()) updateFields.first_name = first_name.trim();
  if (last_name?.trim()) updateFields.last_name = last_name.trim();

  try {
    const [affectedRows] = await User.update(updateFields, { where: { id } });

    if (affectedRows === 0) {
      return res.status(404).json({ message: "User not found or unchanged" });
    }

    res.status(200).json({ message: "User details updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const changePassword = async (req, res) => {
  const { id } = req.params;
  const { current_password, new_password } = matchedData(req, {
    locations: ["body"],
  });

  if (!req.user || req.user.id !== parseInt(id))
    return res.status(401).json({ message: "Unauthorized" });

  try {
    const user = await User.findByPk(parseInt(id));
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(current_password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message:
          "If you've forgotten your password, log out and use 'Forgot Password'.",
      });
    }

    await user.update({ password: new_password });

    res.status(200).json({
      message: "User password changed. Please log in again to continue",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const deleteUserWorkouts = async (req, res) => {
  const { id } = req.params;

  if (!req.user || req.user.id !== parseInt(id))
    return res.status(401).json({ message: "Unauthorized" });

  try {
    await Workout.destroy({ where: { creator_id: parseInt(id) } });

    res.status(200).json({
      message: "Successfully deleted all your workouts",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createUser,
  checkUserToken,
  verifyUser,
  loginUser,
  resendPin,
  forgotPassword,
  resetPassword,
  updateUser,
  changePassword,
  deleteUserWorkouts
};
