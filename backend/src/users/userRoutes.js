const express = require("express");
const { checkSchema } = require("express-validator");
const { createUser, loginUser, verifyUser } = require("./userController");
const {
  createUserValidationSchema,
} = require("../middleware/validationSchemas");

const router = express.Router();

router.post("/register", checkSchema(createUserValidationSchema), createUser);
router.get("/verify/:token", verifyUser);
router.post("/", loginUser);

module.exports = router;
