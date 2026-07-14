import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MemberStatus = "active" | "inactive" | "pending";
export type MembershipPlan = "daily" | "monthly" | "premium";

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
};

type MemberStore = {
  members: Member[];
  addMember: (member: Omit<Member, "id">) => void;
  updateMember: (id: string, member: Partial<Member>) => void;
  deleteMember: (id: string) => void;
};

const initialMembers: Member[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+234 801 234 5678",
    status: "active",
    plan: "monthly",
    joinedDate: "2024-01-15",
    expiryDate: "2024-02-15",
    lastVisit: "2024-01-20",
    attendanceCount: 12,
    profileComplete: 100,
  },
  {
    id: "2",
    name: "Sarah Smith",
    email: "sarah@example.com",
    phone: "+234 802 345 6789",
    status: "active",
    plan: "premium",
    joinedDate: "2024-02-01",
    expiryDate: "2024-03-01",
    lastVisit: "2024-02-10",
    attendanceCount: 8,
    profileComplete: 85,
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+234 803 456 7890",
    status: "active",
    plan: "daily",
    joinedDate: "2024-03-10",
    lastVisit: "2024-03-10",
    attendanceCount: 1,
    profileComplete: 60,
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "+234 804 567 8901",
    status: "inactive",
    plan: "monthly",
    joinedDate: "2024-01-20",
    expiryDate: "2024-02-20",
    lastVisit: "2024-02-15",
    attendanceCount: 15,
    profileComplete: 100,
  },
];

export const useMemberStore = create<MemberStore>()(
  persist(
    (set) => ({
      members: initialMembers,
      addMember: (member) =>
        set((state) => ({
          members: [
            ...state.members,
            { ...member, id: crypto.randomUUID() },
          ],
        })),
      updateMember: (id, updates) =>
        set((state) => ({
          members: state.members.map((member) =>
            member.id === id ? { ...member, ...updates } : member
          ),
        })),
      deleteMember: (id) =>
        set((state) => ({
          members: state.members.filter((member) => member.id !== id),
        })),
    }),
    {
      name: "3ripplet-members",
    }
  )
);
