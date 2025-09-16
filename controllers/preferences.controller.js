const { getUserById, updateUserPreferences } = require("../store/users.store");

const getPreferences = (req, res) => {
  const user = getUserById(req.user.id);

  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json({ preferences: Array.isArray(user.preferences) ? user.preferences : [] });
};

const updatePreferences = (req, res) => {
  const { preferences } = req.body;

  if (!Array.isArray(preferences)) {
    return res.status(400).json({ message: "Preferences must be an array" });
  }

  const user = updateUserPreferences(req.user.id, preferences);

  if (!user) return res.status(404).json({ message: "User not found" });


  res.status(200).json({ preferences: Array.isArray(user.preferences) ? user.preferences : [] });
};

module.exports = { getPreferences, updatePreferences };

