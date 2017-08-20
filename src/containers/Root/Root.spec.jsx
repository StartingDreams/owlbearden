import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Root from './Root';

jest.mock('../../state', () => ({
  createStore: jest.fn(),
}));

jest.mock('react-redux', () => ({
  Provider: 'Provider',
}));

jest.mock('react-router-dom', () => ({
  BrowserRouter: 'BrowserRouter',
  Route: 'Route',
}));

jest.mock('../../styleguide', () => ({
  Theme: 'Theme',
}));

jest.mock('material-ui/styles/MuiThemeProvider', () => (function MuiThemeProvider() {}));

jest.mock('material-ui/Paper', () => (function Paper() {}));

jest.mock('../../components/Header', () => (function Header() {}));

jest.mock('../../components/Sidebar', () => (function Sidebar() {}));

jest.mock('../../modules/Dashboard', () => (function Dashboard() {}));

jest.mock('../../components/NoMatch', () => (function NoMatch() {}));

jest.mock('../../modules/Firebase', () => (function Firebase() {}));

jest.mock('../../modules/Firebase/containers/Login', () => (function Login() {}));

jest.mock('../../modules/Casting/containers/SpellList', () => (function Spells() {}));

jest.mock('../../components/PrivateRoute', () => (function PrivateRoute() {}));

describe('<Root />', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<Root />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
