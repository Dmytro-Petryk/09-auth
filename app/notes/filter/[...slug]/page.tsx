import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

type Props = {
  params: { slug?: string[] };
};

export default async function NotesPage(props: Promise<Props>) {
  const { params } = await props;
  const slug = params.slug ?? [];
  const tag = slug[0] === 'All' ? undefined : slug[0];

  try {
    const { notes } = await fetchNotes(1, '', 100, tag);
    return <NotesClient notes={notes} />;
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    return <div>Unable to load notes.</div>;
  }
}
