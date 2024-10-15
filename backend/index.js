const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Import routes
const transactionsRoute = require("./routes/transactions");
const userRoutes = require("./routes/userRoutes");

// Load environment variables
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser()); // Required for handling cookies

// Routes
app.use("/api/transactions", transactionsRoute);
app.use("/api/users", userRoutes); // Add user routes for registration, login, and logout

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Default route to check if the server is running
app.get("/", (req, res) => {
  res.send("Budget Tracker backend is running");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
