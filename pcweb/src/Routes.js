import React from 'react';
import PropTypes from 'prop-types';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from './containers/PrivateRoute';
import Login from './containers/Login';
import * as storage from './utils/storage';
import {
  ADMIN_ID,
  TOKEN
} from './constants';
import {
  setCurrentUser
} from './actions'

//按需加载
import Loadable from 'react-loadable';
const MyLoadingComponent = ({ isLoading, error }) => {
  if (isLoading) {
      return <div>Loading...</div>
  }
  else if (error) {
      return <div>Sorry, there was a problem loading the page.</div>
  }
  else {
      return null;
  }
};
const AsyncHome = Loadable({
  loader: () => import('./containers/Home/index'),
  loading: MyLoadingComponent
});


@connect(
  state => {
    return {
      isAuthenticated: state.auth.isAuthenticated
    }
  },
  dispatch => ({
    setCurrentUser: (user) => {
      return dispatch(setCurrentUser(user))
    }
  })
)



export default class Routes extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    setCurrentUser: PropTypes.func.isRequired
  }

  componentWillMount() {
    const adminId = parseInt(storage.getStorage(ADMIN_ID), 10)
    const token = storage.getStorage(TOKEN)

    if (adminId && token) {
      this.props.setCurrentUser({
        adminId,
        token
      })
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/signin" component={Login} />
          <PrivateRoute exract component={AsyncHome} />
        </Switch>
      </Router>
    )
  }
}
