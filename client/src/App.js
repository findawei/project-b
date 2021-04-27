import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Faq from './components/faq/Faq';

const stripePromise = loadStripe('pk_test_51IarEuAFyb1kAVtidDxjDpeHAQ3DprarSyD2Iqw8SED8aHlfxw2Pq4PQDqVJgiljBON7g3iecBIyaMloukPVD9nx00au4jfT5a');

function App() {
  
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Elements stripe={stripePromise}>
      <CssBaseline />
      <Router>
        <Fragment>
        <AppNavbar />
        <Toolbar />
          <Switch>
            <Route exact path="/" component={Auctions} />
            <Route exact path="/faq" component={Faq} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
      </Elements>
    </Provider>
  );
}

export default App;



