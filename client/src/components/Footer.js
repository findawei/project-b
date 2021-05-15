import React,{Component} from 'react'
import {AppBar, Typography, Container, Toolbar, Grid} from '@material-ui/core/'
import { makeStyles } from "@material-ui/core/styles";
import InstagramIcon from '@material-ui/icons/Instagram';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    toolbar: {
      minHeight: '200px',
      marginBottom: '40px'
    }
  }));

export default function Footer() {

    const classes = useStyles();

    return (
        <AppBar position="static" color="gray">
          <Container maxWidth="100%"  >
            <Toolbar className={classes.toolbar}>
            <Grid 
            container 
            spacing={3}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            alignContent="center">
                <Grid item xs={4} sm={3}>
                    <Typography variant="overline">How it works</Typography>
                    <Typography variant="subtitle2">Buying a Watch</Typography>
                    <Typography variant="subtitle2">Selling a Watch</Typography>
                    <Typography variant="subtitle2">Completing a Sale</Typography>
                    <Typography variant="subtitle2">FAQ</Typography>
                </Grid>
                <Grid item xs={4} sm={3}>
                    <Typography variant="overline">Sellers</Typography>
                    <Typography variant="subtitle2">Submit your Watch</Typography>
                    <Typography variant="subtitle2">Photography Guide</Typography>
                </Grid>
                <Grid item xs={4} sm={3}>
                    <Typography variant="overline">Helpful Links</Typography>
                    <Typography variant="subtitle2">Support</Typography>
                    
                </Grid>
            <Grid item xs={12} sm={3}>
                <InstagramIcon />
                <br/>
                <Typography variant="h8" color="inherit">
                Copyright © {new Date().getFullYear()} NoWaitList. All Rights Reserved
            </Typography>
            </Grid>
            </Grid>
            </Toolbar>
          </Container>
        </AppBar>
    )
}