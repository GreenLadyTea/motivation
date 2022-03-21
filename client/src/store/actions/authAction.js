import api from '../../api/Api';

export const ACTIONS = {
  SET_AUTH_STATUS: 'setAuthStatus',
  SET_MESSAGE: 'setMessage',
  SET_USER: 'setUser',
  LOGOUT: 'logout'
};

export const setAuthStatus = auth => ({
  type: ACTIONS.SET_AUTH_STATUS,
  payload: auth
});

export const setUser = user => ({
  type: ACTIONS.SET_USER,
  payload: user
});

export const setMessage = message => ({
  type: ACTIONS.SET_MESSAGE,
  payload: message
});

export const logout = () => ({
  type: ACTIONS.LOGOUT
});

export const signIn = (login, password) => async dispatch => {
  const data = await api.signIn(login, password);
  dispatch(setAuthStatus(true));
  dispatch(setUser(data.user));
  localStorage.setItem('token', data.token);
};

export const signUp = (login, password, fio) => async () => {
  await api.signUp(login, password, fio);
};

export const checkAuth = () => async dispatch => {
  const data = await api.checkAuth();
  dispatch(setUser(data.user));
  localStorage.setItem('token', data.token);
  dispatch(setAuthStatus(true));
};
