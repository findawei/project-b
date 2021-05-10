import React , { useEffect } from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, Box, Grid, Button } from '@material-ui/core';
import StripeBox from "./stripe/StripeBox"
import {getCard} from '../flux/actions/stripeActions'

const Settings = ({getCard, stripeRedux, auth}) => {


const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        margin: 20,
    },
}));

const classes = useStyles();

useEffect(() => { 
  if(auth.user.stripe_id){
    getCard();
  }  
  }, [auth]);

return (     
  <div className={classes.root}>
  <Grid container
    direction="inline"
    justify="center"
    alignItems="center">
  <Grid item xs={12} md={10} lg={8}>
    <Typography component="div" variant="h4">
            Settings
    </Typography>
    <Divider/>
    <Grid container alignItems="center">
      <Grid item xs={12} sm={6}>
        <Typography>
        <Box fontWeight="fontWeightBold" py={1}>
        Account
        </Box>
        </Typography>

        <p>Password</p>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button variant="outlined">Change Password</Button>
      </Grid>
    </Grid>
        
       
       
        <br/>
        
        <Divider/>
        <Typography component="div">
        <Box fontWeight="fontWeightBold" py={1}>Payment info for bidding</Box>
        </Typography>
        {stripeRedux.card.data ?
          <div>
          <Box py={1}>Your card on file</Box>
          <Typography 
          color="textSecondary"
          component="span" 
          // variant="caption"
          >
          **** **** ****{stripeRedux.card.data[0].card.last4}
          </Typography>
          </div>
          :
        <StripeBox/>
        }
  </Grid> 
  </Grid>
  </div>
)
}

const mapStateToProps = (state) => ({
    stripeRedux: state.stripeRedux,
    auth: state.auth
  });

export default connect(mapStateToProps, {getCard})(Settings);