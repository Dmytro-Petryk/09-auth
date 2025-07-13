import { fetchNoteById } from '@/lib/api';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

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
