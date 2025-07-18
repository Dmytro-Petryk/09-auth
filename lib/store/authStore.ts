import { create } from 'zustand';
import type { User } from '@/types/user';

interface AuthState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void; // Accepts null to clear
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  clearAuth: () => set({ user: null, isAuthenticated: false }),
}));
