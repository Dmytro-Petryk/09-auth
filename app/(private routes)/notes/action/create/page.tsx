import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create a new note - NoteHub',
  description: 'Start writing a new note from scratch.',
  openGraph: {
    title: 'Create a new note - NoteHub',
    description: 'Start writing a new note from scratch.',
    url: 'https://your-deployed-url.vercel.app/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};
import styles from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';

export default function CreateNote() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
