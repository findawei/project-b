import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Container,
  Button,
  Box,
  Paper,
  Typography,
} from "@material-ui/core/";
import { Link } from "react-router-dom";

import picture from "../images/5watches.png";

const Hero = () => {
  const useStyles = makeStyles((theme) => ({
    paperContainer: {
      width: "100%",
      height: "70vh",
      // backgroundImage: `url(${picture})`,
      // backgroundRepeat: "no-repeat",
      // backgroundPosition: "center center",
      // backgroundSize: "cover",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // textAlign: "center",
      verticalAlign: "middle",
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
      color: "#grey",
    },
    button: {
      backgroundColor: "#67A167",
      color: "#FFFFFF",
    },
    gridItem: {
      padding: theme.spacing(4),
    },
  }));

  const classes = useStyles();

  return (
    <Paper className={classes.paperContainer} square elevation={0}>
      <Container>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          // spacing={10}
        >
          <Grid item xs={12} sm={6}>
            <div className={classes.gridItem}>
              <Typography className={classes.pos} variant="h3">
                <Box variant="h3" letterSpacing={2}>
                  <b>Your Watch</b>
                </Box>
              </Typography>
              <Typography className={classes.pos} variant="h5">
                <Box variant="h5" letterSpacing={1}>
                  Sold in 7 days or it’s FREE
                </Box>
              </Typography>
              <Button
                variant="contained"
                className={classes.button}
                size="large"
                m={1}
              >
                <Link
                  className={classes.link}
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={"/sell-a-watch"}
                >
                  Find out more
                </Link>
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={classes.gridItem}>
              <img src={picture} width="100%"></img>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default Hero;
