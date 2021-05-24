import React , { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, Box, Grid, Button, Menu } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

import { HashLink as Link } from 'react-router-hash-link';
import './Faq.css';

const HowToMenu = () => {

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
    
    const [anchorEl, setAnchorEl] = useState(null);
      const openMenu = Boolean(anchorEl);
    
      const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    

return(
    <div>
    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenu}>
    How To
    </Button>
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
                    <Link className={classes.link} style={{ textDecoration: 'none', color: 'inherit'}} to={'/faq#buying'}>Buying
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link className={classes.link} style={{ textDecoration: 'none', color: 'inherit'}} to={'/faq#selling'}>Selling
                    </Link>
                </MenuItem>
              </Menu>
              </div>
)}

export default connect(null, {})(HowToMenu);