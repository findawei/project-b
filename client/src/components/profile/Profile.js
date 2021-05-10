import React from 'react';
import {connect} from 'react-redux';

import {Grid, Paper, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, TextField, Typography,InputLabel, Box, NativeSelect, Select, Dialog, DialogTitle, DialogActions, DialogContentText } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles';
import MyListings from './MyListings';

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
    direction="column"
    justify="center"
    alignItems="center">
    <Grid item xs={12} md={10} lg={8}>
    
        {/* <Grid container direction="inline"> */}
            <Grid item>
                <Typography variant="h4" className={classes.radio}>
            {auth && auth.user?
            auth.user.name
            :
            'User loaded'
            }
            </Typography>
            <Typography className={classes.radio}>
            Registered Bidder {}
            </Typography>
            <Typography className={classes.radio}>
            Joined {}
            </Typography>
            </Grid>
            <Grid item>
                 <Button variant="contained" color="primary">
            Edit Profile
            </Button>
            </Grid>
               
                
        </Grid>
    {/* </Grid> */}
    </Grid>
     
      
    </div>
  );
}
const mapStateToProps = (state) => ({
    auth: state.auth
  });

export default connect(mapStateToProps, {})(Profile)