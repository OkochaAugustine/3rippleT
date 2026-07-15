/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { motion } from "framer-motion";
import { BarChart3, Users, Calendar, Images, Newspaper, Video, Bell, Settings, LayoutDashboard, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMemberStore } from "@/store/member-store";
import { formatNGN } from "@/lib/payments";

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
  const { members, loading, fetchMembers } = useMemberStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchMembers();
  }, [fetchMembers]);

  const planPrices: Record<string, number> = {
    none: 0,
    daily: 3000,
    monthly: 20000,
    premium: 45000,
  };

  const activeMembers = members.filter((m) => m.status === "active");
  const pendingMembers = members.filter((m) => m.status === "pending");
  
  // Calculate total monthly revenue based on active member plans
  const totalRevenue = activeMembers.reduce((acc, m) => {
    return acc + (planPrices[m.plan] || 0);
  }, 0);

  const activeRate = members.length 
    ? Math.round((activeMembers.length / members.length) * 100) 
    : 0;

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
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
            {loading && members.length === 0 ? (
              <div className="py-12 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-border bg-card p-6">
                  <p className="text-sm text-muted-foreground">Total Members</p>
                  <p className="mt-2 text-3xl font-bold">{members.length}</p>
                  <p className="mt-1 text-sm text-green-500">{pendingMembers.length} pending</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-6">
                  <p className="text-sm text-muted-foreground">Active Memberships</p>
                  <p className="mt-2 text-3xl font-bold">{activeMembers.length}</p>
                  <p className="mt-1 text-sm text-accent">{activeRate}% active rate</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-6">
                  <p className="text-sm text-muted-foreground">Est. Monthly Rev.</p>
                  <p className="mt-2 text-2xl font-bold">{formatNGN(totalRevenue)}</p>
                  <p className="mt-1 text-sm text-green-500">Based on active plans</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-6">
                  <p className="text-sm text-muted-foreground">Upcoming Events</p>
                  <p className="mt-2 text-3xl font-bold">8</p>
                  <p className="mt-1 text-sm text-muted-foreground">Next in 5 days</p>
                </div>
              </div>
            )}

            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-lg font-bold">Recent Registrations</h3>
              <div className="mt-4 space-y-4">
                {members.slice(0, 3).map((member) => (
                  <div key={member.id} className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{member.name}</p>
                      <p className="text-sm text-muted-foreground">Joined {member.plan} plan - status: {member.status}</p>
                    </div>
                    <span className="ml-auto text-sm text-muted-foreground">{member.joinedDate}</span>
                  </div>
                ))}
                {members.length === 0 && (
                  <p className="text-sm text-muted-foreground">No recent registrations</p>
                )}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-lg font-bold">Quick Actions</h3>
                <div className="mt-4 space-y-3">
                  <Link href="/admin/members">
                    <Button variant="outline" className="w-full justify-start gap-2 mb-2">
                      <Users className="h-4 w-4" />
                      Manage Members
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Calendar className="h-4 w-4" />
                    Create Event
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2 mt-2">
                    <Newspaper className="h-4 w-4" />
                    Write Blog Post
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
