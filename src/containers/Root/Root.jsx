import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  // Link
} from 'react-router-dom';

// import { syncHistoryWithStore } from 'react-router-redux';
import Home from '../../modules/Dashboard/Home';
import Spells from '../../modules/Casting/containers/Spells';
import createStore from '../../state';

const store = createStore();

export default function Root() {
  return (
    <Provider store={store}>
      <div id="react-root">
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/casting/spells" component={Spells} />
          </div>
        </Router>
      </div>
    </Provider>
  );
}
