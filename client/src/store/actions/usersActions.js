import axios from 'axios';

const URL = 'http://localhost:5000/api/users';

export const USERS_ACTIONS = {
  SET_USERS: 'setUsers'
};

export const setUsers = users => ({
  type: USERS_ACTIONS.SET_USERS,
  payload: users
});

export const getAllUsers = () => async dispatch => {
  try {
    const response = await axios.get(`${URL}/all`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    dispatch(setUsers(response.data));
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
