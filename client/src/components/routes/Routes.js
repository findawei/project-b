
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ListingDetails from '../ListingDetails'
import MyListings from '../profile/MyListings';
import Settings from '../Settings';
import SubmitListing from '../SubmitListing';
import Profile from '../profile/Profile'
import PrivateRoute from './PrivateRoute';

const Routes = props => {
  return (
    <section className="container">
      {/* <Alert /> */}
      <Switch>
        <Route exact path="/item/:id" component={ListingDetails} />
        <PrivateRoute exact path="/settings" component={Settings} />
        <PrivateRoute exact path="/mylistings" component={MyListings} />
        <PrivateRoute exact path="/submit" component={SubmitListing} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <Route render={() => <Redirect to={{pathname: "/"}} />} />
      </Switch>
    </section>
  );
};

export default Routes;