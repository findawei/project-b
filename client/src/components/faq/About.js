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
import portait from "../../images/alex-portait.jpg";
import CenterFocusStrongIcon from "@material-ui/icons/CenterFocusStrong";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import TimerIcon from "@material-ui/icons/Timer";
import PublishIcon from "@material-ui/icons/Publish";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

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
                {/* <Typography variant="h5" className={classes.title}>
                  Why No Wait List?
                </Typography>
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
                          secondary="Buyer’s fee of 5%, capped at $5,000. Seller’s fee of $49 for a no-reserve auction, $89 with a reserve auction. Pay the listing fee ONLY if your watch sells."
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
                          secondary="Simplified auctions that tell you exactly what you need to know."
                        />
                      </ListItem>
                    </Grid>
                  </Grid>
                </List> */}
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
                  {/* <Grid item xs={12} sm={6}>
            <img src={portait} alt="portait" className={classes.image} />
          </Grid> */}
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
