import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5555', 
});

export const getPerfumes = () => API.get('/perfumes');
export const postReview = (data) => API.post('/reviews', data);
