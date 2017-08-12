import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import { toggleLeftDrawer, closeLeftDrawer } from '../../state/ui';

export class OwlBearBar extends React.Component {
  toggleLeftDrawerClick = () => {
    const { dispatch } = this.props;
    dispatch(toggleLeftDrawer());
  };

  closeLeftDrawerClick = () => {
    const { dispatch } = this.props;
    dispatch(closeLeftDrawer());
  };

  navigateHome = () => {
    this.closeLeftDrawerClick();
    this.props.history.push('/');
  };

  render = () => {
    const { leftDrawerOpen } = this.props;
    return (
      <div>
        <AppBar
          title={<span style={{ cursor: 'pointer' }}>{'Owlbear\'s Den'}</span>}
          iconElementLeft={<IconButton><FontIcon className="material-icons">menu</FontIcon></IconButton>}
          onLeftIconButtonTouchTap={this.toggleLeftDrawerClick}
          onTitleTouchTap={this.navigateHome}
        />
        <Drawer open={leftDrawerOpen} containerStyle={{ top: '64px' }} >
          <MenuItem
            leftIcon={<FontIcon className="material-icons">home</FontIcon>}
            containerElement={<NavLink to="/" />}
            onTouchTap={this.closeLeftDrawerClick}
          >Home</MenuItem>
          <MenuItem
            leftIcon={<FontIcon className="material-icons">whatshot</FontIcon>}
            containerElement={<NavLink to="/casting/spells" />}
            onTouchTap={this.closeLeftDrawerClick}
          >Casting</MenuItem>
        </Drawer>
      </div>
    );
  };
}

OwlBearBar.propTypes = {
  leftDrawerOpen: PropTypes.bool,
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export const mapStateToProps = state => ({
  leftDrawerOpen: state.ui.get('leftDrawerOpen'),
});

export default withRouter(connect(
  mapStateToProps,
)(OwlBearBar));
