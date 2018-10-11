import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from '../src/helper';
import {
  Menu,
  ViewOrder,
  Login,
  ForgotPW,
  Register
} from "./views";

import { PrivateRoute, NotRequireLogin } from './components/commons';

export default () =>
  <Router history={history}>
    <Switch>
      <Route exact path='/' component={ViewOrder} />
      <Route path='/menu' component={Menu} />
      <Route path='/viewOrder' component={ViewOrder} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/forgotpw' component={ForgotPW} />
      {/* <Route component={PageNotFound}></Route> */}
    </Switch>
  </Router>;