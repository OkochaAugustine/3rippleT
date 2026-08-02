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
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
    alt: "Fitness community training together",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop",
    alt: "Professional gym training",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
    alt: "Fitness community celebration",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1552674605-469523d5b5f4?q=80&w=2070&auto=format&fit=crop",
    alt: "Outdoor group workout",
  },
];

export function AboutHero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0">
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
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      </div>

      <div className="relative z-10 text-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white mb-6"
          >
            About 3Ripple T Fitness
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed"
          >
            From a small local community to one of Delta State&apos;s leading fitness destinations.
            A story of growth, friendship, and transformation over 10 remarkable years.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 backdrop-blur-md px-6 py-3"
          >
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Asaba, Delta State, Nigeria
            </span>
          </motion.div>
        </motion.div>
      </div>

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
    </section>
  );
}
