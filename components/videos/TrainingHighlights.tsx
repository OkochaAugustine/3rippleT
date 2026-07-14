"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

const highlights = [
  { title: "Deadlift PR", thumbnail: "/images/placeholders/gym-5.svg" },
  { title: "Box Jump Challenge", thumbnail: "/images/placeholders/gym-6.svg" },
  { title: "Team Workout", thumbnail: "/images/placeholders/gym-1.svg" },
];

export function TrainingHighlights() {
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
            Training <span className="text-accent">Highlights</span>
          </Heading>
          <p className="mt-4 text-muted-foreground">
            Epic moments from our training floor.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg border border-border bg-card aspect-video cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center bg-primary/20 group-hover:bg-primary/30 transition-colors">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
                    <Play className="h-6 w-6 text-accent fill-accent" />
                  </div>
                </div>
              </div>
              <h3 className="mt-3 font-semibold">{highlight.title}</h3>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
