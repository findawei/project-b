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
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
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
  paper: {
    // marginRight: theme.spacing(2),
  },
}));

const PurchaseHistory = ({ auth }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <Grid
          container
          // direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12} md={10} lg={8}>
            <br />
            <Typography variant="h4" className={classes.radio}>
              {auth && auth.user ? auth.user.name : "User loaded"}
            </Typography>

            <Typography className={classes.radio}>Purchase History</Typography>
            {/* <Button variant="outlined">
            Edit Profile
            </Button> */}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(PurchaseHistory);
