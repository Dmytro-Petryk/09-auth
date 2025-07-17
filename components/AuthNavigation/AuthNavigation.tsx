'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../lib/store/noteStore';
import { logoutUser } from '../../lib/api/clientApi';
import css from './AuthNavigation.module.css';

export const AuthNavigation = () => {
  const { isAuthenticated, user, clearAuth } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    clearAuth();
    router.push('/sign-in');
  };

  return (
    <ul>
      {isAuthenticated ? (
        <>
          <li>
            <Link href="/profile" className={css.navigationLink}>
              Profile
            </Link>
          </li>
          <li>
            <p className={css.userEmail}>{user?.email}</p>
            <button onClick={handleLogout} className={css.logoutButton}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link href="/sign-in" className={css.navigationLink}>
              Login
            </Link>
          </li>
          <li>
            <Link href="/sign-up" className={css.navigationLink}>
              Sign up
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};
