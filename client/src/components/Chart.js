import React, { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import { connect } from "react-redux";
import { getItemById } from "../flux/actions/itemActions";
import "chartjs-adapter-date-fns";
import { fromUnixTime } from "date-fns";
import chartTrendline from "chartjs-plugin-trendline";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const LineChart = ({ getItemById, match, item, currentItem }) => {
  const classes = useStyles();

  const [chartData, setChartData] = useState("");

  useEffect(() => {
    if (currentItem && currentItem.chart) {
      var chartArray = Object.entries(currentItem.chart).map((e) => ({
        [e[0]]: e[1],
      }));
      let newMap;
      if (chartArray && chartArray.length > 0) {
        newMap = chartArray.map((e, index) => {
          let topThing = Object.values(chartArray)[index];
          let objectWanted = Object.values(topThing)[0];
          // console.log(objectWanted);
          var watch = {
            sellDate: Number(Object.keys(e)[0]),
            id: objectWanted.id,
            price_converted: objectWanted.price_converted,
            price_converted_formatted: objectWanted.price_converted_formatted,
            is_sold: objectWanted.is_sold,
            source: objectWanted.source,
          };
          return watch;
        });
      }
      if (newMap && newMap.length > 0) {
        setChartData({
          // labels: chartArray.map((watch) => Object.keys(watch)),
          datasets: [
            {
              label: "Price in USD",
              data: newMap
                .map((watch) => {
                  var newArray = {
                    y: Math.round(watch.price_converted) * 0.79,
                    x: fromUnixTime(watch.sellDate),
                  };
                  return newArray;
                })
                .slice(-100),
            },
          ],
        });
      }
    }
  }, [currentItem, item]);

  const options = {
    // parsing: {
    //   xAxisKey: "sellDate",
    //   yAxisKey: "price",
    // },
    scales: {
      x: {
        type: "time",
        // min: fromUnixTime(1609477200),
      },
    },
  };

  return (
    <div style={{ position: "relative", margin: "auto", width: "80vw" }}>
      <Scatter data={chartData} options={options} />
      <br />
    </div>
  );
};

const mapStateToProps = (state) => ({
  item: state.item,
  currentItem: state.item.currentItem,
});

export default connect(mapStateToProps, { getItemById })(LineChart);
