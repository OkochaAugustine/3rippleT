import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Event } from "@/types";

type EventStore = {
  events: Event[];
  addEvent: (event: Omit<Event, "id">) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  archiveEvent: (id: string) => void;
};

const initialEvents: Event[] = [
  {
    id: "1",
    title: "Summer Throwdown 2026",
    date: "July 20, 2026",
    time: "9:00 AM",
    location: "3Ripple T Fitness",
    description: "Our annual fitness competition featuring athletes from across the region.",
    image: "/images/placeholders/event-1.svg",
  },
  {
    id: "2",
    title: "Olympic Lifting Seminar",
    date: "August 3, 2026",
    time: "1:00 PM",
    location: "3Ripple T Fitness",
    description: "A deep dive into perfecting your snatch and clean & jerk technique.",
    image: "/images/placeholders/event-2.svg",
  },
  {
    id: "3",
    title: "Community BBQ",
    date: "August 17, 2026",
    time: "4:00 PM",
    location: "Local Park",
    description: "Join us for food, fun, and community building!",
    image: "/images/placeholders/event-3.svg",
  },
];

export const useEventStore = create<EventStore>()(
  persist(
    (set) => ({
      events: initialEvents,
      addEvent: (event) =>
        set((state) => ({
          events: [
            ...state.events,
            { ...event, id: crypto.randomUUID() },
          ],
        })),
      updateEvent: (id, updates) =>
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? { ...event, ...updates } : event
          ),
        })),
      deleteEvent: (id) =>
        set((state) => ({
          events: state.events.filter((event) => event.id !== id),
        })),
      archiveEvent: (id) =>
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? { ...event, archived: true } : event
          ),
        })),
    }),
    {
      name: "3ripplet-events",
    }
  )
);
