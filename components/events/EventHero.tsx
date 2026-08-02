"use client";

import { motion } from "framer-motion";
import { Flame, Sparkles, Calendar } from "lucide-react";
import { EventCountdown } from "./EventCountdown";
import { HeroSlider } from "./HeroSlider";
import { FloatingCards } from "./FloatingCards";
import { EventStats } from "./EventStats";
import { PremiumBackground } from "./PremiumBackground";
import { useTypewriter } from "@/hooks/useTypewriter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Container } from "@/components/ui/container";

const TYPING_PHRASES = [
  "DELTA STATE FITNESS CARNIVAL",
  "TRAIN HARD",
  "LIVE STRONG",
  "UNLEASH YOUR POWER",
  "THE BIGGEST FITNESS EVENT",
  "ONE STAGE",
  "ONE COMMUNITY",
  "ONE CHAMPION",
];

export function EventHero() {
  const typedText = useTypewriter({
    phrases: TYPING_PHRASES,
    typingSpeed: 80,
    deletingSpeed: 40,
    pauseDuration: 2000,
    loop: true,
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Premium background effects */}
      <PremiumBackground />

      {/* Hero image slider */}
      <HeroSlider autoPlay interval={6000} pauseOnHover />

      {/* Floating cards */}
      <FloatingCards />

      <Container className="relative z-10 py-20">
        <div className="text-center">
          {/* Premium event badge */}
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/10 backdrop-blur-md px-6 py-2.5 mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-accent" />
            </motion.div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
              Delta State&apos;s Biggest Fitness Event
            </span>
          </motion.div>

          {/* Typing animated headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[1.1]">
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block ml-2 w-1 h-[0.8em] bg-accent align-middle"
              />
            </h1>
          </motion.div>

          {/* Event description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto"
          >
            Join the ultimate fitness experience. Train, compete, connect, and celebrate with
            athletes from across Delta State.
          </motion.p>

          {/* Countdown preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-10"
          >
            <EventCountdown />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                asChild
                size="lg"
                className="rounded-full bg-accent px-8 py-4 text-lg font-bold text-accent-foreground shadow-[0_0_40px_-8px_var(--color-accent)] hover:shadow-[0_0_60px_-4px_var(--color-accent)] transition-all"
              >
                <Link href="/events/delta-state-fitness-carnival/register">
                  <span className="flex items-center gap-2">
                    <Flame className="w-5 h-5" />
                    Register Now
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
                <Link href="#schedule">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    View Schedule
                  </span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Event stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-16"
          >
            <EventStats />
          </motion.div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 backdrop-blur-sm flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-accent"
            />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            Scroll
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
