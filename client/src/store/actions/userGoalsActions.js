import axios from 'axios';

const URL = 'http://localhost:5000/api/goals';

export const USER_GOALS_ACTIONS = {
  SET_GOALS: 'setGoals',
  FILTER: 'filter',
  SEARCH: 'search',
  EXECUTE: 'execute'
};

export const setGoals = goals => ({
  type: USER_GOALS_ACTIONS.SET_GOALS,
  payload: goals
});

export const execute = id => ({
  type: USER_GOALS_ACTIONS.EXECUTE,
  payload: id
});

export const filter = filter => ({
  type: USER_GOALS_ACTIONS.FILTER,
  payload: filter
});

export const search = searchbar => ({
  type: USER_GOALS_ACTIONS.SEARCH,
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

export const doGoal = id => async dispatch => {
  try {
    const response = await axios.put(
      `${URL}/${id}`,
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
