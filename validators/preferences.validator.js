const { body } = require("express-validator");

const preferencesValidation = [
  body("preferences")
    .isArray().withMessage("Preferences must be an array")
    .custom((arr) => arr.every((p) => typeof p === "string"))
    .withMessage("Preferences must be an array of strings"),
];

module.exports = { preferencesValidation };
