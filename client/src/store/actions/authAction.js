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

export const registration = async (login, password, fio) => {
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

export const signIn = (login, password) => async dispatch => {
  const data = await api.signIn(login, password);
  dispatch(setAuthStatus(true));
  dispatch(setUser(data.user));
  console.log(data.user);
  localStorage.setItem('token', data.token);
};

export const checkAuth = () => async dispatch => {
  const data = await api.checkAuth();
  dispatch(setUser(data.user));
  localStorage.setItem('token', data.token);
  console.log(data.token);
  dispatch(setAuthStatus(true));
};
