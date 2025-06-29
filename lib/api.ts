import axios from 'axios';
import { Note } from '@/types/note';

const BASE_URL = 'https://notehub-public.goit.study';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

interface NotesResponse {
  data: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page = 1,
  perPage = 10,
  search = ''
): Promise<NotesResponse> => {
  const { data } = await axiosInstance.get<NotesResponse>(
    `/api/notes?page=${page}&perPage=${perPage}&search=${encodeURIComponent(search)}`
  );
  return data;
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const { data } = await axiosInstance.get<Note>(`/api/notes/${id}`);
  return data;
};

interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}

export const createNote = async (note: CreateNotePayload): Promise<Note> => {
  const { data } = await axiosInstance.post<Note>('/api/notes', note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await axiosInstance.delete<Note>(`/api/notes/${id}`);
  return data;
};
