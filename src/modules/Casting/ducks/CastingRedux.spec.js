import { fromJS } from 'immutable';
import reducer, * as CastingRedux from './CastingRedux';

jest.mock('firebase', () => {
  let success = null;
  let error = null;
  let value = null;
  let calledRef = null;
  const once = (v, successCB, errorCB) => {
    error = errorCB;
    success = successCB;
    value = v;
  };
  const dbReturn = {
    ref: (ref) => {
      calledRef = ref;
      return { once };
    },
  };
  const database = () => (dbReturn);

  dbReturn.ref.once = once;
  database.success = () => (success);
  database.error = () => (error);
  database.value = () => (value);
  database.ref = dbReturn.ref;
  database.calledRef = () => (calledRef);
  return { database };
});

const database = require('firebase').database;

const errorMessage = 'some error';

describe('reducers', () => {
  it('getRequestType should return a get request reducer action', () => {
    const getRequestAction = {
      type: CastingRedux.Types.GET_REQUEST,
    };
    expect(CastingRedux.getRequest()).toEqual(getRequestAction);
  });
  it('getSuccess should return a get request reducer action', () => {
    const spells = 'some_spell';
    const getSuccessAction = {
      type: CastingRedux.Types.GET_SUCCESS,
      spells,
    };
    expect(CastingRedux.getSuccess(spells)).toEqual(getSuccessAction);
  });
  it('getFailure should return a get request reducer action', () => {
    const error = 'error';
    const getFailureAction = {
      type: CastingRedux.Types.GET_FAILURE,
      error,
    };
    expect(CastingRedux.getFailure(error)).toEqual(getFailureAction);
  });
  it('getAllSpells should dispatch getRequest', () => {
    const dispatch = jest.fn();
    CastingRedux.getAllSpells(dispatch);
    expect(dispatch).toHaveBeenCalledWith(CastingRedux.getRequest());
  });
  it('getAllSpells should call the database correctly', () => {
    CastingRedux.getAllSpells(() => {});
    expect(database.calledRef()).toBe('dnd/casting/spells/');
    expect(database.value()).toBe('value');
  });
  it('getAllSpells should dispatch getFailure on failure', () => {
    const dispatch = jest.fn();
    const error = { message: errorMessage };

    CastingRedux.getAllSpells(dispatch);
    database.error()(error);
    expect(dispatch).toBeCalledWith(CastingRedux.getFailure(errorMessage));
  });
  it('getAllSpells should dispatch getSuccess on success', () => {
    const dispatch = jest.fn();
    const snapshot = {
      val: () => ({
        test1: 'test1',
        test2: 'test2',
      }),
    };
    const values = snapshot.val();
    const snapshotValues = Object.keys(values).map(key => (values[key]));
    const testSpells = fromJS(snapshotValues);
    CastingRedux.getAllSpells(dispatch);
    database.success()(snapshot);
    expect(dispatch).toBeCalledWith(CastingRedux.getSuccess(testSpells));
  });
  it('getAllSpells should dispatch getFailure on exception', () => {
    const dispatch = jest.fn();
    dispatch.mockImplementationOnce(() => {
      throw new Error(errorMessage);
    });
    dispatch.mockImplementationOnce(() => {});
    CastingRedux.getAllSpells(dispatch);
    expect(dispatch).toBeCalledWith(CastingRedux.getFailure(errorMessage));
  });
  it('should return the fetching state', () => {
    const state = fromJS({ fetching: false });
    const newState = reducer(state, CastingRedux.getRequest());
    expect(newState.get('fetching')).toBe(true);
  });
  it('should clear the fetching state', () => {
    const state = fromJS({ fetching: true });
    const newState = reducer(state, CastingRedux.getFailure());
    expect(newState.get('fetching')).toBe(false);
  });
  it('should return the success state', () => {
    const spells = 'spells';
    const state = fromJS({ fetching: true, spells });
    const newState = reducer(state, CastingRedux.getSuccess(spells));
    expect(newState.get('fetching')).toBe(false);
    expect(newState.get('spells')).toBe(spells);
  });
  it('empty state and action should return default state', () => {
    const newState = reducer();
    expect(newState).toBe(CastingRedux.INITIAL_STATE);
  });
});
