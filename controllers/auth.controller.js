const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); 
const { addUser, getUserByEmail } = require("../store/users.store");

const signup = async (req, res) => {
  const { name, email, password, preferences } = req.body;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({ message: "Name is required and must be a valid string" });
  }

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const existingUser = getUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }


  const hashedPassword = await bcrypt.hash(password, 10); 

  const newUser = {
    id: Date.now().toString(), 
    name: name.trim(),
    email,
    password: hashedPassword, 
    preferences: preferences || [],
    read: [],
    favorites: []
  };

  addUser(newUser);

  res.status(200).json({ message: "User created successfully" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({ token });
};

module.exports = { signup, login };
