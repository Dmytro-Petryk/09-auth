import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
type Props = {
  params: { slug: string[] };
};

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;

  const tag = slug[0] === 'All' ? undefined : slug[0];

  try {
    const { notes } = await fetchNotes(1, '', 10, tag, '');
    return <NotesClient notes={notes} tag={tag} />;
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    return <div>Unable to load notes</div>;
  }
}
