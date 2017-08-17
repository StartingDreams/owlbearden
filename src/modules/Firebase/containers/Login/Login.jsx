import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import firebase from 'firebase';

const auth = firebase.auth;
const provider = new auth.GoogleAuthProvider();

export const loginClick = () => {
  auth().signInWithRedirect(provider);
};

export class Login extends React.Component {
  redirect = () => (<Redirect to={{ pathname: '/' }} />);

  renderLogin = () => (<RaisedButton
    icon={<FontIcon className="material-icons">account_circle</FontIcon>}
    label="Login"
    secondary
    fullWidth
    onClick={loginClick}
  />);

  render = () => (this.props.isAuthenticated ? (this.redirect()) : (this.renderLogin()));
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export const mapStateToProps = state => ({
  isAuthenticated: state.auth.get('isAuthenticated'),
});

export default withRouter(connect(
  mapStateToProps,
)(Login));
