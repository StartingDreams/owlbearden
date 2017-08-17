import { fromJS } from 'immutable';
import reducer, * as auth from './auth';

describe('auth_redux', () => {
  describe('GET_REQUEST', () => {
    it('should login', () => {
      const user = 'user';
      const type = auth.login(user);
      const newState = reducer(auth.INITIAL_STATE, type);
      expect(newState.get('user')).toBe(user);
      expect(newState.get('isAuthenticated')).toBe(true);
    });
    it('should logout', () => {
      const type = auth.logout();
      const newState = reducer(auth.INITIAL_STATE, type);
      expect(newState.get('user')).toBe(null);
      expect(newState.get('isAuthenticated')).toBe(false);
    });
  });
  describe('reducers', () => {
    it('should return the state', () => {
      const state = fromJS({
        some: 'state',
      });
      const newState = reducer(state, { type: 'none' });
      expect(newState).toBe(state);
    });
    it('empty state and action should return default state', () => {
      const newState = reducer();
      expect(newState).toBe(auth.INITIAL_STATE);
    });
  });
});
