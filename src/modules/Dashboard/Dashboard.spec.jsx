import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Dashboard } from './Dashboard';

describe('<Init />', () => {
  it('spell should match the snapshot', () => {
    const wrapper = shallow(<Dashboard />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
