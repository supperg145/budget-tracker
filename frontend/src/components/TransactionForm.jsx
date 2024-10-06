import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = () => {
    const [type, setType] = useState('income');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const newTransaction = {
            type,
            amount: Number(amount),
            category,
            description
        };
        axios
            .post('http://localhost:5000/api/transactions', newTransaction)
            .then(() => {
                setType('income');
                setAmount('');
                setCategory('');
                setDescription('');
                console.log('Transaction added');
            })
            .catch((error) => {
                console.log(error);
            });
        };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Type:</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>
            <div>
                <label>Amount:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <div>
                <label>Category:</label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </div>
            <div>
                <label>Description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button type="submit">Add Transaction</button>
        </form>
    );
};

export default TransactionForm;