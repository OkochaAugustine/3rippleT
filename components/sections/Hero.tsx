"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ArrowUpRight, ChevronDown, Flame, Users } from "lucide-react";

import { Container } from "@/components/ui/container";

// Green clauses are the "why", the white clause is the "what" — two-tone
// treatment, revealed word by word on load.
const headlineWords = [
  { text: "TRAIN", accent: true },
  { text: "HARD.", accent: true },
  { text: "LIVE", accent: true },
  { text: "STRONG.", accent: true },
  { text: "UNLEASH", accent: false },
  { text: "YOUR", accent: false },
  { text: "POWER.", accent: false },
];

const marqueeWords = ["STRENGTH", "CONDITIONING", "MOBILITY", "RECOVERY", "PRECISION"];

// Circular seal copy — rendered on an SVG textPath so it can spin forever
// without ever looking stretched or blurry.
const SEAL_TEXT = "CERTIFIED COACHING • REAL RESULTS • ";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const { scrollY } = useScroll();
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  // Mouse-driven values power the parallax text, the background spotlight,
  // and a subtle 3D tilt on the side visual.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const textParallaxX = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const textParallaxY = useTransform(springY, [-0.5, 0.5], [-5, 5]);
  const orbParallaxX = useTransform(springX, [-0.5, 0.5], [-25, 25]);
  const orbParallaxY = useTransform(springY, [-0.5, 0.5], [-20, 20]);

  const spotlightX = useTransform(springX, [-0.5, 0.5], ["20%", "80%"]);
  const spotlightY = useTransform(springY, [-0.5, 0.5], ["20%", "80%"]);
  const spotlightBackground = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) => `radial-gradient(600px circle at ${x} ${y}, var(--accent) 0%, transparent 70%)`
  );

  // Visual card tilts opposite to the mouse-driven text for a light
  // parallax-depth effect between the two columns.
  const visualRotateY = useTransform(springX, [-0.5, 0.5], [8, -8]);
  const visualRotateX = useTransform(springY, [-0.5, 0.5], [-6, 6]);
  const chipParallaxX = useTransform(springX, [-0.5, 0.5], [10, -10]);
  const chipParallaxY = useTransform(springY, [-0.5, 0.5], [8, -8]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".hero-word");
        tl.fromTo(
          words,
          { y: "110%", opacity: 0, rotate: 3 },
          { y: "0%", opacity: 1, rotate: 0, stagger: 0.07, duration: 1.1, transformOrigin: "0% 50%" }
        );
      }

      tl.fromTo(".hero-badge", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.9");
      tl.fromTo(".hero-subtitle", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.7");
      tl.fromTo(".hero-cta-group", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.6");
      tl.fromTo(".hero-grid", { opacity: 0 }, { opacity: 1, duration: 1.4 }, 0);
      tl.fromTo(
        ".hero-visual",
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.1 },
        "-=0.8"
      );
      tl.fromTo(
        ".hero-chip",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.8 },
        "-=0.6"
      );
      tl.fromTo(
        ".hero-bottom-bar",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.1, transformOrigin: "0% 50%" },
        "-=0.4"
      );

      gsap.to(".hero-scroll-indicator", {
        y: 6,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "sine.inOut",
      });

      // Slow, constant spin for the seal badge — independent of the intro
      // timeline so it never stops.
      gsap.to(".hero-seal", {
        rotate: 360,
        duration: 18,
        repeat: -1,
        ease: "linear",
      });

      // Gentle vertical drift for the floating chips.
      gsap.to(".hero-chip-top", { y: -10, duration: 3.4, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".hero-chip-bottom", { y: 10, duration: 3.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
      {/* Fine structural grid — reads as a training-room floor plan rather
          than decoration */}
      <div
        className="hero-grid pointer-events-none absolute inset-0 opacity-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Cursor-tracked spotlight */}
      <motion.div
        aria-hidden
        style={{ background: spotlightBackground }}
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
      />

      {/* Ambient accent orbs */}
      <motion.div
        style={{ x: orbParallaxX, y: orbParallaxY }}
        className="pointer-events-none absolute -left-32 top-1/4 size-96 rounded-full bg-accent/15 blur-3xl"
      />
      <motion.div
        style={{ x: useTransform(orbParallaxX, (v) => -v) }}
        className="pointer-events-none absolute -right-24 bottom-1/4 size-80 rounded-full bg-accent/10 blur-3xl"
      />

      {/* Vignette to keep the edges quiet under the grid + spotlight */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,black_100%)]" />

      <Container className="relative z-10 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
          {/* Left — copy */}
          <div className="lg:col-span-7">
            <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] sm:text-xs md:text-sm font-semibold text-white/90 backdrop-blur-md">
              <span className="size-1.5 sm:size-2 animate-pulse rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
              Premium coaching. Measurable momentum.
            </div>

            <motion.h1
              ref={headlineRef}
              style={{ x: textParallaxX, y: textParallaxY }}
              className="mt-4 sm:mt-6 font-display text-[clamp(2rem,6vw,4.75rem)] font-black uppercase leading-[1.05] tracking-tight text-white"
            >
              {headlineWords.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.22em] pb-1.5">
                  <span
                    className={`hero-word inline-block origin-left ${
                      word.accent ? "text-accent" : "text-white"
                    }`}
                  >
                    {word.text}
                  </span>
                </span>
              ))}
            </motion.h1>

            <p className="hero-subtitle mt-4 sm:mt-6 max-w-lg text-sm sm:text-base md:text-lg leading-relaxed text-white/75">
              Modern fitness programs and expert coaching designed to help you
              transform your body, elevate your mindset, and achieve lasting
              results.
            </p>

            <div className="hero-cta-group mt-6 sm:mt-8 flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="#contact"
                  className="group flex items-center gap-3 rounded-full bg-accent py-2 pl-6 pr-2 font-bold text-black shadow-glow transition-shadow hover:shadow-[0_0_28px_var(--accent)]"
                >
                  Join Now
                  <span className="flex size-9 items-center justify-center rounded-full bg-black text-accent transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="size-4" />
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Right — framed visual */}
          <div className="relative hidden lg:col-span-5 lg:block">
            {/* Rotating certification seal, clipped to the top-right of the frame */}
            <div className="hero-seal-wrap absolute -right-6 -top-6 z-30 size-24">
              <svg viewBox="0 0 100 100" className="hero-seal size-24">
                <defs>
                  <path id="seal-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                </defs>
                <circle cx="50" cy="50" r="38" fill="black" stroke="var(--accent)" strokeWidth="1" opacity="0.5" />
                <text fill="var(--accent)" fontSize="7.2" fontWeight="700" letterSpacing="1">
                  <textPath href="#seal-circle" startOffset="0%">
                    {SEAL_TEXT}
                  </textPath>
                </text>
              </svg>
              <span className="absolute inset-0 m-auto flex size-9 items-center justify-center rounded-full bg-accent text-black">
                <Flame className="size-4" />
              </span>
            </div>

            {/* Glowing gradient frame around the image */}
            <motion.div
              style={{ rotateY: visualRotateY, rotateX: visualRotateX, perspective: 1000 }}
              className="hero-visual relative rounded-[2rem] bg-gradient-to-br from-accent/40 via-white/10 to-transparent p-[2px] shadow-[0_0_60px_-15px_var(--accent)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(2rem-2px)] border border-white/10 bg-neutral-900">
                <Image
                  src="/images/power.png"
                  alt="Athlete mid strength-training session"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/20" />

                {/* Viewfinder corner brackets — small, quiet, reinforce the
                    "precision" idea instead of decorating for its own sake */}
                {[
                  "left-4 top-4 border-l border-t",
                  "right-4 top-4 border-r border-t",
                  "left-4 bottom-4 border-l border-b",
                  "right-4 bottom-4 border-r border-b",
                ].map((pos) => (
                  <span
                    key={pos}
                    className={`absolute size-6 border-accent/60 ${pos}`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Floating chip — top-left, overlapping the frame */}
            <motion.div
              style={{ x: chipParallaxX, y: chipParallaxY }}
              className="hero-chip hero-chip-top glass-card absolute -left-8 top-10 z-20 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/70 p-4 shadow-2xl backdrop-blur-md"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Users className="size-5" />
              </span>
              <div>
                <p className="font-display text-xl font-black text-white">500+</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
                  Athletes trained
                </p>
              </div>
            </motion.div>

            {/* Floating chip — bottom-right, overlapping the frame */}
            <motion.div
              style={{ x: useTransform(chipParallaxX, (v) => -v), y: useTransform(chipParallaxY, (v) => -v) }}
              className="hero-chip hero-chip-bottom absolute -bottom-6 right-6 z-20 max-w-[13rem] rounded-2xl border border-white/10 bg-black/70 p-4 shadow-2xl backdrop-blur-md"
            >
              <p className="text-xs leading-relaxed text-white/70">
                With expert coaching and personalized guidance, you&rsquo;ll
                learn the right techniques to progress safely and
                effectively.
              </p>
            </motion.div>
          </div>
        </div>
      </Container>

      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        className="hero-scroll-indicator absolute bottom-20 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 cursor-pointer pointer-events-none"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
          Scroll
        </span>
        <ChevronDown className="size-5 text-accent" />
      </motion.div>

      {/* Kinetic marquee — the one loud element, everything else stays quiet
          around it */}
      <div className="absolute bottom-3 left-0 z-10 w-full overflow-hidden border-t border-white/10 py-1.5">
        <div className="hero-marquee flex w-max items-center gap-8 whitespace-nowrap">
          {[...marqueeWords, ...marqueeWords, ...marqueeWords].map((word, i) => (
            <span
              key={i}
              className="flex items-center gap-8 text-xs font-bold uppercase tracking-[0.3em] text-white/40"
            >
              {word}
              <span className="size-1 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>

      <div className="hero-bottom-bar absolute bottom-0 left-0 h-3 w-full bg-accent" />

      <style jsx global>{`
        .hero-marquee {
          animation: hero-marquee-scroll 22s linear infinite;
        }
        @keyframes hero-marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-marquee,
          .hero-seal {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}