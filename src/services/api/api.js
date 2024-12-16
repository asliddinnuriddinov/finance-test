import axios from "axios";

const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
const baseURL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

const api = axios.create({
  baseURL: baseURL,
  timeout: 10000 
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


export default api;