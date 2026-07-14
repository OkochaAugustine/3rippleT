"use client";

import { motion } from "framer-motion";
import { Target, Eye, Zap } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

export function MissionVision() {
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
          <Heading as="h1" size="xl" className="mb-4">
            Our <span className="text-accent">Purpose</span>
          </Heading>
          <p className="mx-auto max-w-2xl text-lg text-primary-foreground/72">
            Building stronger bodies and sharper minds through world-class coaching and community.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-accent/20">
              <Target className="h-7 w-7 text-accent" />
            </div>
            <h3 className="mt-6 text-xl font-bold">Mission</h3>
            <p className="mt-3 text-primary-foreground/72">
              To empower individuals to achieve their peak physical potential through expert coaching, innovative programming, and a supportive community that celebrates every milestone.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-accent/20">
              <Eye className="h-7 w-7 text-accent" />
            </div>
            <h3 className="mt-6 text-xl font-bold">Vision</h3>
            <p className="mt-3 text-primary-foreground/72">
              To be the premier fitness destination where athletes of all levels transform their lives through movement, mindset, and meaningful connections.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-accent/20">
              <Zap className="h-7 w-7 text-accent" />
            </div>
            <h3 className="mt-6 text-xl font-bold">Impact</h3>
            <p className="mt-3 text-primary-foreground/72">
              Creating lasting change in 500+ lives annually through fitness education, personal growth, and community engagement that extends far beyond the gym walls.
            </p>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
