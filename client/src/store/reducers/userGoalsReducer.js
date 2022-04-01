import { USER_GOALS_ACTIONS } from '../actions/userGoalsActions';

export const initialState = {
  goals: [],
  filter: '',
  searchbar: ''
};

export function userGoalsReducer(state = initialState, action) {
  switch (action.type) {
    case USER_GOALS_ACTIONS.SET_GOALS: {
      return { ...state, goals: action.payload };
    }
    case USER_GOALS_ACTIONS.EXECUTE: {
      for (let i = 0; i < state.goals.length; i++) {
        if (state.goals[i]._id === action.payload) {
          state.goals[i].status = 'done';
        }
      }
      return { ...state, goals: [...state.goals] };
    }
    case USER_GOALS_ACTIONS.FILTER: {
      return { ...state, filter: action.payload };
    }
    case USER_GOALS_ACTIONS.SEARCH: {
      return { ...state, searchbar: action.payload };
    }
    default: {
      return state;
    }
  }
}
