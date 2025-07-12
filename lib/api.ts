/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { Note } from '@/types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface FetchParams {
  search?: string;
  page?: number;
  tag?: string;
}
interface NotesResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page = 1,
  _unused = '',
  perPage = 10,
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

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await axiosInstance.delete<Note>(`/notes/${id}`);
  return data;
};
