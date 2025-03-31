const express = require("express");
const { createUser, loginUser, verifyUser } = require("./userController");
const {
  createUserValidation,
  loginUserValidation,
} = require("../middleware/validationSchemas");
const passport = require("passport");

const router = express.Router();

router.post("/register", createUserValidation, createUser);
router.get("/verify/:token", verifyUser);
router.post(
  "/login",
  loginUserValidation,
  passport.authenticate("local", {
    failureMessage: true, // Enable failure messages
  }),
  loginUser
);
router.get("/status", (req, res) => {
  return req.user ? res.json(req.user) : res.sendStatus(401)
});

router.post("/logout", (req, res) => {
  if (!req.user) return res.sendStatus(401);
  req.logout((err) => {
    if (err) return res.sendStatus(400);
    res.status(200).json({message: "Logout Successful"})
  })
})

module.exports = router;
