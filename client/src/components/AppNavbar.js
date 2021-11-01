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
  TextField,
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
import { socketConnect, setSearchTerm } from "../flux/actions/itemActions";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

const AppNavbar = ({ auth, verifyEmail, searchTerm }) => {
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
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      // backgroundColor: alpha(theme.palette.common.white, 0.15),
      // '&:hover': {
      //   backgroundColor: alpha(theme.palette.common.white, 0.25),
      // },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  }));

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [FaqAnchorEl, setFaqAnchorEl] = React.useState(null);
  const [HowToAnchorEl, setHowToAnchorEl] = React.useState(null);
  const [search, setSearch] = React.useState("");

  const handleChange = (e) => {
    searchTerm = e.target.value;
    setSearch(searchTerm);
    setSearchTerm(searchTerm);
  };
  console.log(searchTerm);

  useEffect(() => {
    if (auth.authMsg === "You haven't verified your e-mail address.") {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [auth]);

  useEffect(() => {
    if (auth && auth.user && auth.user._id) {
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

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="white">
        <Toolbar>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <img src={logo} alt="logo" className={classes.logo} />
          </Link>
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              // inputProps={{ "aria-label": "search" }}
              value={search}
              onChange={handleChange}
            />
          </div> */}
          <div className={classes.root} />

          <div className={classes.sectionDesktop}>
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
                  (spam folder included) for a confirmation email or send
                  another one.
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
          </div>
          <div className={classes.sectionMobile}>
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
                  (spam folder included) for a confirmation email or send
                  another one.
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
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  searchTerm: state.item,
});

export default connect(mapStateToProps, { verifyEmail, setSearchTerm })(
  AppNavbar
);
