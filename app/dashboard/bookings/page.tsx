"use client";

import { motion } from "framer-motion";
import { Calendar, Plus } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export default function BookingsPage() {
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
              Class <span className="text-accent">Bookings</span>
            </Heading>
            <p className="mt-2 text-muted-foreground">
              Manage your class reservations.
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-5 w-5" />
            Book Class
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 space-y-6"
        >
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-bold mb-4">Upcoming Bookings</h3>
            <div className="space-y-4">
              {[
                { class: "Olympic Lifting", date: "Today", time: "5:00 PM", instructor: "Mike Chen" },
                { class: "HIIT Workout", date: "Tomorrow", time: "7:00 PM", instructor: "Sarah Martinez" },
                { class: "Strength & Conditioning", date: "July 14, 2026", time: "5:00 PM", instructor: "Tim Thompson" },
              ].map((booking, index) => (
                <div key={index} className="flex items-center justify-between rounded-lg bg-muted p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold">{booking.class}</p>
                      <p className="text-sm text-muted-foreground">
                        {booking.date} at {booking.time} • {booking.instructor}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Cancel</Button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-bold mb-4">Past Bookings</h3>
            <div className="space-y-3">
              {[
                { class: "Mobility Session", date: "July 9, 2026", time: "9:00 AM", status: "Attended" },
                { class: "Strength & Conditioning", date: "July 7, 2026", time: "5:00 PM", status: "Attended" },
                { class: "HIIT Workout", date: "July 5, 2026", time: "7:00 PM", status: "Missed" },
              ].map((booking, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
                  <div>
                    <p className="font-semibold">{booking.class}</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.date} at {booking.time}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      booking.status === "Attended" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
