"use client";

import Image from "next/image";

import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

const coaches = [
  { name: "Tim Thompson", role: "Head Coach", image: "/images/placeholders/tim-1.svg", specialty: "Strength & Conditioning" },
  { name: "Sarah Martinez", role: "Senior Coach", image: "/images/placeholders/trainer-1.svg", specialty: "Mobility & Recovery" },
  { name: "Mike Chen", role: "Coach", image: "/images/placeholders/trainer-2.svg", specialty: "Olympic Lifting" },
];

export function ProgramCoaches() {
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
            Meet Your <span className="text-accent">Coaches</span>
          </Heading>
          <p className="mt-4 text-lg text-muted-foreground">
            Expert guidance from certified professionals.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {coaches.map((coach, index) => (
            <motion.div
              key={coach.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="relative overflow-hidden rounded-lg border border-border bg-card">
                <Image
                  src={coach.image}
                  alt={coach.name}
                  width={300}
                  height={300}
                  className="w-full h-auto object-cover"
                />
              </div>
              <h3 className="mt-4 text-lg font-bold">{coach.name}</h3>
              <p className="text-accent">{coach.role}</p>
              <p className="mt-1 text-sm text-muted-foreground">{coach.specialty}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
