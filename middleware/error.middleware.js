const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation error",
      errors: errors.array().map(err => ({
        field: err.param,
        msg: err.msg
      }))
    });
  }
  next();
};

// Generic error handler (for unexpected errors)
const errorHandler = (err, req, res, next) => {
  console.error("Unexpected error:", err);
  res.status(500).json({ message: "Internal server error" });
};

module.exports = { validateRequest, errorHandler };
