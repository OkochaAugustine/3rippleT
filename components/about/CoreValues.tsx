"use client";

import { motion } from "framer-motion";
import { Heart, Shield, Target, Users, Zap, Award } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

const values = [
  { icon: Heart, title: "Community First", description: "We're a family that supports each other through every rep and every milestone." },
  { icon: Shield, title: "Integrity", description: "We believe in honest coaching, transparent pricing, and authentic relationships." },
  { icon: Target, title: "Excellence", description: "We never settle for good enough—we constantly strive for greatness." },
  { icon: Users, title: "Inclusivity", description: "Everyone belongs here, regardless of fitness level or background." },
  { icon: Zap, title: "Innovation", description: "We stay ahead with cutting-edge training methods and technology." },
  { icon: Award, title: "Results", description: "We're committed to helping you achieve measurable, lasting transformations." },
];

export function CoreValues() {
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
            Core <span className="text-accent">Values</span>
          </Heading>
          <p className="mt-4 text-lg text-primary-foreground/72">
            The principles that guide everything we do.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mt-4 text-lg font-bold">{value.title}</h3>
                <p className="mt-2 text-primary-foreground/72">{value.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
