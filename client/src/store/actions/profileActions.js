import axios from 'axios';

const URL = 'http://localhost:5000/api/goals';

const usersURL = 'http://localhost:5000/api/users';

export const PROFILE_ACTIONS = {
  SET_DESCRIPTION: 'setDescription',
  SET_GOALS: 'setGoals',
  FILTER: 'filter',
  SEARCH: 'search',
  EXECUTE: 'execute'
};

export const setDescription = description => ({
  type: PROFILE_ACTIONS.SET_DESCRIPTION,
  payload: description
});

export const setGoals = goals => ({
  type: PROFILE_ACTIONS.SET_GOALS,
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

export const search = searchbar => ({
  type: PROFILE_ACTIONS.SEARCH,
  payload: searchbar
});

export const addDescription = (description) => async dispatch => {
  try {
    const response = await axios.post(`${usersURL}/description`, { description },{
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    dispatch(setDescription(response.data.desc));
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
