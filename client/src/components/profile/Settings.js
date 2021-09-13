import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import {
  Typography,
  Divider,
  Box,
  Link,
  Grid,
  Button,
  Container,
  Switch,
} from "@material-ui/core";
import StripeBox from "../stripe/StripeBox";
import { getCard } from "../../flux/actions/stripeActions";

const Settings = ({ getCard, stripeRedux, auth }) => {
  const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
      margin: 10,
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    if (auth.user.stripe_id) {
      getCard();
    }
  }, [auth]);

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
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
            <Typography component="div" variant="h4">
              Settings
            </Typography>
            <br />
            <Divider />
            <br />
            <Grid
              container
              alignItems="center"
              alignContent="space-between"
              alignItems="space-between"
              justify="space-between"
            >
              {/* <Grid item xs={12}>
          <Typography>
            <Box fontWeight="fontWeightBold" py={1}>
            Account
            </Box>
          </Typography>
          <br/>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Typography>Password</Typography>
        </Grid>
        <Grid item xs={6} sm={6} container justify="flex-end">
          <Button variant="outlined">Change Password</Button>
        </Grid>
      <Grid item xs={12}>
      <br/>
      <Divider />
      </Grid> */}
              <Grid item xs={12}>
                <Typography component="div">
                  <Box fontWeight="fontWeightBold" py={1}>
                    Payment info for bidding
                  </Box>
                </Typography>
                <br />
              </Grid>
              <Grid item xs={12} sm={12}>
                {stripeRedux.card.data ? (
                  <>
                    <Typography
                    // color="textSecondary"
                    // component="span"
                    // variant="caption"
                    >
                      Your card on file
                      <br />
                      **** **** ****{stripeRedux.card.data[0].card.last4}
                    </Typography>
                  </>
                ) : (
                  <StripeBox />
                )}
              </Grid>
              {/* <Grid item xs={6} sm={6} container justify="flex-end">
        <Button variant="outlined">Update Card</Button>
      </Grid> */}
              <Grid item xs={12}>
                <br />
                <br />
                <Divider />
                <br />
              </Grid>

              <Grid item xs={12}>
                <Typography component="div">
                  <Box fontWeight="fontWeightBold" py={1}>
                    Referral Program
                  </Box>
                </Typography>
              </Grid>
              {/* <Grid item xs={12}>
                <Link
                  className={classes.link}
                  component={RouterLink}
                  to="/invite-friends"
                >
                  Invite Friends
                </Link>
              </Grid>
              <Grid item xs={12}>
                Referral Bonuses
              </Grid> */}

              {/* <Grid item xs={6} sm={6}>
          <Typography>Your phone number
            <br />
          514-542-2551</Typography>
      </Grid>
      <Grid item xs={6} sm={6} container justify="flex-end">
        <Button variant="outlined">Update Number</Button>
      </Grid>
      <Grid item xs={12}>
      <br/>
      <Divider />
      </Grid>
      
      <Grid item xs={12}>
        <Typography>
            <Box fontWeight="fontWeightBold" py={1}>
            No Wait List Emails
            </Box>
          </Typography>
          <br/>
      </Grid>
      <Grid item xs={8} sm={8}>
        <Typography>
        Send me the No Wait List daily email
        </Typography>
      </Grid>
      <Grid item container xs={4} sm={4}>
          <Grid container alignItems="center" justify="flex-end" spacing={1}>
            <Grid item>Off</Grid>
            <Grid item>
            <Switch
              checked={state.checkedA}
              onChange={handleChange}
              name="checkedA"
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />            
            </Grid>
            <Grid item>On</Grid>
          </Grid>
      </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  stripeRedux: state.stripeRedux,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCard })(Settings);
