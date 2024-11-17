import React from 'react';
import { Bar } from 'react-chartjs-2';

const Chart = ({ data }) => {
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: 'Sample Data',
                data: data.values,
                backgroundColor: 'rgba(75,192,192,0.4)',
            },
        ],
    };

    return <Bar data={chartData} />;
};

export default Chart;
