"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  animate,
} from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  Flame,
  Star,
  Dumbbell,
  Heart,
  User,
  TrendingUp,
} from "lucide-react";

import { Container } from "@/components/ui/container";

const PHRASES = [
  "Train hard.",
  "Live Strong.",
  "Unleash your power.",
  "Become Unstoppable.",
  "Push Beyond Limits.",
  "Build Your Best Body.",
];

// Deterministic pseudo-scatter (golden-angle spread) instead of Math.random —
// looks organic but renders identically on server and client, so there's no
// hydration mismatch on the particle positions.
const PARTICLE_COUNT = 20;
const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  left: `${(i * 137.5) % 100}%`,
  size: 2 + (i % 3),
  duration: 9 + (i % 5) * 1.6,
  delay: (i % 7) * 0.6,
}));

const STATS = [
  { value: 5000, suffix: "+", label: "Members" },
  { value: 40, suffix: "+", label: "Classes Weekly" },
  { value: 18, suffix: "", label: "Expert Coaches" },
  { value: 97, suffix: "%", label: "Success Rate" },
];

function useTypewriter(phrases: string[], typingSpeed = 75, deletingSpeed = 40, pauseMs = 1600) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index];

    if (!deleting && subIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(t);
    }

    if (deleting && subIndex === 0) {
      const t = setTimeout(() => {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % phrases.length);
      }, 0);
      return () => clearTimeout(t);
    }

    const t = setTimeout(
      () => setSubIndex((prev) => prev + (deleting ? -1 : 1)),
      deleting ? deletingSpeed : typingSpeed
    );
    return () => clearTimeout(t);
  }, [subIndex, deleting, index, phrases, typingSpeed, deletingSpeed, pauseMs]);

  return phrases[index].slice(0, subIndex);
}

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current || started) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [started, value]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <span className="font-display text-3xl font-black text-white sm:text-4xl">
        {display}
        <span className="text-accent">{suffix}</span>
      </span>
      <span className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
        {label}
      </span>
    </div>
  );
}

function MiniStat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 backdrop-blur-md">
      <span className="text-accent">{icon}</span>
      <div>
        <p className="text-sm font-bold text-white">{value}</p>
        <p className="text-[10px] uppercase tracking-wide text-white/40">{label}</p>
      </div>
    </div>
  );
}

function GlassCard({
  children,
  position,
  floatDuration,
  floatDelay,
  delay,
}: {
  children: React.ReactNode;
  position: string;
  floatDuration: number;
  floatDelay: number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute ${position} z-20 w-44 rounded-2xl border border-white/10 bg-black/60 p-4 shadow-2xl backdrop-blur-xl`}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: floatDuration, delay: floatDelay, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const typed = useTypewriter(PHRASES);

  const { scrollY } = useScroll();
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const orbParallaxX = useTransform(springX, [-0.5, 0.5], [-25, 25]);
  const orbParallaxY = useTransform(springY, [-0.5, 0.5], [-20, 20]);
  const orbParallaxXInverse = useTransform(orbParallaxX, (v) => -v);

  const spotlightX = useTransform(springX, [-0.5, 0.5], ["20%", "80%"]);
  const spotlightY = useTransform(springY, [-0.5, 0.5], ["20%", "80%"]);
  const spotlightBackground = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) => `radial-gradient(600px circle at ${x} ${y}, var(--accent) 0%, transparent 70%)`
  );

  const clusterRotateY = useTransform(springX, [-0.5, 0.5], [6, -6]);
  const clusterRotateX = useTransform(springY, [-0.5, 0.5], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-dvh items-center overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
    >
      {/* Structural grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
        aria-hidden="true"
      />

      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      {/* Cursor-tracked spotlight */}
      <motion.div
        aria-hidden="true"
        style={{ background: spotlightBackground }}
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
      />

      {/* Ambient glowing orbs */}
      <motion.div
        style={{ x: orbParallaxX, y: orbParallaxY }}
        className="pointer-events-none absolute -left-32 top-1/4 size-96 rounded-full bg-accent/15 blur-3xl"
        aria-hidden="true"
      />
      <motion.div
        style={{ x: orbParallaxXInverse }}
        className="pointer-events-none absolute -right-24 bottom-1/4 size-80 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />

      {/* Drifting particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-accent/50"
            style={{ left: p.left, bottom: "-10px", width: p.size, height: p.size }}
            animate={{ y: ["0vh", "-100vh"], opacity: [0, 0.8, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,black_100%)]"
        aria-hidden="true"
      />

      <Container className="relative z-10 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-8">
          {/* Left column — copy */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md sm:text-sm"
            >
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="size-2 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]"
              />
              🔥 #1 Premium Fitness Experience
            </motion.div>

            <h1 className="mt-6 min-h-[2.2em] font-display text-[clamp(2rem,6vw,4.5rem)] font-black uppercase leading-[1.05] tracking-tight text-white">
              {typed}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-1 bg-accent align-middle"
                aria-hidden="true"
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base md:text-lg"
            >
              Modern fitness programs and expert coaching designed to help you
              transform your body, elevate your mindset, and achieve lasting
              results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="#contact"
                  className="group flex items-center gap-3 rounded-full bg-accent py-3 pl-6 pr-2.5 font-bold text-black shadow-[0_0_30px_-8px_var(--accent)] transition-shadow hover:shadow-[0_0_40px_-6px_var(--accent)]"
                >
                  Start Your Journey
                  <span className="flex size-9 items-center justify-center rounded-full bg-black text-accent transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="size-4" />
                  </span>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="#contact"
                  className="rounded-full border border-white/20 bg-white/[0.04] px-6 py-3 font-bold text-white backdrop-blur-md transition-colors hover:border-accent/50 hover:text-accent"
                >
                  Book a Free Trial
                </Link>
              </motion.div>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-8 flex items-center gap-3"
            >
              <div className="flex" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-white/60">
                <span className="font-semibold text-white">Rated 4.9/5</span> by 5,000+ happy
                members
              </p>
            </motion.div>

            {/* Mobile-only compact stat chips — the floating cluster is desktop-only */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:hidden">
              <MiniStat icon={<Flame className="size-4" />} value="680 kcal" label="Calories" />
              <MiniStat icon={<Heart className="size-4" />} value="142 BPM" label="Heart Rate" />
              <MiniStat icon={<Dumbbell className="size-4" />} value="95%" label="Strength" />
            </div>
          </div>

          {/* Right column — floating glass cards */}
          <div className="relative hidden lg:col-span-5 lg:block">
            <motion.div
              style={{ rotateY: clusterRotateY, rotateX: clusterRotateX, perspective: 1200 }}
              className="relative h-[34rem]"
            >
              <GlassCard position="left-6 top-2" floatDuration={5.5} floatDelay={0} delay={0.5}>
                <div className="flex items-center gap-1" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="mt-2 font-display text-2xl font-black text-white">4.9 Rating</p>
                <p className="text-xs text-white/50">5,000+ Members</p>
              </GlassCard>

              <GlassCard position="right-0 top-28" floatDuration={6.5} floatDelay={0.6} delay={0.65}>
                <div className="flex items-center gap-2 text-accent">
                  <Dumbbell className="size-4" />
                  <span className="text-xs font-semibold uppercase tracking-wide text-white/50">
                    Strength
                  </span>
                </div>
                <p className="mt-2 font-display text-2xl font-black text-white">95%</p>
                <div className="mt-2 h-1.5 w-28 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "95%" }}
                    transition={{ duration: 1.2, delay: 1 }}
                    className="h-full rounded-full bg-accent"
                  />
                </div>
              </GlassCard>

              <GlassCard position="left-2 top-[17rem]" floatDuration={6} floatDelay={1.1} delay={0.8}>
                <div className="flex items-center gap-2 text-accent">
                  <Flame className="size-4" />
                  <span className="text-xs font-semibold uppercase tracking-wide text-white/50">
                    Calories
                  </span>
                </div>
                <p className="mt-2 font-display text-2xl font-black text-white">680 kcal</p>
              </GlassCard>

              <GlassCard position="right-4 top-[21rem]" floatDuration={5} floatDelay={0.3} delay={0.95}>
                <div className="flex items-center gap-2">
                  <motion.span
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-red-400"
                  >
                    <Heart className="size-4 fill-current" />
                  </motion.span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-white/50">
                    Heart Rate
                  </span>
                </div>
                <p className="mt-2 font-display text-2xl font-black text-white">142 BPM</p>
              </GlassCard>

              <GlassCard position="left-10 bottom-16" floatDuration={7} floatDelay={0.9} delay={1.1}>
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <User className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white">Personal Coach</p>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-accent">
                      <span className="size-1.5 rounded-full bg-accent" /> Online
                    </span>
                  </div>
                </div>
              </GlassCard>

              <GlassCard position="right-2 bottom-0" floatDuration={6.2} floatDelay={1.4} delay={1.25}>
                <div className="flex items-center gap-2 text-accent">
                  <TrendingUp className="size-4" />
                  <span className="text-xs font-semibold uppercase tracking-wide text-white/50">
                    Transformation
                  </span>
                </div>
                <p className="mt-2 font-display text-2xl font-black text-white">+12kg Muscle</p>
                <p className="text-xs text-white/50">In 90 Days</p>
              </GlassCard>

              {/* Center glow anchoring the cluster */}
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl"
                aria-hidden="true"
              />
            </motion.div>
          </div>
        </div>

        {/* Bottom animated stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:grid-cols-4 lg:mt-24"
        >
          {STATS.map((stat) => (
            <StatCounter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
          ))}
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
          Scroll
        </span>
        <ChevronDown className="size-5 text-accent" />
      </motion.div>
    </section>
  );
}