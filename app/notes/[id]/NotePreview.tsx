import { fetchNoteById } from '@/lib/api';
import css from './NotePreview.module.css';

type Props = {
  params: { id: string };
};

export default async function NotePreview({ params }: Props) {
  const note = await fetchNoteById(Number(params.id));

  if (!note) {
    return <div className={css.error}>Note not found</div>;
  }

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>{note.title}</h2>
      <p className={css.content}>{note.content}</p>
      <p className={css.tag}>Tag: {note.tag}</p>
    </div>
  );
}
