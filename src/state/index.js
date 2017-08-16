import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import auth from './auth';
import ui from './ui';
import casting from '../modules/Casting/ducks/CastingRedux';

export function createStore() {
  const rootReducer = combineReducers({
    auth,
    ui,
    casting,
  });

  return configureStore(rootReducer);
}

export default createStore;
