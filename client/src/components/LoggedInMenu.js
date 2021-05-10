import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import {Menu, Link} from '@material-ui/core/';
import WatchIcon from '@material-ui/icons/Watch';
import { connect } from 'react-redux';
import { logout } from '../flux/actions/authActions';
import { Link as RouterLink} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


const LoggedInMenu = ({logout}) => {

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        // margin: 3
    },
    // media: {
    //     height: 300,
    //   },
    // paper: {
    //     // padding: theme.spacing(1),
    //     color: theme.palette.text.secondary,
    // },
    link: {
        color: "black",
    "&:hover": {
        color: "#000000",
        textDecoration: "none"
    }
    },
    // chip: {
    //     color: "white",
    //     backgroundColor: "purple"
    //   }
}));
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutButton = () => {
    setAnchorEl(null);
    logout();
  }
  return (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <WatchIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openMenu}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link 
                  className={classes.link}
                  component={RouterLink}
                  to='/profile'
                  >
                  Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link 
                  className={classes.link}
                  component={RouterLink}
                  to='/mylistings'
                  >
                  My Listings
                  </Link>
                  </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link 
                  className={classes.link}
                  component={RouterLink}
                  to='/settings'
                  >
                  Settings
                  </Link>
                </MenuItem>
                <MenuItem onClick={logoutButton}>Sign Out</MenuItem>
              </Menu>
            </div>
  )      
}

export default connect( null, { logout })(LoggedInMenu);