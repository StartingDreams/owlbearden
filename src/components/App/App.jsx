import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Theme } from '../../styleguide';

const propTypes = {
  children: React.PropTypes.element.isRequired,
};

const App = ({ children }) => (
  <MuiThemeProvider muiTheme={Theme}>
    { children }
  </MuiThemeProvider>
);

App.propTypes = propTypes;

export default App;
