import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4041',
  withCredentials: true,
  headers: {
    accept: 'application/json',
  },
});

export default instance;