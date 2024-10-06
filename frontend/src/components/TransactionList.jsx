import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Pagination from "react-bootstrap/Pagination";

const ITEMS_PER_PAGE = 10; // Maximum number of items to show per page

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch transactions from the backend when component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/transactions")
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Delete transaction
  const deleteTransaction = (id) => {
    axios
      .delete(`http://localhost:5000/api/transactions/${id}`)
      .then(() => {
        setTransactions(
          transactions.filter((transaction) => transaction._id !== id)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Calculate the current transactions to display
  const indexOfLastTransaction = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstTransaction = indexOfLastTransaction - ITEMS_PER_PAGE;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);

  // Create pagination items
  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <h3>Transaction History</h3>
      <ListGroup>
        {currentTransactions.map((transaction) => (
          <ListGroup.Item
            key={transaction._id}
            className="d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{transaction.type.toUpperCase()}</strong>: $
              {transaction.amount} - {transaction.category}
              <br />
              <small>Description: {transaction.description}</small>
              <br />
              <small>
                Date: {new Date(transaction.date).toLocaleDateString()}
              </small>
            </div>
            <div>
              <Button
                variant="danger"
                onClick={() => deleteTransaction(transaction._id)}
              >
                Delete
              </Button>
              <Button variant="secondary" className="ms-2">
                Edit
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Pagination className="justify-content-center mt-4">
        <Pagination.Prev
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {paginationItems}
        <Pagination.Next
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default TransactionList;
