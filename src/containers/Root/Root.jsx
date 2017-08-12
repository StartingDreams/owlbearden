import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import { Theme } from '../../styleguide';
import OwlBearBar from '../../modules/OwlBearBar';
import Home from '../../modules/Dashboard';
import Spells from '../../modules/Casting/containers/Spells';
import createStore from '../../state';

const store = createStore();

export default function Root() {
  return (
    <Provider store={store}>
      <div id="react-root">
        <MuiThemeProvider muiTheme={Theme}>
          <div>
            <BrowserRouter>
              <div>
                <OwlBearBar />
                <Paper zDepth={1} style={{ margin: 0, padding: '10px' }}>
                  <Route exact path="/" component={Home} />
                  <Route path="/casting/spells" component={Spells} />
                </Paper>
              </div>
            </BrowserRouter>
          </div>
        </MuiThemeProvider>
      </div>
    </Provider>
  );
}
