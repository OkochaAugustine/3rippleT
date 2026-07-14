"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, PlayCircle } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Section ref={ref} className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 pointer-events-none">
        <div className="surface-grid absolute inset-0 opacity-28" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgb(196_255_92/0.16),transparent_42%),linear-gradient(315deg,rgb(243_107_63/0.14),transparent_38%)]" />
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Heading as="h2" size="xl">
              Ready to train with standards?
            </Heading>
            <p className="mt-5 text-lg text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Step into 3Ripple T Fitness for a first session built around your goals, your movement, and the pace that gets you stronger without guesswork.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild variant="secondary" size="lg" className="gap-2">
                <a href="#contact">
                  Book a Free Intro
                  <ArrowRight className="size-5" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="lg" className="gap-2 text-primary-foreground hover:bg-primary-foreground/10">
                <a href="#videos">
                  <PlayCircle className="size-5" />
                  Watch Training
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
