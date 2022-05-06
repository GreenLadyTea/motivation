import axios from 'axios';

const goalsURL = 'http://localhost:5000/api/goals';

const usersURL = 'http://localhost:5000/api/users';

export const OTHER_PROFILE_ACTIONS = {
  SET_DESCRIPTION: 'setDescription',
  SET_GOALS: 'setGoals',
  FILTER: 'filter'
};

export const setDescription = description => ({
  type: OTHER_PROFILE_ACTIONS.SET_DESCRIPTION,
  payload: description
});

export const setGoals = goals => ({
  type: OTHER_PROFILE_ACTIONS.SET_GOALS,
  payload: goals
});

export const getDescription = username => async dispatch => {
  try {
    const response = await axios.get(`${usersURL}/${username}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    dispatch(setDescription(response.data.description));
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

export const getUserGoals = username => async dispatch => {
  try {
    const response = await axios.get(`${goalsURL}/${username}`, {
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
