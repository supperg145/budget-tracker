import "./App.scss";
import React, { useState } from "react";
import TransactionList from "./components/TransactionList";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChartPage from "./pages/ChartPage";
import AddTransaction from "./pages/AddTransaction";

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
          element={<AddTransaction addTransaction={addTransaction} />}
        />
        <Route
          path="/transactions/edit/:id"
          element={<AddTransaction addTransaction={addTransaction} />}
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
