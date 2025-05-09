import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
Chart.register(...registerables);

const BarChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [50, 70, 65, 80, 90, 40, 60], // Example data, replace with actual values
        backgroundColor: "#a4161a", // Bar color
        barThickness: 50,
        borderRadius: 20,
      },
    ],
  };
  const options = {
    responsive: true,
    // maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 100,
        border: {
          display: false,
          color: "transparent",
        },
        grid: { color: "#808080", drawTicks: false },
        ticks: {
          stepSize: 20, // Set the interval between ticks to 25%
          callback: function (value) {
            return value + "%";
          },
          font: {
            family: "Lexend Deca",
            size: 14,
            weight: "bold",
          },
        },
      },
      x: {
        grid: { display: false },
        ticks: {
          font: {
            family: "Lexend Deca",
            size: 14,
            weight: "bold",
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw}%`, // Show % in tooltips
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
