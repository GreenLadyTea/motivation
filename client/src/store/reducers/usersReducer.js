import { USERS_ACTIONS } from '../actions/usersActions';

export const initialState = {
  users: []
};

export function usersReducer(state = initialState, action) {
  switch (action.type) {
    case USERS_ACTIONS.SET_USERS: {
      return { ...state, users: [...action.payload] };
    }
    default: {
      return state;
    }
  }
}
