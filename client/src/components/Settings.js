import React , { useEffect } from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, Box } from '@material-ui/core';
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
  }, [getCard]);

return (
    <div className={classes.root}>
        <Typography component="div">
            <h1>Settings</h1>
            <Divider />
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
    </div>
)
}

const mapStateToProps = (state) => ({
    stripeRedux: state.stripeRedux,
    auth: state.auth
  });

export default connect(mapStateToProps, {getCard})(Settings);