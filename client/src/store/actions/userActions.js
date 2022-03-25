import axios from 'axios';

const URL = 'http://localhost:5000/api/goal';

export const AUTH_ACTIONS = {
  SET_GOALS: 'setGoals',
  FILTER: 'filter'
};

export const setGoals = goals => ({
  type: AUTH_ACTIONS.SET_GOALS,
  payload: goals
});

export const filter = filter => ({
  type: AUTH_ACTIONS.FILTER,
  payload: filter
});

export const search = searchbar => ({
  type: AUTH_ACTIONS.SEARCH,
  payload: searchbar
});

export const getGoals = () => async dispatch => {
  try {
    const response = await axios.get(`${URL}`, {
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
