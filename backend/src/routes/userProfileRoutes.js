const express = require("express");
const {
  getAllGoals,
  updateProfile,
  getProfile,
} = require("../controllers/userProfileController");

const router = express.Router();

router.get("/goals", getAllGoals);
router.post("/me", updateProfile);
router.get("/me", getProfile);

module.exports = router;
