import NotesClient from './Notes.client';
import { Metadata } from 'next';
import { fetchNotesServer } from '@/lib/api/serverApi';
import { cookies } from 'next/headers';

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = slug[0];

  return {
    title: `Category: ${category}`,
    description: `View all notes filtered by category: ${category}.`,
  };
}

const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  const category = slug[0]?.toLowerCase() === 'all' ? undefined : slug[0];

  const cookieStore = cookies();
  const cookieString = (await cookieStore)
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  const response = await fetchNotesServer(cookieString, 1, category);
  const { notes } = response.data;

  return (
    <div>
      <NotesClient notes={notes} tag={category ?? 'All'} />
    </div>
  );
};

export default NotesByCategory;
