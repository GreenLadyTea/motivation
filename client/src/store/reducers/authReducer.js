import { ACTIONS } from '../actions/authAction';

export const initialState = {
  isAuth: false,
  message: '',
  token: ''
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SET_AUTH_STATUS: {
      return { ...state, isAuth: action.payload };
    }
    case ACTIONS.SET_MESSAGE: {
      return { ...state, message: action.payload };
    }
    case ACTIONS.SET_TOKEN: {
      return { ...state, token: action.payload };
    }
    default: {
      return state;
    }
  }
}
