import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import LoginModal from './auth/LoginModal';
import SellLoginModal from './auth/SellLoginModal';
import { connect } from 'react-redux';
import LoggedInMenu from './LoggedInMenu'
import {Dialog, DialogTitle, DialogActions, DialogContentText, DialogContent } from '@material-ui/core/'
import firebase from '../firebase';
import { verifyEmail } from '../flux/actions/authActions';

const AppNavbar = ({auth, verifyEmail}) =>{

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    maxWidth: 100,
  }
}));

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  useEffect(() => { 
    if(auth.authMsg == "You haven't verified your e-mail address."){
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [auth]);

  const handleClose = () => {
    setOpen(false);
  }

  const sendConfirmation = () => {
    verifyEmail()
    setOpen(false)
  }

  const refreshPage = () => {
    window.location.reload()
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="white">
        <Toolbar>
          <div  className={classes.title}>
            <Link to={'/'} style={{ textDecoration: 'none' }}>
            <img src="https://nowaitlist.co/wp-content/uploads/2021/02/Screen-Shot-2021-01-31-at-2.56.11-PM.png" alt="logo" className={classes.logo}/>
          </Link>    
          </div>
          {/* {auth && auth.isAuthenticated ? 
           <div>
            <Link 
            className={classes.link}
            style={{ textDecoration: 'none' }}
            to={'/submit'}
            >
              <Button
                variant="contained"
                color="primary"
              >
                Sell A Watch
              </Button>
            </Link>
          </div>
          :         
          <SellLoginModal/>
          } */}
          <Button variant="contained"
            color="primary">
            <Link className={classes.link} style={{ textDecoration: 'none', color: 'inherit'}} to={'/sell-a-watch'}>
                          Sell your Watch
            </Link>
          </Button>
          {auth && auth.isAuthenticated ? 
          <LoggedInMenu/> 
          :         
          <LoginModal/>
          }
          {/* <Button onClick={handleClickOpen}>Test</Button> */}
          <Dialog
            open={open}
            onClose={handleClose}
            disableBackdropClick
            disableEscapeKeyDown
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Email Verification"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Please verify your email before continuing. Check you emails (spam folder included) for a confirmation email or send another one.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {/* <Button  onClick={refreshPage} color="primary">
                Refresh Once Confirmed
              </Button> */}
              <Button  onClick={sendConfirmation} color="primary" autoFocus>
                Send Confirmation Email
              </Button>
            </DialogActions>
          </Dialog>

        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {verifyEmail})(AppNavbar);