import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { fromJS } from 'immutable';
import { Sidebar, mapStateToProps } from './Sidebar';

describe('<Sidebar />', () => {
  it('should match the snapshot', () => {
    const leftDrawerOpen = false;
    const wrapper = shallow(<Sidebar leftDrawerOpen={leftDrawerOpen} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('mapStateToProps - leftDrawerOpen should be passed in', () => {
    const leftDrawerOpen = false;
    const ui = fromJS({
      leftDrawerOpen,
    });
    const state = {
      ui,
    };
    const props = mapStateToProps(state);
    expect(props.leftDrawerOpen).toBe(ui.get('leftDrawerOpen'));
  });
});
