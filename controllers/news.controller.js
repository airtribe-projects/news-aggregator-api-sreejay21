const axios = require("axios");
const { getUserById } = require("../store/users.store");

const getNews = async (req, res) => {
  try {
    const user = getUserById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const preferences = user.preferences || [];
    if (preferences.length === 0) {
      return res.status(400).json({ message: "No preferences set. Please update preferences first." });
    }

    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: preferences.join(" OR "),
        apiKey: process.env.NEWS_API_KEY,
        language: "en",
        pageSize: 10,
      },
      timeout: 5000, 
    });

    res.status(200).json({ news: response.data.articles });
  } catch (error) {
    if (error.response) {
      console.error("NewsAPI error:", error.response.data);

      return res.status(error.response.status).json({
        message: "NewsAPI request failed",
        error: error.response.data,
      });
    } else if (error.request) {
      console.error("No response from NewsAPI:", error.request);

      return res.status(503).json({
        message: "No response from NewsAPI. Please try again later.",
      });
    } else {
      console.error("Unexpected error:", error.message);

      return res.status(500).json({
        message: "Unexpected error fetching news",
        error: error.message,
      });
    }
  }
};

module.exports = { getNews };
