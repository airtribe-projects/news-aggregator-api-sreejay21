const express = require("express");
const { getPreferences, updatePreferences } = require("../controllers/preferences.controller");
const { preferencesValidation } = require("../validators/preferences.validator");
const { validateRequest } = require("../middleware/error.middleware");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/preferences", authMiddleware, getPreferences);
router.put("/preferences", authMiddleware, preferencesValidation, validateRequest, updatePreferences);

module.exports = router;
