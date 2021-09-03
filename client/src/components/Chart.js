import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";
import { getItemById } from "../flux/actions/itemActions";

const LineChart = ({ getItemById, match, item, currentItem }) => {
  const [chartData, setChartData] = useState("");

  useEffect(() => {
    if (currentItem && currentItem.chart) {
      var chartArray = Object.entries(currentItem.chart).map((e) => ({
        [e[0]]: e[1],
      }));

      const newMap = chartArray.map((e, index) => {
        let topThing = Object.values(chartArray)[index];
        let objectWanted = Object.values(topThing)[0];
        // console.log(objectWanted);
        var watch = {
          sellDate: Number(Object.keys(e)[0]),
          id: objectWanted.id,
          price: objectWanted.price,
          display_price: objectWanted.display_price,
          sold: objectWanted.sold,
          source: objectWanted.source,
        };
        return watch;
      });

      if (newMap && newMap.length > 0) {
        setChartData({
          // labels: chartArray.map((watch) => Object.keys(watch)),
          datasets: [
            {
              label: "Price in USD",
              data: newMap.map((watch) => {
                var newArray = {
                  y: Math.round(watch.price) * 0.79,
                  x: Number(watch.sellDate),
                };
                return newArray;
              }),
            },
          ],
          // options: {},
        });
      }
    }
  }, [currentItem]);

  const options = {
    // parsing: {
    //   xAxisKey: "sellDate",
    //   yAxisKey: "price",
    // },
    scales: {
      x: {
        type: "time",
        time: {
          displayFormats: {
            quarter: "MMM YYYY",
          },
        },
      },
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

const mapStateToProps = (state) => ({
  item: state.item,
  currentItem: state.item.currentItem,
});

export default connect(mapStateToProps, { getItemById })(LineChart);
