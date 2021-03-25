import React from "react";
import {connect} from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography, 
  Box, Paper
} from "@material-ui/core";
// import faker from "faker";
import {format, formatDistance, formatDistanceToNowStrict} from "date-fns";
import NumberFormat from "react-number-format";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  fonts: {
    fontWeight: "bold"
  },
  inline: {
    display: "inline"
  },
  bidbar: {
    padding: theme.spacing(0.5),
    textAlign: 'left',
    color: '#fff',
    background: theme.palette.warning.dark,
    display: 'inline',
    // flexWrap: 'wrap',
  },
  bidbartext: {
    color: "#FFFFFF"
  },
}));

const CommentsAndBids = ({ commentsandbids, auth, currentItem }) => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
    {commentsandbids && commentsandbids
    .sort(function compare(a, b) {
      var dateA = new Date(a.date);
      var dateB = new Date(b.date);
      return dateB - dateA;
    })
    .map(commentandbid => {
      return (
        <React.Fragment key={commentandbid && commentandbid.id}>
          <ListItem key={commentandbid && commentandbid.id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="avatar" 
              // src={faker.image.abstract()} 
              />
            </ListItemAvatar>
            <ListItemText
              className={classes.inline}
              primary={
              <div>                 
                  <Typography component="span">
                  {commentandbid && commentandbid.name}
                  </Typography>&nbsp;
                  {/* {auth && auth.isAuthenticated && (auth.user.uid == currentItem.user)?
                  <Paper className={classes.bidbar}>Seller</Paper>
                  :
                  ''
                  } */}
                  <Typography color="textSecondary" component="span" variant="caption">
                  {commentandbid && formatDistanceToNowStrict(Date.parse(commentandbid.date))} ago
                  </Typography>
              </div>
              }
              secondary={
                <>
                {commentandbid && commentandbid.text?
                commentandbid.text
                :
                <Paper className={classes.bidbar}>
                   <NumberFormat thousandSeparator={true} prefix={'$'}
                  displayType={'text'}
                  value={commentandbid && commentandbid.bid}
                  />
                </Paper>
                }
                </>
              }
            />
          </ListItem>
          <Divider />
        </React.Fragment>
      );
    })
    }
    </List>
  );
};

const mapStateToProps = (state) => ({
  currentItem: state.item.currentItem,
  auth: state.auth
});

export default connect(mapStateToProps)(CommentsAndBids);







