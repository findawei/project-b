import React , { useEffect } from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, Box, Grid } from '@material-ui/core';
import About from './About'


const Faq = () => {


const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        margin: 20,
    },
}));

const classes = useStyles();

return (
    <Grid 
    container
    // direction="column"
    justify="center"
    alignItems="center">
        <Grid item xs={12} md={10} lg={8}>
        <div className={classes.root}>
            <Typography component="div">
                <h1>What's No Wait List?</h1>
                <Divider />
                <Box fontWeight="fontWeightBold" py={1}>Cool Watch Auctions</Box>
            </Typography>
        <Divider/>
        <About/>
        </div>
        </Grid>
    </Grid>

    
    )
}

export default connect(null, {})(Faq);