import styles from './LayoutNotes.module.css';

interface LayoutProps {
  children: React.ReactNode;
  modal?: React.ReactNode;
  sidebar?: React.ReactNode;
}

export default function Layout({ children, modal, sidebar }: LayoutProps) {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>{sidebar}</aside>
      <main className={styles.notesWrapper}>
        {children}
        {modal}
      </main>
    </div>
  );
}
