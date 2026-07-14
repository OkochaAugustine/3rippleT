"use client";

import Image from "next/image";

import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

export function OurStory() {
  return (
    <Section className="bg-background">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Heading as="h2" size="lg">
              Our <span className="text-accent">Story</span>
            </Heading>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                3Ripple T Fitness was born from a simple belief: that everyone deserves access to world-class coaching and a community that genuinely cares about their success.
              </p>
              <p>
                What started as a small training space has evolved into a premier fitness destination, but our core values remain unchanged. We believe in training with intent, moving with purpose, and supporting each other through every rep and every milestone.
              </p>
              <p>
                Our name represents the three ripples of fitness: physical strength, mental resilience, and community connection. When you train with us, you&apos;re not just building a better body—you&apos;re creating momentum that touches every aspect of your life.
              </p>
              <p>
                Today, we&apos;re proud to serve 500+ active members, offer 50+ weekly classes, and continue pushing the boundaries of what&apos;s possible in fitness coaching and community building.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-lg border border-border bg-card shadow-soft">
              <Image
                src="/images/placeholders/hero-bg.svg"
                alt="3Ripple T Fitness facility"
                width={600}
                height={500}
                className="w-full h-auto"
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 rounded-lg border border-border bg-card p-6 shadow-soft">
              <p className="text-4xl font-black text-accent">12+</p>
              <p className="text-sm text-muted-foreground">Years of Excellence</p>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
