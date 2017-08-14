import { fromJS } from 'immutable';
import axios from 'axios';
import firebase from 'firebase';

const dnd5eapiUrl = 'https://us-central1-owlbearsden.cloudfunctions.net/dnd5eapi?path=';
const database = firebase.database();

export const Types = {
  GET_REQUEST: 'casting/GET_REQUEST',
  GET_SUCCESS: 'casting/GET_SUCCESS',
  GET_FAILURE: 'casting/GET_FAILURE',
};

export const getRequest = () => ({
  type: Types.GET_REQUEST,
});

export const getSuccess = spells => ({
  type: Types.GET_SUCCESS,
  spells,
});

export const getFailure = error => ({
  type: Types.GET_FAILURE,
  error,
});

export const parseSpell = spell => (
  Object.assign({}, spell, {
    something: 'custom',
  })
);

export const getAllSpellsFrom5edndapi = () => async (dispatch) => {
  dispatch(getRequest());
  try {
    const response = await axios.get(`${dnd5eapiUrl}api/spells`);
    const parsedSpells = response.data.results.map(spell => (
      parseSpell(spell)
    ));

    const spells = fromJS(parsedSpells);
    dispatch(getSuccess(spells));
  } catch (error) {
    dispatch(getFailure(error.message));
  }
};

export const getAllSpells = () => async (dispatch) => {
  dispatch(getRequest());
  try {
    database.ref('dnd/casting/spells/').once('value', (snapshot) => {
      const rawSpells = Object.values(snapshot.val());
      const spells = fromJS(rawSpells);
      dispatch(getSuccess(spells));
    }, (error) => {
      dispatch(getFailure(error.message));
    });
  } catch (error) {
    dispatch(getFailure(error.message));
  }
};

export const INITIAL_STATE = fromJS({
  fetching: false,
  redirecting: false,
  spells: [],
});

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return state.set('fetching', true);
    case Types.GET_SUCCESS:
      return state.withMutations(s => s
        .set('spells', fromJS(action.spells))
        .set('fetching', false));
    case Types.GET_FAILURE:
      return state.set('fetching', false);
    default:
      return state;
  }
}
