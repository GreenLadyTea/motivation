import { GOAL_PAGE_ACTIONS } from '../actions/goalPageActions';

export const initialState = {
  goal: {},
  subscribers: [],
  comments: []
};

export function goalPageReducer(state = initialState, action) {
  switch (action.type) {
    case GOAL_PAGE_ACTIONS.SET_GOAL: {
      return { ...state, goal: action.payload };
    }
    case GOAL_PAGE_ACTIONS.SET_SUBSCRIBERS: {
      return { ...state, subscribers: [...action.payload] };
    }
    case GOAL_PAGE_ACTIONS.SET_COMMENTS: {
      return { ...state, comments: [...action.payload] };
    }
    default: {
      return state;
    }
  }
}
