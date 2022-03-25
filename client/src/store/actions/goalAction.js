import axios from 'axios';

const URL = 'http://localhost:5000/api/goal';

export const create = async (title, description, term) => {
  try {
    return await axios.post(
      `${URL}`,
      { title, description, term },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
  } catch (e) {
    return {
      status: e.response.status,
      message: e.response.data.message
    };
  }
};
