import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import toJson from 'enzyme-to-json';
import { Login, loginClick, mapStateToProps } from './Login';

jest.mock('firebase', () => {
  const signInWithRedirect = jest.fn();
  const authReturn = {
    signInWithRedirect,
  };
  const auth = () => (authReturn);

  auth.GoogleAuthProvider = function Provider() { return { test: 'test' }; };
  return { auth };
});
const firebase = require('firebase');

const auth = firebase.auth;

describe('<Login />', () => {
  it('login click should call signInWithRedirect', () => {
    loginClick();
    // wrapper.find('RaisedButton').simulate('touchTap');
    expect(auth().signInWithRedirect).toHaveBeenCalledWith({ test: 'test' });
  });
  it('mapStateToProps - isAuthenticated should be passed in', () => {
    const state = {
      auth: fromJS({ isAuthenticated: true }),
    };
    const props = mapStateToProps(state);
    expect(props.isAuthenticated).toBe(true);
  });
  it('unauthenticated should match the login snapshot', () => {
    const isAuthenticated = fromJS(false);
    const wrapper = shallow(<Login isAuthenticated={isAuthenticated} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('authenticated should match the home snapshot', () => {
    const isAuthenticated = fromJS(true);
    const wrapper = shallow(<Login isAuthenticated={isAuthenticated} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

