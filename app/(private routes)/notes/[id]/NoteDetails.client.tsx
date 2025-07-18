'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';
import css from './NoteDetails.module.css';

interface NoteDetailsClientProps {
  noteId: string;
}

export default function NoteDetailsClient({ noteId }: NoteDetailsClientProps) {
  const id = Number(noteId);
  const isValidId = !isNaN(id) && Number.isInteger(id) && id > 0;

  if (!isValidId) {
    return <p>Invalid note ID.</p>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  const { title, content, createdAt } = data;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{title}</h2>
          <button className={css.editBtn}>Edit note</button>
        </div>
        <p className={css.content}>{content}</p>
        <p className={css.date}>{createdAt}</p>
      </div>
    </div>
  );
}
