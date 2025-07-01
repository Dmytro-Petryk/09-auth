import axios from 'axios';
import { Note } from '@/types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});
interface FetchParams {
  search?: string;
  page?: number;
  perPage?: number;
}
interface NotesResponse {
  data: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page = 1,
  perPage = 10,
  search = ''
): Promise<NotesResponse> => {
  try {
    const params: FetchParams = {
      ...(search.trim() !== '' && { search: search.trim() }),
      page,
      perPage,
    };
    const res = await axiosInstance.get<NotesResponse>('/notes', { params });
    return res.data;
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    throw new Error('Could not fetch notes. Please try again later.');
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
  const { data } = await axiosInstance.delete<Note>(`/api/notes/${id}`);
  return data;
};
