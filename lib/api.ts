import axios from 'axios';
import { Note } from '@/types/note';

const BASE_URL = 'https://notehub-public.goit.study/api/notes';
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
    `?page=${page}&perPage=${perPage}&search=${search}`
  );
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await axiosInstance.get<Note>(`/${id}`);
  return data;
};

export const createNote = async (
  title: string,
  content: string,
  tag: string
): Promise<Note> => {
  const { data } = await axiosInstance.post<Note>('/', { title, content, tag });
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await axiosInstance.delete<Note>(`/${id}`);
  return data;
};
