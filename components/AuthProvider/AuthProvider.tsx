'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import { fetchSession, setAuthToken } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/noteStore';
import { useRouter } from 'next/navigation';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      try {
        const user = await fetchSession();
        if (user) {
          setUser(user);
          setAuthToken(user.token); // <-- Збереження токена для axios
        } else {
          clearIsAuthenticated();
          setAuthToken(null);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        clearIsAuthenticated();
        setAuthToken(null);
      } finally {
        setLoading(false);
      }
    }
    checkSession();
  }, [setUser, clearIsAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
export function ViewNotesButton() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleClick = () => {
    if (isAuthenticated) {
      router.push('/notes'); // якщо авторизований — на нотатки
    } else {
      router.push('/sign-in'); // якщо ні — на сторінку входу
    }
  };

  return <button onClick={handleClick}>Подивитись нотатки</button>;
}
export { AuthProvider };
