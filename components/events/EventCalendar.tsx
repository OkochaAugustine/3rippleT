"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

const calendarEvents = [
  { date: "July 20", title: "Summer Throwdown 2026", type: "Competition" },
  { date: "August 3", title: "Olympic Lifting Seminar", type: "Seminar" },
  { date: "August 17", title: "Community BBQ", type: "Social" },
  { date: "September 14", title: "Fall Challenge", type: "Competition" },
  { date: "October 5", title: "Mobility Workshop", type: "Workshop" },
  { date: "November 23", title: "Thanksgiving Workout", type: "Social" },
];

export function EventCalendar() {
  return (
    <Section className="bg-background">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Heading as="h2" size="lg">
            Event <span className="text-accent">Calendar</span>
          </Heading>
          <p className="mt-4 text-muted-foreground">
            Plan ahead with our upcoming events schedule.
          </p>
        </motion.div>

        <div className="mt-12 max-w-4xl mx-auto">
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="grid gap-4 p-6">
              {calendarEvents.map((event, index) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="flex items-center gap-6 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-accent/20">
                    <Calendar className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-accent">{event.date}</span>
                      <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                        {event.type}
                      </span>
                    </div>
                    <h3 className="mt-1 font-bold">{event.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
