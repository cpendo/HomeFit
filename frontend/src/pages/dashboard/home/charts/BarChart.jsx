import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
Chart.register(...registerables);

const BarChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [50, 70, 65, 80, 90, 40, 60],
        backgroundColor: "#bc2c3e",
        hoverBackgroundColor: "#8d1c2a",
        borderRadius: 8,
        borderSkipped: false,
        barPercentage: 0.55,
        categoryPercentage: 0.8,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 100,
        border: { display: false },
        grid: { color: "#e6e3dc", drawTicks: false },
        ticks: {
          stepSize: 20,
          color: "#6f6f73",
          callback: (value) => `${value}%`,
          font: { family: "DM Sans", size: 12 },
        },
      },
      x: {
        border: { display: false },
        grid: { display: false },
        ticks: {
          color: "#0d0d0e",
          font: { family: "DM Sans", size: 13, weight: "500" },
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0d0d0e",
        titleFont: { family: "DM Sans", weight: "600" },
        bodyFont: { family: "DM Sans" },
        padding: 10,
        cornerRadius: 8,
        callbacks: { label: (item) => `${item.raw}%` },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
