"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

const hours = [
  { day: "Monday - Friday", time: "5:00 AM - 10:00 PM" },
  { day: "Saturday - Sunday", time: "7:00 AM - 6:00 PM" },
];

export function BusinessHours() {
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
            Business <span className="text-accent">Hours</span>
          </Heading>
        </motion.div>

        <div className="mt-12 max-w-md mx-auto">
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            {hours.map((schedule, index) => (
              <motion.div
                key={schedule.day}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="flex items-center justify-between p-6 border-b border-border last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-accent" />
                  <span className="font-semibold">{schedule.day}</span>
                </div>
                <span className="text-muted-foreground">{schedule.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
