import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://notehub-api.goit.study',
  withCredentials: true,
});

export default axiosInstance;
