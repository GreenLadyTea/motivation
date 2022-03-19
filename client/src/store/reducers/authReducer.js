import { SET_AUTH_STATUS, SET_MESSAGE, SET_TOKEN } from '../actions/authAction';

export const initialState = {
  isAuth: false,
  message: '',
  token: ''
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH_STATUS: {
      return { ...state, isAuth: action.payload };
    }
    case SET_MESSAGE: {
      return { ...state, message: action.payload };
    }
    case SET_TOKEN: {
      return { ...state, token: action.payload };
    }
    default: {
      return state;
    }
  }
}
