'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import { fetchSession, getUserProfile } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      try {
        const response = await fetchSession();
        if (response?.status === 200) {
          const user = await getUserProfile();
          setUser(user);
        } else {
          clearAuth();
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        clearAuth();
      } finally {
        setLoading(false);
      }
    }
    checkSession();
  }, [setUser, clearAuth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
export { AuthProvider };
