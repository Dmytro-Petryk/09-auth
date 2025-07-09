import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

type Props = {
  params: { slug?: string[] };
};

export default async function NotesPage({ params }: Props) {
  const tagParam = params.slug?.[0];

  const tag = tagParam === 'All' ? undefined : tagParam;

  try {
    const { notes } = await fetchNotes(1, 100, tag);
    return <NotesClient notes={notes} />;
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    return <div>Unable to load notes.</div>;
  }
}
