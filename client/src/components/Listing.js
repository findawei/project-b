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
import {Typography, Button, ButtonBase, Box, Link, Chip} from '@material-ui/core'
import { positions } from '@material-ui/system';
import isPast from 'date-fns/isPast'

const Listing = ({ item, setCurrentItem }) => {

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
        height: 300,
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
    },
    // chip: {
    //     color: "white",
    //     backgroundColor: "purple"
    //   }
}));
    const classes = useStyles();

let barText
if(isPast(new Date(item.endDate)) && (item.status === "reserve_not_met")) {
  barText = "Bid to "
} else {
  barText = "Sold for "
}

let boxColor
if (isPast(new Date(item.endDate)) && (item.status === "completed")){
  boxColor = "black"
} else if(isPast(new Date(item.endDate)) && (item.status === "reserve_not_met")){
  boxColor = "gray"
}
else if((item.status === "active")){
  boxColor = "green"
}
    const Completionist = () => <span>{barText}</span>;
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
      if (completed) {
        // Render a completed state
        return <Completionist />;
      } else {
        // Render a countdown
          if (days == 0 && hours == 0 && minutes == 0){
            return <span>{zeroPad(seconds)} </span>;
          }
          else if (days ==0 && hours == 0){
            return <span>{zeroPad(minutes)}:{zeroPad(seconds)} </span>; 
          }
          else if (days ==0){
            return <span>{hours}:{zeroPad(minutes)}:{zeroPad(seconds)} </span>;
          }
          else if (days ==1){
            return <span>{days} Day </span>;
          }
          else {
            return <span>{days} Days </span>;
          }
      }
    };

return (
  <Grid 
    item xs={12} sm={6} lg={4}
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
            >
            <CardActionArea>
            <CardMedia
                className={classes.media}
                image={item.img[0].url}
                title={item.reference_number}
            >
            <Box
            bgcolor={boxColor}
            color="white"
            p={1}
            position="absolute"
            top={250}
            >
            <Typography display="inline">
                <Countdown
                date={item.endDate}
                renderer={renderer}
            />
                ${item.bidHistory &&item.bidHistory.length? item.bidHistory[0].bid : 0}
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
                className={classes.chip}
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
                {item.year} {item.brand} {item.reference_number} 
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

  export default connect(null, { setCurrentItem })(Listing);