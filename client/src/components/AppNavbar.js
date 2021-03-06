import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';


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

export default function AppNavbar() {
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
          <Button color="inherit">Sign In</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}