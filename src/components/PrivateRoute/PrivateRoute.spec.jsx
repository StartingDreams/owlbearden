import React from 'react';
import renderer from 'react-test-renderer';
import { fromJS } from 'immutable';
import { PrivateRoute, mapStateToProps } from './PrivateRoute';

jest.mock('react-router-dom', () => ({
  Redirect: 'Redirect',
  Route: props => (props.render(props)),
  withRouter: jest.fn(),
}));

describe('<PrivateRoute />', () => {
  it('mapStateToProps - isAuthenticated should be passed in', () => {
    const state = {
      auth: fromJS({ isAuthenticated: true }),
    };
    const props = mapStateToProps(state);
    expect(props.isAuthenticated).toBe(true);
  });
  it('authenticated users should match the dashboard snapshot', () => {
    const tree = renderer.create(<PrivateRoute
      isAuthenticated
      component={() => (<div>Authenticated</div>)}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('unauthenticated users should match the login snapshot', () => {
    const tree = renderer.create(<PrivateRoute
      isAuthenticated={false}
      component={() => (<div>Not Authenticated</div>)}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

