import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  List,
  ListItem,
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
    // root: {
    //     flexGrow: 1,
    //     margin: 20,
    // },
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
    <div>
      <Typography variant="h4">About us</Typography>
      <br />
      <Typography>
        <b>Our story began with frustration.</b> All the selling outlets had
        their issues. As a buyer on forums, you have to research the seller,
        setup your account etc. Ebay, known for it's high fees. Chrono24, where
        people ask top dollar for lesser examples. Auction houses that require
        consignment & very high fees.
        <br />
        <br />
        After a couple of years of experiencing these platforms,{" "}
        <b>change was needed & we were going to be part of it.</b> Gathering a
        team of developers, markets & most important of all, watch enthusiasts
        we began work on NoWaitList. At NoWaitList,{" "}
        <u>
          <b>we focus on you.</b>
        </u>{" "}
        There's nothing more important.
        <br />
        <br />
        <b>Our goal:</b> be the only place you'd consider auctioning your watch.
        <br /> <br />
        <Divider />
        {/* <Typography variant="h6" className={classes.title}>
          A bit more on Alex Benjamignan
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <img src={portait} alt="portait" className={classes.image} />
          </Grid>
          <Grid item xs={12} sm={6}>
            Watches have provided him with so much. A means to share a passion.
            Learning about technology and innovation. Creating strong
            relationships with fellow enthusiasts & collectors. This and the
            reasons above are why NoWaitList was born.
          </Grid>
        </Grid> */}
        <Typography variant="h6" className={classes.title}>
          Why No Wait List?
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon className={classes.focus}>
              <CenterFocusStrongIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText
              primary="Focused"
              secondary="Sports & tool watches are what excites us the most."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon className={classes.fees}>
              <AttachMoneyIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText
              primary="Value"
              secondary="The buyer’s fee is 5%, with a maximum of $5,000. Our seller’s fee range from $49 for a no-reserve auction to $89 for a seller with a reserve auction. This gets you social media coverage, copywriting of your listing & photo coaching."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon className={classes.timer}>
              <TimerIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText
              primary="Sold in 7 days"
              secondary="We move fast. After you submit your watch, we aim to have your watch up for auction within a week."
            />
          </ListItem>
          {/* <ListItem>
            <ListItemIcon className={classes.publish}>
              <PublishIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText
              primary="No Wait List makes it easy to submit your watch for sale."
              secondary="We value your time by asking for only a few crucial details before letting you know whether or not we’re accepting your watch. That means you don’t have to waste your time providing initial information only to have your watch rejected."
            />
          </ListItem> */}
          <ListItem>
            <ListItemIcon className={classes.badge}>
              <VerifiedUserIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText
              primary="Clear & Easy to use"
              secondary="with easy sorting and searching – and simplified auctions that tell you exactly what you need to know about each watch."
            />
          </ListItem>
        </List>
      </Typography>
    </div>
  );
};

export default About;
