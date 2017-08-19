import { fromJS } from 'immutable';
import firebase from 'firebase';

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

export const getAllSpells = (dispatch) => {
  try {
    dispatch(getRequest());
    database.ref('dnd/casting/spells/').once('value', (snapshot) => {
      const values = snapshot.val();
      const rawSpells = Object.keys(values).map(key => (values[key]));
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
        .set('spells', fromJS(action.spells)))
        .set('fetching', false);
    case Types.GET_FAILURE:
      return state.set('fetching', false);
    default:
      return state;
  }
}
