"use client";

import { motion } from "framer-motion";
import { Plus, Search } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export default function AdminPostsPage() {
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
              <span className="text-accent">Blog Posts</span>
            </Heading>
            <p className="mt-2 text-muted-foreground">
              Create and manage your blog content.
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-5 w-5" />
            New Post
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8"
        >
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search posts..."
                className="w-full h-12 pl-10 pr-4 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-4 px-6 text-left font-semibold">Title</th>
                  <th className="py-4 px-6 text-left font-semibold">Category</th>
                  <th className="py-4 px-6 text-left font-semibold">Status</th>
                  <th className="py-4 px-6 text-left font-semibold">Date</th>
                  <th className="py-4 px-6 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { title: "Progressive Overload Guide", category: "Training", status: "Published", date: "Jul 12, 2026" },
                  { title: "Nutrition for Strength", category: "Nutrition", status: "Published", date: "Jul 10, 2026" },
                  { title: "Mobility Routine", category: "Recovery", status: "Draft", date: "Jul 8, 2026" },
                  { title: "Building Consistency", category: "Motivation", status: "Published", date: "Jul 5, 2026" },
                ].map((post, index) => (
                  <tr key={index} className="border-b border-border last:border-b-0">
                    <td className="py-4 px-6 font-semibold">{post.title}</td>
                    <td className="py-4 px-6 text-muted-foreground">{post.category}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${
                          post.status === "Published"
                            ? "bg-green-500/20 text-green-500"
                            : "bg-yellow-500/20 text-yellow-500"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-muted-foreground">{post.date}</td>
                    <td className="py-4 px-6 text-right">
                      <Button variant="outline" size="sm">Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
