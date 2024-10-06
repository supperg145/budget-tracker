const Transaction = require("../models/Transaction");

// Controller to add a new transaction
const addTransaction = async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    const savedTransaction = await newTransaction.save();
    res.status(200).json(savedTransaction);
  } catch (err) {
    res.status(500).json({ message: "Error creating transaction", err });
  }
};

// Controller to get all transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Error getting transactions", err });
  }
};

// Controller to delete a transaction
const deleteTransaction = async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(
      req.params.id
    );
    res.status(200).json(deletedTransaction);
  } catch (err) {
    res.status(500).json({ message: "Error deleting transaction", err });
  }
};

// Controller to update a transaction
const updateTransaction = async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
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
