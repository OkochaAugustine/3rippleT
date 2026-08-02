"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Search, Save, Edit } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

interface ContentItem {
  _id: string;
  key: string;
  section: string;
  value: string;
  type: string;
  description?: string;
  updatedAt: string;
}

export default function AdminContentPage() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSection, setSelectedSection] = useState("all");
  const [editingContent, setEditingContent] = useState<Record<string, string>>({});

  const sections = ["all", "homepage", "hero", "about", "programs", "contact", "footer", "other"];

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/admin/content");
      const data = await response.json();
      setContent(data.content || []);
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSave = async (key: string, value: string) => {
    const item = content.find((c: ContentItem) => c.key === key);
    if (!item) return;

    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key,
          section: item.section,
          value,
          type: item.type,
          description: item.description,
        }),
      });

      if (response.ok) {
        await fetchContent();
        setEditingContent((prev: Record<string, string>) => ({ ...prev, [key]: "" }));
      }
    } catch (error) {
      console.error("Error saving content:", error);
    }
  };

  const filteredContent = content.filter((item: ContentItem) => {
    const matchesSearch = item.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSection = selectedSection === "all" || item.section === selectedSection;
    return matchesSearch && matchesSection;
  });

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
        >
          <Heading as="h1" size="xl">
            <span className="text-accent">Content Management</span>
          </Heading>
          <p className="mt-2 text-muted-foreground">
            Manage website text content and copy.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 space-y-6"
        >
          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent w-full"
              />
            </div>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {sections.map((section) => (
                <option key={section} value={section}>
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Content List */}
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            {filteredContent.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground">
                No content found. Add content keys to manage website text.
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredContent.map((item: ContentItem) => (
                  <div key={item._id} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold uppercase bg-accent/20 text-accent px-2 py-1 rounded">
                            {item.section}
                          </span>
                          <span className="text-xs text-muted-foreground">{item.type}</span>
                        </div>
                        <p className="font-medium">{item.key}</p>
                        {item.description && (
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        )}
                      </div>
                      <div className="flex-1">
                        {editingContent[item.key] !== undefined ? (
                          <textarea
                            value={editingContent[item.key]}
                            onChange={(e) => setEditingContent({ ...editingContent, [item.key]: e.target.value })}
                            rows={3}
                            className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                          />
                        ) : (
                          <p className="text-sm text-muted-foreground line-clamp-3">{item.value}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {editingContent[item.key] !== undefined ? (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleSave(item.key, editingContent[item.key])}
                              className="gap-2"
                            >
                              <Save className="h-4 w-4" />
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingContent({ ...editingContent, [item.key]: "" })}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingContent({ ...editingContent, [item.key]: item.value })}
                            className="gap-2"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
