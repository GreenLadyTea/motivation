import { OTHER_PROFILE_ACTIONS } from '../actions/otherProfileActions';

export const initialState = {
  description: 'Нет описания',
  newGoals: [],
  doneGoals: [],
  approvedGoals: [],
  failedGoals: [],
  avatar: ''
};

export function otherProfileReducer(state = initialState, action) {
  switch (action.type) {
    case OTHER_PROFILE_ACTIONS.SET_DESCRIPTION: {
      return { ...state, description: action.payload };
    }
    case OTHER_PROFILE_ACTIONS.SET_AVATAR: {
      return { ...state, avatar: action.payload };
    }
    case OTHER_PROFILE_ACTIONS.SET_NEW_GOALS: {
      return { ...state, newGoals: [...action.payload] };
    }
    case OTHER_PROFILE_ACTIONS.SET_DONE_GOALS: {
      return { ...state, doneGoals: [...action.payload] };
    }
    case OTHER_PROFILE_ACTIONS.SET_APPROVED_GOALS: {
      return { ...state, approvedGoals: [...action.payload] };
    }
    case OTHER_PROFILE_ACTIONS.SET_FAILED_GOALS: {
      return { ...state, failedGoals: [...action.payload] };
    }
    default: {
      return state;
    }
  }
}
