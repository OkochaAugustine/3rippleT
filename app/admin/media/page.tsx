"use client";

import { motion } from "framer-motion";
import { Video, Folder, Upload } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export default function AdminMediaPage() {
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
          <Button className="gap-2">
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Training Videos", count: 24, icon: Video },
              { name: "Event Footage", count: 18, icon: Video },
              { name: "Coach Tips", count: 12, icon: Video },
              { name: "Member Stories", count: 8, icon: Video },
              { name: "Gym Photos", count: 156, icon: Folder },
              { name: "Event Photos", count: 89, icon: Folder },
              { name: "Coach Photos", count: 24, icon: Folder },
              { name: "Member Photos", count: 67, icon: Folder },
            ].map((folder, index) => {
              const Icon = folder.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="rounded-lg border border-border bg-card p-6 hover:border-accent transition-colors cursor-pointer"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="mt-4 font-bold">{folder.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{folder.count} files</p>
                </motion.div>
              );
            })}
          </div>

          <div className="rounded-lg border-2 border-dashed border-border bg-card p-12 text-center">
            <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
            <p className="mt-4 text-lg font-semibold">Upload new media</p>
            <p className="mt-2 text-muted-foreground">Drag and drop files here, or click to browse</p>
            <Button className="mt-4">Select Files</Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
