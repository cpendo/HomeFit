const express = require("express");
const {
  createUser,
  loginUser,
  checkUserToken,
  verifyUser,
  resendPin,
  forgotPassword,
  resetPassword,
  updateUser,
  changePassword,
  deleteUserWorkouts,
  deleteUser,
} = require("../controllers/userController");
const {
  createUserValidation,
  loginUserValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  changePasswordValidation,
} = require("../middleware/validationSchemas");
const { UserProfile } = require("../models/index");
const router = express.Router();

router.post("/register", createUserValidation, createUser);
router.post("/verify-user/check", checkUserToken);
router.post("/verify-user", verifyUser);
router.post("/resend-pin", resendPin);
router.post("/login", loginUserValidation, loginUser);
router.get("/me", async (req, res) => {
  if (req.user) {
    const userData = {
      id: req.user.id,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
    };

    try {
      const profile = await UserProfile.findOne({
        where: { user_id: req.user.id },
      });

      const hasProfile = !!profile;

      return res.status(200).json({ status: "OK", user: userData, hasProfile });
    } catch (dbError) {
      console.error("Error checking user profile:", dbError);
      return res.status(500).json({ message: "Database error" });
    }
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
router.patch("/change-password/:id", changePasswordValidation, changePassword);
router.patch("/:id", updateUser);
router.delete("/:id/workouts", deleteUserWorkouts);
router.delete("/:id",   deleteUser)

module.exports = router;