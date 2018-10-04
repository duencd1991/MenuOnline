import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from '../src/helper';
import Menu from "./views/menu/Menu";
import ViewOrder from "./views/viewOrder/ViewOrder";

import { PrivateRoute, NotRequireLogin } from './components/commons';

export default () =>
  <Router history={history}>
    <Switch>
      <Route path='/menu' component={Menu} />
      <Route path='/viewOrder' component={ViewOrder} />
      {/* <Route component={PageNotFound}></Route> */}
    </Switch>
  </Router>;