const createUserValidationSchema = {
  first_name: {
    isLength: {
      options: {
        min: 4,
        max: 32,
      },
      errorMessage:
        "First name must be atleast 4 characters with a max of 32 characters",
    },
    notEmpty: {
      errorMessage: "First name cannot be empty",
    },
    isString: {
      errorMessage: "First name must be a string!",
    },
  },
  last_name: {
    isLength: {
      options: {
        min: 4,
        max: 32,
      },
      errorMessage:
        "Last name must be atleast 4 characters with a max of 32 characters",
    },
    notEmpty: {
      errorMessage: "Last name cannot be empty",
    },
    isString: {
      errorMessage: "Last name must be a string!",
    },
  },
  email: {
    notEmpty: {
      errorMessage: "Email cannot be empty",
    },
    isEmail: {
      errorMessage: "Invalid format!",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
    isLength: {
      options: {
        min: 8,
        max: 32,
      },
      errorMessage:
        "Password must be atleast 8 characters with a max of 32 characters",
    },
  },
  role: {
    isIn: {
      options: ["admin", "member"],
      errorMessage: "Invalid role",
    },
  },
};

module.exports = {createUserValidationSchema};
