import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import account from './account';
import ui from './ui';
import casting from '../modules/Casting/ducks/CastingRedux';

export default () => {
  const rootReducer = combineReducers({
    account,
    ui,
    casting,
  });

  return configureStore(rootReducer);
};
