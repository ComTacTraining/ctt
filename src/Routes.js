import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from './containers/Home';
import Admin from './containers/Admin/Admin';
import Evolution from './containers/Evolution';
import Profile from './containers/Profile/Profile';
import Reviews from './containers/Reviews';
import PrivacyPolicy from './containers/Legal/PrivacyPolicy';
import TermsOfService from './containers/Legal/TermsOfService';
import RefundPolicy from './containers/Legal/RefundPolicy';

const routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/admin'>
          <Admin />
        </Route>
        <Route exact path='/profile'>
          <Profile />
        </Route>
        <Route exact path='/reviews'>
          <Reviews />
        </Route>
        <Route exact path='/privacy-policy'>
          <PrivacyPolicy />
        </Route>
        <Route exact path='/terms-of-service'>
          <TermsOfService />
        </Route>
        <Route exact path='/refund-policy'>
          <RefundPolicy />
        </Route>
        <Route path='/evolution/:category/:construction?/:id?'>
          <Evolution />
        </Route>
      </Switch>
    </div>
  );
}

export default withRouter(routes);