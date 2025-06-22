import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Note } from '@/types/note';

const BASE_URL = 'https://notehub-public.goit.study/api/notes';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const fetchNotes = async (): Promise<Note[]> => {
  const { data } = await axiosInstance.get('?page=1&perPage=100');
  return data;
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const { data } = await axiosInstance.get(`/${id}`);
  return data;
};

export const useNotesQuery = () =>
  useQuery({ queryKey: ['notes'], queryFn: fetchNotes });

export const useNoteByIdQuery = (id: number) =>
  useQuery({ queryKey: ['note', id], queryFn: () => fetchNoteById(id) });

export const createNote = async (
  title: string,
  content: string
): Promise<Note> => {
  const { data } = await axiosInstance.post('/', { title, content });
  return data;
};

export const deleteNote = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/${id}`);
};
