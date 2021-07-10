import React,{Component, useState, useEffect} from 'react'
import {Divider, Typography, Container, Card, CardActions, CardContent, Grid, Button, Box, Paper} from '@material-ui/core/'
import { makeStyles } from "@material-ui/styles";
import { HashLink as Link } from 'react-router-hash-link';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import MoneyOutlinedIcon from '@material-ui/icons/MoneyOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import { connect } from 'react-redux';
import SellLoginModal from './auth/SellLoginModal';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import picture from "../images/dive-watches-dark.jpg";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin: 10,
    },
    card: {
        // maxWidth: 350,
        height: 170
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
      textTitle: {
        color: "white"
      },
      text: {
        color: "green"
      },
      background: {
        maxWidth: '100%',
        // maxHeight: 200,
      },
      paperContainer: {
        width:"100%",
        height: "100%",
        objectFit: 'cover',
        backgroundImage: `url(${picture})`,
        // minHeight: 300,
        // maxHeight:500,
        
      }

  }));

 

  const steps = getSteps();
  function getSteps() {
    return ['Submit Your Watch', 'Prep Your Listing', 'Review and Approve', 'Participate in the auction', 'Conclude the transaction'];
  }

  const SubmitExplainer = ({auth}) =>{

 useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [activeStep, setActiveStep] = useState(0,0);

    const classes = useStyles();

    return (
      <div>
            <Paper className={classes.paperContainer}>              
              <br/><br/><br/><br/>
              <Typography variant="h3" align="center" className={classes.textTitle}>
                  Sell on NoWaitList!
              </Typography>
              <Typography variant="h5" align="center" className={classes.textTitle}>
                  Made by enthusiasts for enthusiasts.
              </Typography>
              <br/><br/><br/><br/>
              </Paper>

              <div className={classes.root}>
              <Container >
              <br/>
              <Typography variant="h4" align="center">
                Why sell with us?
              </Typography>
              <br/><br/>
                <Grid 
                container
                spacing={2}
                direction="row"
                justify="space-evenly"
                alignItems="center"
                >
                    <Grid item xs={6} md={5}>
                        <Card className={classes.card} variant="outlined">
                        <CardContent>
                            <Grid container direction="row" alignItems="center">
                              <CheckCircleOutlineIcon className={classes.text}/>
                              &nbsp;
                            <Typography variant="h5" component="h2" className={classes.text}> <b>List for FREE          </b>
                            </Typography>
                          </Grid>
                            <br/>
                            <Typography variant="body" component="p">
                            FREE to list without reserve! 
                            </Typography>
                            
                            <Typography variant="subtitle2" component="p">
                            Only $49 with reserve.
                            </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={5}>
                        <Card className={classes.card} variant="outlined">
                        <CardContent>
                          
                            <Grid container direction="row" alignItems="center">
                              <MonetizationOnOutlinedIcon className={classes.text}/>
                              &nbsp;
                            <Typography variant="h5" component="h2" className={classes.text}> <b>Get top dollar</b>   
                            </Typography>
                          </Grid>
                            <br/>
                            
                            <Typography variant="body" component="p">
                            With our anti-snipe system, your auction will stay active as long as people keep bidding.
                            </Typography>
                            </CardContent>
                            
                        </Card>
                    </Grid>
                </Grid>
              <br/>
              <br/><br/>

              <Typography variant="h4" align="center">
                How it works
              </Typography>
              <br/>
              <Stepper alternativeLabel activeStep={activeStep}>
                {steps.map((label) => (
                  <Step key={label} active={true}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <br/>
          {auth && auth.isAuthenticated ? 
           <div>
            <Link 
            className={classes.link}
            style={{ textDecoration: 'none' }}
            to={'/submit'}
            >
              <Box textAlign='center'>
                <Button
                variant="contained"
                color="primary"
              >
                Sell A Watch
              </Button>
              </Box>
              
            </Link>
          </div>
          :
          <div>
            <Box textAlign='center'>
              <SellLoginModal/>
            </Box>
          </div>         
          }
          </Container>
        </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(SubmitExplainer);