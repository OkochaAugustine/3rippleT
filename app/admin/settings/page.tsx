"use client";

import { motion } from "framer-motion";
import { Globe, Lock, Palette, Database } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export default function AdminSettingsPage() {
  return (
    <Section className="bg-background min-h-screen">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Heading as="h1" size="xl">
            <span className="text-accent">Settings</span>
          </Heading>
          <p className="mt-2 text-muted-foreground">
            Configure your platform settings and preferences.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 space-y-6 max-w-2xl"
        >
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold mb-4">
              <Globe className="h-5 w-5 text-accent" />
              General Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Site Name</label>
                <input
                  type="text"
                  defaultValue="3Ripple T Fitness"
                  className="w-full h-12 px-4 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Site Description</label>
                <textarea
                  rows={3}
                  defaultValue="A premium fitness platform for training, memberships, events, coaching, and community momentum."
                  className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Contact Email</label>
                <input
                  type="email"
                  defaultValue="hello@3rippletfitness.com"
                  className="w-full h-12 px-4 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold mb-4">
              <Palette className="h-5 w-5 text-accent" />
              Appearance
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Primary Color</label>
                <input
                  type="color"
                  defaultValue="#0b0f14"
                  className="w-full h-12 rounded-md border border-border bg-background cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Accent Color</label>
                <input
                  type="color"
                  defaultValue="#3b82f6"
                  className="w-full h-12 rounded-md border border-border bg-background cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold mb-4">
              <Lock className="h-5 w-5 text-accent" />
              Security
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Session Timeout</p>
                  <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                </div>
                <select className="h-10 px-4 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
                  <option>30 minutes</option>
                  <option>1 hour</option>
                  <option>2 hours</option>
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold mb-4">
              <Database className="h-5 w-5 text-accent" />
              Data Management
            </h3>
            <div className="space-y-4">
              <Button variant="outline" className="w-full">
                Export All Data
              </Button>
              <Button variant="outline" className="w-full">
                Backup Database
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <Button size="lg" className="flex-1">
              Save Changes
            </Button>
            <Button variant="outline" size="lg">
              Reset to Defaults
            </Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
