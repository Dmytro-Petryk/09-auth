'use client';
import { ReactNode, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { fetchSession } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setUser, clearAuth, isAuthenticated } = useAuthStore();
  const [checking, setChecking] = useState(true);
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const user = await fetchSession();
        if (user) setUser(user);
        else {
          clearAuth();
          if (path.startsWith('/profile') || path.startsWith('/notes')) {
            router.replace('/sign-in');
          }
        }
      } catch {
        clearAuth();
      } finally {
        setChecking(false);
      }
    })();
  }, [path]);

  if (checking) return <p>Loading...</p>;
  return <>{children}</>;
};
