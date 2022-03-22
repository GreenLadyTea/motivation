export const URL = 'http://localhost:5000/api';

async function handleErrors(response) {
  const data = await response.json();
  if (response.status !== 200) {
    throw new Error(data.error);
  }
  return data;
}

const api = {
  signIn: (login, password) =>
    fetch(`${URL}/auth/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login,
        password
      })
    }).then(handleErrors),
  signUp: (login, password, fio) =>
    fetch(`${URL}/auth/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login,
        password,
        fio
      })
    }).then(handleErrors),
  checkAuth: () =>
    fetch(`${URL}/auth/check-auth`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(handleErrors),
  createNew: (title, description, term) =>
    fetch(`${URL}/goal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        title,
        description,
        term
      })
    }).then(handleErrors)
};

export default api;
