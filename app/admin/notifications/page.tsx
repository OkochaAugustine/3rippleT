"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Plus, Edit, Trash2, Eye, EyeOff, Calendar, AlertCircle } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { useAnnouncementStore, type Announcement } from "@/store/announcement-store";

export default function AdminNotificationsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const { announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement, publishAnnouncement, unpublishAnnouncement } = useAnnouncementStore();

  const handleSave = (data: Omit<Announcement, "id" | "createdAt">) => {
    if (editingAnnouncement) {
      updateAnnouncement(editingAnnouncement.id, data);
    } else {
      addAnnouncement(data);
    }
    setIsModalOpen(false);
    setEditingAnnouncement(null);
  };

  const published = announcements.filter((a) => a.published);
  const drafts = announcements.filter((a) => !a.published);

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
              <span className="text-accent">Announcements</span>
            </Heading>
            <p className="mt-2 text-muted-foreground">
              Create and manage announcements for members.
            </p>
          </div>
          <Button
            className="gap-2"
            onClick={() => {
              setEditingAnnouncement(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="h-5 w-5" />
            New Announcement
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 space-y-8"
        >
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Eye className="size-5 text-accent" />
              Published ({published.length})
            </h3>
            <div className="space-y-4">
              {published.map((announcement) => (
                <AnnouncementCard
                  key={announcement.id}
                  announcement={announcement}
                  onEdit={() => {
                    setEditingAnnouncement(announcement);
                    setIsModalOpen(true);
                  }}
                  onDelete={() => {
                    if (confirm(`Delete "${announcement.title}"?`)) {
                      deleteAnnouncement(announcement.id);
                    }
                  }}
                  onUnpublish={() => unpublishAnnouncement(announcement.id)}
                />
              ))}
              {published.length === 0 && (
                <p className="text-muted-foreground text-center py-8">No published announcements</p>
              )}
            </div>
          </div>

          {drafts.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <EyeOff className="size-5 text-muted-foreground" />
                Drafts ({drafts.length})
              </h3>
              <div className="space-y-4">
                {drafts.map((announcement) => (
                  <AnnouncementCard
                    key={announcement.id}
                    announcement={announcement}
                    onEdit={() => {
                      setEditingAnnouncement(announcement);
                      setIsModalOpen(true);
                    }}
                    onDelete={() => {
                      if (confirm(`Delete "${announcement.title}"?`)) {
                        deleteAnnouncement(announcement.id);
                      }
                    }}
                    onPublish={() => publishAnnouncement(announcement.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>

        <AnnouncementModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingAnnouncement(null);
          }}
          onSave={handleSave}
          initialData={editingAnnouncement}
        />
      </Container>
    </Section>
  );
}

function AnnouncementCard({
  announcement,
  onEdit,
  onDelete,
  onPublish,
  onUnpublish,
}: {
  announcement: Announcement;
  onEdit: () => void;
  onDelete: () => void;
  onPublish?: () => void;
  onUnpublish?: () => void;
}) {
  const priorityColors = {
    low: "bg-blue-500/20 text-blue-500",
    medium: "bg-yellow-500/20 text-yellow-500",
    high: "bg-orange-500/20 text-orange-500",
    urgent: "bg-red-500/20 text-red-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-border bg-card p-6 hover:border-accent/30 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4 flex-1">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
            <Bell className="h-6 w-6 text-accent" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h4 className="font-bold text-lg">{announcement.title}</h4>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${priorityColors[announcement.priority]}`}>
                {announcement.priority}
              </span>
              {announcement.category && (
                <span className="text-sm text-muted-foreground">• {announcement.category}</span>
              )}
            </div>
            <p className="text-muted-foreground mb-3 line-clamp-2">{announcement.content}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="size-4" />
                {new Date(announcement.createdAt).toLocaleDateString()}
              </div>
              {announcement.publishedAt && (
                <div className="flex items-center gap-2">
                  <AlertCircle className="size-4" />
                  Published {new Date(announcement.publishedAt).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <Button variant="outline" size="sm" className="gap-1" onClick={onEdit}>
            <Edit className="size-4" />
            Edit
          </Button>
          {onPublish && (
            <Button variant="primary" size="sm" className="gap-1" onClick={onPublish}>
              <Eye className="size-4" />
              Publish
            </Button>
          )}
          {onUnpublish && (
            <Button variant="outline" size="sm" className="gap-1" onClick={onUnpublish}>
              <EyeOff className="size-4" />
              Unpublish
            </Button>
          )}
          <Button variant="destructive" size="sm" className="gap-1" onClick={onDelete}>
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function AnnouncementModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Announcement, "id" | "createdAt">) => void;
  initialData: Announcement | null;
}) {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
    priority: initialData?.priority || "medium",
    published: initialData?.published || false,
    author: initialData?.author || "Admin",
    category: initialData?.category || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      published: form.published,
      publishedAt: form.published ? new Date().toISOString() : undefined,
    });
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Announcement" : "New Announcement"}
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
            placeholder="Announcement title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <textarea
            required
            rows={5}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full rounded-md border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            placeholder="Enter your announcement content..."
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-2">Priority</label>
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value as Announcement["priority"] })}
              className="w-full h-12 rounded-md border border-border bg-background px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full h-12 rounded-md border border-border bg-background px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="e.g., Schedule, Events, General"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="published"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
            className="h-5 w-5 rounded border-border bg-background text-accent focus:ring-accent"
          />
          <label htmlFor="published" className="text-sm font-medium">
            Publish immediately
          </label>
        </div>
        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
          <Button type="submit" className="flex-1">Save Announcement</Button>
        </div>
      </form>
    </Dialog>
  );
}
