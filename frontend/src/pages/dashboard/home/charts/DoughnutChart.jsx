import { Chart, registerables } from "chart.js";
import { Doughnut } from "react-chartjs-2";
Chart.register(...registerables);

const DoughnutChart = () => {
  const data = {
    labels: ["Cardio", "Strength", "Core", "HIIT"],
    datasets: [
      {
        data: [20, 10, 10, 5],
        backgroundColor: ["#bc2c3e", "#0d0d0e", "#6f6f73", "#d4d1ca"],
        borderColor: "#ffffff",
        borderWidth: 4,
        hoverOffset: 6,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%",
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0d0d0e",
        titleFont: { family: "DM Sans", weight: "600" },
        bodyFont: { family: "DM Sans" },
        padding: 10,
        cornerRadius: 8,
      },
    },
  };
  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
