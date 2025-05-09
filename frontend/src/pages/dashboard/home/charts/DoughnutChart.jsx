import { Chart, registerables } from "chart.js";
import { Doughnut } from "react-chartjs-2";
Chart.register(...registerables);

const DoughnutChart = () => {
  const data = {
    labels: ["Cardio", "Strength", "Core"],
    datasets: [
      {
        data: [5, 5, 20],
        backgroundColor: ["#fff", "#000", "#a4161a"],
        borderWidth: 0,
        hoverOffset: 4,
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
