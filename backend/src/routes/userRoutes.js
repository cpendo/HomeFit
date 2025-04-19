const express = require("express");
const {
  createUser,
  loginUser,
  checkUserToken,
  verifyUser,
  resendPin,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const {
  createUserValidation,
  loginUserValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} = require("../middleware/validationSchemas");

const router = express.Router();

router.post("/register", createUserValidation, createUser);
router.post("/verify-user/check", checkUserToken);
router.post("/verify-user", verifyUser);
router.post("/resend-pin", resendPin);
router.post("/login", loginUserValidation, loginUser);
router.get("/me", (req, res) => {
  if (req.user) {
    const userData = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
    };

    return res.status(200).json({ status: "OK", user: userData });
  }

  return res.status(401).json({ status: "Unauthorized" });
});

router.post("/logout", (req, res) => {
  if (!req.user) return res.sendStatus(401);
  req.logout((err) => {
    if (err) return res.sendStatus(400);
    res.status(200).json({ message: "Logout Successful" });
  });
});

router.post("/forgot-password", forgotPasswordValidation, forgotPassword);
router.post("/reset-password", resetPasswordValidation, resetPassword);

module.exports = router;
