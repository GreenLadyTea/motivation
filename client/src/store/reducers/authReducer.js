import { SET_AUTH_STATUS, SET_MESSAGE } from '../actions/authAction';

export const initialState = {
  isAuth: false,
  message: ''
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH_STATUS: {
      return { ...state, isAuth: action.payload };
    }
    case SET_MESSAGE: {
      return { ...state, message: action.payload };
    }
    default: {
      return state;
    }
  }
}
