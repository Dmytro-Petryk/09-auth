import axios from 'axios';
import { cookies } from 'next/headers';

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

export const serverApi = axios.create({
  baseURL,
});

serverApi.interceptors.request.use((config) => {
  const cookieStore = cookies().toString();
  if (cookieStore && config.headers) {
    config.headers['cookie'] = cookieStore;
  }
  return config;
});
