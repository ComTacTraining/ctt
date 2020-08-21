import React from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import Member from './Member';
import Incident from './Incident';

const Admin = () => {
  let match = useRouteMatch();

  return (
    <div>
      <h1>Admin</h1>
      <ul>
        <li>
          <Link to={`${match.url}/members`}>Members</Link>
        </li>
        <li>
          <Link to={`${match.url}/incidents`}>Incidents</Link>
        </li>
      </ul>

      <Switch>
        {/* <Route path={`${match.path}/:memberId`}>
          <Member />
        </Route> */}
        <Route path={`${match.url}/members`}>
          <Member />
        </Route>
        <Route path={`${match.url}/incidents`}>
          <Incident />
        </Route>
      </Switch>

    </div>
  );
};

export default Admin;