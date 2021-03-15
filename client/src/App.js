import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import 'fontsource-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppNavbar from './components/AppNavbar'
import Auctions from './components/Auctions'
import Routes from './components/routes/Routes';
import Toolbar from '@material-ui/core/Toolbar';

//Redux
import { Provider } from 'react-redux';
import store from './flux/store';
import { loadUser } from './flux/actions/authActions';

function App() {
  
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <CssBaseline />
      <Router>
        <Fragment>
        <AppNavbar />
        <Toolbar />
          <Switch>
            <Route exact path="/" component={Auctions} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;



