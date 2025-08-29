const jwt = require("jsonwebtoken");
const { addUser, getUserByEmail } = require("../store/users.store");

const signup = (req, res) => {
  const { name, email, password, preferences } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const existingUser = getUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = {
    id: Date.now().toString(), // ✅ unique ID
    name,
    email,
    password,
    preferences: preferences || [],
    read: [],
    favorites: []
  };

  addUser(newUser);

  res.status(200).json({ message: "User created successfully" });
};

const login = (req, res) => {
  const { email, password } = req.body;

  const user = getUserByEmail(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email }, // ✅ include id in JWT
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({ token });
};

module.exports = { signup, login };
