import { GOALS_ACTIONS, REQUEST_STATUS } from '../actions/goalsActions';

export const initialState = {
  goals: [],
  filter: '',
  searchbar: '',
  requestStatus: REQUEST_STATUS.IDLE
};

export function goalsReducer(state = initialState, action) {
  switch (action.type) {
    case GOALS_ACTIONS.SET_GOALS: {
      return { ...state, goals: [...action.payload] };
    }
    case GOALS_ACTIONS.SEARCH: {
      return { ...state, searchBar: action.payload };
    }
    case GOALS_ACTIONS.SET_REQUEST_STATUS: {
      return { ...state, requestStatus: action.payload };
    }
    default: {
      return state;
    }
  }
}
