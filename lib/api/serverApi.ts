import { Note } from '@/types/note';
import axios from 'axios';

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotesServer = (
  cookieHeader: string,
  page: number,
  tag?: string,
  search?: string
) => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/notes`, {
    params: { page, tag, search },
    headers: {
      cookie: cookieHeader,
    },
    withCredentials: true,
  });
};

const serverApi = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get: (url: string, config?: any) => {
    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}${url}`, config);
  },
};

export default serverApi;
