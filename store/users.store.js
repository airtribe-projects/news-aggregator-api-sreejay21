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

// Add user
const addUser = (user) => {
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
const updateUserPreferences = (id, preferences) => {
  const user = getUserById(id);
  if (user) {
    user.preferences = preferences;
    return user;
  }
  return null;
};

module.exports = { users, addUser, getUserByEmail, getUserById, updateUserPreferences };
