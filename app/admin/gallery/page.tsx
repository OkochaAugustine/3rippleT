"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Images, Upload, Trash2, Edit, Star, Eye, EyeOff, X } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

interface GalleryItem {
  _id: string;
  title: string;
  description?: string;
  mediaId: string;
  displayOrder: number;
  isPublished: boolean;
  isFeatured: boolean;
  category?: string;
  tags?: string[];
}

interface MediaItem {
  _id: string;
  url: string;
  title: string;
}

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

  const fetchData = useCallback(async (signal?: AbortSignal) => {
    try {
      const [galleryRes, mediaRes] = await Promise.all([
        fetch("/api/admin/gallery", { signal }),
        fetch("/api/admin/media", { signal }),
      ]);
      const galleryData = await galleryRes.json();
      const mediaData = await mediaRes.json();

      if (!signal?.aborted) {
        setGallery(galleryData.gallery || []);
        setMedia(mediaData.media || []);
      }
    } catch (error) {
      if (!signal?.aborted) {
        console.error("Error fetching data:", error);
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void fetchData(controller.signal);
    return () => controller.abort();
  }, [fetchData]);

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.get("title"),
          description: formData.get("description"),
          mediaId: formData.get("mediaId"),
          category: formData.get("category"),
          tags: formData.get("tags")?.toString().split(",").map(t => t.trim()),
        }),
      });
      
      if (response.ok) {
        await fetchData();
        setAddModalOpen(false);
        (e.currentTarget as HTMLFormElement).reset();
      }
    } catch (error) {
      console.error("Error adding gallery item:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;
    
    try {
      const response = await fetch(`/api/admin/gallery/${id}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        setGallery(gallery.filter((item: GalleryItem) => item._id !== id));
      }
    } catch (error) {
      console.error("Error deleting gallery item:", error);
    }
  };

  const getMediaUrl = (mediaId: string) => {
    const mediaItem = media.find((m: MediaItem) => m._id === mediaId);
    return mediaItem?.url || "";
  };

  if (loading) {
    return (
      <Section className="bg-background min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent" />
      </Section>
    );
  }

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
              <span className="text-accent">Gallery</span>
            </Heading>
            <p className="mt-2 text-muted-foreground">
              Manage photos and videos in your gallery.
            </p>
          </div>
          <Button onClick={() => setAddModalOpen(true)} className="gap-2">
            <Upload className="h-5 w-5" />
            Add to Gallery
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8"
        >
          {gallery.length === 0 ? (
            <div className="rounded-lg border-2 border-dashed border-border bg-card p-12 text-center">
              <Images className="h-12 w-12 mx-auto text-muted-foreground" />
              <p className="mt-4 text-lg font-semibold">No gallery items</p>
              <p className="mt-2 text-muted-foreground">Add your first gallery item to get started</p>
              <Button onClick={() => setAddModalOpen(true)} className="mt-4">
                Add to Gallery
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {gallery.map((item: GalleryItem, index: number) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="group relative aspect-square rounded-lg border border-border bg-card overflow-hidden"
                >
                  <Image
                    src={getMediaUrl(item.mediaId)}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(item._id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1">
                    {item.isFeatured && (
                      <div className="bg-accent text-accent-foreground p-1 rounded">
                        <Star className="h-3 w-3" />
                      </div>
                    )}
                    {item.isPublished ? (
                      <div className="bg-green-500 text-white p-1 rounded">
                        <Eye className="h-3 w-3" />
                      </div>
                    ) : (
                      <div className="bg-yellow-500 text-white p-1 rounded">
                        <EyeOff className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-white text-sm font-medium truncate">{item.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </Container>

      {/* Add Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-lg p-6 w-full max-w-md mx-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Add to Gallery</h2>
              <Button variant="ghost" size="icon" onClick={() => setAddModalOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input type="text" name="title" required className="w-full px-3 py-2 rounded-lg border border-border bg-background" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Media</label>
                <select name="mediaId" required className="w-full px-3 py-2 rounded-lg border border-border bg-background">
                  {media.map((m: MediaItem) => (
                    <option key={m._id} value={m._id}>{m.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <input type="text" name="category" className="w-full px-3 py-2 rounded-lg border border-border bg-background" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea name="description" rows={3} className="w-full px-3 py-2 rounded-lg border border-border bg-background" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                <input type="text" name="tags" className="w-full px-3 py-2 rounded-lg border border-border bg-background" />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setAddModalOpen(false)}>Cancel</Button>
                <Button type="submit">Add</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </Section>
  );
}
