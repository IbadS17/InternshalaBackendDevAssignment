const { body } = require("express-validator");

// User registration validation
const validateRegister = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name can only contain letters and spaces"),

  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "Password must contain at least one lowercase letter, one uppercase letter, and one number"
    ),

  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("Role must be either user or admin"),
];

// User login validation
const validateLogin = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),

  body("password").notEmpty().withMessage("Password is required"),
];

// Task creation validation
const validateTask = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Title is required and must not exceed 100 characters"),

  body("description")
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage("Description is required and must not exceed 500 characters"),

  body("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Status must be pending, in-progress, or completed"),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be low, medium, or high"),

  body("dueDate")
    .optional()
    .isISO8601()
    .toDate()
    .custom((value) => {
      if (value && value <= new Date()) {
        throw new Error("Due date must be in the future");
      }
      return true;
    }),

  body("assignedTo")
    .optional()
    .isMongoId()
    .withMessage("Assigned to must be a valid user ID"),
];

// Task update validation (same as create but all fields optional)
const validateTaskUpdate = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Title must not exceed 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage("Description must not exceed 500 characters"),

  body("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Status must be pending, in-progress, or completed"),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be low, medium, or high"),

  body("dueDate")
    .optional()
    .isISO8601()
    .toDate()
    .custom((value) => {
      if (value && value <= new Date()) {
        throw new Error("Due date must be in the future");
      }
      return true;
    }),

  body("assignedTo")
    .optional()
    .isMongoId()
    .withMessage("Assigned to must be a valid user ID"),
];

module.exports = {
  validateRegister,
  validateLogin,
  validateTask,
  validateTaskUpdate,
};
