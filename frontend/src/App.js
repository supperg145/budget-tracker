import "./App.scss";
import React, { useState } from "react";
import TransactionList from "./components/TransactionList";
import TransactionForm from "./components/TransactionForm";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Header";
import HomePage from "./pages/HomePage";
import ChartPage from "./pages/ChartPage";

function App() {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/transactions"
          element={<TransactionList transactions={transactions} />}
        />
        <Route
          path="/transactions/new"
          element={<TransactionForm addTransaction={addTransaction} />}
        />
        <Route
          path="/transactions/edit/:id"
          element={<TransactionForm addTransaction={addTransaction} />}
        />
        <Route
          path="/chart"
          element={<ChartPage transactions={transactions} />}
        />
      </Routes>
    </div>
  );
}

export default App;
