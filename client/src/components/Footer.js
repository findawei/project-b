import React,{Component} from 'react'
import {AppBar, Typography, Container, Toolbar, Grid} from '@material-ui/core/'
import { makeStyles } from "@material-ui/core/styles";
import InstagramIcon from '@material-ui/icons/Instagram';
// import { Link as RouterLink} from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    toolbar: {
      minHeight: '200px',
      marginBottom: '40px'
    },
    stickToBottom: {
      // top: 'auto',
      bottom: 0,
      // minHeight: '200px',
      // marginBottom: '40px',
    },
  }));

export default function Footer() {

    const classes = useStyles();

    return (
        // <AppBar position="fixed" color="gray" className={classes.stickToBottom}>
          <Container maxWidth="100%" className={classes.stickToBottom} >
            {/* <Toolbar> */}
            <Grid 
            container 
            spacing={3}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            alignContent="center">
                <Grid item xs={4} sm={3}>
                    <Typography variant="overline">How it works</Typography>
                    <Typography variant="subtitle2">
                      <Link className={classes.link} style={{ textDecoration: 'none', color: 'inherit'}} to={'/faq#buying'}>
                        Buying a Watch
                      </Link>
                    </Typography>
                    <Typography variant="subtitle2">
                      <Link className={classes.link} style={{ textDecoration: 'none', color: 'inherit'}} to={'/faq#selling'}>
                        Selling a Watch
                      </Link>
                    </Typography>
                    <Typography variant="subtitle2">
                      <Link className={classes.link} style={{ textDecoration: 'none', color: 'inherit'}} to={'/faq'}>
                        Completing a Sale
                      </Link>
                    </Typography>
                    <Typography variant="subtitle2">
                      <Link className={classes.link} style={{ textDecoration: 'none', color: 'inherit'}} to={'/faq#questions'}>
                        FAQ
                      </Link>
                    </Typography>
                </Grid>
                <Grid item xs={4} sm={3}>
                    <Typography variant="overline">Sellers</Typography>
                    <Typography variant="subtitle2">Submit your Watch</Typography>
                    <Typography variant="subtitle2">Photography Guide</Typography>
                </Grid>
                <Grid item xs={4} sm={3}>
                    <Typography variant="overline">Helpful Links</Typography>
                    <Typography variant="subtitle2">Support</Typography>
                    <Typography variant="subtitle2"><Link className={classes.link} style={{ textDecoration: 'none', color: 'inherit'}} to={'/faq#about'}>
                        About
                      </Link></Typography>
                </Grid>
            <Grid item xs={12} sm={3}>
                <InstagramIcon />
                <br/>
                <Typography variant="h8" color="inherit">
                Copyright © {new Date().getFullYear()} NoWaitList. All Rights Reserved
            </Typography>
            </Grid>
            </Grid>
            {/* </Toolbar> */}
          </Container>
        // </AppBar>

    )
}