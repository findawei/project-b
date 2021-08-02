import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import { setCurrentItem} from '../flux/actions/itemActions';
import Grid from '@material-ui/core/Grid'
import { Link as RouterLink} from 'react-router-dom';
import Countdown, {zeroPad} from 'react-countdown';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {Typography, Button, ButtonBase, Box, Link, Chip, useScrollTrigger} from '@material-ui/core'
import { positions } from '@material-ui/system';

const ListingEndingSoon = ({ item, setCurrentItem }) => {

    const setCurrent = (item) => {setCurrentItem(item);};
  
    function ItemView(){
      setCurrent(item);
    }

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        // margin: 3
    },
    media: {
        height: 150,
      },
    paper: {
        // padding: theme.spacing(1),
        color: theme.palette.text.secondary,
    },
    link: {
        color: "black",
    "&:hover": {
        color: "#000000",
        textDecoration: "none"
    }
    }
}));
    const classes = useStyles();

    const Completionist = () => <span>Ended</span>;
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
      if (completed) {
        // Render a completed state
        return <Completionist />;
      } else {
        // Render a countdown
          if (days == 0 && hours == 0 && minutes == 0){
            return <span>{zeroPad(seconds)}</span>;
          }
          else if (days ==0 && hours == 0){
            return <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>; 
          }
          else if (days ==0){
            return <span>{hours}:{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
          }
          else if (days ==1){
            return <span>{days} Day</span>;
          }
          else {
            return <span>{days} Days</span>;
          }
      }
    };

      const handleClick = () => {
        window[`scrollTo`]({top:0, behavior: `smooth`})
      };
    
return (
  <Grid
    item
    onClick={ItemView}
    >
            <Card 
            className={classes.paper}
            onClick={ItemView}
            >
            <Link 
            className={classes.link}
            component={RouterLink}
            to={`/item/${item._id}`}
            onClick={handleClick}
            >
            <CardActionArea>
            <CardMedia
                className={classes.media}
                image={item.img[0].url}
                title={item.reference_number}
            >
            <Box
            bgcolor="green"
            color="white"
            p={0.5}
            position="absolute"
            top={118}
            >
            <Typography display="inline">
                <Countdown
                date={item.endDate}
                renderer={renderer}
            />&nbsp;
                Bid ${item.bidHistory &&item.bidHistory.length? item.bidHistory[0].bid : 0}
            </Typography>
            </Box>
            <Box
            p={0}
            position="absolute"
            top={10}
            right={10}
            >
            {item.reserve? "" :
              <Chip 
                size="small" 
                label="No Reserve"
                // variant="outlined"
                color="secondary"
              />
            }
            </Box>
            </CardMedia>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                {item.brand} {item.model} {item.reference_number}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {item.location}
                </Typography>
            </CardContent>
            </CardActionArea>            
            </Link>
            </Card>
    </Grid>
  );
}

  export default connect(null, { setCurrentItem })(ListingEndingSoon);