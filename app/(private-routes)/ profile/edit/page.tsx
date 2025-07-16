'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { updateUser } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import Image from 'next/image';
import css from './page.module.css';

export default function EditProfile() {
  const user = useAuthStore((s) => s.user);
  const [username, setUsername] = useState(user?.username || '');
  const router = useRouter();

  const onCancel = () => router.push('/profile');
  const onSave = async () => {
    await updateUser({ username });
    router.push('/profile');
  };

  return (
    <main className={css.mainContent}>
      {/* Форма редагування і кнопки Save/Cancel */}
    </main>
  );
}
