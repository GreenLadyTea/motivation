export const URL = 'http://localhost:5000/api';

async function handleErrors(response) {
  const data = await response.json();
  if (response.status !== 200) {
    throw new Error(data.error);
  }
  return data;
}

const api = {
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
