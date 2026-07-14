import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "member" | "admin";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  membershipPlan?: string;
  membershipExpiry?: string;
  profileComplete: number;
};

type AuthStore = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  updateUser: (updates: Partial<AuthUser>) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (updates) =>
        set((state) =>
          state.user ? { user: { ...state.user, ...updates } } : state,
        ),
    }),
    { name: "3ripplet-auth" },
  ),
);
