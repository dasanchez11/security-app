import axios from 'axios';

const publicFetch = axios.create({
  baseURL: 'http://localhost:3001/auth'
});

export { publicFetch };