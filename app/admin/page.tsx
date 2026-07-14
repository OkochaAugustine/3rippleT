"use client";

import { motion } from "framer-motion";
import { BarChart3, Users, Calendar, Images, Newspaper, Video, Bell, Settings, LayoutDashboard } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Users, label: "Members", href: "/admin/members" },
  { icon: Calendar, label: "Events", href: "/admin/events" },
  { icon: Images, label: "Gallery", href: "/admin/gallery" },
  { icon: Newspaper, label: "Blog", href: "/admin/posts" },
  { icon: Video, label: "Media", href: "/admin/media" },
  { icon: Bell, label: "Notifications", href: "/admin/notifications" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminPage() {
  return (
    <Section className="bg-background min-h-screen">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Heading as="h1" size="xl">
            Admin <span className="text-accent">Dashboard</span>
          </Heading>
          <p className="mt-2 text-muted-foreground">
            Manage your fitness platform from one central hub.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-6 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="rounded-lg border border-border bg-card p-4">
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-3 space-y-6"
          >
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-border bg-card p-6">
                <p className="text-sm text-muted-foreground">Total Members</p>
                <p className="mt-2 text-3xl font-bold">524</p>
                <p className="mt-1 text-sm text-green-500">+12% this month</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <p className="text-sm text-muted-foreground">Active Memberships</p>
                <p className="mt-2 text-3xl font-bold">487</p>
                <p className="mt-1 text-sm text-muted-foreground">93% active rate</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="mt-2 text-3xl font-bold">$72,523</p>
                <p className="mt-1 text-sm text-green-500">+8% from last month</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <p className="text-sm text-muted-foreground">Upcoming Events</p>
                <p className="mt-2 text-3xl font-bold">8</p>
                <p className="mt-1 text-sm text-muted-foreground">Next in 5 days</p>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-lg font-bold">Recent Activity</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">New member registered</p>
                    <p className="text-sm text-muted-foreground">John Smith joined Premium plan</p>
                  </div>
                  <span className="ml-auto text-sm text-muted-foreground">2 hours ago</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">Event registration</p>
                    <p className="text-sm text-muted-foreground">25 people signed up for Summer Throwdown</p>
                  </div>
                  <span className="ml-auto text-sm text-muted-foreground">5 hours ago</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Newspaper className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">Blog post published</p>
                    <p className="text-sm text-muted-foreground">&quot;Progressive Overload Guide&quot; is live</p>
                  </div>
                  <span className="ml-auto text-sm text-muted-foreground">1 day ago</span>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-lg font-bold">Quick Actions</h3>
                <div className="mt-4 space-y-3">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Users className="h-4 w-4" />
                    Add New Member
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Calendar className="h-4 w-4" />
                    Create Event
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Newspaper className="h-4 w-4" />
                    Write Blog Post
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Images className="h-4 w-4" />
                    Upload Media
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-lg font-bold">System Status</h3>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Server Status</span>
                    <span className="rounded-full bg-green-500/20 text-green-500 px-2 py-1 text-xs font-semibold">Online</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database</span>
                    <span className="rounded-full bg-green-500/20 text-green-500 px-2 py-1 text-xs font-semibold">Connected</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Services</span>
                    <span className="rounded-full bg-green-500/20 text-green-500 px-2 py-1 text-xs font-semibold">Operational</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Storage</span>
                    <span className="text-sm text-muted-foreground">45% used</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
