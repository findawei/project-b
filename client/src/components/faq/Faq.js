import React , { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, Box, Grid, Button, Menu, useScrollTrigger } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import About from './About';
import BuyFaq from './BuyFaq';
import SellFaq from './SellFaq';
import Buying from './Buying';
import Selling from './Selling'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { HashLink as Link } from 'react-router-hash-link';
import './Faq.css';
import HowToMenu from './HowToMenu';
import FAQMenu from './FAQMenu';
import { positions } from '@material-ui/system';


const Faq = () => {

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    body: {
        margin: 20,
    },
    bgcolor: {
        backgroundColor:"lightgrey",
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
      <AppBar position="sticky" className={classes.root}>
        <Toolbar className={classes.bgcolor}>
        <Typography variant="body1" className={classes.title}>
        <Grid container justify="center" direction="row" spacing={2}>
            <Grid item>
                <Button>
                    <Link className={classes.link} style={{ textDecoration: 'none', color: 'inherit'}} to={'/faq#about'}>About
                </Link>
                </Button>
            </Grid>
            <Grid item>
                 <HowToMenu />
            </Grid>
            <Grid item>
                <FAQMenu />
            </Grid>
            {/* <Grid item>
                <Button>
                    {ButtonText}
                </Button>
            </Grid> */}
        </Grid>
        </Typography>
        </Toolbar>
      </AppBar>
    <Grid 
    container
    // direction="column"
    justify="center"
    alignItems="center">
        <Grid item xs={12} md={10} lg={8}>
        <div className={classes.body}>
            {/* <Typography component="div">
                <h1>What's No Wait List?</h1>
                <Divider />
                <Box fontWeight="fontWeightBold" py={1}>Cool Watch Auctions</Box>
            </Typography> */}
        {/* <Divider/> */}
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
    <Divider/>
    <br/>
    </div>
)
}

export default connect(null, {})(Faq);