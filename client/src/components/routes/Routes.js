import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ListingDetails from "../ListingDetails";
import MyListings from "../profile/MyListings";
import Settings from "../profile/Settings";
import SubmitListing from "../SubmitListing";
import Profile from "../profile/Profile";
import PrivateRoute from "./PrivateRoute";
import InviteFriends from "../profile/InviteFriends";
import PurchaseHistory from "../profile/PurchaseHistory";

const Routes = (props) => {
  return (
    <section className="container">
      {/* <Alert /> */}
      <Switch>
        <Route exact path="/item/:id" component={ListingDetails} />
        <PrivateRoute exact path="/settings" component={Settings} />
        <PrivateRoute exact path="/mylistings" component={MyListings} />
        <PrivateRoute
          exact
          path="/purchasehistory"
          component={PurchaseHistory}
        />
        <PrivateRoute exact path="/submit" component={SubmitListing} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/invite-friends" component={InviteFriends} />
        <Route render={() => <Redirect to={{ pathname: "/" }} />} />
      </Switch>
    </section>
  );
};

export default Routes;
