import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from '../src/helper';
import Home from "../src/views/home/Home";

import { PrivateRoute, NotRequireLogin } from './components/commons';

export default () =>
  <Router history={history}>
    <Switch>
      <Route path='' component={Home} />
      {/* <Route component={PageNotFound}></Route> */}
    </Switch>
  </Router>;