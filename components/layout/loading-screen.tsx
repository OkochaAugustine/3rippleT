"use client";

import { useEffect, useRef, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils/helpers";

type LoadingScreenProps = {
  routeLoading?: boolean;
};

export function LoadingScreen({ routeLoading = false }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(() => {
    if (routeLoading || typeof window === "undefined") {
      return true;
    }

    return window.sessionStorage.getItem("foundation-loader-complete") !== "true";
  });
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    if (!progressRef.current || !markRef.current) {
      return;
    }

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
        markRef.current,
        { scale: 0.88, opacity: 0, y: 10 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
      );
      timeline.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.78 },
        { opacity: 1, scale: 1, duration: 0.7 },
        "<",
      );
      timeline.to(
        markRef.current,
        {
          scale: 1.035,
          duration: 0.8,
          ease: "sine.inOut",
          repeat: 1,
          yoyo: true,
        },
        ">-0.1",
      );
      timeline.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          duration: routeLoading ? 0.9 : 1.65,
          ease: "power3.inOut",
        },
        "<",
      );
      timeline.to(
        progressState,
        {
          value: 100,
          duration: routeLoading ? 0.9 : 1.65,
          ease: "power3.inOut",
          onUpdate: () => setProgress(Math.round(progressState.value)),
        },
        "<",
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
          exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeInOut" } }}
        >
          <div
            ref={glowRef}
            className="pointer-events-none absolute size-56 rounded-full bg-accent/18 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative flex min-w-72 max-w-sm flex-col items-center px-8 text-center">
            <div
              ref={markRef}
              className="grid size-20 place-items-center rounded-xl border border-border bg-card shadow-glow"
              aria-label={`${siteConfig.name} loading`}
            >
              <span className="grid size-8 place-items-center rounded-md border-2 border-accent">
                <span className="size-2 rounded-full bg-accent" />
              </span>
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
              {siteConfig.name}
            </p>
            <div className="mt-5 flex w-full items-center justify-between text-xs font-semibold text-muted-foreground">
              <span>Preparing experience</span>
              <span aria-live="polite">{progress}%</span>
            </div>
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted">
              <div ref={progressRef} className="h-full w-full rounded-full bg-accent" />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
