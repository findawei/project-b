import React , { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import portait from "../../images/alex-portait.jpg";
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import TimerIcon from '@material-ui/icons/Timer';
import PublishIcon from '@material-ui/icons/Publish';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

const About = () => {

const useStyles = makeStyles((theme) => ({
        // root: {
        //     flexGrow: 1,
        //     margin: 20,
        // },
        image: {
            width: '100%',
            maxWidth: 500
        },
        focused: {
            background: 'CenterFocusStrongIcon'
        }, 
        title: {
            margin: theme.spacing(4, 0, 2),
          },
        focus: {
            color: 'orange',
        },
        fees: {
            color: 'green',
        },
        timer: {
            color: 'purple',
        },
        publish: {
            color: 'navy',
        },
        badge: {
            color: 'gold',
        },
    }));

const classes = useStyles();

return(
    <div>
        <Typography variant="h4">About us</Typography>
        <br/>
        <Typography>
        Our story began with frustration. All the selling outlets had their issues. As a buyer on forums, you have to research the seller, setup your account etc. Ebay, known for it's high fees. Chrono24, where people ask top dollar for lesser examples. Auction houses that require consignment.
        <br/><br/>
        After a couple of years of using these platforms, Alex (founder) decided to change things. He learned to program and over the course of a couple of months built NoWaitList. 

        At NoWaitList, we focus on creating a platform that encourages transparency and communication. 
        <br/><br/>

        Our goal is to be your go to spot for buying and selling your beloved watch. Knowing that it will go to an enthusiast that will enjoy it for years to come.

        Horlogerie is our hobby, we want to keep it light & enjoyable.

        <br/>
        <Typography variant="h6" className={classes.title}>
        A bit more on Alex Benjamignan
        </Typography>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <img src={portait} alt="portait" className={classes.image}/>
            </Grid>
            <Grid item xs={12} sm={6}>
            He studied industrial engineering. Raised capital for one his earlier startups & got a patent. Learned programming and along the way got sucked into the beautiful world of watches. 
            <br/><br/>
            Watches have provided him with so much. A means to share a passion. Learning about technology and innovation. Creating strong relationships with fellow enthusiasts & collectors. This and the reasons above are why NoWaitList was born.
            </Grid>
        </Grid>
        <Typography variant="h6" className={classes.title}>
        Here are just a few of our benefits
        </Typography>
            <List>
                <ListItem>
                  <ListItemIcon className={classes.focus}>
                    <CenterFocusStrongIcon fontSize='large'/>
                  </ListItemIcon>
                  <ListItemText
                    primary="Focused on enthusiasts"
                    secondary='from the 1980s to the 2020s. That means anyone interested in the next era of exciting watches will come here first to buy and sell.'
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon className={classes.fees}>
                    <AttachMoneyIcon fontSize='large'/>
                  </ListItemIcon>
                  <ListItemText
                    primary="Reasonable fees"
                    secondary='The buyer’s fee is 5%, with a maximum of $5,000 – far below other auction houses and enthusiast watch auction websites. Our seller’s fee range from $0 for a no-reserve auction to $49 for a seller with a reserve auction.'
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon className={classes.timer}>
                    <TimerIcon fontSize='large'/>
                  </ListItemIcon>
                  <ListItemText
                    primary="Get your watch listed quickly"
                    secondary='while other watch auctions take weeks or even months to get your watch listed and available to buyers. We’ll even take your input on scheduling your watch’s auction.'
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon className={classes.publish}>
                    <PublishIcon fontSize='large'/>
                  </ListItemIcon>
                  <ListItemText
                    primary="No Wait List makes it easy to submit your watch for sale."
                    secondary='We value your time by asking for only a few crucial details before letting you know whether or not we’re accepting your watch. That means you don’t have to waste your time providing initial information only to have your watch rejected.'
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon className={classes.badge}>
                    <VerifiedUserIcon fontSize='large'/>
                  </ListItemIcon>
                  <ListItemText
                    primary="Clear & Easy to use"
                    secondary='with easy sorting and searching – and simplified auctions that tell you exactly what you need to know about each watch.'
                  />
                </ListItem>
            </List>
        </Typography>
    </div>
)
}

export default About;