"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Video, Upload, Search, Trash2, Edit, Copy, Grid, List, FileText, X, Check } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

interface MediaItem {
  _id: string;
  title: string;
  category: string;
  description?: string;
  altText: string;
  url: string;
  fileSize: number;
  mimeType: string;
  displayOrder: number;
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const categories = [
    "all",
    "hero",
    "gallery",
    "program",
    "class",
    "trainer",
    "event",
    "testimonial",
    "about",
    "marketing",
    "other",
  ];

  const fetchMedia = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await fetch("/api/admin/media", { signal });
      const data = await response.json();
      if (!signal?.aborted) {
        setMedia(data.media || []);
      }
    } catch (error) {
      if (!signal?.aborted) {
        console.error("Error fetching media:", error);
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void fetchMedia(controller.signal);
    return () => controller.abort();
  }, [fetchMedia]);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });
      
      if (response.ok) {
        await fetchMedia();
        setUploadModalOpen(false);
        (e.currentTarget as HTMLFormElement).reset();
      }
    } catch (error) {
      console.error("Error uploading media:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media?")) return;
    
    try {
      const response = await fetch(`/api/admin/media/${id}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        setMedia(media.filter((item: MediaItem) => item._id !== id));
      }
    } catch (error) {
      console.error("Error deleting media:", error);
    }
  };

  const handleTogglePublish = async (id: string, isPublished: boolean) => {
    try {
      const response = await fetch(`/api/admin/media/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !isPublished }),
      });
      
      if (response.ok) {
        setMedia(media.map((item) => 
          item._id === id ? { ...item, isPublished: !isPublished } : item
        ));
      }
    } catch (error) {
      console.error("Error updating media:", error);
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  const filteredMedia = media.filter((item: MediaItem) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.altText.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const isImage = (mimeType: string) => mimeType.startsWith("image/");
  const isVideo = (mimeType: string) => mimeType.startsWith("video/");

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
              <span className="text-accent">Media Library</span>
            </Heading>
            <p className="mt-2 text-muted-foreground">
              Manage all your media files and assets.
            </p>
          </div>
          <Button onClick={() => setUploadModalOpen(true)} className="gap-2">
            <Upload className="h-5 w-5" />
            Upload Files
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 space-y-6"
        >
          {/* Filters and Search */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search media..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? undefined : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? undefined : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Media Grid/List */}
          {filteredMedia.length === 0 ? (
            <div className="rounded-lg border-2 border-dashed border-border bg-card p-12 text-center">
              <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
              <p className="mt-4 text-lg font-semibold">No media found</p>
              <p className="mt-2 text-muted-foreground">Upload your first media file to get started</p>
              <Button onClick={() => setUploadModalOpen(true)} className="mt-4">
                Upload Files
              </Button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {filteredMedia.map((item: MediaItem, index: number) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="group relative rounded-lg border border-border bg-card overflow-hidden hover:border-accent transition-colors"
                >
                  <div className="relative aspect-square">
                    {isImage(item.mimeType) ? (
                      <Image
                        src={item.url}
                        alt={item.altText}
                        fill
                        className="object-cover"
                      />
                    ) : isVideo(item.mimeType) ? (
                      <div className="flex items-center justify-center h-full bg-muted">
                        <Video className="h-12 w-12 text-muted-foreground" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full bg-muted">
                        <FileText className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={() => handleDelete(item._id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={() => handleCopyUrl(item.url)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDelete(item._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(item.fileSize)}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground capitalize">{item.category}</span>
                      <button
                        onClick={() => handleTogglePublish(item._id, item.isPublished)}
                        className={`text-xs ${item.isPublished ? "text-green-500" : "text-yellow-500"}`}
                      >
                        {item.isPublished ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium">Media</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Title</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Category</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Size</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMedia.map((item: MediaItem) => (
                    <tr key={item._id} className="border-t border-border">
                      <td className="px-4 py-3">
                        <div className="relative h-12 w-12 rounded overflow-hidden">
                          {isImage(item.mimeType) ? (
                            <Image src={item.url} alt={item.altText} fill className="object-cover" />
                          ) : (
                            <div className="flex items-center justify-center h-full bg-muted">
                              <FileText className="h-6 w-6 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium">{item.title}</td>
                      <td className="px-4 py-3 text-sm capitalize">{item.category}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{formatFileSize(item.fileSize)}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleTogglePublish(item._id, item.isPublished)}
                          className={`text-xs ${item.isPublished ? "text-green-500" : "text-yellow-500"}`}
                        >
                          {item.isPublished ? "Published" : "Draft"}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost" onClick={() => handleCopyUrl(item.url)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => handleDelete(item._id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </Container>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-lg p-6 w-full max-w-md mx-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Upload Media</h2>
              <Button variant="ghost" size="icon" onClick={() => setUploadModalOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">File</label>
                <input
                  type="file"
                  name="file"
                  required
                  accept="image/*,video/*"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select name="category" required className="w-full px-3 py-2 rounded-lg border border-border bg-background">
                  {categories.filter(c => c !== "all").map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Alt Text</label>
                <input
                  type="text"
                  name="altText"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  name="tags"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setUploadModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Upload</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </Section>
  );
}
