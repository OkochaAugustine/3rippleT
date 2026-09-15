"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { EventCountdown } from "./EventCountdown";
import { CarnivalEffects } from "./CarnivalEffects";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { EVENT_CONFIG } from "@/constants/event-config";
import { Container } from "@/components/ui/container";
import { useRef, useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Clock3,
  Trophy,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const heroPhotos = [
  { 
    src: "/images/canival2.jpg", 
    alt: "Delta State Fitness Carnival celebration", 
    title: "THE CARNIVAL BEGINS",
    subtitle: "Real people. Real movement. Real energy.",
    movement: "zoomIn"
  },
  { 
    src: "/images/hero.jpg", 
    alt: "Fitness carnival athletes", 
    title: "FITNESS IN MOTION",
    subtitle: "Strength, movement and community.",
    movement: "panLeft"
  },
  { 
    src: "/images/gallary1.jpg", 
    alt: "Carnival community crowd", 
    title: "ONE COMMUNITY",
    subtitle: "Uniting communities through fitness.",
    movement: "zoomOut"
  },
  { 
    src: "/images/gallary3.jpg", 
    alt: "Fitness competition action", 
    title: "THE ENERGY WAS REAL",
    subtitle: "A day built around movement and connection.",
    movement: "panRight"
  },
  { 
    src: "/images/gallary4.jpg", 
    alt: "Carnival celebration moment", 
    title: "THE CARNIVAL EXPERIENCE",
    subtitle: "Fitness meets celebration.",
    movement: "zoomIn"
  },
  { 
    src: "/images/gallary5.jpg", 
    alt: "Fitness competition challenges", 
    title: "TRAIN. COMPETE. CONNECT.",
    subtitle: "Pushing limits together.",
    movement: "panLeft"
  },
  { 
    src: "/images/hero1.PNG", 
    alt: "Former Delta State Governor Ifeanyi Okowa at the 2025 Fitness Carnival", 
    title: "FORMER DELTA STATE GOVERNOR",
    subtitle: "Ifeanyi Okowa at the 2025 Fitness Carnival.",
    isGovernor: true,
    movement: "zoomOut"
  },
];

const pastEventPhotos = [
  { src: "/images/gallary6.jpg", alt: "Carnival celebration" },
  { src: "/images/hero3.jpg", alt: "Fitness competition" },
  { src: "/images/gallary4.jpg", alt: "Carnival moment" },
];

export function EventHero() {
  const details = EVENT_CONFIG.EVENT_DETAILS;
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Photo slideshow state
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentPhotoIndex((prev) => (prev + 1) % heroPhotos.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const nextPhoto = () => {
    setDirection(1);
    setCurrentPhotoIndex((prev) => (prev + 1) % heroPhotos.length);
  };

  const prevPhoto = () => {
    setDirection(-1);
    setCurrentPhotoIndex((prev) => (prev - 1 + heroPhotos.length) % heroPhotos.length);
  };

  // Get movement animation based on photo movement type
  const getMovementAnimation = (movement: string) => {
    switch (movement) {
      case "zoomIn":
        return { scale: [1, 1.06], x: [0, 0], y: [0, 0] };
      case "zoomOut":
        return { scale: [1.06, 1], x: [0, 0], y: [0, 0] };
      case "panLeft":
        return { scale: [1.03, 1.03], x: [0, -20], y: [0, 0] };
      case "panRight":
        return { scale: [1.03, 1.03], x: [0, 20], y: [0, 0] };
      default:
        return { scale: [1, 1.05], x: [0, 0], y: [0, 0] };
    }
  };

  // Parallax values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section
      ref={heroRef}
      className="relative flex flex-col overflow-hidden bg-black lg:min-h-screen"
    >
      {/* Dark atmospheric background - no photos here to avoid screening */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      
      {/* Subtle carnival effects */}
      <CarnivalEffects className="absolute inset-0 opacity-30 pointer-events-none" />
      {/* Glowing light streaks */}
      <motion.div
        animate={{
          x: [-20, 20, -20],
          opacity: [0, 0.4, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent blur-sm pointer-events-none"
      />
      <motion.div
        animate={{
          x: [20, -20, 20],
          opacity: [0, 0.3, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-2/3 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent blur-sm pointer-events-none"
      />
      <motion.div
        animate={{
          x: [-20, 20, -20],
          opacity: [0, 0.4, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent blur-sm pointer-events-none"
      />
      <motion.div
        animate={{
          x: [20, -20, 20],
          opacity: [0, 0.3, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-2/3 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent blur-sm pointer-events-none"
      />

      {/* Subtle carnival effects */}
      <CarnivalEffects className="absolute inset-0 opacity-50 pointer-events-none" />

      {/* Photo edge glows - animated */}
      <motion.div
        animate={{
          boxShadow: [
            "inset 0 0 100px rgba(163, 230, 53, 0.05)",
            "inset 0 0 150px rgba(163, 230, 53, 0.08)",
            "inset 0 0 100px rgba(163, 230, 53, 0.05)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Content - mobile-first: photo slider prominent, then text, then countdown */}
      <Container className="relative z-10 flex-1 flex flex-col justify-center py-2 sm:py-4 md:py-8 lg:py-14">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid items-center gap-2 lg:grid-cols-2 lg:gap-12">
            {/* Mobile: Photo slider first */}
            <div className="order-1 mb-2 lg:hidden">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative h-44 overflow-hidden rounded-xl border-2 border-white/20 shadow-2xl sm:h-52 md:h-56"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPhotoIndex}
                    initial={{ opacity: 0, scale: direction === 1 ? 1.08 : 0.92 }}
                    animate={{ 
                      opacity: 1, 
                      scale: getMovementAnimation(heroPhotos[currentPhotoIndex].movement).scale[1],
                      x: getMovementAnimation(heroPhotos[currentPhotoIndex].movement).x[1],
                      y: getMovementAnimation(heroPhotos[currentPhotoIndex].movement).y[1]
                    }}
                    exit={{ opacity: 0, scale: direction === 1 ? 0.92 : 1.08 }}
                    transition={{ 
                      duration: 1.5, 
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    className="absolute inset-0"
                  >
                    <motion.div
                      animate={getMovementAnimation(heroPhotos[currentPhotoIndex].movement)}
                      transition={{ duration: 7, ease: "linear" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={heroPhotos[currentPhotoIndex].src}
                        alt={heroPhotos[currentPhotoIndex].alt}
                        fill
                        className="object-cover object-center"
                        priority={currentPhotoIndex === 0}
                        sizes="100vw"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Mobile photo caption */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 to-transparent">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPhotoIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <h4 className={`text-sm sm:text-base font-display font-black mb-0.5 ${
                        heroPhotos[currentPhotoIndex].isGovernor ? "text-white" : "text-accent"
                      }`}>
                        {heroPhotos[currentPhotoIndex].title}
                      </h4>
                      <p className="text-xs text-white/80">
                        {heroPhotos[currentPhotoIndex].subtitle}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Mobile photo navigation */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={prevPhoto}
                    className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-all"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Mobile progress indicator */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold text-white/60">
                      {String(currentPhotoIndex + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 h-px bg-white/20">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 7, ease: "linear" }}
                        key={currentPhotoIndex}
                        className="h-full bg-accent"
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-white/60">
                      {String(heroPhotos.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Text content - second on mobile, first on desktop */}
            <div className="order-2 pt-1 text-center lg:order-1 lg:text-left">
              {/* Eyebrow with enhanced treatment */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-2 sm:mb-3"
              >
                <motion.span
                  animate={{
                    borderColor: ["rgba(163, 230, 53, 0.3)", "rgba(163, 230, 53, 0.5)", "rgba(163, 230, 53, 0.3)"],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block px-2 py-0.5 sm:px-3 sm:py-1.5 text-[9px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-accent border border-accent/30 rounded-full"
                >
                  December 15, 2026
                </motion.span>
              </motion.div>

              {/* Main headline - DELTA STATE */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-2 sm:mb-3"
              >
                <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-display font-black text-white tracking-tight leading-none">
                  DELTA STATE
                </span>
                <motion.span
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(163, 230, 53, 0.1)",
                      "0 0 40px rgba(163, 230, 53, 0.2)",
                      "0 0 20px rgba(163, 230, 53, 0.1)",
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="mt-1 block bg-gradient-to-r from-accent via-yellow-400 to-orange-500 bg-clip-text text-3xl font-display font-black leading-none tracking-tight text-transparent sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl sm:mt-2"
                >
                  FITNESS CARNIVAL
                </motion.span>
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-2 text-xs font-medium tracking-wide text-white/90 sm:text-sm md:text-base lg:text-xl sm:mb-3"
                style={{
                  textShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
                }}
              >
                Uniting Communities Through Fitness
              </motion.p>

              {/* CTAs - compact on mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mb-2 flex flex-col items-center justify-center gap-2 sm:mb-3 sm:flex-row sm:gap-3 lg:justify-start"
              >
                <Link href="/events/delta-state-fitness-carnival/register">
                  <Button
                    size="lg"
                    className="w-full rounded-full bg-accent px-4 py-2 text-xs font-semibold text-black hover:bg-accent/90 sm:w-auto sm:px-5 sm:py-2.5 sm:text-sm md:px-8 md:py-3 md:text-base"
                  >
                    Register Now
                  </Button>
                </Link>
          
              </motion.div>
            </div>

            {/* Desktop photo slider */}
            <div className="hidden lg:block relative order-2">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPhotoIndex}
                    initial={{ opacity: 0, scale: direction === 1 ? 1.08 : 0.92 }}
                    animate={{ 
                      opacity: 1, 
                      scale: getMovementAnimation(heroPhotos[currentPhotoIndex].movement).scale[1],
                      x: getMovementAnimation(heroPhotos[currentPhotoIndex].movement).x[1],
                      y: getMovementAnimation(heroPhotos[currentPhotoIndex].movement).y[1]
                    }}
                    exit={{ opacity: 0, scale: direction === 1 ? 0.92 : 1.08 }}
                    transition={{ 
                      duration: 1.5, 
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    className="absolute inset-0"
                  >
                    <motion.div
                      animate={getMovementAnimation(heroPhotos[currentPhotoIndex].movement)}
                      transition={{ duration: 7, ease: "linear" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={heroPhotos[currentPhotoIndex].src}
                        alt={heroPhotos[currentPhotoIndex].alt}
                        fill
                        className="object-cover"
                        priority={currentPhotoIndex === 0}
                        sizes="50vw"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Photo caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPhotoIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <h4 className={`text-lg font-display font-black mb-1 ${
                        heroPhotos[currentPhotoIndex].isGovernor ? "text-white" : "text-accent"
                      }`}>
                        {heroPhotos[currentPhotoIndex].title}
                      </h4>
                      <p className="text-sm text-white/80">
                        {heroPhotos[currentPhotoIndex].subtitle}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Photo navigation */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={prevPhoto}
                    className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Progress indicator */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white/60">
                      {String(currentPhotoIndex + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 h-px bg-white/20">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 7, ease: "linear" }}
                        key={currentPhotoIndex}
                        className="h-full bg-accent"
                      />
                    </div>
                    <span className="text-xs font-semibold text-white/60">
                      {String(heroPhotos.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Desktop secondary floating photos */}
              <motion.div
                style={{ y: y1 }}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 0.5, x: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="absolute -bottom-6 -left-6 w-32 h-24 rounded-xl overflow-hidden border-2 border-accent/30 shadow-xl"
              >
                <Image
                  src={heroPhotos[(currentPhotoIndex + 1) % heroPhotos.length].src}
                  alt="Secondary carnival moment"
                  fill
                  className="object-cover"
                  sizes="150px"
                />
              </motion.div>

              <motion.div
                style={{ y: y1 }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 0.5, x: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute -top-6 -right-6 w-28 h-28 rounded-xl overflow-hidden border-2 border-orange-500/30 shadow-xl"
              >
                <Image
                  src={heroPhotos[(currentPhotoIndex + 2) % heroPhotos.length].src}
                  alt="Secondary carnival moment"
                  fill
                  className="object-cover"
                  sizes="140px"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </Container>

      {/* Countdown - visible in first viewport on all devices */}
      <div className="relative z-10 pb-2 sm:pb-4 md:pb-6 lg:pb-8">
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {/* Premium EVENT COUNTDOWN label with carnival treatment */}
            <div className="relative mx-auto mb-1 inline-block sm:mb-2 md:mb-3">
              <motion.div
                animate={{
                  textShadow: [
                    "0 0 10px rgba(163, 230, 53, 0.2)",
                    "0 0 20px rgba(163, 230, 53, 0.4)",
                    "0 0 10px rgba(163, 230, 53, 0.2)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <motion.span
                  animate={{
                    letterSpacing: ["0.3em", "0.35em", "0.3em"],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-center text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-accent/90 block"
                >
                  Event Countdown
                </motion.span>
              </motion.div>
              {/* Animated accent line */}
              <motion.div
                animate={{
                  width: ["0%", "100%", "0%"],
                  opacity: [0, 0.6, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
              />
              {/* Subtle particles around label */}
              <motion.div
                animate={{
                  opacity: [0, 0.4, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-accent/50 rounded-full"
              />
              <motion.div
                animate={{
                  opacity: [0, 0.3, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-orange-500/50 rounded-full"
              />
            </div>
            <EventCountdown />

            {/* Event information cards - after countdown on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mx-auto mt-2 grid max-w-2xl grid-cols-2 gap-1.5 lg:hidden sm:mt-3"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-1.5 text-center"
              >
                <Calendar className="mx-auto mb-0.5 h-3 w-3 text-accent" />
                <p className="text-[8px] text-white/60 uppercase tracking-wider">Date</p>
                <p className="text-[9px] font-semibold text-white">Dec 15</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-1.5 text-center"
              >
                <MapPin className="mx-auto mb-0.5 h-3 w-3 text-accent" />
                <p className="text-[8px] text-white/60 uppercase tracking-wider">Venue</p>
                <p className="text-[9px] font-semibold text-white truncate">{details.venue.split(',')[0]}</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-1.5 text-center"
              >
                <Clock3 className="mx-auto mb-0.5 h-3 w-3 text-accent" />
                <p className="text-[8px] text-white/60 uppercase tracking-wider">Time</p>
                <p className="text-[9px] font-semibold text-white">{details.time}</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-1.5 text-center"
              >
                <Trophy className="mx-auto mb-0.5 h-3 w-3 text-accent" />
                <p className="text-[8px] text-white/60 uppercase tracking-wider">Host</p>
                <p className="text-[9px] font-semibold text-white truncate">{details.host}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center pt-1.5 sm:pt-2"
        >
          <div className="w-1 h-2 sm:w-1.5 sm:h-3 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
