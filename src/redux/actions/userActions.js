import { userTypes } from '../../constants/actionTypes';
import * as services from '../../views/admin/users/services/userService';
import { alertActions } from './alertActions';
import { history } from '../../helper';
import cookie from 'react-cookies';

export const userActions = {
  login,
  logout,
  register
};

function login(user, remember) {
  return dispatch => {
    dispatch(request({ user }));
    services.login(user, response => {
      if (response.data.isSucess) {
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        localStorage.setItem('token', response.data.data.id);
        if (remember) {
          cookie.save("asio_email_login", user.email, { path: '/' });
        }
        dispatch(success(user));
        history.push('/');
      } else {
        dispatch(failure(response.data.description));
        dispatch(alertActions.error(response.data.description));
      }
    }
      , error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      });
  };

  function request(user) { return { type: userTypes.LOGIN_REQUEST, user } }
  function success(user) { return { type: userTypes.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: userTypes.LOGIN_FAILURE, error } }
}

function logout() {
  services.logout();
  return { type: userTypes.LOGOUT };
}

function register(user) {
  return dispatch => {
    dispatch(request(user));

    services.register(user, response => {
      if (response.data.isSucess) {
        dispatch(success());
        history.push('/login');
        dispatch(alertActions.success('Registration successful'));
      } else {
        dispatch(failure(response.data.description));
        dispatch(alertActions.error(response.data.description));
      }
    }, error => {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    })
  };

  function request(user) { return { type: userTypes.REGISTER_REQUEST, user } }
  function success(user) { return { type: userTypes.REGISTER_SUCCESS, user } }
  function failure(error) { return { type: userTypes.REGISTER_FAILURE, error } }
}