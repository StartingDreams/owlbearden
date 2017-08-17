import { fromJS } from 'immutable';
import reducer, * as auth from './FirebaseRedux';

describe('reducers', () => {
  it('should return the state', () => {
    const state = fromJS({});
    const newState = reducer(state, { type: 'none' });
    expect(newState).toBe(state);
  });
  it('empty state and action should return default state', () => {
    const newState = reducer();
    expect(newState).toBe(auth.INITIAL_STATE);
  });
});
