import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);

    //Fetch transactions from the backend when component mounts
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/transactions')
            .then((response) => {
                setTransactions(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <h3>Transaction History</h3>
            <ul>
                {transactions.map(transaction => (
                    <li key={transaction._id}>
                        <strong>{transaction.type.toUpperCase()}</strong>: ${transaction.amount} - {transaction.category}
                        <br />
                        <small>Description: {transaction.description}</small>
                        <br />
                        <small>Date: {new Date(transaction.date).toLocaleDateString()}</small>
                    </li>
                ))}
            </ul>
        </div>
        )
}

export default TransactionList