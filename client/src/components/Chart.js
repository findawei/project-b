import React, { useEffect, useState } from "react";
import { Scatter, Chart } from "react-chartjs-2";
import { connect } from "react-redux";
import { getItemById } from "../flux/actions/itemActions";
import "chartjs-adapter-date-fns";
import { fromUnixTime } from "date-fns";
import chartTrendline from "chartjs-plugin-trendline";
import { makeStyles } from "@material-ui/core/styles";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

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
  const [alignment, setAlignment] = useState("forums");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

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
      let filteredArray;
      if (alignment !== "eBay") {
        filteredArray = newMap.filter((watch) => watch.source !== "eBay");
      } else {
        filteredArray = newMap.filter((watch) => watch.source === "eBay");
      }

      if (filteredArray && filteredArray.length > 0) {
        setChartData({
          datasets: [
            {
              label: "Sold",
              borderColor: "#f67019",
              backgroundColor: "#f67019",
              data: filteredArray
                .filter((item) => item.is_sold === true)
                .map((watch) => {
                  var newArray = {
                    y: Math.round(watch.price_converted) * 0.79,
                    x: fromUnixTime(watch.sellDate),
                  };
                  return newArray;
                })
                .slice(-50),
            },
            {
              label: "Unsold",
              borderColor: "#4dc9f6",
              backgroundColor: "#4dc9f6",

              data: filteredArray
                .filter((item) => item.is_sold === false)
                .map((watch) => {
                  var newArray = {
                    y: Math.round(watch.price_converted) * 0.79,
                    x: fromUnixTime(watch.sellDate),
                  };
                  return newArray;
                })
                .slice(-50),
            },
          ],
        });
      }
    }
  }, [currentItem, item, alignment]);

  const options = {
    scales: {
      x: {
        type: "time",
      },
      y: {
        ticks: {
          callback: function (label, index, labels) {
            return "$" + label;
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            var label = context.dataset.label || "";

            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div style={{ position: "relative", margin: "auto", width: "80vw" }}>
      <ToggleButtonGroup
        size="small"
        value={alignment}
        exclusive
        onChange={handleAlignment}
      >
        <ToggleButton value="forums">Forums</ToggleButton>
        <ToggleButton value="eBay">eBay</ToggleButton>
      </ToggleButtonGroup>
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
