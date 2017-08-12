import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { toggleLeftDrawer, closeLeftDrawer } from '../../state/ui';

export class OwlBearBar extends React.PureComponent {
  toggleLeftDrawerClick = () => {
    const { dispatch } = this.props;
    dispatch(toggleLeftDrawer());
  };

  closeLeftDrawerClick = () => {
    const { dispatch } = this.props;
    dispatch(closeLeftDrawer());
  };

  render = () => {
    const { leftDrawerOpen } = this.props;
    return (
      <div>
        <AppBar
          title="Owlbear Den"
          iconElementLeft={<IconButton><FontIcon className="material-icons">menu</FontIcon></IconButton>}
          onLeftIconButtonTouchTap={this.toggleLeftDrawerClick}
        />
        <Drawer open={leftDrawerOpen} containerStyle={{ top: '64px' }} >
          <MenuItem
            leftIcon={<FontIcon className="material-icons">home</FontIcon>}
            containerElement={<Link to="/" />}
            onTouchTap={this.closeLeftDrawerClick}
          >Home</MenuItem>
          <MenuItem
            leftIcon={<FontIcon className="material-icons">whatshot</FontIcon>}
            containerElement={<Link to="/casting/spells" />}
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
};

export const mapStateToProps = state => ({
  leftDrawerOpen: state.ui.get('leftDrawerOpen'),
});

export default connect(
  mapStateToProps,
)(OwlBearBar);
