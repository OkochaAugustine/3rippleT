import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "MEMBER" | "ADMIN" | "COACH" | "member" | "admin";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  membership?: string;
  membershipPlan?: string;
  membershipExpiry?: string;
  profileComplete: number;
  isVerified?: boolean;
  verificationStatus?: string;
  phone?: string;
  createdAt?: string;
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
      login: (user) => {
        // Map database fields to store fields for compatibility
        const mappedUser = {
          ...user,
          membershipPlan: user.membershipPlan || user.membership || "none",
          profileComplete: user.profileComplete !== undefined 
            ? user.profileComplete 
            : (user.phone ? 100 : 75),
        };
        set({ user: mappedUser, isAuthenticated: true });
      },
      logout: () => {
        // Call logout API to clear HTTP cookies
        fetch("/api/auth/logout", { method: "POST" }).catch(console.error);
        set({ user: null, isAuthenticated: false });
      },
      updateUser: (updates) =>
        set((state) => {
          if (!state.user) return state;
          const updated = { ...state.user, ...updates };
          if (updates.membership) {
            updated.membershipPlan = updates.membership;
          }
          return { user: updated };
        }),
    }),
    { name: "3ripplet-auth" },
  ),
);
