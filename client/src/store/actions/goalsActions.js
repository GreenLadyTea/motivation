import axios from 'axios';

const URL = 'http://localhost:5000/api/goals';

export const GOALS_ACTIONS = {
  SET_GOALS: 'setGoals',
  FILTER: 'filter',
  SEARCH: 'search'
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

export const getAllGoals = () => async dispatch => {
  try {
    const response = await axios.get(`${URL}/all`, {
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
