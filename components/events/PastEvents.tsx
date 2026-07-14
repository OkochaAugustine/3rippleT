"use client";

import Image from "next/image";

import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

const pastEvents = [
  { title: "Winter Challenge 2025", date: "December 2025", image: "/images/placeholders/event-1.svg" },
  { title: "Fall Competition", date: "November 2025", image: "/images/placeholders/event-2.svg" },
  { title: "Summer BBQ", date: "August 2025", image: "/images/placeholders/event-3.svg" },
];

export function PastEvents() {
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
            Past <span className="text-accent">Events</span>
          </Heading>
          <p className="mt-4 text-primary-foreground/72">
            Highlights from our previous events.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pastEvents.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5">
                <Image
                  src={event.image}
                  alt={event.title}
                  width={400}
                  height={250}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-sm text-accent">{event.date}</p>
                  <h3 className="mt-1 font-bold">{event.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
