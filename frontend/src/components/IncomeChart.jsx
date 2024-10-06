import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const IncomeChart = () => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/transactions');
                const transactions = response.data.filter(transaction => transaction.type === 'income');

                const incomeSources = {};
                transactions.forEach(transaction => {
                    incomeSources[transaction.category] = (incomeSources[transaction.category] || 0) + transaction.amount;
                });

                setChartData({
                    labels: Object.keys(incomeSources),
                    datasets: [{
                        data: Object.values(incomeSources),
                        backgroundColor: ['#4CAF50', '#FFCE56', '#36A2EB'], // Add more colors as needed
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
            <h3>Income Sources</h3>
            {chartData.labels ? (
                <Pie data={chartData} />
            ) : (
                <p>Loading chart data...</p>
            )}
        </div>
    );
};

export default IncomeChart;
