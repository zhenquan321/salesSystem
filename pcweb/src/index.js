import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import Routes from './Routes';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
const loggerMiddleware = createLogger()

const store = createStore(
  reducers,
  compose(
    applyMiddleware(
      thunkMiddleware, // allow us dispatch function
      loggerMiddleware   // use to log  action
    ),
  )
)

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
