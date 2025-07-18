import { redirect } from 'next/navigation';
import NotesClient from './Notes.client';
import { Metadata } from 'next';
import { fetchNotesServer, fetchSessionServer } from '@/lib/api/serverApi';

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = slug?.[0] ?? 'All';

  return {
    title: `Category: ${category}`,
    description: `View all notes filtered by category: ${category}.`,
  };
}

const NotesByCategory = async ({ params }: Props) => {
  const user = await fetchSessionServer();
  if (!user) {
    redirect('/sign-in');
  }

  const { slug } = await params;
  const category =
    slug?.[0]?.toLowerCase() === 'all' ? undefined : (slug?.[0] ?? 'All');

  const response = await fetchNotesServer(1, category);
  const notes = response.notes;

  return (
    <div>
      <NotesClient notes={notes} tag={category ?? 'All'} />
    </div>
  );
};

export default NotesByCategory;
