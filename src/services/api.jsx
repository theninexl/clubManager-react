import axios from 'axios';

// const SERVER = import.meta.env.VITE_SERVER;
// const PORT = import.meta.env.VITE_PORT;
const SECRET = import.meta.env.MOCKAPI_KEY;

// const baseURL = `http://${SERVER}:${PORT}/api/`;
const baseURL = 'https://${SECRET}.mockapi.io/api/v1/'

export const Api = {
  call: axios.create({
    baseURL:baseURL,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
  })
}