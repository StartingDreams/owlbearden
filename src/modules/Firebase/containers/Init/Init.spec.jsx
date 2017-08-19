import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import renderer from 'react-test-renderer';
import { Init } from './Init';
import config from '../../config';

jest.mock('firebase', () => {
  const initializeApp = jest.fn();
  return { initializeApp };
});

const firebase = require('firebase');

describe('<Init />', () => {
  it('spell should match the snapshot', () => {
    const wrapper = shallow(<Init />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('login should be dispatched', () => {
    renderer.create(<Init />);
    expect(firebase.initializeApp).toHaveBeenCalledWith(config);
  });
});
