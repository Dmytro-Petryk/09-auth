'use client';
import { Note } from '@/types/note';
import css from './NoteList.module.css';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api/clientApi';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <p className={css.tag}>{note.tag}</p>
          <div>
            <Link href={`/notes/${note.id}`}>
              <button type="button">View Details</button>
            </Link>
            <button onClick={() => mutation.mutate(String(note.id))}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
