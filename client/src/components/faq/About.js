import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  List,
  ListItem,
  Container,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";

const About = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    body: {
      margin: 10,
    },
    image: {
      width: "100%",
      maxWidth: 500,
    },
    focused: {
      background: "CenterFocusStrongIcon",
    },
    title: {
      margin: theme.spacing(4, 0, 2),
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
            <div className={classes.body}>
              <Typography variant="h4">About us</Typography>
              <br />
              <Typography>
                Our story began with frustration: how come there isn't a place
                to buy/sell that ticks all the boxes? We saw what was working
                with the usual platforms (forums, auction houses, eBay etc). We
                also noticed areas in need of desperate improvement. Combining
                it all, we came up with NoWaitList.
                <br />
                <br />
                <Divider />
                <Typography variant="h5" className={classes.title}>
                  Founder
                </Typography>
                <Grid
                  container
                  alignItems="flex-start"
                  direction="row"
                  spacing={2}
                >
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Alex Benjamignan</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    Alex got into watches in 2013. Technical aspects of
                    watchmaking were very interesting to him. He got his hands
                    dirty restoring vintage seiko divers. He's journeyed to
                    Japan many times to hunt for watches.
                  </Grid>
                </Grid>
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default About;
