const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const transactionsRoute = require("./routes/transactions");

dotenv.config();

const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use("/api/transactions", transactionsRoute);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Budget Tracked backend is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
