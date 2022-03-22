import { AUTH_ACTIONS } from '../actions/authAction';

export const initialState = {
  isAuth: false,
  message: '',
  user: {}
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_ACTIONS.SET_AUTH_STATUS: {
      return { ...state, isAuth: action.payload };
    }
    case AUTH_ACTIONS.SET_MESSAGE: {
      return { ...state, message: action.payload };
    }
    case AUTH_ACTIONS.SET_USER: {
      return { ...state, user: action.payload };
    }
    case AUTH_ACTIONS.LOGOUT: {
      localStorage.removeItem('token');
      return { ...state, isAuth: false, user: {} };
    }
    default: {
      return state;
    }
  }
}
