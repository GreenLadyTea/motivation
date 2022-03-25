import { GOAL_ACTIONS } from '../actions/goalActions';

export const initialState = {
  goals: [],
  filter: '',
  searchbar: ''
};

export function goalReducer(state = initialState, action) {
  switch (action.type) {
    case GOAL_ACTIONS.SET_GOALS: {
      return { ...state, goals: action.payload };
    }
    default: {
      return state;
    }
  }
}
