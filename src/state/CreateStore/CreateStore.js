import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

export default (rootReducer) => {
  const middleware = [thunk];
  const enhancers = [];

  enhancers.push(applyMiddleware(...middleware));

  return createStore(rootReducer, compose(...enhancers));
};
