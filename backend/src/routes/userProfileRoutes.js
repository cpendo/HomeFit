const express = require("express");
const {
  getAllGoals,
  createProfile,
  getProfile,
  updateProfile
} = require("../controllers/userProfileController");

const router = express.Router();

router.get("/goals", getAllGoals);
router.post("/me", createProfile);
router.get("/me", getProfile);
router.patch("/me/:id", updateProfile);

module.exports = router;
