import axios from 'axios';

const URL = 'http://localhost:5000/api/users';

export const USER_ACTIONS = {
  SET_USERS: 'setUsers',
  SEARCH: 'search'
};

export const setUsers = users => ({
  type: USER_ACTIONS.SET_USERS,
  payload: users
});

export const search = searchbar => ({
  type: USER_ACTIONS.SEARCH,
  payload: searchbar
});
