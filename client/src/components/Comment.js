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
  Box
} from "@material-ui/core";
import faker from "faker";
import {format, formatDistance, formatDistanceToNowStrict} from "date-fns";

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
  
}));

const Comment = ({ comments }) => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {comments.map(comment => {
        console.log("Comment", comment);
        return (
          <React.Fragment key={comment.id}>
            <ListItem key={comment.id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="avatar" src={faker.image.abstract()} />
              </ListItemAvatar>
              <ListItemText
                className={classes.inline}
                primary={
                <div>                 
                    <Typography component="span">
                    {faker.internet.userName()}&nbsp;
                    </Typography>
                    <Typography color="textSecondary"                 component="span" variant="caption">
                    {formatDistanceToNowStrict(Date.parse(faker.date.recent(1)))} ago
                    </Typography>
                </div>
                }
                secondary={
                  <>
                    {comment.body}
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

export default Comment;