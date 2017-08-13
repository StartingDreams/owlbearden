import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import config from '../../config';

firebase.initializeApp(config);

export class Firebase extends React.Component {
  componentDidMount = () => {};

  render = () => null;
}

Firebase.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(connect()(Firebase));
