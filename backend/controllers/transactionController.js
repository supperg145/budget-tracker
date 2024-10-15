const Transaction = require("../models/Transaction");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");

// Helper function to get the user ID from the token
const getUserIdFromToken = (req) => {
  const token = req.cookies.userToken;
  if (!token) {
    return null;
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    return decoded.user;
  } catch (err) {
    console.error("Error decoding token:", err);
    return null;
  }
};

// Controller to add a new transaction
const addTransaction = async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req);
    console.log("User ID from token:", userId); // Log user ID
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    console.log("Request Body:", req.body); // Log request body

    // Create a new transaction
    const newTransaction = new Transaction({
      ...req.body,
      userId,
    });

    const savedTransaction = await newTransaction.save();
    console.log("Saved Transaction:", savedTransaction); // Log saved transaction

    // Update the user's transactions array
    await User.findByIdAndUpdate(
      userId,
      {
        $push: { transactions: savedTransaction._id },
      },
      { new: true }
    );

    res.status(201).json(savedTransaction);
  } catch (err) {
    console.error("Error details:", err); // Log error details
    res.status(500).json({ message: "Error creating transaction", err });
  }
};

// Controller to get all transactions for the logged-in user
const getTransactions = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    console.log(userId);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const transactions = await Transaction.find({ userId });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Error getting transactions", err });
  }
};

// Controller to delete a transaction
const deleteTransaction = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const deletedTransaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId,
    });

    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json(deletedTransaction);
  } catch (err) {
    res.status(500).json({ message: "Error deleting transaction", err });
  }
};

// Controller to update a transaction
const updateTransaction = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json(updatedTransaction);
  } catch (err) {
    res.status(500).json({ message: "Error updating transaction", err });
  }
};

module.exports = {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
};
