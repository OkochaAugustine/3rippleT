import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Announcement = {
  id: string;
  title: string;
  content: string;
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: string;
  publishedAt?: string;
  published: boolean;
  author: string;
  category?: string;
};

type AnnouncementStore = {
  announcements: Announcement[];
  addAnnouncement: (announcement: Omit<Announcement, "id" | "createdAt">) => void;
  updateAnnouncement: (id: string, announcement: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;
  publishAnnouncement: (id: string) => void;
  unpublishAnnouncement: (id: string) => void;
};

const initialAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "New Summer Schedule Released",
    content: "We're excited to announce our updated summer class schedule with additional morning and evening sessions. Check the schedule page for details.",
    priority: "high",
    createdAt: "2024-06-15T10:00:00Z",
    publishedAt: "2024-06-15T10:00:00Z",
    published: true,
    author: "Admin",
    category: "Schedule",
  },
  {
    id: "2",
    title: "Summer Throwdown Registration Open",
    content: "Registration for our annual Summer Throwdown competition is now open! Sign up by July 15th to secure your spot.",
    priority: "urgent",
    createdAt: "2024-06-20T14:00:00Z",
    publishedAt: "2024-06-20T14:00:00Z",
    published: true,
    author: "Admin",
    category: "Events",
  },
];

export const useAnnouncementStore = create<AnnouncementStore>()(
  persist(
    (set) => ({
      announcements: initialAnnouncements,
      addAnnouncement: (announcement) =>
        set((state) => ({
          announcements: [
            ...state.announcements,
            { 
              ...announcement, 
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      updateAnnouncement: (id, updates) =>
        set((state) => ({
          announcements: state.announcements.map((announcement) =>
            announcement.id === id ? { ...announcement, ...updates } : announcement
          ),
        })),
      deleteAnnouncement: (id) =>
        set((state) => ({
          announcements: state.announcements.filter((announcement) => announcement.id !== id),
        })),
      publishAnnouncement: (id) =>
        set((state) => ({
          announcements: state.announcements.map((announcement) =>
            announcement.id === id 
              ? { ...announcement, published: true, publishedAt: new Date().toISOString() }
              : announcement
          ),
        })),
      unpublishAnnouncement: (id) =>
        set((state) => ({
          announcements: state.announcements.map((announcement) =>
            announcement.id === id 
              ? { ...announcement, published: false, publishedAt: undefined }
              : announcement
          ),
        })),
    }),
    {
      name: "3ripplet-announcements",
    }
  )
);
