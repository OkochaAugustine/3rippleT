"use client";

import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  return (
    <Section className="bg-background min-h-screen">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Heading as="h1" size="xl">
            Profile <span className="text-accent">Settings</span>
          </Heading>
          <p className="mt-2 text-muted-foreground">
            Manage your personal information and preferences.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 max-w-2xl"
        >
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-6">
              <div className="h-24 w-24 rounded-full bg-accent/20 flex items-center justify-center">
                <User className="h-12 w-12 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold">John Doe</h3>
                <p className="text-muted-foreground">Premium Member</p>
                <Button size="sm" className="mt-2">
                  Change Photo
                </Button>
              </div>
            </div>

            <form className="mt-8 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                    <User className="h-4 w-4" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full h-12 px-4 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="john@example.com"
                    className="w-full h-12 px-4 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                    <Phone className="h-4 w-4" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 013-3344"
                    className="w-full h-12 px-4 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                    <Calendar className="h-4 w-4" />
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    defaultValue="1990-01-01"
                    className="w-full h-12 px-4 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                  <MapPin className="h-4 w-4" />
                  Address
                </label>
                <input
                  type="text"
                  defaultValue="123 Fitness Street, Gym City, GC 12345"
                  className="w-full h-12 px-4 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">Bio</label>
                <textarea
                  rows={4}
                  defaultValue="Fitness enthusiast working towards strength goals."
                  className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                />
              </div>
              <Button size="lg">Save Changes</Button>
            </form>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
