// store/users.store.js
const users = [
  {
    id: "123",
    email: "test@example.com",
    preferences: ["movies", "comics"],
    read: [],
    favorites: []
  }
];

// Validate user object
const isValidUser = (user) => {
  return (
    user &&
    typeof user.id === "string" &&
    typeof user.email === "string" &&
    Array.isArray(user.preferences) &&
    Array.isArray(user.read) &&
    Array.isArray(user.favorites)
  );
};

// Add user with validation
const addUser = (user) => {
  if (!isValidUser(user)) {
    throw new Error("Invalid user object. Required fields: id, email, preferences, read, favorites.");
  }
  users.push(user);
};

// Find user by email
const getUserByEmail = (email) => {
  return users.find((u) => u.email === email);
};

// Find user by id
const getUserById = (id) => {
  return users.find((u) => u.id === id);
};

// Update user preferences
const KNOWN_CATEGORIES = ["movies", "comics", "sports", "technology", "music"];

const updateUserPreferences = (id, preferences) => {
  if (!Array.isArray(preferences)) {
    throw new Error("Preferences must be an array.");
  }
  // Validate that all preferences are known categories
  const invalid = preferences.filter(p => !KNOWN_CATEGORIES.includes(p));
  if (invalid.length > 0) {
    throw new Error(`Invalid preferences: ${invalid.join(", ")}. Allowed: ${KNOWN_CATEGORIES.join(", ")}`);
  }
  const user = getUserById(id);
  if (user) {
    user.preferences = preferences;
    return user;
  }
  return null;
};

module.exports = { users, addUser, getUserByEmail, getUserById, updateUserPreferences };
