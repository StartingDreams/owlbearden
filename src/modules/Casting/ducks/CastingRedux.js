import { fromJS } from 'immutable';
import firebase from 'firebase';

const database = firebase.database();

export const Types = {
  GET_REQUEST: 'casting/GET_REQUEST',
  GET_SUCCESS: 'casting/GET_SUCCESS',
  GET_FAILURE: 'casting/GET_FAILURE',
  SET_FILTERS: 'casting/SET_FILTERS',
  SET_FILTERED_SPELLS: 'casting/SET_FILTERED_SPELLS',
};

export const getRequest = () => ({
  type: Types.GET_REQUEST,
});

export const getSuccess = allSpells => ({
  type: Types.GET_SUCCESS,
  allSpells,
});

export const getFailure = error => ({
  type: Types.GET_FAILURE,
  error,
});

export const setFilteredSpells = filteredSpells => ({
  type: Types.SET_FILTERED_SPELLS,
  filteredSpells,
});

export const setFilters = filters => ({
  type: Types.SET_FILTERS,
  filters,
});

export const getAllSpells = (dispatch) => {
  try {
    dispatch(getRequest());
    database.ref('dnd/casting/spells/').once('value', (snapshot) => {
      const values = snapshot.val();
      const rawSpells = Object.keys(values).map(key => (values[key]));
      const allSpells = fromJS(rawSpells);
      dispatch(getSuccess(allSpells));
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
  filteredSpells: [],
  allSpells: [],
  filters: {
    levels: [1],
    classes: ['Wizard'],
    range: [],
    concentration: [],
    components: [],
    ritual: [],
  },
});

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return state.set('fetching', true);
    case Types.GET_SUCCESS:
      return state.withMutations(s => s
        .set('allSpells', fromJS(action.allSpells)))
        .set('fetching', false);
    case Types.GET_FAILURE:
      return state.set('fetching', false);
    case Types.SET_FILTERED_SPELLS:
      return state.withMutations(s => s
        .set('filteredSpells', fromJS(action.filteredSpells)));
    case Types.SET_FILTERS:
      return state.set('filters', action.filters);
    default:
      return state;
  }
}
