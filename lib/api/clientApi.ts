import { api } from './api';
import { User } from '@/types/user';

export const registerUser = async (
  email: string,
  password: string
): Promise<User> => {
  const { data } = await api.post<User>('/auth/register', { email, password });
  return data;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  const { data } = await api.post<User>('/auth/login', { email, password });
  return data;
};

export const logoutUser = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const fetchSession = async (): Promise<User | null> => {
  const { data } = await api.get<User>('/auth/session');
  return data || null;
};

export const updateUser = async (user: Partial<User>): Promise<User> => {
  const { data } = await api.patch<User>('/users/me', user);
  return data;
};

export const fetchNotes = async (
  page: number = 1,
  search?: string,
  tag?: string
) => {
  const res = await api.get('/notes', {
    params: {
      page,
      perPage: 12,
      ...(search ? { search } : {}),
      ...(tag ? { tag } : {}),
    },
  });
  return res.data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};
