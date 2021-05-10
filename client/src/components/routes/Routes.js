
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ListingDetails from '../ListingDetails'
import MyListings from '../profile/MyListings';
import Settings from '../Settings';
import SubmitListing from '../SubmitListing';
import Profile from '../profile/Profile'
// import Register from '../auth/Register';
// import Login from '../auth/Login';
// import Alert from '../layout/Alert';
// import Dashboard from '../dashboard/Dashboard';
// import ProfileForm from '../profile-forms/ProfileForm';
// import AddExperience from '../profile-forms/AddExperience';
// import AddEducation from '../profile-forms/AddEducation';
// import Profiles from '../profiles/Profiles';
// import Profile from '../profile/Profile';
// import Posts from '../posts/Posts';
// import Post from '../post/Post';
// import NotFound from '../layout/NotFound';
import PrivateRoute from './PrivateRoute';

const Routes = props => {
  return (
    <section className="container">
      {/* <Alert /> */}
      <Switch>
        {/* <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profiles" component={Profiles} /> */}
        <Route exact path="/item/:id" component={ListingDetails} />
        <PrivateRoute exact path="/settings" component={Settings} />
        <PrivateRoute exact path="/mylistings" component={MyListings} />
        <PrivateRoute exact path="/submit" component={SubmitListing} />
        <PrivateRoute exact path="/profile" component={Profile} />

        {/* <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={ProfileForm} />
        <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} />
        <Route component={NotFound} /> */}
      </Switch>
    </section>
  );
};

export default Routes;