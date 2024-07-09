import axios from 'axios';

const SERVER = import.meta.env.VITE_SERVER;
const PORT = import.meta.env.VITE_PORT;

const baseURL = `http://${SERVER}:${PORT}/api/`;

export const Api = {
  call: axios.create({
    baseURL:baseURL,
    timeout: 3500,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
  })
}