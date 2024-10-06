import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import "./ExpenseIncomeChart.scss";

// Register the components you are going to use
Chart.register(ArcElement, Tooltip, Legend);

const ExpenseIncomeChart = () => {
  const [chartData, setChartData] = useState({});

  // Fetch transactions from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/transactions"
        );
        const transactions = response.data;

        const income = transactions
          .filter((transaction) => transaction.type === "income")
          .reduce((acc, curr) => acc + curr.amount, 0);

        const expenses = transactions
          .filter((transaction) => transaction.type === "expense")
          .reduce((acc, curr) => acc + curr.amount, 0);

        setChartData({
          labels: ["Income", "Expenses"],
          datasets: [
            {
              data: [income, expenses],
              backgroundColor: ["#4CAF50", "#F44336"],
              hoverBackgroundColor: ["#45a049", "#e53935"],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="chart-container">
      <h3>Income vs Expenses</h3>
      <div className="chart">
        {chartData.labels ? (
          <Pie data={chartData} />
        ) : (
          <p>Loading chart data...</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseIncomeChart;
