import axios from 'axios';

const goalsURL = 'http://localhost:5000/api/goals';

const usersURL = 'http://localhost:5000/api/users';

export const PROFILE_ACTIONS = {
  SET_USERNAME: 'setUsername',
  SET_AVATAR: 'setAvatar',
  SET_DESCRIPTION: 'setDescription',
  SET_NEW_GOALS: 'setNewGoals',
  SET_DONE_GOALS: 'setDoneGoals',
  SET_APPROVED_GOALS: 'setApprovedGoals',
  SET_FAILED_GOALS: 'setFailedGoals',
  SET_TRACKED_GOALS: 'setTrackedGoals',
  EXECUTE: 'execute',
  DELETE: 'delete'
};

export const GOAL_STATUS = {
  NEW: 'new',
  DONE: 'done',
  APPROVED: 'approved',
  FAILED: 'failed'
};

export const setUsername = username => ({
  type: PROFILE_ACTIONS.SET_USERNAME,
  payload: username
});

export const setDescription = description => ({
  type: PROFILE_ACTIONS.SET_DESCRIPTION,
  payload: description
});

export const setAvatar = avatar => ({
  type: PROFILE_ACTIONS.SET_AVATAR,
  payload: avatar
});

export const setNewGoals = goals => ({
  type: PROFILE_ACTIONS.SET_NEW_GOALS,
  payload: goals
});

export const setDoneGoals = goals => ({
  type: PROFILE_ACTIONS.SET_DONE_GOALS,
  payload: goals
});

export const setApprovedGoals = goals => ({
  type: PROFILE_ACTIONS.SET_APPROVED_GOALS,
  payload: goals
});

export const setFailedGoals = goals => ({
  type: PROFILE_ACTIONS.SET_FAILED_GOALS,
  payload: goals
});

export const setTrackedGoals = goals => ({
  type: PROFILE_ACTIONS.SET_TRACKED_GOALS,
  payload: goals
});

export const execute = id => ({
  type: PROFILE_ACTIONS.EXECUTE,
  payload: id
});

export const remove = id => ({
  type: PROFILE_ACTIONS.DELETE,
  payload: id
});

export const updateDescription = async description => {
  try {
    return await axios.post(
      `${usersURL}/description`,
      { description },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
  } catch (e) {
    return {
      status: e.response.status,
      message: e.response.data.message
    };
  }
};

export const getUser = () => async dispatch => {
  try {
    const response = await axios.get(`${usersURL}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    dispatch(setDescription(response.data.description));
    dispatch(setUsername(response.data.username));
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

export const getNewGoals = () => async dispatch => {
  try {
    const response = await axios.get(`${goalsURL}/current/${GOAL_STATUS.NEW}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    dispatch(setNewGoals(response.data));
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

export const getDoneGoals = () => async dispatch => {
  try {
    const response = await axios.get(`${goalsURL}/current/${GOAL_STATUS.DONE}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    dispatch(setDoneGoals(response.data));
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

export const getApprovedGoals = () => async dispatch => {
  try {
    const response = await axios.get(`${goalsURL}/current/${GOAL_STATUS.APPROVED}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    dispatch(setApprovedGoals(response.data));
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

export const getFailedGoals = () => async dispatch => {
  try {
    const response = await axios.get(`${goalsURL}/current/${GOAL_STATUS.FAILED}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    dispatch(setFailedGoals(response.data));
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

export const getTrackedGoals = username => async dispatch => {
  try {
    const response = await axios.get(`${goalsURL}/tracked/${username}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    dispatch(setTrackedGoals(response.data));
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

export const doGoal = id => async dispatch => {
  try {
    const response = await axios.put(
      `${goalsURL}/execute/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
    dispatch(execute(id));
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

export const deleteGoal = id => async dispatch => {
  try {
    const response = await axios.delete(`${goalsURL}/${id}`, {});
    dispatch(remove(id));
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
