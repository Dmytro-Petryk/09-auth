'use client';

import css from './TagsMenu.module.css';

const tags = ['All', 'Work', 'Personal', 'Shopping', 'Todo', 'Meeting'];

export const TagsMenu = () => {
  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton}>Notes ▾</button>
      <ul className={css.menuList}>
        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <a
              href={
                tag === 'All'
                  ? '/notes/filter/All'
                  : `/notes/filter/${encodeURIComponent(tag)}`
              }
              className={css.menuLink}
            >
              {tag}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
