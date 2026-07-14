"use client";

import { motion } from "framer-motion";
import { Bell, Lock, User, Globe } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <Section className="bg-background min-h-screen">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Heading as="h1" size="xl">
            Account <span className="text-accent">Settings</span>
          </Heading>
          <p className="mt-2 text-muted-foreground">
            Manage your account preferences and security.
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
              <Bell className="h-5 w-5 text-accent" />
              Notification Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Class Reminders</p>
                  <p className="text-sm text-muted-foreground">Get reminded before classes</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Promotional Emails</p>
                  <p className="text-sm text-muted-foreground">Receive offers and updates</p>
                </div>
                <input type="checkbox" className="rounded" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold mb-4">
              <Lock className="h-5 w-5 text-accent" />
              Security
            </h3>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Change Password</p>
                <p className="text-sm text-muted-foreground mb-3">Update your password regularly</p>
                <Button variant="outline">Change Password</Button>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="font-semibold">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground mb-3">Add an extra layer of security</p>
                <Button variant="outline">Enable 2FA</Button>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold mb-4">
              <Globe className="h-5 w-5 text-accent" />
              Preferences
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Language</label>
                <select className="w-full h-12 px-4 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Timezone</label>
                <select className="w-full h-12 px-4 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
                  <option>UTC-8 (Pacific Time)</option>
                  <option>UTC-5 (Eastern Time)</option>
                  <option>UTC+0 (GMT)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold mb-4 text-destructive">
              <User className="h-5 w-5" />
              Danger Zone
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
