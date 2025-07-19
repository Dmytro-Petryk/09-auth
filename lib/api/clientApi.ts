import { User } from '../../types/user';
import { Note } from '@/types/note';
import axiosInstance from '@/lib/api/api';
import type { AxiosResponse } from 'axios';

export const registerUser = async (credentials: {
  email: string;
  password: string;
}): Promise<User> => {
  const { data } = await axiosInstance.post<User>(
    '/auth/register',
    credentials
  );
  return data;
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<User> => {
  const { data } = await axiosInstance.post<User>('/auth/login', credentials);
  return data;
};

export const logoutUser = async (): Promise<void> => {
  await axiosInstance.post('/auth/logout');
};

export const updateUser = async (user: Partial<User>): Promise<User> => {
  const { data } = await axiosInstance.patch<User>('/users/me', user);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await axiosInstance.delete<Note>(`/notes/${id}`);
  return data;
};

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchParams {
  search?: string;
  page?: number;
  tag?: string;
}

export const fetchNotes = async (
  page: number,
  tag?: string,
  search = ''
): Promise<NotesResponse> => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  const params: FetchParams = {};
  if (typeof page === 'number' && page > 0) {
    params.page = page;
  }
  const trimmedSearch = typeof search === 'string' ? search.trim() : '';
  if (trimmedSearch) {
    params.search = trimmedSearch;
  }
  if (tag && tag !== 'All') {
    params.tag = tag;
  }

  const res = await axiosInstance.get<NotesResponse>('/notes', {
    params,
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await axiosInstance.get<Note>(`/notes/${id}`);
  return data;
};

interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}

export const createNote = async (note: CreateNotePayload): Promise<Note> => {
  const { data } = await axiosInstance.post<Note>('/notes', note);
  return data;
};

export const getUserProfile = async (): Promise<User> => {
  const { data } = await axiosInstance.get<User>('/users/me');
  return data;
};
export const fetchSession = async (): Promise<AxiosResponse<User>> => {
  console.log('Fetching session with cookie (browser):', document.cookie);

  const response = await axiosInstance.get<User>('/auth/session');

  console.log('Session response status:', response.status);

  return response;
};
