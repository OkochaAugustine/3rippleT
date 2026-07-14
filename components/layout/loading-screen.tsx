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
    Array.from({ length: 24 }, (_, i) => ({
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
          className="particle bg-accent/60"
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
  const percentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isVisible || !progressRef.current || !logoRef.current) return;

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

      timeline.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1.2, duration: 1 },
      );
      timeline.fromTo(
        ringRef.current,
        { rotate: 0, opacity: 0 },
        { rotate: 360, opacity: 1, duration: 2, ease: "none", repeat: 1 },
        "<",
      );
      timeline.fromTo(
        logoRef.current,
        { scale: 0.5, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8 },
        "-=1.4",
      );
      timeline.to(
        logoRef.current,
        {
          scale: 1.08,
          boxShadow: "0 0 60px rgb(140 198 63 / 0.5)",
          duration: 0.6,
          yoyo: true,
          repeat: 1,
        },
        ">-0.2",
      );
      timeline.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          duration: routeLoading ? 0.9 : 1.6,
          ease: "power2.inOut",
        },
        "-=0.4",
      );
      timeline.to(
        progressState,
        {
          value: 100,
          duration: routeLoading ? 0.9 : 1.6,
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
      timeline.to(
        ".loader-content",
        { opacity: 0, y: -20, duration: 0.5, ease: "power2.in" },
        ">-0.1",
      );
    });

    return () => context.revert();
  }, [isVisible, routeLoading]);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className={cn(
            "fixed inset-0 z-[100] grid place-items-center bg-background text-foreground",
            routeLoading && "bg-background/95 backdrop-blur-xl",
          )}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
        >
          <Particles />
          <div
            ref={glowRef}
            className="pointer-events-none absolute size-96 rounded-full bg-accent/15 blur-3xl"
            aria-hidden="true"
          />

          <div className="loader-content relative flex min-w-72 max-w-md flex-col items-center px-8 text-center">
            <div className="relative">
              <div
                ref={ringRef}
                className="absolute -inset-4 rounded-3xl border-2 border-dashed border-accent/30"
                aria-hidden="true"
              />
              <div
                ref={logoRef}
                className="relative grid size-28 place-items-center overflow-hidden rounded-2xl border border-border bg-card shadow-glow"
                aria-label={`${siteConfig.name} loading`}
              >
                <Image
                  src="/images/placeholders/logo.svg"
                  alt={siteConfig.name}
                  fill
                  className="object-contain p-3"
                  preload
                />
              </div>
            </div>

            <p className="mt-8 text-xs font-bold uppercase tracking-[0.4em] text-muted-foreground">
              {siteConfig.name}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Forging your premium experience
            </p>

            <div className="mt-8 flex w-full items-center justify-between text-sm font-semibold">
              <span className="text-muted-foreground">Loading</span>
              <span ref={percentRef} aria-live="polite" className="text-accent tabular-nums">
                {progress}%
              </span>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                ref={progressRef}
                className="h-full w-full rounded-full bg-gradient-to-r from-accent/60 via-accent to-accent/80"
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
