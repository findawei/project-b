import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Container,
  Button,
  Box,
  CardMedia,
  Paper,
  ListItemIcon,
  Typography,
} from "@material-ui/core/";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import HeadsetMicIcon from "@material-ui/icons/HeadsetMic";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
const SellerSection = () => {
  const useStyles = makeStyles((theme) => ({
    paperContainer: {
      width: "100%",
      // height: "60vh",
      backgroundColor: "#ECF0EC",
      backgroundSize: "cover",
      // display: "flex",
      // justifyContent: "center",
      // alignItems: "center",
      // textAlign: "center",
      // verticalAlign: "middle",
      paddingTop: theme.spacing(12),
      paddingBottom: theme.spacing(15),
    },
    text: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },

    card: {
      // color: "white",
      // border: 0,
      // borderColor: "white",
      // backgroundColor: "transparent",
      // padding: theme.spacing(2),
      margin: 10,
      // display: "flex",
      // flexDirection: "column",
      // justifyContent: "space-between",
    },
  }));

  const classes = useStyles();

  return (
    <Paper className={classes.paperContainer} square elevation={0}>
      <Container>
        <Grid
          container
          alignItems="stretch"
          justifyContent="space-around"
          spacing={2}
        >
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom align="center">
              <Box letterSpacing={1}>
                <b>Buy & sell watches easily</b>
              </Box>
            </Typography>
            <Typography
              className={classes.pos}
              color="textSecondary"
              align="center"
              variant="h6"
            >
              <Box>We focus on what really matters</Box>
            </Typography>
            <br />
          </Grid>
          <Grid item xs={12} sm={3} component={Card} className={classes.card}>
            {/* <Card variant="outlined"> */}
            <CardContent>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
              >
                <Grid item xs={3}>
                  <VerifiedUserIcon color="primary" fontSize="large" />
                </Grid>
              </Grid>
              <Typography
                variant="h5"
                component="h5"
                gutterBottom
                align="center"
              >
                Instant Trust
              </Typography>
              <Typography
                className={classes.pos}
                color="textSecondary"
                align="justify"
              >
                We import your feedback from other platforms so you can hit the
                ground running.
              </Typography>
            </CardContent>
            {/* </Card> */}
          </Grid>
          <Grid item xs={12} sm={3} component={Card} className={classes.card}>
            {/* <Card className={classes.card} variant="outlined"> */}
            <CardContent>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
              >
                <Grid item xs={3}>
                  <PlaylistAddCheckIcon color="primary" fontSize="large" />
                </Grid>
              </Grid>
              <Typography
                variant="h5"
                component="h5"
                gutterBottom
                align="center"
              >
                Clean & Clear
              </Typography>
              <Typography
                className={classes.pos}
                color="textSecondary"
                align="justify"
              >
                Know where the watch is located, accepted payment forms & where
                the seller will ship to.
              </Typography>
            </CardContent>
            {/* </Card> */}
          </Grid>
          <Grid item xs={12} sm={3} component={Card} className={classes.card}>
            {/* <Card className={classes.card} variant="outlined"> */}
            <CardContent>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
              >
                <Grid item xs={3}>
                  <HeadsetMicIcon color="primary" fontSize="large" />
                </Grid>
              </Grid>

              <Typography
                variant="h5"
                component="h5"
                gutterBottom
                align="center"
              >
                Customer Service
              </Typography>
              <Typography
                className={classes.pos}
                color="textSecondary"
                align="justify"
              >
                We pride ourselves on our customer service. We'll always get
                back to you within 1 business day.
              </Typography>
            </CardContent>
            {/* </Card> */}
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default SellerSection;
