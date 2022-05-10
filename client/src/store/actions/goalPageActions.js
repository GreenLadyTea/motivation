import axios from 'axios';

const goalsURL = 'http://localhost:5000/api/goals/';

export const GOAL_PAGE_ACTIONS = {
  SET_GOAL: 'setGoal',
  SET_SUBSCRIBERS: 'setSubscribers',
  SET_COMMENTS: ''
};

export const setGoal = goal => ({
  type: GOAL_PAGE_ACTIONS.SET_GOAL,
  payload: goal
});

export const setSubscribers = subscribers => ({
  type: GOAL_PAGE_ACTIONS.SET_SUBSCRIBERS,
  payload: subscribers
});

export const setComments = comments => ({
  type: GOAL_PAGE_ACTIONS.SET_COMMENTS,
  payload: comments
});

export const getGoal = id => async dispatch => {
  try {
    const response = await axios.get(`${goalsURL}goal/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    dispatch(setGoal(response.data));
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
