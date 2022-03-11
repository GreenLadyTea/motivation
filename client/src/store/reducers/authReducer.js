import { SET_AUTH_STATUS } from '../actions/authAction';

export const initialState = {
  isAuth: false
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH_STATUS: {
      return { ...state, isAuth: action.payload };
    }
    default: {
      return state;
    }
  }
}
