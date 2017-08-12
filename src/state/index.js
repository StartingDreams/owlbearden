import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import ui from './ui';
import casting from '../modules/Casting/ducks/CastingRedux';

export default () => {
  const rootReducer = combineReducers({
    ui,
    casting,
  });

  return configureStore(rootReducer);
};
