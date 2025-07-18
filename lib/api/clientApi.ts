import axios from 'axios';
import { User } from '../../types/user';
import { Note } from '@/types/note';
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  withCredentials: true,
});

export const registerUser = async (
  email: string,
  password: string
): Promise<User> => {
  const { data } = await axiosInstance.post<User>('/auth/register', {
    email,
    password,
  });
  return data;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  const { data } = await axiosInstance.post<User>('/auth/login', {
    email,
    password,
  });
  return data;
};

export const logoutUser = async (): Promise<void> => {
  await axiosInstance.post('/auth/logout');
};

export const fetchSession = async (): Promise<User | null> => {
  const { data } = await axiosInstance.get<User>('/auth/session');
  return data || null;
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

interface SessionResponse {
  accessToken: string;
  refreshToken: string;
}

export const checkSession = async (
  refreshToken?: string | null
): Promise<SessionResponse | null> => {
  if (!refreshToken) {
    return null;
  }
  try {
    const { data } = await axiosInstance.post<SessionResponse>(
      '/auth/refresh',
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.error('Failed to refresh session', error);
    return null;
  }
};
