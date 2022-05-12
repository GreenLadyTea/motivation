import axios from 'axios';

const goalsURL = 'http://localhost:5000/api/goals';

const usersURL = 'http://localhost:5000/api/users';

export const PROFILE_ACTIONS = {
  SET_USERNAME: 'setUsername',
  SET_DESCRIPTION: 'setDescription',
  SET_GOALS: 'setGoals',
  SET_TRACKED_GOALS: 'setTrackedGoals',
  FILTER: 'filter',
  EXECUTE: 'execute'
};

export const setUsername = username => ({
  type: PROFILE_ACTIONS.SET_USERNAME,
  payload: username
});

export const setDescription = description => ({
  type: PROFILE_ACTIONS.SET_DESCRIPTION,
  payload: description
});

export const setGoals = goals => ({
  type: PROFILE_ACTIONS.SET_GOALS,
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

export const filter = filter => ({
  type: PROFILE_ACTIONS.FILTER,
  payload: filter
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

export const getGoals = () => async dispatch => {
  try {
    const response = await axios.get(`${goalsURL}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    dispatch(setGoals(response.data));
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
      `${goalsURL}/${id}`,
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
