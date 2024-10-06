import './App.css';
import React, { useState } from "react";
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import { Route, Routes} from 'react-router-dom';
import Navbar from './components/NavBar';
import HomePage from './pages/HomePage';

function App() {

  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  }

  return (
  
  <div className="App">
    <h1>Budget Tracker</h1>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/transactions" element={<TransactionList transactions={transactions} />} />
      <Route path="/transactions/new" element={<TransactionForm addTransaction={addTransaction} />} />
    </Routes>
  </div>
  )
}

export default App;