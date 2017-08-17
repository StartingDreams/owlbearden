import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Firebase } from './Firebase';

jest.mock('./containers/Init', () => (function Init() {}));
jest.mock('./containers/Auth', () => (function Auth() {}));

describe('<Firebase />', () => {
  it('spell should match the snapshot', () => {
    const wrapper = shallow(<Firebase />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
