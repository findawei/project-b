import React from 'react';
import {connect} from 'react-redux';
import {format} from "date-fns";
import {Grid, Paper, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, TextField, Typography,InputLabel, Box, NativeSelect, Select, Dialog, DialogTitle, DialogActions, DialogContentText, Icon } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles';
import MyListings from './MyListings';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    margin: 20,
  },
  paper: {
    // marginRight: theme.spacing(2),
    
  },
}));


const Profile =({auth}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <Grid container
    direction="inline"
    justify="center"
    alignItems="center">
    <Grid item xs={12} md={10} lg={8}>
        <Grid 
        container 
        jalignItems="center" alignContent="space-between" alignItems="space-between" justify="space-between">
            <Grid item >
            <Typography variant="h4" className={classes.radio}>
            {auth && auth.user?
            auth.user.name
            :
            'User loaded'
            }
            </Typography>

            {auth && auth.user.stripe_cc ?
              <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
                <CheckCircleIcon color="primary"/>
                &nbsp;
                <Typography className={classes.radio}>
                  Registered Bidder 
                </Typography>
              </div> 
              :
              <></>
            }

            
            <Typography className={classes.radio}>
            Joined {format(new Date(auth.user.date),'MMM Y')}
            </Typography>
            </Grid>
            <Grid item>
                 <Button variant="outlined">
            Edit Profile
            </Button>
            </Grid>
               
                
        </Grid>
    </Grid>
    </Grid>
     
      
    </div>
  );
}
const mapStateToProps = (state) => ({
    auth: state.auth
  });

export default connect(mapStateToProps, {})(Profile)