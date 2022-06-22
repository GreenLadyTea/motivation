import axios from 'axios';

const goalsURL = 'http://localhost:5000/api/goals/';
const commentsURL = 'http://localhost:5000/api/comments/';
const usersURL = 'http://localhost:5000/api/users/';

export const GOAL_PAGE_ACTIONS = {
  SET_GOAL: 'setGoal',
  SET_COMMENTS: 'setComments',
  SET_SUBSCRIBERS: 'setSubscribers'
};

export const setGoal = goal => ({
  type: GOAL_PAGE_ACTIONS.SET_GOAL,
  payload: goal
});

export const setComments = comments => ({
  type: GOAL_PAGE_ACTIONS.SET_COMMENTS,
  payload: comments
});

export const setSubscribers = subscribers => ({
  type: GOAL_PAGE_ACTIONS.SET_SUBSCRIBERS,
  payload: subscribers
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

export const postComment = async (goalId, text) => {
  try {
    return await axios.post(
      `${commentsURL}`,
      { goalId, text },
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

export const getComments = id => async dispatch => {
  try {
    const response = await axios.get(`${commentsURL}${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    dispatch(setComments(response.data));
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

export const getSubscribers = id => async dispatch => {
  try {
    const response = await axios.get(`${usersURL}subscribers/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    dispatch(setSubscribers(response.data));
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
