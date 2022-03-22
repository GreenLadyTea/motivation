import { GOAL_ACTIONS } from '../actions/goalAction';

export const initialState = {
  goals: []
};

export function goalReducer(state = initialState, action) {
  switch (action.type) {
    case GOAL_ACTIONS.CREATE_NEW_GOAL: {
      return { ...state, goals: [...state.goals, action.payload] };
    }
    default: {
      return state;
    }
  }
}
