import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { NavLink, withRouter } from 'react-router-dom';
import { toggleLeftDrawer, closeLeftDrawer } from '../../state/ui';
import { logout } from '../../state/auth';

export class OwlBearBar extends React.Component {
  toggleLeftDrawerClick = () => {
    const { dispatch } = this.props;
    dispatch(toggleLeftDrawer());
  };

  closeLeftDrawerClick = () => {
    const { dispatch } = this.props;
    dispatch(closeLeftDrawer());
  };

  logoutClick = async () => {
    await firebase.auth().signOut();
    const { dispatch } = this.props;
    dispatch(logout());
    this.props.history.push('/login');
  };

  navigateHome = () => {
    this.closeLeftDrawerClick();
    this.props.history.push('/dashboard');
  };

  render = () => {
    const { leftDrawerOpen, isAuthenticated } = this.props;
    return (
      <div>
        <AppBar
          title={<span style={{ cursor: 'pointer' }}>{'Owlbear\'s Den'}</span>}
          iconElementLeft={<IconButton><FontIcon className="material-icons">menu</FontIcon></IconButton>}
          onLeftIconButtonTouchTap={this.toggleLeftDrawerClick}
          onTitleTouchTap={this.navigateHome}
          iconElementRight={isAuthenticated ? (<FlatButton label="Logout" onClick={this.logoutClick} />) : (<span />)}
        />
        <Drawer open={leftDrawerOpen} containerStyle={{ top: '64px' }} >
          <MenuItem
            leftIcon={<FontIcon className="material-icons">dashboard</FontIcon>}
            containerElement={<NavLink to="/dashboard" />}
            onTouchTap={this.closeLeftDrawerClick}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            leftIcon={<FontIcon className="material-icons">whatshot</FontIcon>}
            containerElement={<NavLink to="/casting/spells" />}
            onTouchTap={this.closeLeftDrawerClick}
          >
            Spells
          </MenuItem>
        </Drawer>
      </div>
    );
  };
}

OwlBearBar.propTypes = {
  leftDrawerOpen: PropTypes.bool,
  isAuthenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export const mapStateToProps = state => ({
  isAuthenticated: state.auth.get('isAuthenticated'),
  leftDrawerOpen: state.ui.get('leftDrawerOpen'),
});

export default withRouter(connect(
  mapStateToProps,
)(OwlBearBar));
