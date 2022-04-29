import axios from 'axios';

const URL = 'http://localhost:5000/api/auth';

export const AUTH_ACTIONS = {
  SET_AUTH_STATUS: 'setAuthStatus',
  SET_USER: 'setUser',
  LOGOUT: 'logout'
};

export const setAuthStatus = auth => ({
  type: AUTH_ACTIONS.SET_AUTH_STATUS,
  payload: auth
});

export const setUser = user => ({
  type: AUTH_ACTIONS.SET_USER,
  payload: user
});

export const logout = () => ({
  type: AUTH_ACTIONS.LOGOUT
});

export const signUp = async (login, password, username) => {
  try {
    const response = await axios.post(`${URL}/sign-up`, {
      login,
      password,
      username
    });
    return {
      status: response.status,
      message: response.data.message
    };
  } catch (e) {
    return {
      status: e.response.status,
      message: e.response.data.message
    };
  }
};

export const logIn = (login, password) => async dispatch => {
  try {
    const response = await axios.post(`${URL}/sign-in`, {
      login,
      password
    });
    dispatch(setAuthStatus(true));
    dispatch(setUser(response.data.user));
    localStorage.setItem('token', response.data.token);
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

export const checkAuth = () => async dispatch => {
  try {
    const response = await axios.get(`${URL}/check-auth`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    dispatch(setUser(response.data.user));
    localStorage.setItem('token', response.data.token);
  } catch (e) {
    localStorage.removeItem('token');
  }
};
