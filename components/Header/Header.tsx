import css from './Header.module.css';
import Link from 'next/link';
import { TagsMenu } from '../TagsMenu/TagsMenu';
import { AuthNavigation } from '../AuthNavigation/AuthNavigation';

export function Header() {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <TagsMenu />
          </li>
          <li className={css.navList}>
            <AuthNavigation />
          </li>
        </ul>
      </nav>
    </header>
  );
}
