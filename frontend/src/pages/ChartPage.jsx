import React, { useState } from "react";
import "./ChartPage.scss";
import ExpenseIncomeChart from "../components/ExpenseIncomeChart";
import Button from "react-bootstrap/Button";
import IncomeChart from "../components/IncomeChart"; // Your IncomeChart component
import ExpenseChart from "../components/ExpenseChart"; // Your ExpenseChart component

const ChartPage = () => {
  const [activeChart, setActiveChart] = useState("expenseIncome"); // Default to showing ExpenseIncomeChart

  const handleToggle = (chartType) => {
    setActiveChart(chartType); // Set the active chart based on user selection
  };

  return (
    <div className="chart">
      <div className="buttons">
        <Button variant="secondary" active={activeChart === "expenseIncome"} onClick={() => handleToggle("expenseIncome")}>
          Show Expense/Income Chart
        </Button>
        <Button variant="secondary" active={activeChart === "income"} onClick={() => handleToggle("income")}>
          Show Income Chart
        </Button>
        <Button variant="secondary" active={activeChart === "expense"} onClick={() => handleToggle("expense")}>
          Show Expense Chart
        </Button>
      </div>
      <div className="chart-container">
        {activeChart === "expenseIncome" && <ExpenseIncomeChart />}
        {activeChart === "income" && <IncomeChart />}
        {activeChart === "expense" && <ExpenseChart />}
      </div>
    </div>
  );
};

export default ChartPage;
