import { fromJS } from 'immutable';

export const INITIAL_STATE = fromJS({});

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
