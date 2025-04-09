const express = require("express");
const { createUser, loginUser, verifyUser, resendPin } = require("./userController");
const {
  createUserValidation,
  loginUserValidation,
} = require("../middleware/validationSchemas");

const router = express.Router();

router.post("/register", createUserValidation, createUser);
router.post("/verify-user", verifyUser);
router.post("/resend-pin", resendPin);
router.post("/login", loginUserValidation, loginUser);
router.get("/status", (req, res) => {
  return req.user ? res.json(req.user) : res.sendStatus(401);
});

router.post("/logout", (req, res) => {
  if (!req.user) return res.sendStatus(401);
  req.logout((err) => {
    if (err) return res.sendStatus(400);
    res.status(200).json({ message: "Logout Successful" });
  });
});

module.exports = router;
