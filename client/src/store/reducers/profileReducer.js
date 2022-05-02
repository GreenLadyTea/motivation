import { PROFILE_ACTIONS } from '../actions/profileActions';

export const initialState = {
  description: '',
  goals: [],
  filter: '',
  searchbar: ''
};

export function profileReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_ACTIONS.SET_DESCRIPTION: {
      return { ...state, description: action.payload };
    }
    case PROFILE_ACTIONS.SET_GOALS: {
      return { ...state, goals: action.payload };
    }
    case PROFILE_ACTIONS.EXECUTE: {
      for (let i = 0; i < state.goals.length; i++) {
        if (state.goals[i]._id === action.payload) {
          state.goals[i].status = 'done';
        }
      }
      return { ...state, goals: [...state.goals] };
    }
    case PROFILE_ACTIONS.FILTER: {
      return { ...state, filter: action.payload };
    }
    case PROFILE_ACTIONS.SEARCH: {
      return { ...state, searchbar: action.payload };
    }
    default: {
      return state;
    }
  }
}
