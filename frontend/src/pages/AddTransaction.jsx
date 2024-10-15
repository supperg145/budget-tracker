import TransactionForm from "../components/TransactionForm";
import React from "react";
import "./AddTransaction.scss";

const AddTransaction = () => {
  return (
    <div className="add-transaction">
      <h1>Add a new Transaction</h1>
      <hr />
      <div className="add-transaction-form">
        <TransactionForm />
      </div>
    </div>
  );
};

export default AddTransaction;
