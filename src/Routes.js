import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from '../src/helper';
import {
  Menu,
  ViewOrder,
  Login,
  ForgotPW,
  Register,
  CreateProduct,
  UpdateProduct,
  ListProduct,
  ViewTable
} from "./views";

import { PrivateRoute, NotRequireLogin } from './components/commons';

export default () =>
  <Router history={history}>
    <Switch>
      <Route exact path='/' component={ViewOrder} />
      <Route path='/Menu' component={Menu} />
      <Route path='/ViewOrder' component={ViewOrder} />
      <Route path='/Login' component={Login} />
      <Route path='/Register' component={Register} />
      <Route path='/ForgotPW' component={ForgotPW} />
      <Route path='/CreateProduct' component={CreateProduct} />
      <Route path='/UpdateProduct' component={UpdateProduct} />
      <Route path='/ListProduct' component={ListProduct} />
      <Route path='/ViewTable' component={ViewTable} />
      {/* <Route component={PageNotFound}></Route> */}
    </Switch>
  </Router>;