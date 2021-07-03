import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { Link as RouterLink} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Paper, Button, Link, Typography, Container} from '@material-ui/core/'
import {getItems} from '../../flux/actions/itemActions'
import Listing from '../Listing'
import {isFuture, isPast} from "date-fns";

const MyListings = ({getItems, item, auth}) => {

const [haveListings, setHaveListings] = useState(false);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 10,
    },
    link: {
      color: "black",
  "&:hover": {
      color: "#000000",
      textDecoration: "none"
  }
  },
}));

const classes = useStyles();

useEffect(() => { 
    let listings = items.filter(opt => auth.user.uid === opt.user)
    if(listings.length === 0){
        setHaveListings(false)
    } else {
        setHaveListings(true)
    }
}, []);
 
  const { items } = item;

  return (
    <div className={classes.root}>
    <Container>
    <Grid container
    direction="row"
    justify="flex-start"
    alignItems="stretch">
        <Grid item>
            <Typography component="div" variant="h4">
            My Listings
            </Typography>
            {haveListings ?
                <div>
                <Grid container spacing={2}>
                {items.filter(opt => isFuture(new Date(opt.endDate)) & auth.user.uid === opt.user).map(item => <Listing 
                    item={item} 
                    key={item._id}/>
                    )}
                </Grid>
                <h1>Ended</h1>
                <Grid container spacing={2}>
                {items.filter(opt => isPast(new Date(opt.endDate))& auth.user.uid === opt.user).map(item => <Listing 
                    item={item} 
                    key={item._id}/>
                    )}
                </Grid>
                </div>
                :
                <div>
                <p>You have not submitted any watches yet. Want to sell your watch?</p>
                <Link 
                    className={classes.link}
                    component={RouterLink}
                    to='/submit'
                    >
                <Button
                    variant="contained"
                    color="primary"
                    
                    
                >Get Started</Button></Link>
                </div>
            }
        </Grid>
        <Grid>
            Test
        </Grid>
    </Grid>
    </Container>
    </div>
  );
}

const mapStateToProps = (state) => ({
  item: state.item,
  auth: state.auth
});

export default connect(mapStateToProps, { getItems })(MyListings);