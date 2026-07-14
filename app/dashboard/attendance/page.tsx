"use client";

import { motion } from "framer-motion";
import { Calendar, TrendingUp } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

export default function AttendancePage() {
  return (
    <Section className="bg-background min-h-screen">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Heading as="h1" size="xl">
            Attendance <span className="text-accent">History</span>
          </Heading>
          <p className="mt-2 text-muted-foreground">
            Track your workout attendance and consistency.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 space-y-6"
        >
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" />
                <p className="text-sm text-muted-foreground">This Month</p>
              </div>
              <p className="mt-2 text-3xl font-bold">24</p>
              <p className="text-sm text-green-500">+12% from last month</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                <p className="text-sm text-muted-foreground">Current Streak</p>
              </div>
              <p className="mt-2 text-3xl font-bold">14</p>
              <p className="text-sm text-muted-foreground">days in a row</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" />
                <p className="text-sm text-muted-foreground">Total Sessions</p>
              </div>
              <p className="mt-2 text-3xl font-bold">156</p>
              <p className="text-sm text-muted-foreground">since joining</p>
            </div>
          </div>

          <div className="rounded-lg  border border-border bg-card p-6">
            <h3 className="text-lg font-bold mb-4">Recent Attendance</h3>
            <div className="space-y-3">
              {[
                { date: "July 11, 2026", class: "Strength & Conditioning", time: "5:00 PM" },
                { date: "July 9, 2026", class: "Mobility Session", time: "9:00 AM" },
                { date: "July 7, 2026", class: "Olympic Lifting", time: "5:00 PM" },
                { date: "July 5, 2026", class: "HIIT Workout", time: "7:00 PM" },
                { date: "July 3, 2026", class: "Strength & Conditioning", time: "5:00 PM" },
              ].map((session, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
                  <div>
                    <p className="font-semibold">{session.class}</p>
                    <p className="text-sm text-muted-foreground">{session.date}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{session.time}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
