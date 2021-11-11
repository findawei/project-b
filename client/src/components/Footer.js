import React, { Component } from "react";
import {
  Divider,
  Typography,
  Paper,
  Container,
  Toolbar,
} from "@material-ui/core/";
import Grid from "@material-ui/core/grid";
import { makeStyles } from "@material-ui/styles";
import InstagramIcon from "@material-ui/icons/Instagram";
// import { Link as RouterLink} from 'react-router-dom';
import { HashLink as Link } from "react-router-hash-link";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // marginTop: 30,
    backgroundColor: "#d6d1bc",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <br />
      <Container>
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="space-around"
          alignItems="flex-start"
        >
          <Grid item xs={4}>
            <Typography variant="overline">How To</Typography>
            <Typography variant="subtitle2">
              <Link
                className={classes.link}
                style={{ textDecoration: "none", color: "inherit" }}
                to={"/faq#buying"}
              >
                Buy a Watch
              </Link>
            </Typography>
            <Typography variant="subtitle2">
              <Link
                className={classes.link}
                style={{ textDecoration: "none", color: "inherit" }}
                to={"/faq#selling"}
              >
                Sell a Watch
              </Link>
            </Typography>
            <Typography variant="subtitle2">
              <Link
                className={classes.link}
                style={{ textDecoration: "none", color: "inherit" }}
                to={"/faq"}
              >
                Completing a Sale
              </Link>
            </Typography>
            <Typography variant="subtitle2">
              <Link
                className={classes.link}
                style={{ textDecoration: "none", color: "inherit" }}
                to={"/faq#buyfaq"}
              >
                FAQ
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="overline">For Sellers</Typography>
            <Typography variant="subtitle2">
              <Link
                className={classes.link}
                style={{ textDecoration: "none", color: "inherit" }}
                to={"/sell-a-watch"}
              >
                Sell your Watch
              </Link>
            </Typography>
            {/* <Typography variant="subtitle2">Photography Guide</Typography> */}
          </Grid>
          <Grid item xs={4}>
            <Typography variant="overline">Help</Typography>
            <Typography variant="subtitle2">
              <a
                style={{ textDecoration: "none", color: "inherit" }}
                href={
                  "mailto:support@nowaitlist.co?body=I%20need%20help%20with%3A"
                }
              >
                Support
              </a>
            </Typography>
            <Typography variant="subtitle2">
              <Link
                className={classes.link}
                style={{ textDecoration: "none", color: "inherit" }}
                to={"/about"}
              >
                About
              </Link>
            </Typography>
            <a
              style={{ textDecoration: "none", color: "inherit" }}
              href="https://www.instagram.com/nowaitlist.co"
              target="_blank"
            >
              <InstagramIcon />
            </a>
          </Grid>
        </Grid>
        <br />
        <Divider />
        <br />
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="inherit">
              © {new Date().getFullYear()} NoWaitList™. All Rights Reserved.
              <br />
              Made with ❤️ from Montreal
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="inherit" align="right">
              <Link
                className={classes.link}
                style={{ textDecoration: "none", color: "inherit" }}
                to={"/terms-of-use"}
              >
                Terms of Use
              </Link>
              &nbsp;-&nbsp;
              <Link
                className={classes.link}
                style={{ textDecoration: "none", color: "inherit" }}
                to={"/privacy-policy"}
              >
                Privacy Policy
              </Link>
            </Typography>
          </Grid>
        </Grid>
        <br />
      </Container>
    </div>
  );
}
