import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import toJson from 'enzyme-to-json';
import { NoMatch, mapStateToProps } from './NoMatch';

describe('<NoMatch />', () => {
  it('mapStateToProps - isAuthenticated should be passed in', () => {
    const state = {
      auth: fromJS({ isAuthenticated: true }),
    };
    const props = mapStateToProps(state);
    expect(props.isAuthenticated).toBe(true);
  });
  it('authenticated users should match the dashboard snapshot', () => {
    const wrapper = shallow(<NoMatch isAuthenticated />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('unauthenticated users should match the login snapshot', () => {
    const wrapper = shallow(<NoMatch isAuthenticated={false} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
