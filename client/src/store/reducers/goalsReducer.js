import { GOALS_ACTIONS } from '../actions/goalsActions';

export const initialState = {
  goals: [],
  filter: '',
  searchbar: ''
};

export function goalsReducer(state = initialState, action) {
  switch (action.type) {
    case GOALS_ACTIONS.SET_GOALS: {
      return { ...state, goals: [...action.payload] };
    }
    case GOALS_ACTIONS.SEARCH: {
      return { ...state, searchBar: action.payload };
    }
    default: {
      return state;
    }
  }
}
