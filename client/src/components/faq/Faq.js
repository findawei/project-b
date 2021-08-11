import React , { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, Box, Grid, Button, Menu, useScrollTrigger, Container } from '@material-ui/core';
import About from './About';
import BuyFaq from './BuyFaq';
import SellFaq from './SellFaq';
import Buying from './Buying';
import Selling from './Selling'
import './Faq.css';
import { positions } from '@material-ui/system';

const Faq = () => {

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    body: {
        margin: 10,
    },
    bgcolor: {
        backgroundColor:"white",
        color:"black"
    },
    link: {
        textDecoration: "none",
        color: "black",
    "&:hover": {
        color: "#000000",
    }
    }
}));

const classes = useStyles();

const trigger = useScrollTrigger()

// if(positions.top==0){
//     //user scrolled to the top of the page
//     var ButtonText = 'Sell A Watch';
// } else {
//     var ButtonText = 'Farts';
// }

return (
    <div className={classes.root}>
    <Container>
    <Grid 
    container
    // direction="column"
    justify="center"
    alignItems="center">
        <Grid item xs={12} md={10} lg={8}>
        <div className={classes.body}>
        <br/>
        <a id="about" class="anchor" />
        <About/>
        <br/>
        <Divider/>
        <h1>How To</h1>
        <a id="buying" class="anchor" />
        <Buying/>
        <br/>
        <Divider/>
        <br/>
        <a id="selling" class="anchor" />
        <Selling/>
        <Divider/>
        <a id="buyfaq" class="anchor" />
        <h1>FAQ</h1>
            <BuyFaq />
            <a id="sellfaq" class="anchor" />
            <SellFaq />
        </div>
        </Grid>
    </Grid>
    </Container>  
    </div>
)
}

export default connect(null, {})(Faq);