const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

import axios from 'axios';
import { User } from '../../types/user';
import { Note } from '@/types/note';

export const registerUser = async (
  email: string,
  password: string
): Promise<User> => {
  const { data } = await axios.post<User>(
    `${BASE_URL}/api/auth/register`,
    { email, password },
    { withCredentials: true }
  );
  return data;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  const { data } = await axios.post<User>(`${BASE_URL}/api/auth/login`, {
    email,
    password,
  });
  return data;
};

export const logoutUser = async (): Promise<void> => {
  await axiosInstance.post(`${BASE_URL}/api/auth/logout`, null);
};

export const fetchSession = async (): Promise<User | null> => {
  const { data } = await axiosInstance.get<User>(
    `${BASE_URL}/api/auth/session`
  );
  return data || null;
};

export const updateUser = async (user: Partial<User>): Promise<User> => {
  const { data } = await axiosInstance.patch<User>(
    `${BASE_URL}/api/users/me`,
    user
  );
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await axiosInstance.delete<Note>(
    `${BASE_URL}/api/notes/${id}`
  );
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
  page: number,
  tag?: string,
  search = ''
): Promise<NotesResponse> => {
  try {
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

    const res = await axiosInstance.get<NotesResponse>(
      `${BASE_URL}/api/notes`,
      {
        params,
      }
    );
    return res.data;
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    throw Error('Could not fetch notes.');
  }
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const { data } = await axiosInstance.get<Note>(`${BASE_URL}/api/notes/${id}`);
  return data;
};

interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}

export const createNote = async (note: CreateNotePayload): Promise<Note> => {
  const { data } = await axiosInstance.post<Note>(
    `${BASE_URL}/api/notes`,
    note
  );
  return data;
};
const axiosInstance = axios.create({
  withCredentials: true,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let token: string | null = null;

export const setAuthToken = (newToken: string | null) => {
  token = newToken;
  if (newToken) {
    axiosInstance.defaults.headers.common['Authorization'] =
      `Bearer ${newToken}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};
