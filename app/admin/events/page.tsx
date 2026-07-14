"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Plus, Search, Edit, Trash2, Archive } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { useEventStore } from "@/store/event-store";
import type { Event } from "@/types";

export default function AdminEventsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [search, setSearch] = useState("");
  const { events, addEvent, updateEvent, deleteEvent, archiveEvent } = useEventStore();

  const handleSave = (data: Omit<Event, "id">) => {
    if (editingEvent) {
      updateEvent(editingEvent.id, data);
    } else {
      addEvent(data);
    }
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );
  const upcoming = filteredEvents.filter((e) => !e.archived);
  const archived = filteredEvents.filter((e) => e.archived);

  return (
    <Section className="bg-background min-h-screen">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div>
            <Heading as="h1" size="xl">
              <span className="text-accent">Events</span>
            </Heading>
            <p className="mt-2 text-muted-foreground">
              Manage events, competitions, and registrations.
            </p>
          </div>
          <Button
            className="gap-2"
            onClick={() => {
              setEditingEvent(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="h-5 w-5" />
            Create Event
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 space-y-8"
        >
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-12 pl-10 pr-4 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Upcoming Events</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onEdit={() => {
                    setEditingEvent(event);
                    setIsModalOpen(true);
                  }}
                  onDelete={() => deleteEvent(event.id)}
                  onArchive={() => archiveEvent(event.id)}
                  index={index}
                />
              ))}
              {upcoming.length === 0 && (
                <p className="text-muted-foreground col-span-full text-center py-8">No upcoming events</p>
              )}
            </div>
          </div>

          {archived.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-4">Archived Events</h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {archived.map((event, index) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onEdit={() => {
                      setEditingEvent(event);
                      setIsModalOpen(true);
                    }}
                    onDelete={() => deleteEvent(event.id)}
                    onArchive={() => updateEvent(event.id, { archived: false })}
                    index={index}
                    isArchived
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>

        <EventModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingEvent(null);
          }}
          onSave={handleSave}
          initialData={editingEvent}
        />
      </Container>
    </Section>
  );
}

function EventCard({
  event,
  onEdit,
  onDelete,
  onArchive,
  index,
  isArchived = false,
}: {
  event: Event;
  onEdit: () => void;
  onDelete: () => void;
  onArchive: () => void;
  index: number;
  isArchived?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="rounded-lg border border-border bg-card p-6"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20">
          <Calendar className="h-6 w-6 text-accent" />
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isArchived
              ? "bg-gray-500/20 text-gray-500"
              : "bg-green-500/20 text-green-500"
          }`}
        >
          {isArchived ? "Archived" : "Upcoming"}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-bold">{event.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{event.date} at {event.time}</p>
      <p className="mt-1 text-sm text-muted-foreground">{event.location}</p>
      <div className="mt-4 flex gap-2">
        <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={onEdit}>
          <Edit className="size-4" />
          Edit
        </Button>
        <Button variant="outline" size="sm" className="gap-1" onClick={onArchive}>
          <Archive className="size-4" />
        </Button>
        <Button variant="destructive" size="sm" className="gap-1" onClick={onDelete}>
          <Trash2 className="size-4" />
        </Button>
      </div>
    </motion.div>
  );
}

function EventModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Event, "id">) => void;
  initialData: Event | null;
}) {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    date: initialData?.date || "",
    time: initialData?.time || "",
    location: initialData?.location || "",
    description: initialData?.description || "",
    image: initialData?.image || "/images/placeholders/event-1.svg",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Event" : "Create Event"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            required
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full h-12 rounded-md border border-border bg-background px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              required
              type="text"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full h-12 rounded-md border border-border bg-background px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="July 20, 2026"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Time</label>
            <input
              required
              type="text"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="w-full h-12 rounded-md border border-border bg-background px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="9:00 AM"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <input
            required
            type="text"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full h-12 rounded-md border border-border bg-background px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            required
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full rounded-md border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          />
        </div>
        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
          <Button type="submit" className="flex-1">Save Event</Button>
        </div>
      </form>
    </Dialog>
  );
}
