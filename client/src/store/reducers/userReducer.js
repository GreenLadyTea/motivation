import { AUTH_ACTIONS } from '../actions/userActions';

export const initialState = {
  goals: [],
  filter: '',
  searchbar: ''
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_ACTIONS.SET_GOALS: {
      return { ...state, goals: action.payload };
    }
    case AUTH_ACTIONS.FILTER: {
      return { ...state, filter: action.payload };
    }
    case AUTH_ACTIONS.SEARCH: {
      return { ...state, searchbar: action.payload };
    }
    default: {
      return state;
    }
  }
}
