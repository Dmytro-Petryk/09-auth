import axios from 'axios';
import { cookies } from 'next/headers';
import { User } from '@/types/user';

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

export const fetchNotes = async (
  page: number = 1,
  search?: string,
  tag?: string
) => {
  const res = await serverApi.get('/notes', {
    params: {
      page,
      perPage: 12,
      ...(search ? { search } : {}),
      ...(tag ? { tag } : {}),
    },
  });
  return res.data;
};
