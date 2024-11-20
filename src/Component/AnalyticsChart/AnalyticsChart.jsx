import React from "react";
import "./AnalyticsChart.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const AnalyticsChart = () => {
  const data = {
    labels: [
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug (Current)",
    ],
    datasets: [
      {
        label: "Sessions",
        data: [220, 130, 140, 360, 110, 170, 200, 210, 260, 300, 170, 80],
        backgroundColor: [
          "rgba(20, 70, 123, 1)", // Sep
          "rgba(20, 70, 123, 1)", // Oct
          "rgba(20, 70, 123, 1)", // Nov
          "rgba(20, 70, 123, 1)", // Dec
          "rgba(20, 70, 123, 1)", // Jan
          "rgba(20, 70, 123, 1)", // Feb
          "rgba(20, 70, 123, 1)", // Mar
          "rgba(20, 70, 123, 1)", // Apr
          "rgba(20, 70, 123, 1)", // May
          "rgba(20, 70, 123, 1)", // Jun
          "rgba(20, 70, 123, 1)", // Jul
          "rgba(20, 70, 123, 0.52)", // Aug (Current)
        ],
        borderColor: "rgba(0, 0, 0, 0)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Past Year",
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // X-axis grid lines should be displayed
          color: "rgba(0, 0, 0, 0.1)", // Light color for grid lines
        },
        ticks: {
          callback: function (value, index, values) {
            if (window.innerWidth < 600) {
              return this.getLabelForValue(value); 
            }
            return this.getLabelForValue(value); 
          },
          maxRotation: window.innerWidth < 600 ? 45 : 0, 
        },
      },
      y: {
        grid: {
          display: true,
        },
        beginAtZero: true,
        max: 400,
      },
    },
  };
  return (
    <>
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
    </>
  );
};

export default AnalyticsChart;
