import type { Metadata } from 'next';
import styles from './Home.module.css';
export const metadata: Metadata = {
  title: 'Page not found - NoteHub',
  description: 'Oops! The page you are looking for does not exist.',
  openGraph: {
    title: 'Page not found - NoteHub',
    description: 'Oops! The page you are looking for does not exist.',
    url: 'https://your-deployed-url.vercel.app/not-found',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};
export default function NotFoundPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>404 - Page not found</h1>
      <p className={styles.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </main>
  );
}
