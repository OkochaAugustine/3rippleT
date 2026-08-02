"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function OurStory() {
  return (
    <Section className="bg-black py-24 md:py-32">
      <Container>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-8">
              Our Story
            </h2>
          </motion.div>

          <div className="space-y-8 text-lg md:text-xl text-white/80 leading-relaxed">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              It started with a simple idea: create a space where people could come together, push their limits, and support each other on their fitness journeys. What began as a small local fitness community in Asaba has grown into something far bigger than we ever imagined.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Over the last 10 years, we have witnessed incredible transformations. Not just in bodies, but in minds and spirits. We have seen strangers become training partners, training partners become friends, and friends become family. This is the heart of 3Ripple T Fitness.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Today, with over 200 active members, we are proud to be one of the leading fitness communities in Delta State. But we are not stopping here. We continue to grow, innovate, and inspire through our signature events like the Delta State Fitness Carnival, Tabata Fitness Events, and our ongoing Community Wellness Programs.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Our journey is far from over. Every day, we wake up with the same passion that started it all: helping people become healthier, stronger, more confident, and more disciplined through fitness. This is our story. And we invite you to be part of the next chapter.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">
              Location
            </p>
            <p className="text-white/90">
              Behind La Diva Hotel, Okpanam Road, Asaba, Delta State, Nigeria
            </p>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
