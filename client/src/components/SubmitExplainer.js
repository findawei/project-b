import React, { Component, useState, useEffect } from "react";
import {
  Divider,
  Typography,
  Container,
  Card,
  CardActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CardContent,
  Grid,
  Button,
  Box,
  Paper,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/styles";
import { HashLink as Link } from "react-router-hash-link";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import MoneyOutlinedIcon from "@material-ui/icons/MoneyOutlined";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import { connect } from "react-redux";
import LoginModal from "./auth/LoginModal";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import picture from "../images/dive-watches-dark-blur.png";
import CenterFocusStrongIcon from "@material-ui/icons/CenterFocusStrong";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import TimerIcon from "@material-ui/icons/Timer";
import PublishIcon from "@material-ui/icons/Publish";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  body: {
    margin: 10,
  },
  card: {
    // maxWidth: 250,
    // height: 170,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  textTitle: {
    color: "white",
  },
  text: {
    color: "green",
    align: "right",
  },
  background: {
    maxWidth: "100%",
    // maxHeight: 200,
  },
  paperContainer: {
    width: "100%",
    // height: "50%",
    backgroundImage: `url(${picture})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
  },
  focus: {
    color: "orange",
  },
  fees: {
    color: "green",
  },
  timer: {
    color: "purple",
  },
  publish: {
    color: "navy",
  },
  badge: {
    color: "gold",
  },
}));

const steps = getSteps();
function getSteps() {
  return [
    "Submit your watch",
    "Review and approve",
    "Auction goes live",
    "Conclude the transaction",
  ];
}

const SubmitExplainer = ({ auth }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeStep, setActiveStep] = useState(0, 0);

  const classes = useStyles();

  const passInButton = (
    <Button type="button" variant="contained" color="primary">
      Submit Your Watch
    </Button>
  );

  return (
    <div>
      <Paper className={classes.paperContainer} square elevation={0}>
        <br />
        <br />
        <br />
        <br />
        <Typography variant="h3" align="center" className={classes.textTitle}>
          NoWaitList
        </Typography>
        <Typography variant="h5" align="center" className={classes.textTitle}>
          Your watch sold in 7 days or it’s FREE
        </Typography>
        <br />
        <br />
        <br />
        <br />
      </Paper>

      <div className={classes.root}>
        <Container>
          <Grid
            container
            // direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12} md={10}>
              <br />
              <Typography variant="h4" align="center">
                <b>Why sell with us?</b>
              </Typography>
              <br />
              <List>
                <Grid
                  container
                  alignItems="flex-start"
                  direction="row"
                  spacing={2}
                >
                  <Grid item xs={12} sm={6}>
                    <ListItem alignItems="flex-start">
                      <ListItemIcon className={classes.focus}>
                        <CenterFocusStrongIcon fontSize="large" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Focused"
                        secondary="Sports & tool watches excites us the most."
                      />
                    </ListItem>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <ListItem alignItems="flex-start">
                      <ListItemIcon className={classes.fees}>
                        <AttachMoneyIcon fontSize="large" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Value"
                        secondary="Get 100% of the sale price. Pay the listing fee ONLY if your watch sells."
                      />
                    </ListItem>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <ListItem alignItems="flex-start">
                      <ListItemIcon className={classes.timer}>
                        <TimerIcon fontSize="large" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Sold in 7 days"
                        secondary="We move fast. After you submit your watch, we aim to auction it off within a week."
                      />
                    </ListItem>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <ListItem alignItems="flex-start">
                      <ListItemIcon className={classes.badge}>
                        <VerifiedUserIcon fontSize="large" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Clear & Concise"
                        secondary="Simple auctions that tell you exactly what you need to know."
                      />
                    </ListItem>
                  </Grid>
                </Grid>
              </List>
              <br />
              <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={6} sm={4}>
                  <Card className={classes.card} variant="outlined">
                    <CardContent>
                      <Grid container>
                        <Typography variant="h3" className={classes.text}>
                          <b>$49</b>
                        </Typography>
                      </Grid>
                      <br />
                      <Typography variant="h6">
                        No reserve listing
                        <br />
                        Social media coverage
                        <br />
                        Copywriting
                        <br />
                        Photo coaching
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Card className={classes.card} variant="outlined">
                    <CardContent>
                      <Grid container>
                        <Typography variant="h3" className={classes.text}>
                          <b>$89</b>
                        </Typography>
                      </Grid>
                      <br />
                      <Typography variant="h6">
                        <b>Reserve listing</b>
                        <br />
                        Social media coverage
                        <br />
                        Copywriting
                        <br />
                        Photo coaching
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <br />
              <br />
              <Typography variant="h4" align="center">
                <b>How it works</b>
              </Typography>
              <br />
              <Stepper alternativeLabel activeStep={activeStep}>
                {steps.map((label) => (
                  <Step key={label} active={true}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <br />
              {auth && auth.isAuthenticated ? (
                <div>
                  <Link
                    className={classes.link}
                    style={{ textDecoration: "none" }}
                    to={"/submit"}
                  >
                    <Box textAlign="center">
                      <Button variant="contained" color="primary">
                        Submit your Watch
                      </Button>
                    </Box>
                  </Link>
                </div>
              ) : (
                <div>
                  <Box textAlign="center">
                    <LoginModal passInButton={passInButton} />
                  </Box>
                </div>
              )}
              <br />

              <Typography align="center" variant="subtitle2">
                Takes less than 5 minutes & it's FREE
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(SubmitExplainer);
