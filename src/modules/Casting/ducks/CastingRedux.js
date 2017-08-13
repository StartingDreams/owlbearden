import { fromJS } from 'immutable';
import axios from 'axios';

const apiUrl = 'https://us-central1-owlbearsden.cloudfunctions.net/dnd5eapi?path=';

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

export const getAllSpells = () => async (dispatch) => {
  dispatch(getRequest());
  try {
    const response = await axios.get(`${apiUrl}api/spells`);
    const parsedSpells = response.data.results.map(spell => (
      parseSpell(spell)
    ));

    const spells = fromJS(parsedSpells);
    dispatch(getSuccess(spells));
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
