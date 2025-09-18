const express = require("express");
const { getPreferences, updatePreferences } = require("../controllers/preferences.controller");
const { preferencesValidation } = require("../validators/preferences.validator");
const { validateRequest } = require("../middleware/error.middleware");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// Group validation middlewares
const preferencesMiddlewares = [
    authMiddleware,
    preferencesValidation,
    validateRequest
];

router.get("/", authMiddleware, getPreferences);
router.put("/", preferencesMiddlewares, updatePreferences);

module.exports = router;
