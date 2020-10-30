import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from './components/pages/Home';
import Admin from './components/pages/Admin/Admin';
import Evolution from './components/pages/Evolution';
import Profile from './components/Profile/Profile';
import Reviews from './components/pages/Reviews';
import PrivacyPolicy from './components/pages/Legal/PrivacyPolicy';
import TermsOfService from './components/pages/Legal/TermsOfService';
import RefundPolicy from './components/pages/Legal/RefundPolicy';

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