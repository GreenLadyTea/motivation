import { GOAL_STATUS, PROFILE_ACTIONS } from '../actions/profileActions';

export const initialState = {
  username: '',
  avatar: '',
  description: 'Нет описания',
  newGoals: [],
  doneGoals: [],
  approvedGoals: [],
  failedGoals: [],
  trackedGoals: []
};

export function profileReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_ACTIONS.SET_USERNAME: {
      return { ...state, username: action.payload };
    }
    case PROFILE_ACTIONS.SET_AVATAR: {
      return { ...state, avatar: action.payload };
    }
    case PROFILE_ACTIONS.SET_DESCRIPTION: {
      return { ...state, description: action.payload };
    }
    case PROFILE_ACTIONS.SET_NEW_GOALS: {
      return { ...state, newGoals: [...action.payload] };
    }
    case PROFILE_ACTIONS.SET_DONE_GOALS: {
      return { ...state, doneGoals: [...action.payload] };
    }
    case PROFILE_ACTIONS.SET_APPROVED_GOALS: {
      return { ...state, approvedGoals: [...action.payload] };
    }
    case PROFILE_ACTIONS.SET_FAILED_GOALS: {
      return { ...state, failedGoals: [...action.payload] };
    }
    case PROFILE_ACTIONS.SET_TRACKED_GOALS: {
      return { ...state, trackedGoals: [...action.payload] };
    }
    case PROFILE_ACTIONS.EXECUTE: {
      let doneGoal = {};
      for (let i = 0; i < state.newGoals.length; i++) {
        if (state.newGoals[i]._id === action.payload) {
          doneGoal = state.newGoals[i];
          doneGoal.status = GOAL_STATUS.DONE;
        }
      }
      return {
        ...state,
        newGoals: [...state.newGoals.filter(goal => goal._id !== action.payload)],
        doneGoals: [...state.doneGoals, doneGoal]
      };
    }
    case PROFILE_ACTIONS.DELETE: {
      return {
        ...state,
        newGoals: [...state.newGoals.filter(goal => goal._id !== action.payload)]
      };
    }
    default: {
      return state;
    }
  }
}
