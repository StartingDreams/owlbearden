import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import { login, logout } from '../../../../state/auth';

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export class Auth extends React.Component {
  componentDidMount = () => {
    const { dispatch } = this.props;
    firebase.auth().onAuthStateChanged((loginAsUser) => {
      if (loginAsUser) {
        dispatch(login(loginAsUser));
        this.props.history.push('/dashboard');
      } else {
        dispatch(logout());
        this.props.history.push('/login');
      }
    });
  };

  render = () => null;
}

Auth.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(connect()(Auth));
