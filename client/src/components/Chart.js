import React, { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import { connect } from "react-redux";
import { getItemById } from "../flux/actions/itemActions";
import "chartjs-adapter-date-fns";
import { fromUnixTime } from "date-fns";
import chartTrendline from "chartjs-plugin-trendline";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";

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

  const [state, setState] = useState({
    show: "25",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

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
                  x: fromUnixTime(watch.sellDate),
                };
                return newArray;
              }),
              trendlineLinear: {
                style: "rgba(255,105,180, .8)",
                lineStyle: "dotted|solid",
                width: 2,
              },
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
        min: fromUnixTime(1609477200),
      },
    },
  };

  return (
    <div>
      <div className="header">
        <h1 className="title">Watch Data</h1>
      </div>

      <FormControl
        variant="outlined"
        size="small"
        className={classes.formControl}
      >
        <InputLabel htmlFor="outlined-age-native-simple">Show</InputLabel>
        <Select
          native
          value={state.show}
          onChange={handleChange}
          label="Last"
          inputProps={{
            name: "show",
            id: "outlined-age-native-simple",
          }}
        >
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={75}>75</option>
          <option value={100}>100</option>
        </Select>
      </FormControl>

      <Scatter
        data={chartData}
        options={options}
        // plugins={[chartTrendline]}
      />
      <br />
    </div>
  );
};

const mapStateToProps = (state) => ({
  item: state.item,
  currentItem: state.item.currentItem,
});

export default connect(mapStateToProps, { getItemById })(LineChart);
