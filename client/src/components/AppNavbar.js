import React from 'react';
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

const AppNavbar = ({auth}) =>{

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

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="white">
        <Toolbar>
          <div  className={classes.title}>
            <Link to={'/'} style={{ textDecoration: 'none' }}>
            <img src="https://nowaitlist.co/wp-content/uploads/2021/02/Screen-Shot-2021-01-31-at-2.56.11-PM.png" alt="logo" className={classes.logo} />
          </Link>    
          </div>
          {auth && auth.isAuthenticated ? 
           <div> <Link 
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
       </Link></div>
          :         
          <SellLoginModal/>
          }
            
          {auth && auth.isAuthenticated ? 
          <LoggedInMenu/> 
          :         
          <LoginModal/>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar);