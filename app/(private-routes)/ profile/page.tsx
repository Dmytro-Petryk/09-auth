import { serverApi } from '../../../lib/api/serverApi';
import { cookies } from 'next/headers';
import Image from 'next/image';
import css from './ProfilePage.module.css';

export default async function ProfilePage() {
  const res = await serverApi.get('/auth/session', {
    headers: { cookie: cookies().toString() },
  });
  const user = res.data;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <a href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </a>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatarUrl || '/default-avatar.png'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username || 'No username'}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
