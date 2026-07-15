import { create } from "zustand";

export type MemberStatus = "active" | "inactive" | "pending";
export type MembershipPlan = "none" | "daily" | "monthly" | "premium";

export type Member = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: MemberStatus;
  plan: MembershipPlan;
  joinedDate: string;
  expiryDate?: string;
  lastVisit?: string;
  attendanceCount: number;
  profileComplete: number;
  role?: string;
  isVerified?: boolean;
};

type MemberStore = {
  members: Member[];
  loading: boolean;
  error: string | null;
  fetchMembers: () => Promise<void>;
  addMember: (member: Omit<Member, "id" | "joinedDate" | "attendanceCount" | "profileComplete">) => Promise<void>;
  updateMember: (id: string, member: Partial<Member>) => Promise<void>;
  deleteMember: (id: string) => Promise<void>;
};

export const useMemberStore = create<MemberStore>((set) => ({
  members: [],
  loading: false,
  error: null,

  fetchMembers: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/admin/members");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch members");
      set({ members: data.members || [], loading: false });
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Something went wrong";
      set({ error: errMsg, loading: false });
    }
  },

  addMember: async (memberData) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/admin/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(memberData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add member");
      
      set((state) => ({
        members: [data.member, ...state.members],
        loading: false,
      }));
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Failed to add member";
      set({ error: errMsg, loading: false });
      throw err;
    }
  },

  updateMember: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/admin/members/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update member");

      set((state) => ({
        members: state.members.map((m) => (m.id === id ? data.member : m)),
        loading: false,
      }));
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Failed to update member";
      set({ error: errMsg, loading: false });
      throw err;
    }
  },

  deleteMember: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/admin/members/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete member");

      set((state) => ({
        members: state.members.filter((m) => m.id !== id),
        loading: false,
      }));
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Failed to delete member";
      set({ error: errMsg, loading: false });
      throw err;
    }
  },
}));
