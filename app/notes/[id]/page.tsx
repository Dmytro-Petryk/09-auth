import type { Metadata } from 'next';
import { fetchNoteById } from '@/lib/api';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const noteId = Number(id);
  if (isNaN(noteId)) return {};

  try {
    const note = await fetchNoteById(noteId);
    const title = `${note.title} - NoteHub`;
    const description = `${note.content.slice(0, 150)}...`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://your-deployed-url.vercel.app/notes/${note.id}`,
        images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
      },
    };
  } catch {
    return {};
  }
}

export default async function NotesPage({ params }: Props) {
  const { id } = await params;

  const noteId = Number(id);

  if (isNaN(noteId)) {
    notFound();
  }

  try {
    const note = await fetchNoteById(noteId);
    return (
      <div>
        <h1>{note.title}</h1>
        <p>{note.content}</p>
        <p>Tag: {note.tag}</p>
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch note by id:', error);
    notFound();
  }
}
