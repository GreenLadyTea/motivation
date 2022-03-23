import api, { URL } from '../../api/Api';
import axios from 'axios';

export const AUTH_ACTIONS = {
  SET_AUTH_STATUS: 'setAuthStatus',
  SET_MESSAGE: 'setMessage',
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

export const setMessage = message => ({
  type: AUTH_ACTIONS.SET_MESSAGE,
  payload: message
});

export const logout = () => ({
  type: AUTH_ACTIONS.LOGOUT
});

export const signUp = async (login, password, fio) => {
  try {
    const response = await axios.post(`${URL}/auth/sign-up`, {
      login,
      password,
      fio
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
    const response = await axios.post(`${URL}/auth/sign-in`, {
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
  const data = await api.checkAuth();
  dispatch(setUser(data.user));
  localStorage.setItem('token', data.token);
  dispatch(setAuthStatus(true));
};
