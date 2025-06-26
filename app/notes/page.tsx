import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

export default async function NotesPage() {
  const { data: notes } = await fetchNotes(1, 100);
  return <NotesClient notes={notes} />;
}
