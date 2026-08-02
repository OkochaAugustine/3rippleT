"use client";

import { motion } from "framer-motion";
import { Flame, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function DeltaStateFitnessCarnival() {
  return (
    <Section className="bg-gradient-to-b from-black via-black to-accent/10 py-24 md:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/10 backdrop-blur-md px-6 py-2.5 mb-8"
          >
            <Flame className="w-5 h-5 text-accent" />
            <span className="text-sm font-bold uppercase tracking-wider text-accent">
              Signature Event
            </span>
          </motion.div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-6">
            Delta State Fitness Carnival
          </h2>

          <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
            3Ripple T Fitness proudly organizes the Delta State Fitness Carnival, bringing together athletes,
            fitness enthusiasts, families, businesses, and the wider community to celebrate health, fitness, and unity.
          </p>

          <p className="text-white/70 mb-12 max-w-3xl mx-auto">
            This flagship event showcases the best of Delta State&apos;s fitness community with competitions,
            demonstrations, wellness activities, and unforgettable moments of connection and achievement.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                asChild
                size="lg"
                className="rounded-full bg-accent px-8 py-4 text-lg font-bold text-accent-foreground shadow-[0_0_40px_-8px_var(--color-accent)] hover:shadow-[0_0_60px_-4px_var(--color-accent)] transition-all"
              >
                <Link href="/events/delta-state-fitness-carnival">
                  <span className="flex items-center gap-2">
                    Learn More
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-2 border-white/30 bg-white/5 px-8 py-4 text-lg font-bold text-white backdrop-blur-md hover:bg-white/10 hover:border-accent/50 transition-all"
              >
                <Link href="/events/delta-state-fitness-carnival/register">
                  Register Now
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
