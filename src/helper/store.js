import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../redux/reducers';

const loggerMiddleware = createLogger();

let storeEnhancers = [];
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  storeEnhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  checkBrowserSupportReduxDevtools = true;
}

export const store = createStore(
  rootReducer,
  compose(applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  ),
    ...storeEnhancers
  )

);