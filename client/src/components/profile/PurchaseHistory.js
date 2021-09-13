import React from "react";
import { connect } from "react-redux";
import { format } from "date-fns";
import {
  Grid,
  Paper,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  InputLabel,
  Box,
  NativeSelect,
  Select,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContentText,
  Container,
  Link,
  Divider,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import { setCurrentItem } from "../../flux/actions/itemActions";
import { Link as RouterLink } from "react-router-dom";

import MyListings from "./MyListings";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { green } from "@material-ui/core/colors";
// import { Helmet } from "react-helmet";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    margin: 10,
  },
  media: {
    // maxHeight: 300,
    maxWidth: "100%",
  },
  card: {
    height: 170,
  },
  title: {
    color: "grey",
  },
  link: {
    color: "black",
    "&:hover": {
      color: "#000000",
      textDecoration: "none",
    },
  },
}));

const PurchaseHistory = ({ auth, item, setCurrentItem }) => {
  const classes = useStyles();

  const { items } = item;

  const setCurrent = (item) => {
    setCurrentItem(item);
  };

  // function ItemView() {
  //   setCurrent(item);
  // }

  return (
    <div className={classes.root}>
      <Container>
        <Grid
          container
          // direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <br />
            <Typography variant="h5">Purchase History</Typography>
            <br />
            <Divider />
            <Grid container direction="column">
              {items
                .filter((opt) => (opt.status = "completed"))
                .map((item) => (
                  <div item={item} key={item._id}>
                    {/* Item block */}
                    <Grid item xs={12} onClick={() => setCurrent(item)}>
                      <Link
                        className={classes.link}
                        component={RouterLink}
                        to={`/item/${item._id}`}
                      >
                        <Grid container direction="row" spacing={2}>
                          <Grid item xs={4}>
                            <Typography
                              variant="overline"
                              className={classes.title}
                            >
                              Date
                            </Typography>
                            <Typography variant="body2">
                              {format(new Date(item.endDate), "LLL dd, yyyy")}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography
                              variant="overline"
                              className={classes.title}
                            >
                              Order number
                            </Typography>

                            <Typography variant="body2">
                              {item._id.substring(0, 8).toUpperCase()}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography
                              variant="overline"
                              className={classes.title}
                            >
                              Sold by
                            </Typography>
                            <Typography variant="body2">{item.name}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Card>
                              <CardMedia
                                className={classes.card}
                                image={item.img[0] ? item.img[0].url : ""}
                                title={item.reference_number}
                              ></CardMedia>
                            </Card>
                          </Grid>
                          <Grid item xs={8} sm={4}>
                            <Typography>
                              {item.brand} {item.model} {item.reference_number}{" "}
                              - {item.year}
                            </Typography>
                          </Grid>
                          <Grid item xs={4} sm={4}>
                            <Typography
                              variant="overline"
                              className={classes.title}
                            >
                              Price
                            </Typography>
                            <Typography>
                              <b>
                                $
                                {item.bidHistory && item.bidHistory.length
                                  ? item.bidHistory[0].bid
                                  : 0}
                              </b>
                            </Typography>
                          </Grid>
                        </Grid>
                        <br />
                        <Divider light />
                      </Link>
                    </Grid>
                    {/* Item block ends */}
                  </div>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  item: state.item,
});

export default connect(mapStateToProps, { setCurrentItem })(PurchaseHistory);
