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

    // Call NewsAPI
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: preferences.join(" OR "), 
        apiKey: process.env.NEWS_API_KEY,
        language: "en",
        pageSize: 10,
      },
    });

    res.status(200).json({ news: response.data.articles });
  } catch (error) {
    console.error("Error fetching news:", error.message);

    res.status(500).json({
      message: "Failed to fetch news",
      error: error.response?.data || error.message,
    });
  }
};

module.exports = { getNews };
