import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { fromJS } from 'immutable';
import { Sidebar, mapStateToProps } from './Sidebar';
import { closeLeftDrawer } from '../../state/ui';

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
  it('closeLeftDrawer should be dispatched', () => {
    const leftDrawerOpen = false;
    const dispatch = jest.fn();
    const wrapper = shallow(<Sidebar
      dispatch={dispatch}
      leftDrawerOpen={leftDrawerOpen}
    />);
    wrapper.instance().closeLeftDrawerClick();
    expect(dispatch).toHaveBeenCalledWith(closeLeftDrawer());
  });
});
