const express = require("express");
const { signup, login } = require("../controllers/auth.controller");
const { registerValidation, loginValidation } = require("../validators/auth.validator");
const { validateRequest } = require("../middleware/error.middleware");


const router = express.Router();

router.post("/signup", registerValidation, validateRequest, signup);
router.post("/login", loginValidation, validateRequest, login);

module.exports = router;
