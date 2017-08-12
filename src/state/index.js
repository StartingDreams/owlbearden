import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import casting from '../modules/Casting/ducks/CastingRedux';

export default () => {
  const rootReducer = combineReducers({
    casting,
  });

  return configureStore(rootReducer);
};
