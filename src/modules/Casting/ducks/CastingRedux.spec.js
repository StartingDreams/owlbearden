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

const spells = [
  {
    casting_time: '1 action',
    classes: [{
      name: 'Wizard',
      url: 'http://www.dnd5eapi.co/api/classes/12',
    }],
    components: ['V', 'S', 'M'],
    concentration: 'no',
    desc: ['A shimmering green arrow streaks toward a target within range and bursts in a spray of acid. Make a ranged spell attack against the target. On a hit, the target takes 4d4 acid damage immediately and 2d4 acid damage at the end of its next turn. On a miss, the arrow splashes the target with acid for half as much of the initial damage and no damage at the end of its next turn.'],
    duration: 'Instantaneous',
    higher_level: ['When you cast this spell using a spell slot of 3rd level or higher, the damage (both initial and later) increases by 1d4 for each slot level above 2nd.'],
    id: '58f40b80c9e7ce9f72153112',
    index: 1,
    level: 2,
    material: 'Powdered rhubarb leaf and an adder’s stomach.',
    name: 'Acid Arrow',
    page: 'phb 259',
    range: '90 feet',
    ritual: 'no',
    school: {
      name: 'Evocation',
      url: 'http://www.dnd5eapi.co/api/magic-schools/5',
    },
    subclasses: [{
      name: 'Lore',
      url: 'http://www.dnd5eapi.co/api/subclasses/2',
    }, {
      name: 'Land',
      url: 'http://www.dnd5eapi.co/api/subclasses/4',
    }],
    url: 'http://www.dnd5eapi.co/api/spells/1',
  },
  {
    casting_time: '1 minute',
    classes: [{
      name: 'Cleric',
      url: 'http://www.dnd5eapi.co/api/classes/3',
    }],
    components: ['V', 'S', 'M'],
    concentration: 'no',
    desc: ['You contact your deity or a divine proxy and ask up to three questions that can be answered with a yes or no. You must ask your questions before the spell ends. You receive a correct answer for each question.', 'Divine beings aren’t necessarily omniscient, so you might receive “unclear” as an answer if a question pertains to information that lies beyond the deity’s knowledge. In a case where a one-word answer could be misleading or contrary to the deity’s interests, the DM might offer a short phrase as an answer instead.', 'If you cast the spell two or more times before finishing your next long rest, there is a cumulative 25 percent chance for each casting after the first that you get no answer. The DM makes this roll in secret.'],
    duration: '1 minute',
    id: '58f40b80c9e7ce9f72153149',
    index: 45,
    level: 5,
    material: 'Incense and a vial of holy or unholy water.',
    name: 'Commune',
    page: 'phb 223',
    range: 'Self',
    ritual: 'yes',
    school: {
      name: 'Divination',
      url: 'http://www.dnd5eapi.co/api/magic-schools/3',
    },
    subclasses: [{
      name: 'Devotion',
      url: 'http://www.dnd5eapi.co/api/subclasses/7',
    }],
    url: 'http://www.dnd5eapi.co/api/spells/45',
  },
  {
    casting_time: '1 bonus action',
    classes: [{
      name: 'Paladin',
      url: 'http://www.dnd5eapi.co/api/classes/7',
    }],
    components: ['V', 'S'],
    concentration: 'yes',
    desc: ['Your prayer empowers you with divine radiance. Until the spell ends, your weapon attacks deal an extra 1d4 radiant damage on a hit.'],
    duration: 'Up to 1 minute',
    id: '58f40b80c9e7ce9f72153164',
    index: 84,
    level: 1,
    name: 'Divine Favor',
    page: 'phb 234',
    range: 'Self',
    ritual: 'no',
    school: {
      name: 'Evocation',
      url: 'http://www.dnd5eapi.co/api/magic-schools/5',
    },
    subclasses: [{
      name: 'Lore',
      url: 'http://www.dnd5eapi.co/api/subclasses/2',
    }],
    url: 'http://www.dnd5eapi.co/api/spells/84',
  },
];

const database = require('firebase').database;

const errorMessage = 'some error';
const immutableSpells = fromJS(spells);


describe('reducers', () => {
  it('getRequestType should return a get request reducer action', () => {
    const getRequestAction = {
      type: CastingRedux.Types.GET_REQUEST,
    };
    expect(CastingRedux.getRequest()).toEqual(getRequestAction);
  });
  it('getSuccess should return a get request reducer action', () => {
    const allSpells = 'some_spell';
    const getSuccessAction = {
      type: CastingRedux.Types.GET_SUCCESS,
      allSpells,
    };
    expect(CastingRedux.getSuccess(allSpells)).toEqual(getSuccessAction);
  });
  it('getFailure should return a get request reducer action', () => {
    const error = 'error';
    const getFailureAction = {
      type: CastingRedux.Types.GET_FAILURE,
      error,
    };
    expect(CastingRedux.getFailure(error)).toEqual(getFailureAction);
  });
  it('setFilteredSpells should return a setFilteredSpells reducer action', () => {
    const filteredSpells = immutableSpells;
    const setFilteredSpellsAction = {
      type: CastingRedux.Types.SET_FILTERED_SPELLS,
      filteredSpells,
    };
    expect(CastingRedux.setFilteredSpells(filteredSpells)).toEqual(setFilteredSpellsAction);
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
  it('should return the filteredSpells state', () => {
    const filteredSpells = immutableSpells;
    const state = fromJS({ filteredSpells });
    const newState = reducer(state, CastingRedux.setFilteredSpells(filteredSpells));
    expect(newState.get('filteredSpells')).toBe(filteredSpells);
  });
  it('empty state and action should return default state', () => {
    const newState = reducer();
    expect(newState).toBe(CastingRedux.INITIAL_STATE);
  });
});
