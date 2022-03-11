import api from '../../api/Api';

export const SET_AUTH_STATUS = 'setAuthStatus';

export const signIn = (login, password) => async dispatch => {
  const data = await api.signIn(login, password);
  dispatch({ type: SET_AUTH_STATUS, payload: !!data.token });
};
