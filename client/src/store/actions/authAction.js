import api from '../../api/Api';

export const SET_AUTH_STATUS = 'setAuthStatus';

export const SET_MESSAGE = 'setMessage';

export const SET_TOKEN = 'setToken';

export const signIn = (login, password) => async dispatch => {
  const data = await api.signIn(login, password);
  dispatch({ type: SET_AUTH_STATUS, payload: !!data.token });
  dispatch({ type: SET_TOKEN, payload: data.token });
};

export const signUp = (login, password, fio) => async () => {
  await api.signUp(login, password, fio);
};
