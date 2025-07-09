import styles from './Home.module.css';

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
