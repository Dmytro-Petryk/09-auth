import { api } from './api';
import { User } from '../../types/user';
import { Note } from '@/types/note';
import axios from 'axios';

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
interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}
const BASE_URL = 'https://notehub-public.goit.study/api';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await axiosInstance.delete<Note>(`/notes/${id}`);
  return data;
};
interface NotesResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  notes: Note[];
  totalPages: number;
}
interface FetchParams {
  search?: string;
  page?: number;
  tag?: string;
}
export const fetchNotes = async (
  page = 1,
  tag?: string,
  search = ''
): Promise<NotesResponse> => {
  try {
    const params: FetchParams = {};
    if (typeof page === 'number' && page > 0) {
      params.page = page;
    }
    if (search?.trim()) {
      params.search = search.trim();
    }
    if (tag && tag !== 'All') {
      params.tag = tag;
    }

    console.log('params to /notes:', params);
    const res = await axiosInstance.get<NotesResponse>('/notes', { params });
    return res.data;
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    throw Error('Could not fetch notes.');
  }
};
export const fetchNoteById = async (id: number): Promise<Note> => {
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
