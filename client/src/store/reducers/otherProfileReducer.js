import { OTHER_PROFILE_ACTIONS } from '../actions/otherProfileActions';

export const initialState = {
  description: 'Нет описания',
  goals: [],
  filter: ''
};

export function otherProfileReducer(state = initialState, action) {
  switch (action.type) {
    case OTHER_PROFILE_ACTIONS.SET_DESCRIPTION: {
      return { ...state, description: action.payload };
    }
    case OTHER_PROFILE_ACTIONS.SET_GOALS: {
      return { ...state, goals: [...action.payload] };
    }
    default: {
      return state;
    }
  }
}
