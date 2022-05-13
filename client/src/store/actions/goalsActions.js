import axios from 'axios';

const URL = 'http://localhost:5000/api/goals';

export const GOALS_ACTIONS = {
  SET_GOALS: 'setGoals',
  FILTER: 'filter',
  SEARCH: 'search',
  SET_REQUEST_STATUS: 'setRequestStatus'
};

export const REQUEST_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
};

export const setGoals = goals => ({
  type: GOALS_ACTIONS.SET_GOALS,
  payload: goals
});

export const filter = filter => ({
  type: GOALS_ACTIONS.FILTER,
  payload: filter
});

export const search = searchbar => ({
  type: GOALS_ACTIONS.SEARCH,
  payload: searchbar
});

export const setRequestStatus = status => ({
  type: GOALS_ACTIONS.SET_REQUEST_STATUS,
  payload: status
});

export const create = async (title, description, term) => {
  try {
    return await axios.post(
      `${URL}`,
      { title, description, term },
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

export const update = async (id, title, description, term) => {
  try {
    return await axios.put(
      `${URL}/${id}`,
      { title, description, term },
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

export const getAllGoals = id => async dispatch => {
  try {
    dispatch(setRequestStatus(REQUEST_STATUS.LOADING));
    const response = await axios.get(`${URL}/all`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    const allGoals = response.data;
    const reducedGoals = allGoals.filter(goal => goal.userId !== id);
    dispatch(setGoals(reducedGoals));
    dispatch(setRequestStatus(REQUEST_STATUS.SUCCESS));
    return {
      status: response.status
    };
  } catch (e) {
    dispatch(setRequestStatus(REQUEST_STATUS.ERROR));
    return {
      status: e.response.status,
      message: e.response.data.message
    };
  }
};

export const trackGoal = async id => {
  try {
    const response = await axios.put(
      `${URL}/track/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
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
