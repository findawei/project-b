import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import WatchIcon from "@material-ui/icons/Watch";
import { connect } from "react-redux";
import { logout } from "../flux/actions/authActions";
import { Link as RouterLink } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import FolderIcon from "@material-ui/icons/Folder";
import HistoryIcon from "@material-ui/icons/History";

const LoggedInMenu = ({ logout }) => {
  const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: "auto",
    },
  });
  const classes = useStyles();

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logoutButton = () => {
    logout();
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button component={RouterLink} to="/profile">
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button component={RouterLink} to="/mylistings">
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary="My Listings" />
        </ListItem>
        <ListItem button component={RouterLink} to="/purchasehistory">
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="Purchase History" />
        </ListItem>
        <ListItem button component={RouterLink} to="/settings">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={logoutButton}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );
  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <WatchIcon />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default connect(null, { logout })(LoggedInMenu);

// import React from "react";
// import IconButton from "@material-ui/core/IconButton";
// import MenuItem from "@material-ui/core/MenuItem";
// import { Menu, Link } from "@material-ui/core/";
// import WatchIcon from "@material-ui/icons/Watch";
// import { connect } from "react-redux";
// import { logout } from "../flux/actions/authActions";
// import { Link as RouterLink } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";

// const LoggedInMenu = ({ logout }) => {
//   const useStyles = makeStyles((theme) => ({
//     root: {
//       flexGrow: 1,
//       // margin: 3
//     },
//     // media: {
//     //     height: 300,
//     //   },
//     // paper: {
//     //     // padding: theme.spacing(1),
//     //     color: theme.palette.text.secondary,
//     // },
//     link: {
//       textDecoration: "none",
//       color: "black",
//       "&:hover": {
//         color: "#000000",
//       },
//     },
//     // chip: {
//     //     color: "white",
//     //     backgroundColor: "purple"
//     //   }
//   }));
//   const classes = useStyles();

//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const openMenu = Boolean(anchorEl);

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const logoutButton = () => {
//     setAnchorEl(null);
//     logout();
//   };
//   return (
//     <div>
//       <IconButton
//         aria-label="account of current user"
//         aria-controls="menu-appbar"
//         aria-haspopup="true"
//         onClick={handleMenu}
//         color="inherit"
//       >
//         <WatchIcon />
//       </IconButton>
//       <Menu
//         id="menu-appbar"
//         anchorEl={anchorEl}
//         anchorOrigin={{
//           vertical: "top",
//           horizontal: "right",
//         }}
//         keepMounted
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "right",
//         }}
//         open={openMenu}
//         onClose={handleClose}
//       >
//         <MenuItem onClick={handleClose}>
//           <Link className={classes.link} component={RouterLink} to="/profile">
//             Profile
//           </Link>
//         </MenuItem>
//         <MenuItem onClick={handleClose}>
//           <Link className={classes.link} component={RouterLink} to="/purchases">
//             Purchases
//           </Link>
//         </MenuItem>
//         <MenuItem onClick={handleClose}>
//           <Link
//             className={classes.link}
//             component={RouterLink}
//             to="/mylistings"
//           >
//             My Listings
//           </Link>
//         </MenuItem>
//         <MenuItem onClick={handleClose}>
//           <Link className={classes.link} component={RouterLink} to="/settings">
//             Settings
//           </Link>
//         </MenuItem>
//         <MenuItem onClick={logoutButton}>Sign Out</MenuItem>
//       </Menu>
//     </div>
//   );
// };

// export default connect(null, { logout })(LoggedInMenu);
