import { fromJS } from 'immutable';

export const firebaseConfig = {
  apiKey: 'AIzaSyDg4Z-8ROBMuRtzU5ThnU1GMd2IWgsttEU',
  authDomain: 'owlbearsden.firebaseapp.com',
  databaseURL: 'https://owlbearsden.firebaseio.com',
  projectId: 'owlbearsden',
  storageBucket: 'owlbearsden.appspot.com',
  messagingSenderId: '149275717879',
};

export const Types = {
  LOGIN: 'owlbearden/LOGIN',
  LOGOUT: 'owlbearden/LOGOUT',
};

export const login = user => ({
  type: Types.LOGIN,
  user,
});

export const logout = () => ({
  type: Types.LOGOUT,
});

export const INITIAL_STATE = fromJS({
  user: null,
  isAuthenticated: false,
});

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case Types.LOGIN:
      return state.withMutations(s => s
        .set('user', fromJS(action.user))
        .set('isAuthenticated', true));
    case Types.LOGOUT:
      return state.withMutations(s => s
        .set('user', fromJS(action.user))
        .set('isAuthenticated', false));
    default:
      return state;
  }
}
