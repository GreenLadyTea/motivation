import { AUTH_ACTIONS } from '../actions/authActions';

export const initialState = {
  isAuth: false,
  user: {}
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_ACTIONS.SET_AUTH_STATUS: {
      return { ...state, isAuth: action.payload };
    }
    case AUTH_ACTIONS.SET_USER: {
      return { ...state, user: action.payload };
    }
    case AUTH_ACTIONS.LOGOUT: {
      return { ...state, isAuth: false, user: {} };
    }
    default: {
      return state;
    }
  }
}
