const express = require("express");
const { getNews } = require("../controllers/news.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// Protected route
router.get("/", authMiddleware, getNews);

module.exports = router;
