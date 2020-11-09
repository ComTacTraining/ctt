import React from "react";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import { Route, Switch, withRouter } from "react-router-dom";
import Home from "./components/pages/Home";
import SignIn from "./components/pages/SignIn";
import Admin from "./components/pages/Admin/Admin";
import Demo from "./components/pages/Demo";
import Subscribe from "./components/pages/Subscribe/Subscribe";
import Evolution from "./components/pages/Evolution";
import Profile from "./components/Profile/Profile";
import Reviews from "./components/pages/Reviews";
import PrivacyPolicy from "./components/pages/Legal/PrivacyPolicy";
import TermsOfService from "./components/pages/Legal/TermsOfService";
import RefundPolicy from "./components/pages/Legal/RefundPolicy";

const routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/sign-in">
          <AmplifyAuthenticator>
            <SignIn />
          </AmplifyAuthenticator>
        </Route>
        <Route path="/admin">
          <AmplifyAuthenticator>
            <Admin />
          </AmplifyAuthenticator>
        </Route>
        <Route exact path="/demo">
          <AmplifyAuthenticator>
            <Demo />
          </AmplifyAuthenticator>
        </Route>
        <Route exact path="/subscribe">
          <AmplifyAuthenticator>
            <Subscribe />
          </AmplifyAuthenticator>
        </Route>
        <Route exact path="/profile">
          <AmplifyAuthenticator>
            <Profile />
          </AmplifyAuthenticator>
        </Route>
        <Route exact path="/reviews">
          <AmplifyAuthenticator>
            <Reviews />
          </AmplifyAuthenticator>
        </Route>
        <Route exact path="/privacy-policy">
          <PrivacyPolicy />
        </Route>
        <Route exact path="/terms-of-service">
          <TermsOfService />
        </Route>
        <Route exact path="/refund-policy">
          <RefundPolicy />
        </Route>
        <Route path="/evolution/:category/:construction?/:id?">
          <AmplifyAuthenticator>
            <Evolution />
          </AmplifyAuthenticator>
        </Route>
      </Switch>
    </div>
  );
};

export default withRouter(routes);
