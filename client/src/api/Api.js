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
    fetch(`${URL}/sign-in`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
        login: login,
        password: password
      })
    }).then(handleErrors)
};

export default api;
