const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register User
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  // Validation
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating user", err });
  }
};

// Login User
const loginUser = async (req, res) => {
  console.log("Login request received", req.body);
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Find user by email
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Compare password
    const correctPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!correctPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate JWT token
    const userToken = jwt.sign(
      { user: existingUser._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h", // Set token expiration time
      }
    );

    // Send token in a cookie and respond with success message
    res
      .cookie("userToken", userToken, {
        httpOnly: true, // Helps prevent XSS attacks by making the cookie inaccessible to JavaScript
        secure: process.env.NODE_ENV === "production", // Only send cookies over HTTPS in production
        maxAge: 3600000, // Cookie expires in 1 hour
      })
      .status(200)
      .json({ message: "User logged in successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging in", err });
  }
};

// Logout User
const logoutUser = async (req, res) => {
  res.clearCookie("userToken");
  res.status(200).json({ message: "User logged out successfully" });
};

module.exports = { registerUser, loginUser, logoutUser };
