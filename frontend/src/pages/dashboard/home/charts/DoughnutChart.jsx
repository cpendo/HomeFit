import { Chart, registerables } from "chart.js";
import { Doughnut } from "react-chartjs-2";
Chart.register(...registerables);

const DoughnutChart = () => {
  const data = {
    labels: ["Cardio", "Strength", "Core", "HIIT"],
    datasets: [
      {
        data: [5, 5, 20, 10],
        backgroundColor: ["#fff", "#000", "#a4161a", "#6b7383"],
        borderWidth: 0,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
