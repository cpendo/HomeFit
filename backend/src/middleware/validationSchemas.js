const { body, validationResult } = require("express-validator");

const createUserValidation = [
  body("first_name")
    .isString()
    .withMessage("First name must be a string!")
    .notEmpty()
    .withMessage("First name cannot be empty")
    .isLength({ min: 4, max: 32 })
    .withMessage(
      "First name must be at least 4 characters with a max of 32 characters"
    ),

  body("last_name")
    .isString()
    .withMessage("Last name must be a string!")
    .notEmpty()
    .withMessage("Last name cannot be empty")
    .isLength({ min: 4, max: 32 })
    .withMessage(
      "Last name must be at least 4 characters with a max of 32 characters"
    ),

  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Invalid format!"),

  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8, max: 32 })
    .withMessage(
      "Password must be at least 8 characters with a max of 32 characters"
    ),

  body("role").isIn("admin", "member").withMessage("Invalid role"),

  // Middleware to handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: errors.array() });
    }
    next();
  },
];

const loginUserValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Invalid format!"),

  body("password").notEmpty().withMessage("Password cannot be empty"),

  // Middleware to handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: errors.array() });
    }
    next();
  },
];

const forgotPasswordValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Invalid format!"),
  // Middleware to handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: errors.array() });
    }
    next();
  },
];

const resetPasswordValidation = [
  body("token").notEmpty().withMessage("Token is required"),

  body("newPassword")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  body("confirmPassword")
    .notEmpty()
    .withMessage("Please confirm your password")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  // Handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: errors.array() });
    }
    next();
  },
];

const changePasswordValidation = [
  body("current_password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8, max: 32 })
    .withMessage(
      "Password must be at least 8 characters with a max of 32 characters"
    ),

  body("new_password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8, max: 32 })
    .withMessage(
      "Password must be at least 8 characters with a max of 32 characters"
    ),

  body("confirm_password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .custom((value, { req }) => value === req.body.new_password)
    .withMessage("Confirm password must match"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  createUserValidation,
  loginUserValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  changePasswordValidation,
};
