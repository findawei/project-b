import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Modal,
  Menu,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import LoginModal from "./auth/LoginModal";
import SellLoginModal from "./auth/SellLoginModal";
import { connect } from "react-redux";
import LoggedInMenu from "./LoggedInMenu";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContentText,
  DialogContent,
} from "@material-ui/core/";
import { verifyEmail } from "../flux/actions/authActions";
import logo from "../images/logo.png";
import MenuIcon from "@material-ui/icons/Menu";
import { HashLink } from "react-router-hash-link";
import { socketConnect } from "../flux/actions/itemActions";

const AppNavbar = ({ auth, verifyEmail }) => {
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
    },
  }));

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [FaqAnchorEl, setFaqAnchorEl] = React.useState(null);
  const [HowToAnchorEl, setHowToAnchorEl] = React.useState(null);

  const isFaqMenuOpen = Boolean(FaqAnchorEl);
  const isHowToMenuOpen = Boolean(HowToAnchorEl);
  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    if (auth.authMsg == "You haven't verified your e-mail address.") {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [auth]);

  useEffect(() => {
    if (auth.user._id) {
      socketConnect();
    }
  }, [auth]);

  const handleClose = () => {
    setOpen(false);
  };

  const sendConfirmation = () => {
    verifyEmail();
    setOpen(false);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleFaqMenuClose();
    handleHowToMenuClose();
  };

  const handleFaqMenuClose = () => {
    setFaqAnchorEl(null);
  };

  const handleHowToMenuClose = () => {
    setHowToAnchorEl(null);
  };

  const handleFaqMenuOpen = (event) => {
    setFaqAnchorEl(event.currentTarget);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleHowToMenuOpen = (event) => {
    setHowToAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const renderFaqMenu = (
    <Menu
      anchorEl={FaqAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isFaqMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <HashLink
          className={classes.link}
          style={{ textDecoration: "none", color: "inherit" }}
          to={"/about"}
        >
          About
        </HashLink>
      </MenuItem>
      <MenuItem onClick={handleHowToMenuOpen}>How To</MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>FAQ</MenuItem>
    </Menu>
  );

  const renderHowToMenu = (
    <Menu
      anchorEl={HowToAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isHowToMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <HashLink
          className={classes.link}
          style={{ textDecoration: "none", color: "inherit" }}
          to={"/faq#buying"}
        >
          Buy
        </HashLink>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <HashLink
          className={classes.link}
          style={{ textDecoration: "none", color: "inherit" }}
          to={"/faq#selling"}
        >
          Sell
        </HashLink>
      </MenuItem>
    </Menu>
  );

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <HashLink
          className={classes.link}
          style={{ textDecoration: "none", color: "inherit" }}
          to={"/faq#buyfaq"}
        >
          For Buyers
        </HashLink>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <HashLink
          className={classes.link}
          style={{ textDecoration: "none", color: "inherit" }}
          to={"/faq#sellfaq"}
        >
          For Sellers
        </HashLink>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="white">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleFaqMenuOpen}
          >
            <MenuIcon />
          </IconButton> */}
          <div className={classes.title}>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <img src={logo} alt="logo" className={classes.logo} />
            </Link>
          </div>
          <Button variant="contained" color="primary" size="small">
            <Link
              className={classes.link}
              style={{ textDecoration: "none", color: "inherit" }}
              to={"/sell-a-watch"}
            >
              Sell your Watch
            </Link>
          </Button>
          {auth && auth.isAuthenticated ? <LoggedInMenu /> : <LoginModal />}
          {/* <Button onClick={handleClickOpen}>Test</Button> */}
          <Dialog
            open={open}
            onClose={handleClose}
            disableBackdropClick
            disableEscapeKeyDown
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Email Verification"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Please verify your email before continuing. Check you emails
                (spam folder included) for a confirmation email or send another
                one.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {/* <Button  onClick={refreshPage} color="primary">
                Refresh Once Confirmed
              </Button> */}
              <Button onClick={sendConfirmation} color="primary" autoFocus>
                Send Confirmation Email
              </Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      </AppBar>
      {renderFaqMenu}
      {renderMenu}
      {renderHowToMenu}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { verifyEmail })(AppNavbar);
