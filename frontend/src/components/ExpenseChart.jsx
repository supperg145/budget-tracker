import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const ExpenseChart = () => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/transactions');
                const transactions = response.data.filter(transaction => transaction.type === 'expense');

                const expenseCategories = {};
                transactions.forEach(transaction => {
                    expenseCategories[transaction.category] = (expenseCategories[transaction.category] || 0) + transaction.amount;
                });

                setChartData({
                    labels: Object.keys(expenseCategories),
                    datasets: [{
                        data: Object.values(expenseCategories),
                        backgroundColor: ['#F44336', '#FFCE56', '#36A2EB'], // Add more colors as needed
                    }],
                });
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h3>Expense Categories</h3>
            {chartData.labels ? (
                <Pie data={chartData} />
            ) : (
                <p>Loading chart data...</p>
            )}
        </div>
    );
};

export default ExpenseChart;
