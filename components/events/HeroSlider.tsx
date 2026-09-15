"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface HeroSlide {
  id: string;
  src: string;
  alt: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "1",
    src: "/images/canival2.jpg",
    alt: "Delta State Fitness Carnival celebration",
  },
  {
    id: "2",
    src: "/images/hero.jpg",
    alt: "Fitness carnival athletes",
  },
  {
    id: "3",
    src: "/images/gallary1.jpg",
    alt: "Carnival crowd energy",
  },
  {
    id: "4",
    src: "/images/gallary3.jpg",
    alt: "Fitness competition",
  },
];

interface HeroSliderProps {
  autoPlay?: boolean;
  interval?: number;
  pauseOnHover?: boolean;
}

export function HeroSlider({
  autoPlay = true,
  interval = 6000,
  pauseOnHover = true,
}: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, isPaused]);

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={HERO_SLIDES[currentIndex].src}
            alt={HERO_SLIDES[currentIndex].alt}
            fill
            className="object-cover"
            priority={currentIndex === 0}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Cinematic dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

      {/* Slide indicators */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1 rounded-full transition-all ${
              index === currentIndex ? "w-8 bg-accent" : "w-2 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
