import css from './SidebarNotes.module.css';

const tags = ['All', 'Work', 'Personal', 'Shopping', 'Todo', 'Meeting'];

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <a
            href={`/notes/filter/${encodeURIComponent(tag)}`}
            className={css.menuLink}
          >
            {tag}
          </a>
        </li>
      ))}
    </ul>
  );
}
