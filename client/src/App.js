import React, { Fragment, useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "fontsource-roboto";
import CssBaseline from "@material-ui/core/CssBaseline";
import Routes from "./components/routes/Routes";
import Toolbar from "@material-ui/core/Toolbar";
import { createBrowserHistory } from "history";
import ReactGA from "react-ga";
import "./App.css";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";

//Redux
import { Provider } from "react-redux";
import store from "./flux/store";
import { loadUser } from "./flux/actions/authActions";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Loading from "./components/Loading";
import Terms from "./components/legal/Terms";
import Privacy from "./components/legal/Privacy";
import SubmitExplainer from "./components/SubmitExplainer";
import Home from "./components/Home";

const AppNavbar = React.lazy(() => import("./components/AppNavbar"));
const Auctions = React.lazy(() => import("./components/Auctions"));
const Footer = React.lazy(() => import("./components/Footer"));
const Faq = React.lazy(() => import("./components/faq/Faq"));
const About = React.lazy(() => import("./components/faq/About"));

const stripePromise = loadStripe(
  "pk_live_51IarEuAFyb1kAVtipNIUbLRMfAjvwN52rgc2Ksm80tC5ZmR0amBBDSTdjIAQOciiDOUEK2bAxYAiCJyyh71IRaXB00a4nWsFGu"

  // "pk_test_51IarEuAFyb1kAVtidDxjDpeHAQ3DprarSyD2Iqw8SED8aHlfxw2Pq4PQDqVJgiljBON7g3iecBIyaMloukPVD9nx00au4jfT5a"
);
const history = createBrowserHistory();
// Initialize google analytics page view tracking
const trackingId = "UA-187812241-4";
ReactGA.initialize(trackingId);

history.listen((location) => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const [growsurfActive, setGrowSurf] = useState(false);

  useEffect(() => {
    if (growsurfActive === false) {
      const script = document.createElement("script");
      script.src = "https://app.growsurf.com/growsurf.js?v=2.0.0";
      script.setAttribute("grsf-campaign", "04tse5");
      script.async = true;
      document.head.appendChild(script);

      window.addEventListener("grsfReady", () => {
        console.log("GrowSurf is Ready!");
        // Your code goes here....
        setGrowSurf(true);
      });
    }
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#234324",
      },
    },
    typography: {
      button: {
        textTransform: "none",
      },
      h3: {
        fontFamily: '"Montserrat", Open Sans',
      },
      h4: {
        fontFamily: '"Montserrat", Open Sans',
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Elements stripe={stripePromise}>
          <CssBaseline />
          <Router history={history}>
            <Fragment>
              <body>
                <Suspense
                  fallback={
                    <div>
                      <Loading />
                    </div>
                  }
                >
                  <header>
                    <AppNavbar />
                  </header>
                  <Toolbar />
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/faq" component={Faq} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/terms-of-use" component={Terms} />
                    <Route exact path="/privacy-policy" component={Privacy} />
                    <Route
                      exact
                      path="/sell-a-watch"
                      component={SubmitExplainer}
                    />
                    <Route component={Routes} />
                  </Switch>
                  <footer>
                    <Footer />
                  </footer>
                </Suspense>
              </body>
            </Fragment>
          </Router>
        </Elements>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
