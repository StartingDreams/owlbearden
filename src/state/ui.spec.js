import { fromJS } from 'immutable';
import reducer, * as ui from './ui';

describe('reducers', () => {
  describe('GET_REQUEST', () => {
    it('should toggle left drawer open', () => {
      const type = ui.toggleLeftDrawer();
      const state = fromJS({
        leftDrawerOpen: false,
      });
      const newState = reducer(state, type);
      expect(newState.get('leftDrawerOpen')).toBe(true);
    });
    it('should toggle left drawer close', () => {
      const type = ui.toggleLeftDrawer();
      const state = fromJS({
        leftDrawerOpen: true,
      });
      const newState = reducer(state, type);
      expect(newState.get('leftDrawerOpen')).toBe(false);
    });
    it('should close left drawer', () => {
      const type = ui.closeLeftDrawer();
      const state = fromJS({
        leftDrawerOpen: true,
      });
      const newState = reducer(state, type);
      expect(newState.get('leftDrawerOpen')).toBe(false);
    });
    it('should keep left drawer closed', () => {
      const type = ui.closeLeftDrawer();
      const state = fromJS({
        leftDrawerOpen: false,
      });
      const newState = reducer(state, type);
      expect(newState.get('leftDrawerOpen')).toBe(false);
    });
    it('should return the state', () => {
      const state = fromJS({
        some: 'state',
      });
      const newState = reducer(state, { type: 'none' });
      expect(newState).toBe(state);
    });
    it('empty state and action should return default state', () => {
      const newState = reducer();
      expect(newState).toBe(ui.INITIAL_STATE);
    });
  });
});
