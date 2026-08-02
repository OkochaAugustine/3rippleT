"use client";

import { motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AboutCTA() {
  return (
    <Section className="bg-black py-24 md:py-32">
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
              Join The Movement
            </span>
          </motion.div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-6">
            Become Part of Our Growing Community
          </h2>

          <p className="text-lg md:text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Your fitness journey starts here. Join 200+ members who are transforming their lives through discipline, community, and excellence. Take the first step today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                asChild
                size="lg"
                className="rounded-full bg-accent px-8 py-4 text-lg font-bold text-accent-foreground shadow-[0_0_40px_-8px_var(--color-accent)] hover:shadow-[0_0_60px_-4px_var(--color-accent)] transition-all"
              >
                <Link href="/membership">
                  <span className="flex items-center gap-2">
                    Become a Member
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
                <Link href="/contact">
                  Book a Trial Class
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
