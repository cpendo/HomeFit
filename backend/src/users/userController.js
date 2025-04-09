const User = require("./userModel");
const { matchedData } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const generatePin = require("../utils/generatePin");
const sendVerificationEmail = require("../utils/sendVerificationEmail");

const JWT_SECRET = process.env.JWT_SECRET;

const createUser = async (req, res) => {
  const { first_name, last_name, email, password } = matchedData(req);

  const verificationPin = generatePin();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins later

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

    const verifyToken = jwt.sign(
      {
        user_id: newUser.id,
        purpose: "verify_email",
      },
      JWT_SECRET,
      { expiresIn: "10m" }
    );

    await sendVerificationEmail(
      newUser.email,
      newUser.first_name,
      verificationPin
    );

    return res.status(201).json({
      title: "User registered!",
      //message: "Verification pin sent to registered email.",
      verifyToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
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
    if (!user) return res.status(404).json({ message: "User not found", redirect: true });
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

    const newPin = generatePin();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // expires in 10 minutes

    await user.update({
      email_pin: newPin,
      pin_expires_at: expiresAt,
    });

    await sendVerificationEmail(user.email, user.first_name, newPin); 

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

module.exports = { createUser, verifyUser, loginUser, resendPin };
