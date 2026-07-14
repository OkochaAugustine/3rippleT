"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  const corePillars = [
    "Elite level strength coaching and methodology",
    "Tailored conditioning and engine building",
    "Active recovery and structural mobility systems",
    "An unmatched training culture and community",
  ];

  return (
    <Section ref={ref} id="about" className="relative overflow-hidden py-24 bg-card">
      <div className="absolute top-0 right-0 w-[40%] h-[70%] bg-accent/5 blur-3xl pointer-events-none" aria-hidden="true" />
      
      <Container>
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
          
          {/* Text content column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
              Our Story
            </p>
            <Heading as="h2" size="lg" className="mt-3">
              More Than a Gym. <br />A <span className="text-accent">Movement</span>.
            </Heading>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              3Ripple T Fitness was founded on a simple mission: to create a space where athletes of all levels can train with intent, master mechanics, and unlock performance they never thought possible.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We believe that true fitness goes beyond physical output. It builds mental resilience, builds lifelong habits, and connects you with a community that demands your best effort.
            </p>

            <ul className="mt-8 space-y-3">
              {corePillars.map((pillar, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="flex size-5 items-center justify-center rounded-full bg-accent/15 mt-0.5 shrink-0">
                    <Check className="text-accent size-3" />
                  </div>
                  <span className="text-sm font-semibold text-foreground/80">{pillar}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/about">Read Our Full Philosophy</Link>
              </Button>
            </div>
          </motion.div>

          {/* Visual column with overlapping premium card design */}
          <div className="relative lg:col-span-6 h-[400px] sm:h-[480px]">
            {/* Main large image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute left-0 top-0 w-3/4 h-4/5 overflow-hidden rounded-2xl border border-border shadow-2xl"
            >
              <Image
                src="/images/training-floor.jpg"
                alt="Gym training floor"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>

            {/* Overlapping smaller image */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute right-0 bottom-4 w-1/2 h-3/5 overflow-hidden rounded-2xl border-4 border-card shadow-2xl z-10"
            >
              <Image
                src="/images/morethan-gym.jpg"
                alt="Barbell setup"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>

            {/* Micro accent floating detail */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-[8%] bottom-[8%] bg-accent text-accent-foreground px-4 py-3 rounded-xl shadow-lg z-20 hidden sm:block"
            >
              <p className="text-xl font-black">100%</p>
              <p className="text-[10px] uppercase font-bold tracking-wider opacity-80">Intentional training</p>
            </motion.div>
          </div>

        </div>
      </Container>
    </Section>
  );
}
