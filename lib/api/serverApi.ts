import { cookies } from 'next/headers';
import { Note } from '@/types/note';
import { User } from '@/types/user';
import axiosInstance from '@/lib/api/api';
import type { AxiosResponse } from 'axios';

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotesServer = async (
  page: number,
  tag?: string,
  search?: string
) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  const response = await axiosInstance.get<NotesResponse>('/notes', {
    params: { page, tag, search },
    headers: {
      cookie: cookieHeader,
    },
  });
  return response.data;
};

export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  const response = await axiosInstance.get<Note>(`/notes/${id}`, {
    headers: {
      cookie: cookieHeader,
    },
  });
  return response.data;
};

export const fetchSessionServer = async (): Promise<AxiosResponse<User>> => {
  const cookieStore = cookies();
  const cookieHeader = (await cookieStore)
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  const response = await axiosInstance.get<User>('/auth/session', {
    headers: {
      cookie: cookieHeader,
    },
  });
  return response;
};

export const fetchCurrentUserServer = async (): Promise<User> => {
  const cookieStore = cookies();
  const cookieHeader = (await cookieStore)
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  const response = await axiosInstance.get<User>('/users/me', {
    headers: {
      cookie: cookieHeader,
    },
  });
  return response.data;
};

const serverApi = {
  get: <T>(url: string, config?: Record<string, unknown>) => {
    return axiosInstance.get<T>(url, config);
  },
};

export default serverApi;
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
