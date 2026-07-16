"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils/helpers";

type LoadingScreenProps = {
  routeLoading?: boolean;
};

function Particles() {
  const [particles] = useState<{
    id: number;
    left: string;
    size: number;
    delay: number;
    duration: number;
  }[]>(() =>
    Array.from({ length: 32 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 3,
      duration: Math.random() * 4 + 4,
    }))
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle bg-accent/70 shadow-[0_0_10px_2px_var(--color-accent)]"
          style={{
            left: p.left,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

// Circular progress ring drawn around the logo — fills as `progress` climbs,
// instead of the flat bar doing all the storytelling by itself.
function ProgressRing({ progress }: { progress: number }) {
  const size = 240;
  const radius = 112;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress / 100);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="pointer-events-none absolute -inset-8 -rotate-90 sm:-inset-10"
      aria-hidden="true"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--color-accent)"
        strokeOpacity={0.12}
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{
          filter: "drop-shadow(0 0 6px var(--color-accent))",
          transition: "stroke-dashoffset 0.2s linear",
        }}
      />
    </svg>
  );
}

export function LoadingScreen({ routeLoading = false }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(() => {
    if (routeLoading || typeof window === "undefined") return true;
    return window.sessionStorage.getItem("foundation-loader-complete") !== "true";
  });
  const [progress, setProgress] = useState(0);

  const progressRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isVisible || !progressRef.current || !logoRef.current) return;

    // Route transitions stay brisk; the first paint gets real room to breathe.
    const fillDuration = routeLoading ? 1.4 : 3.2;

    const progressState = { value: 0 };
    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          if (!routeLoading) {
            window.sessionStorage.setItem("foundation-loader-complete", "true");
          }
          setIsVisible(false);
        },
      });

      // Ambient glow breathes in first, so the stage is lit before anything
      // else arrives.
      timeline.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.4 },
        { opacity: 1, scale: 1.3, duration: 1.6 },
      );
      timeline.fromTo(
        ringRef.current,
        { rotate: 0, opacity: 0 },
        { rotate: 360, opacity: 1, duration: 5, ease: "none", repeat: 1 },
        "<0.2",
      );
      timeline.fromTo(
        ring2Ref.current,
        { rotate: 0, opacity: 0 },
        { rotate: -360, opacity: 1, duration: 6.2, ease: "none", repeat: 1 },
        "<",
      );
      // Logo lands deliberately — enough hang time to actually register.
      timeline.fromTo(
        logoRef.current,
        { scale: 0.5, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 1.3, ease: "back.out(1.4)" },
        "-=1.2",
      );
      // A held beat with the logo fully visible before anything else moves.
      timeline.to({}, { duration: 0.4 });
      timeline.to(
        logoRef.current,
        {
          scale: 1.05,
          boxShadow: "0 0 90px var(--color-accent)",
          duration: 0.8,
          yoyo: true,
          repeat: 1,
        },
        "-=0.1",
      );
      timeline.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          duration: fillDuration,
          ease: "power2.inOut",
        },
        "-=0.3",
      );
      timeline.to(
        progressState,
        {
          value: 100,
          duration: fillDuration,
          ease: "power2.inOut",
          onUpdate: () => {
            const val = Math.round(progressState.value);
            setProgress(val);
            if (percentRef.current) {
              percentRef.current.textContent = `${val}%`;
            }
          },
        },
        "<",
      );
      // Finishing burst once the ring completes — a bright flash held for a
      // beat so 100% actually registers before the screen leaves.
      timeline.to(
        logoRef.current,
        { scale: 1.1, boxShadow: "0 0 110px var(--color-accent)", duration: 0.4, ease: "power2.out" },
      );
      timeline.to(
        logoRef.current,
        { scale: 1, boxShadow: "0 0 60px -10px var(--color-accent)", duration: 0.4, ease: "power2.inOut" },
      );
      timeline.to({}, { duration: routeLoading ? 0.2 : 0.5 });
      timeline.to(
        ".loader-content",
        { opacity: 0, scale: 0.96, y: -24, duration: 0.6, ease: "power2.in" },
      );
    });

    return () => context.revert();
  }, [isVisible, routeLoading]);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className={cn(
            "fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-black text-white",
            routeLoading && "bg-black/95 backdrop-blur-xl",
          )}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
        >
          {/* Faint drifting grid — depth without noise */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
            aria-hidden="true"
          />

          {/* Two slow-drifting ambient blobs — independent of the GSAP
              timeline so the room feels alive even before the logo lands */}
          <motion.div
            className="pointer-events-none absolute -left-24 -top-24 size-[28rem] rounded-full bg-accent/10 blur-3xl"
            animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <motion.div
            className="pointer-events-none absolute -bottom-32 -right-16 size-[32rem] rounded-full bg-accent/10 blur-3xl"
            animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />

          <Particles />

          <div
            ref={glowRef}
            className="pointer-events-none absolute size-[32rem] rounded-full bg-accent/20 blur-3xl"
            aria-hidden="true"
          />

          {/* Sonar pulses radiating from the logo */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="pointer-events-none absolute size-64 rounded-full border border-accent/40 sm:size-72"
              animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
              transition={{
                duration: 3.4,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 1.1,
              }}
              aria-hidden="true"
            />
          ))}

          <div className="loader-content relative flex min-w-72 max-w-md flex-col items-center px-8 text-center">
            <div className="relative flex size-64 items-center justify-center sm:size-72">
              <div
                ref={ringRef}
                className="absolute inset-10 rounded-full border-2 border-dashed border-accent/40 sm:inset-12"
                aria-hidden="true"
              />
              <div
                ref={ring2Ref}
                className="absolute inset-4 rounded-full border border-dotted border-accent/25 sm:inset-6"
                aria-hidden="true"
              />
              <ProgressRing progress={progress} />

              {/* Logo — solid backing (not just a blurred pane) so the mark
                  itself always reads crisp and fully opaque. */}
              <div
                ref={logoRef}
                className="relative grid size-44 place-items-center overflow-visible rounded-3xl border border-white/10 bg-black shadow-[0_0_60px_-10px_var(--color-accent)] sm:size-52"
                aria-label={`${siteConfig.name} loading`}
              >
                <div className="absolute inset-0 rounded-3xl bg-white/[0.04]" aria-hidden="true" />
                <Image
                  src="/images/logo.png"
                  alt={siteConfig.name}
                  fill
                  className="relative object-contain p-4"
                  priority
                />
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="mt-10 text-xs font-bold uppercase tracking-[0.5em] text-white"
            >
              {siteConfig.name}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="mt-2 text-sm text-white/50"
            >
              Forging your premium experience
            </motion.p>

            <div className="mt-8 flex w-full items-center justify-between text-sm font-semibold">
              <span className="tracking-widest text-white/50">LOADING</span>
              <span ref={percentRef} aria-live="polite" className="text-accent tabular-nums">
                {progress}%
              </span>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                ref={progressRef}
                className="h-full w-full rounded-full bg-gradient-to-r from-accent/60 via-accent to-accent/90 shadow-[0_0_12px_var(--color-accent)]"
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}