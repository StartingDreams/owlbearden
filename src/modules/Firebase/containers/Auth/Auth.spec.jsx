import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import renderer from 'react-test-renderer';
import { Auth } from './Auth';
import { login, logout } from '../../../../state/auth';

jest.mock('firebase', () => {
  let callback = null;
  const setPersistence = jest.fn();
  const onAuthStateChanged = (cb) => { callback = cb; };
  const persistence = 'TEST_PERSISTENCE';
  const authReturn = {
    onAuthStateChanged,
    setPersistence,
  };
  const auth = () => (authReturn);

  auth.callback = () => (callback);
  auth.setPersistence = setPersistence;
  auth.persistence = persistence;
  auth.Auth = {
    Persistence: {
      LOCAL: persistence,
    },
  };
  return { auth };
});

const firebase = require('firebase');

describe('<Auth />', () => {
  let dispatch;
  let history;

  beforeEach(() => {
    dispatch = jest.fn();
    history = { push: jest.fn() };
  });

  it('should match the login snapshot', () => {
    const wrapper = shallow(<Auth history={history} dispatch={dispatch} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('persistence should be set', () => {
    const wrapper = shallow(<Auth history={history} dispatch={dispatch} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(firebase.auth().setPersistence).toHaveBeenCalledWith(
      firebase.auth.Auth.Persistence.LOCAL,
    );
  });

  it('login should be dispatched', () => {
    const user = 'USER';
    renderer.create(<Auth history={history} dispatch={dispatch} />);
    const callback = firebase.auth.callback();
    callback(user);
    expect(history.push).toHaveBeenCalledWith('/dashboard');
    expect(dispatch).toHaveBeenCalledWith(login(user));
  });

  it('logout should be dispatched', () => {
    renderer.create(<Auth history={history} dispatch={dispatch} />);
    const callback = firebase.auth.callback();
    callback();
    expect(history.push).toHaveBeenCalledWith('/login');
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
});
