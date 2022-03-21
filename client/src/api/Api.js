export const URL = 'http://localhost:5000/api';

export const defaultHeaders = {
  'Content-Type': 'application/json'
};

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
      headers: defaultHeaders,
      body: JSON.stringify({
        login,
        password
      })
    }).then(handleErrors),
  signUp: (login, password, fio) =>
    fetch(`${URL}/auth/sign-up`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
        login,
        password,
        fio
      })
    }).then(handleErrors)
};

export default api;
