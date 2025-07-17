'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import { fetchSession, setAuthToken } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

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

export { AuthProvider };
