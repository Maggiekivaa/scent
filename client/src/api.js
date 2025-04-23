import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5555', 
  withCredentials: true, // This ensures cookies are sent with the request
});

export const getPerfumes = () => API.get('/perfumes');

export const postReview = async (reviewData) => {
  try {
    const res = await API.post('/reviews', reviewData);
    return res.data;
  } catch (err) {
    throw new Error('Failed to post review');
  }
};
