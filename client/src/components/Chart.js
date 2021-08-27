import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getItemById } from "../flux/actions/itemActions";

const LineChart = ({ getItemById, match, item }) => {
  const [chartData, setChartData] = useState("");

  useEffect(() => {
    getItemById(match.params.id);

    setChartData({
      labels: item.chart.map((watch) => watch.id),
      datasets: [
        {
          label: "Price in USD",
          data: item.chart.map((watch) => watch.price),
          // backgroundColor: [
          //   "#ffbb11",
          //   "#ecf0f1",
          //   "#50AF95",
          //   "#f3ba2f",
          //   "#2a71d0",
          // ],
        },
      ],
    });
  }, []);

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      <div className="header">
        <h1 className="title">Line Chart</h1>
      </div>
      <Line data={chartData} options={options} />
      <br />
    </div>
  );
};

export default LineChart;
