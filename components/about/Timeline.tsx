"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

const milestones = [
  { year: "2014", title: "The Beginning", description: "Opened our doors with a vision to change how people experience fitness." },
  { year: "2016", title: "Community Growth", description: "Reached our first 100 members and expanded our class offerings." },
  { year: "2018", title: "New Facility", description: "Moved to our current state-of-the-art training facility." },
  { year: "2020", title: "Digital Innovation", description: "Launched virtual training and online coaching programs." },
  { year: "2022", title: "500 Members", description: "Celebrated serving 500+ active members in our community." },
  { year: "2024", title: "Expansion", description: "Added new programs and enhanced our coaching team." },
];

export function Timeline() {
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
            Our <span className="text-accent">Journey</span>
          </Heading>
          <p className="mt-4 text-lg text-primary-foreground/72">
            From humble beginnings to a thriving fitness community.
          </p>
        </motion.div>

        <div className="mt-16 space-y-8">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="flex gap-6 md:gap-12"
            >
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary font-bold">
                  <Calendar className="h-5 w-5" />
                </div>
                {index !== milestones.length - 1 && (
                  <div className="mt-4 h-full w-0.5 bg-white/20" />
                )}
              </div>
              <div className="flex-1 pb-8">
                <p className="text-2xl font-black text-accent">{milestone.year}</p>
                <h3 className="mt-2 text-xl font-bold">{milestone.title}</h3>
                <p className="mt-2 text-primary-foreground/72">{milestone.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
