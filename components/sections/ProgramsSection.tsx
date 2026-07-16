"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Sparkles } from "lucide-react";

import { programs } from "@/data/programs";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function ProgramCard({
  program,
  index,
  inView,
}: {
  program: (typeof programs)[number];
  index: number;
  inView: boolean;
}) {
  const Icon = program.icon;
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  // Cursor-tracked tilt — the card leans toward wherever you're looking at it.
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 220, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 220, damping: 20 });

  // Cursor-tracked spotlight that rides on top of the artwork.
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowBackground = useTransform([glowX, glowY], (latest) => {
    const [x, y] = latest as [number, number];
    return `radial-gradient(220px circle at ${x}% ${y}%, var(--color-accent), transparent 70%)`;
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 14);
    rotateX.set((0.5 - py) * 14);
    glowX.set(px * 100);
    glowY.set(py * 100);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1200 }}
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
        className="group relative h-full"
      >
        <Card className="relative h-full flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-lg backdrop-blur-xl transition-shadow duration-300 group-hover:shadow-[0_0_0_1px_var(--color-accent),0_20px_60px_-15px_var(--color-accent)]">
          <div
            className="relative h-52 overflow-hidden rounded-t-3xl sm:h-56"
            style={{ transform: "translateZ(40px)" }}
          >
            {/* Crisp, full-color artwork — a thin bottom scrim only, just
                enough to seat the icon badge and card edge without muddying
                the image itself. */}
            <Image
              src={program.image}
              alt={program.title}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              quality={90}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
            {/* Spotlight that follows the cursor across the artwork */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-70"
              style={{ background: glowBackground }}
            />
            <motion.div
              className="absolute top-3 right-3 z-20 flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-[0_0_25px_-4px_var(--color-accent)] sm:top-4 sm:right-4 sm:h-12 sm:w-12"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <Icon className="size-5 sm:size-6" />
            </motion.div>
          </div>

          <div
            className="relative z-20 flex flex-1 flex-col p-5 sm:p-6"
            style={{ transform: "translateZ(30px)" }}
          >
            <Heading
              as="h3"
              size="sm"
              className="!text-lg sm:!text-xl mb-2 !text-white transition-colors group-hover:!text-accent"
            >
              {program.title}
            </Heading>
            <p className="mb-4 flex-1 text-sm leading-relaxed text-white/60">
              {program.description}
            </p>
            <Button
              asChild
              variant="ghost"
              className="w-full justify-between px-0 text-white transition-all duration-300 hover:bg-transparent hover:text-accent group-hover:px-4"
            >
              <Link href="/programs">
                <span>Explore Program</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export function ProgramsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Section ref={ref} id="programs" className="relative overflow-hidden bg-black">
      {/* Ambient glow, matching the navbar's soft accent bloom */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />

      {/* Oversized marquee ghosting behind the heading — a quiet depth layer,
          the same "restraint around one bold element" language as the navbar's
          glass pill and glow. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-8 select-none overflow-hidden"
        aria-hidden="true"
      >
        <motion.div
          className="flex whitespace-nowrap text-[10rem] font-black leading-none tracking-tighter text-white/[0.04] sm:text-[14rem]"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
        >
          <span className="mr-12">PROGRAMS &middot; PROGRAMS &middot; PROGRAMS &middot; </span>
          <span className="mr-12">PROGRAMS &middot; PROGRAMS &middot; PROGRAMS &middot; </span>
        </motion.div>
      </div>

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center sm:mb-12 md:mb-16"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent sm:px-4 sm:py-2 sm:text-sm">
            <Sparkles className="size-4" />
            What We Offer
          </div>
          <Heading as="h2" size="lg" className="mt-3 !text-white">
            Our Programs
          </Heading>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {programs.map((program, i) => (
            <ProgramCard key={program.id} program={program} index={i} inView={inView} />
          ))}
        </div>
      </Container>
    </Section>
  );
}