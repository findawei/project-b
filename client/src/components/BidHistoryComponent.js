import React from "react";
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

const BidHistoryComponent = ({ bidHistory }) => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {bidHistory && bidHistory.map(bid => {
        // console.log("Comment", comment);
        return (
          <React.Fragment key={bid.id}>
            <ListItem key={bid.id} alignItems="flex-start">
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
                    {bid.name}&nbsp;
                    </Typography>
                    <Typography color="textSecondary"                 component="span" variant="caption">
                    {formatDistanceToNowStrict(Date.parse(bid.date))} ago
                    </Typography>
                </div>
                }
                secondary={
                  <>
                  <Paper className={classes.bidbar}>

                     <NumberFormat thousandSeparator={true} prefix={'$'}
                    displayType={'text'}
                    value={bid.bid}
                    />
                  </Paper>
                   
                  </>
                }
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default BidHistoryComponent;