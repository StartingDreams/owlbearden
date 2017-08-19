import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import { toggleLeftDrawer, closeLeftDrawer } from '../../state/ui';
import { logout } from '../../state/auth';

export class Header extends React.Component {
  toggleLeftDrawerClick = () => {
    const { dispatch } = this.props;
    dispatch(toggleLeftDrawer());
  };

  closeLeftDrawerClick = () => {
    const { dispatch } = this.props;
    dispatch(closeLeftDrawer());
  };

  logoutClick = async () => {
    const { dispatch } = this.props;
    this.closeLeftDrawerClick();
    await firebase.auth().signOut();
    dispatch(logout());
    this.props.history.push('/login');
  };

  navigateHome = () => {
    this.closeLeftDrawerClick();
    this.props.history.push('/dashboard');
  };

  render = () => {
    const { isAuthenticated } = this.props;
    return (
      <AppBar
        title={<span style={{ cursor: 'pointer' }}>{'Owlbear\'s Den'}</span>}
        iconElementLeft={<IconButton><FontIcon className="material-icons">menu</FontIcon></IconButton>}
        onLeftIconButtonTouchTap={this.toggleLeftDrawerClick}
        onTitleTouchTap={this.navigateHome}
        iconElementRight={isAuthenticated ? (<FlatButton id="head-logout-button" label="Logout" onClick={this.logoutClick} />) : (<span />)}
      />
    );
  };
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export const mapStateToProps = state => ({
  isAuthenticated: state.auth.get('isAuthenticated'),
});

export default withRouter(connect(
  mapStateToProps,
)(Header));
