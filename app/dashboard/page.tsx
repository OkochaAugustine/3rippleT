"use client";

import { motion } from "framer-motion";
import { User, CreditCard, Calendar, FileText, Bell, Settings, LogOut } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const menuItems = [
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: CreditCard, label: "Membership", href: "/dashboard/membership" },
  { icon: Calendar, label: "Attendance", href: "/dashboard/attendance" },
  { icon: FileText, label: "Bookings", href: "/dashboard/bookings" },
  { icon: FileText, label: "Invoices", href: "/dashboard/invoices" },
  { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardPage() {
  return (
    <Section className="bg-background min-h-screen">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Heading as="h1" size="xl">
            Welcome back, <span className="text-accent">John</span>
          </Heading>
          <p className="mt-2 text-muted-foreground">
            Manage your fitness journey from your personal dashboard.
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
                <button className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </button>
              </nav>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-3 space-y-6"
          >
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-lg border border-border bg-card p-6">
                <p className="text-sm text-muted-foreground">Current Plan</p>
                <p className="mt-2 text-2xl font-bold">Premium</p>
                <p className="mt-1 text-sm text-accent">Active</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <p className="text-sm text-muted-foreground">Workouts This Month</p>
                <p className="mt-2 text-2xl font-bold">24</p>
                <p className="mt-1 text-sm text-green-500">+12% from last month</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <p className="text-sm text-muted-foreground">Next Session</p>
                <p className="mt-2 text-2xl font-bold">Today</p>
                <p className="mt-1 text-sm text-muted-foreground">5:00 PM - Strength</p>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-lg font-bold">Recent Activity</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">Strength & Conditioning</p>
                    <p className="text-sm text-muted-foreground">July 11, 2026 - 5:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">Mobility Session</p>
                    <p className="text-sm text-muted-foreground">July 9, 2026 - 9:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">Invoice Paid</p>
                    <p className="text-sm text-muted-foreground">July 1, 2026 - $149.00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-lg font-bold">Upcoming Classes</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-muted p-4">
                  <div>
                    <p className="font-semibold">Olympic Lifting</p>
                    <p className="text-sm text-muted-foreground">Today at 5:00 PM</p>
                  </div>
                  <Button size="sm">View Details</Button>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-muted p-4">
                  <div>
                    <p className="font-semibold">HIIT Workout</p>
                    <p className="text-sm text-muted-foreground">Tomorrow at 7:00 PM</p>
                  </div>
                  <Button size="sm">View Details</Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
