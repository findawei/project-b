import React , { useEffect } from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, Box, Grid } from '@material-ui/core';
import About from './About';
import Questions from './Questions';
import Buying from './Buying';
import Selling from './Selling'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { HashLink as Link } from 'react-router-hash-link';
import './Faq.css';

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
    }
}));

const classes = useStyles();

return (
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.root}>
        <Toolbar className={classes.bgcolor}>
        <Typography variant="body1" className={classes.title}>
        <Grid container justify="center" direction="row" spacing={2}>
            <Grid item>
                <Link className={classes.link} style={{ textDecoration: 'none', color: 'inherit'}} to={'/faq#about'}>About
                </Link>
            </Grid>
            <Grid item>
                <Link className={classes.link} style={{ textDecoration: 'none', color: 'inherit'}} to={'/faq#buying'}>Buying
                </Link>
            </Grid>
            <Grid item>
                <Link className={classes.link} style={{ textDecoration: 'none', color: 'inherit'}} to={'/faq#selling'}>Selling
                </Link>
            </Grid>    
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
            <Typography component="div">
                <h1>What's No Wait List?</h1>
                <Divider />
                <Box fontWeight="fontWeightBold" py={1}>Cool Watch Auctions</Box>
            </Typography>
        <Divider/>
        <br/>
        <a id="about" class="anchor" />
        <About/>
        <Divider/>
        <h1>How It Works</h1>
        <a id="buying" class="anchor" />
        <Buying/>
        <br/>
        <Divider/>
        <br/>
        <a id="selling" class="anchor" />
        <Selling/>
        <Divider/>
        <div id="questions">
            <Questions/>
        </div>
        </div>
        </Grid>
    </Grid>
    </div>
)
}

export default connect(null, {})(Faq);