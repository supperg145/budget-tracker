const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

//Add new transaction

router.post('/', async (req, res) => {
    try {
        const newTransaction = new Transaction(req.body);
        const savedTransaction = await newTransaction.save();
        res.status(200).json(savedTransaction);
    } catch (err) {
        res.status(500).json({ message : "Error creating transaction", err});
    }
});

//Get all transactions

router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ message : "Error getting transactions", err});
    }
})

module.exports = router