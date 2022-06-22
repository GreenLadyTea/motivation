import axios from 'axios';

const goalsURL = 'http://localhost:5000/api/goals';

const usersURL = 'http://localhost:5000/api/users';

export const OTHER_PROFILE_ACTIONS = {
  SET_DESCRIPTION: 'setDescription',
  SET_NEW_GOALS: 'setGoals',
  SET_DONE_GOALS: 'setDoneGoals',
  SET_APPROVED_GOALS: 'setApprovedGoals',
  SET_FAILED_GOALS: 'setFailedGoals',
  SET_AVATAR: 'setAvatar',
  FILTER: 'filter'
};

export const GOAL_STATUS = {
  NEW: 'new',
  DONE: 'done',
  APPROVED: 'approved',
  FAILED: 'failed'
};

export const setDescription = description => ({
  type: OTHER_PROFILE_ACTIONS.SET_DESCRIPTION,
  payload: description
});

export const setUserNewGoals = goals => ({
  type: OTHER_PROFILE_ACTIONS.SET_NEW_GOALS,
  payload: goals
});

export const setUserDoneGoals = goals => ({
  type: OTHER_PROFILE_ACTIONS.SET_DONE_GOALS,
  payload: goals
});

export const setUserApprovedGoals = goals => ({
  type: OTHER_PROFILE_ACTIONS.SET_APPROVED_GOALS,
  payload: goals
});

export const setUserFailedGoals = goals => ({
  type: OTHER_PROFILE_ACTIONS.SET_FAILED_GOALS,
  payload: goals
});

export const setAvatar = avatar => ({
  type: OTHER_PROFILE_ACTIONS.SET_AVATAR,
  payload: avatar
});

export const getUser = username => async dispatch => {
  try {
    const response = await axios.get(`${usersURL}/${username}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    dispatch(setDescription(response.data.description));
    dispatch(setAvatar(response.data.avatar));
    return {
      status: response.status
    };
  } catch (e) {
    return {
      status: e.response.status,
      message: e.response.data.message
    };
  }
};

export const getUserNewGoals = username => async dispatch => {
  try {
    const response = await axios.get(`${goalsURL}/${username}?status=${GOAL_STATUS.NEW}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    dispatch(setUserNewGoals(response.data));
    return {
      status: response.status
    };
  } catch (e) {
    return {
      status: e.response.status,
      message: e.response.data.message
    };
  }
};

export const getUserDoneGoals = username => async dispatch => {
  try {
    const response = await axios.get(`${goalsURL}/${username}?status=${GOAL_STATUS.DONE}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    dispatch(setUserDoneGoals(response.data));
    return {
      status: response.status
    };
  } catch (e) {
    return {
      status: e.response.status,
      message: e.response.data.message
    };
  }
};

export const getUserApprovedGoals = username => async dispatch => {
  try {
    const response = await axios.get(`${goalsURL}/${username}?status=${GOAL_STATUS.APPROVED}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    dispatch(setUserApprovedGoals(response.data));
    return {
      status: response.status
    };
  } catch (e) {
    return {
      status: e.response.status,
      message: e.response.data.message
    };
  }
};

export const getUserFailedGoals = username => async dispatch => {
  try {
    const response = await axios.get(`${goalsURL}/${username}?status=${GOAL_STATUS.FAILED}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    dispatch(setUserFailedGoals(response.data));
    return {
      status: response.status
    };
  } catch (e) {
    return {
      status: e.response.status,
      message: e.response.data.message
    };
  }
};
