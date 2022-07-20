import axios from 'axios';

const publicFetch = axios.create({
  baseURL: '/auth'
});

export { publicFetch };