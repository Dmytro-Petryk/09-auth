import { serverApi } from '@/lib/api/serverApi';
import { cookies } from 'next/headers';
import Image from 'next/image';
import css from './page.module.css';

export default async function ProfilePage() {
  const res = await serverApi.get('/auth/session', {
    headers: { cookie: cookies().toString() },
  });
  const user = res.data;

  return (
    <main className={css.mainContent}>
      {/* Відображення профілю з кнопкою Edit */}
    </main>
  );
}
