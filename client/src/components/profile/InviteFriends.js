import React from "react";
import { connect } from "react-redux";
import { format } from "date-fns";
import {
  Grid,
  Paper,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  InputLabel,
  Box,
  NativeSelect,
  Select,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContentText,
  Container,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import MyListings from "./MyListings";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { green } from "@material-ui/core/colors";
import picture from "../../images/Website-refer.png";
import tellFriends from "../../images/marketing.png";
import earn from "../../images/p2p.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    margin: 10,
  },
  paperContainer: {
    width: "100%",
    // height: "50%",
    backgroundImage: `url(${picture})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
  },
  textTitle: {
    color: "white",
  },
  card: {
    elevation: 0,
  },
  media: {
    // height: 200,
    width: "40%",
    // textAlign: "center",
  },
}));

const InviteFriends = ({ auth }) => {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.paperContainer} square elevation={0}>
        <br />
        <br />
        <br />
        <br />
        <Typography variant="h3" align="center" className={classes.textTitle}>
          Invite friends to NoWaitList
        </Typography>
        <Typography variant="h6" align="center" className={classes.textTitle}>
          Share the love and everyone wins!
          <br />
          You’ll each earn a 25% off Referral Bonus.*
        </Typography>
        <br />
        <br />
        <br />
        <br />
      </Paper>
      <div className={classes.root}>
        <Container>
          <Grid
            container
            // direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <br />
              <Grid
                container
                justify="center"
                // alignItems="center"
                spacing={3}
                direction="row"
              >
                <Grid item xs={12}>
                  <Box textAlign="center">
                    <Button variant="contained" color="primary">
                      Reveal my referral code
                    </Button>
                  </Box>
                  <br />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card className={classes.card} elevation={0}>
                    <Grid container justify="center">
                      <Grid item xs={12} align="center">
                        <CardMedia
                          className={classes.media}
                          image={tellFriends}
                          title="Tell your friends"
                          component="img"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            Get the word out
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            Share your Referral Code via text, email & social.
                          </Typography>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card className={classes.card} elevation={0}>
                    <Grid container justify="center" alignItems="center">
                      <Grid item xs={12} align="center">
                        <Box justifyContent="center">
                          <CardMedia
                            image={earn}
                            title="Tell your friends"
                            component="img"
                            className={classes.media}
                          />
                        </Box>

                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            You each receive 25% off
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            Once your friend is signed up and buys/sells a
                            watch, you’ll each earn 25% off the buyer's fees on
                            your next purchase.
                          </Typography>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(InviteFriends);
