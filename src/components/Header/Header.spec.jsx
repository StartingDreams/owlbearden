import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { fromJS } from 'immutable';
import { Header, mapStateToProps } from './Header';
import { toggleLeftDrawer, closeLeftDrawer } from '../../state/ui';
import { logout } from '../../state/auth';

jest.mock('firebase', () => {
  const signOut = jest.fn();
  const authReturn = {
    signOut,
  };
  const auth = () => (authReturn);

  auth.signOut = signOut;
  return { auth };
});
const firebase = require('firebase');

describe('<Header />', () => {
  let isAuthenticated = null;
  let dispatch = null;
  let history = null;
  beforeEach(() => {
    isAuthenticated = true;
    dispatch = jest.fn();
    history = {
      push: jest.fn(),
    };
  });

  it('should match the authenticated snapshot', () => {
    const wrapper = shallow(
      <Header
        isAuthenticated
        dispatch={dispatch}
        history={history}
      />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should match the unauthenticated snapshot', () => {
    const wrapper = shallow(
      <Header
        isAuthenticated={false}
        dispatch={dispatch}
        history={history}
      />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('logout should be dispatched', async () => {
    const wrapper = shallow(
      <Header
        isAuthenticated={isAuthenticated}
        dispatch={dispatch}
        history={history}
      />);
    await wrapper.instance().logoutClick();
    expect(history.push).toHaveBeenCalledWith('/login');
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
  it('closeLeftDrawer should be dispatched', () => {
    const wrapper = shallow(
      <Header
        isAuthenticated={isAuthenticated}
        dispatch={dispatch}
        history={history}
      />);
    wrapper.instance().closeLeftDrawerClick();
    expect(dispatch).toHaveBeenCalledWith(closeLeftDrawer());
  });
  it('toggleLeftDrawer should be dispatched', () => {
    const wrapper = shallow(
      <Header
        isAuthenticated={isAuthenticated}
        dispatch={dispatch}
        history={history}
      />);
    wrapper.instance().toggleLeftDrawerClick();
    expect(dispatch).toHaveBeenCalledWith(toggleLeftDrawer());
  });
  it('navigateHome should go to dashboard', () => {
    const wrapper = shallow(
      <Header
        isAuthenticated={isAuthenticated}
        dispatch={dispatch}
        history={history}
      />);
    wrapper.instance().navigateHome();
    expect(history.push).toHaveBeenCalledWith('/dashboard');
  });
  it('mapStateToProps - isAuthenticated should be passed in', () => {
    const isAuthenticated = false;
    const auth = fromJS({
      isAuthenticated,
    });
    const state = {
      auth,
    };
    const props = mapStateToProps(state);
    expect(props.isAuthenticated).toBe(auth.get('isAuthenticated'));
  });
});
