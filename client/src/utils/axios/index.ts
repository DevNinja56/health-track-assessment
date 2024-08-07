import axios from "axios";

export const BASE_URL = import.meta.env.VITE_PUBLIC_REST_API_ENDPOINT;
const http = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    // 'Content-Type': 'application/json'
  },
});

// Add a request interceptor to add the token to the request headers
http.interceptors.request.use(
  (config) => { 
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use((res) => {
  return res.data! ?? res;
});

export default http;
