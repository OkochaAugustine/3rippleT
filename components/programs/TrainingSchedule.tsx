"use client";

import { motion } from "framer-motion";
import { Clock, Calendar } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

const schedule = [
  { day: "Monday", classes: ["6:00 AM - Strength & Conditioning", "9:00 AM - Mobility", "5:00 PM - Olympic Lifting", "7:00 PM - HIIT"] },
  { day: "Tuesday", classes: ["6:00 AM - HIIT", "9:00 AM - Strength & Conditioning", "5:00 PM - Mobility", "7:00 PM - Personal Training"] },
  { day: "Wednesday", classes: ["6:00 AM - Olympic Lifting", "9:00 AM - HIIT", "5:00 PM - Strength & Conditioning", "7:00 PM - Mobility"] },
  { day: "Thursday", classes: ["6:00 AM - Strength & Conditioning", "9:00 AM - Olympic Lifting", "5:00 PM - HIIT", "7:00 PM - Personal Training"] },
  { day: "Friday", classes: ["6:00 AM - Mobility", "9:00 AM - Strength & Conditioning", "5:00 PM - Olympic Lifting", "7:00 PM - HIIT"] },
  { day: "Saturday", classes: ["8:00 AM - Open Gym", "10:00 AM - Community Workout", "12:00 PM - Mobility"] },
  { day: "Sunday", classes: ["9:00 AM - Open Gym", "11:00 AM - Recovery Session"] },
];

export function TrainingSchedule() {
  return (
    <Section className="bg-primary text-primary-foreground">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Heading as="h2" size="lg">
            Weekly <span className="text-accent">Schedule</span>
          </Heading>
          <p className="mt-4 text-lg text-primary-foreground/72">
            50+ classes every week. Find the time that works for you.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {schedule.map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.6 }}
              className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" />
                <h3 className="text-lg font-bold">{day.day}</h3>
              </div>
              <div className="mt-4 space-y-3">
                {day.classes.map((cls) => (
                  <div key={cls} className="flex items-start gap-2 text-sm">
                    <Clock className="h-4 w-4 shrink-0 mt-0.5 text-primary-foreground/58" />
                    <span className="text-primary-foreground/72">{cls}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
