import api from '../../api/Api';

export const ACTIONS = {
  SET_AUTH_STATUS: 'setAuthStatus',
  SET_MESSAGE: 'setMessage',
  SET_TOKEN: 'setToken'
};

export const setAuthStatus = auth => ({
  type: ACTIONS.SET_AUTH_STATUS,
  payload: auth
});

export const setToken = token => ({
  type: ACTIONS.SET_TOKEN,
  payload: token
});

export const setMessage = message => ({
  type: ACTIONS.SET_MESSAGE,
  payload: message
});

export const signIn = (login, password) => async dispatch => {
  const data = await api.signIn(login, password);
  dispatch(setAuthStatus(!!data.token));
  dispatch(setToken(data.token));
};

export const signUp = (login, password, fio) => async () => {
  await api.signUp(login, password, fio);
};
