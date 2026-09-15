"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { getEventDate } from "@/constants/event-config";

interface CountdownProps {
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (): TimeLeft => {
  const eventDate = getEventDate();
  const now = new Date();
  const difference = eventDate.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { days, hours, minutes, seconds };
};

const AnimatedNumber = ({ value }: { value: number }) => (
  <AnimatePresence mode="wait">
    <motion.span
      key={value}
      initial={{ y: 30, opacity: 0, scale: 0.8, filter: "blur(4px)" }}
      animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ y: -30, opacity: 0, scale: 0.8, filter: "blur(4px)" }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="block"
    >
      {String(value).padStart(2, "0")}
    </motion.span>
  </AnimatePresence>
);

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <motion.div
      className="relative"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {/* Multi-layered glow effect */}
      <motion.div
        animate={{
          boxShadow: [
            "0 0 30px rgba(163, 230, 53, 0.15)",
            "0 0 50px rgba(163, 230, 53, 0.25)",
            "0 0 30px rgba(163, 230, 53, 0.15)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-lg bg-accent/10 blur-2xl"
      />
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent/20 via-transparent to-orange-500/10 blur-xl"
      />
      
      {/* Main number container with depth */}
      <div className="relative rounded-lg border border-white/15 bg-black/50 px-1 py-1 backdrop-blur-sm sm:px-2 sm:py-1.5 md:px-4 md:py-3">
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 via-transparent to-black/30 pointer-events-none" />
        
        {/* Luminous edge */}
        <div className="absolute inset-0 rounded-lg border border-accent/20 pointer-events-none" />
        
        {/* Number with luminous effect */}
        <motion.div
          animate={{
            textShadow: [
              "0 0 10px rgba(255, 255, 255, 0.3)",
              "0 0 20px rgba(255, 255, 255, 0.5)",
              "0 0 10px rgba(255, 255, 255, 0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-5 items-center justify-center overflow-hidden text-base font-display font-black tracking-tight text-white tabular-nums sm:h-6 sm:text-lg md:h-8 md:text-2xl lg:h-12 lg:text-5xl"
        >
          <AnimatedNumber value={value} />
        </motion.div>
        
        {/* Bottom accent line with glow */}
        <motion.div
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scaleX: [0.8, 1, 0.8],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
        />
      </div>
    </motion.div>
    
    {/* Enhanced label */}
    <motion.span
      animate={{
        opacity: [0.6, 0.8, 0.6],
        letterSpacing: ["0.15em", "0.2em", "0.15em"],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="mt-1 text-[6px] font-semibold uppercase tracking-[0.15em] text-white/60 sm:mt-1.5 sm:text-[8px] md:text-[9px] md:tracking-[0.2em]"
    >
      {label}
    </motion.span>
  </div>
);

export function EventCountdown({ className = "" }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isEventHere =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  if (isEventHere) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`text-center ${className}`}
      >
        <motion.p
          animate={{
            scale: [1, 1.05, 1],
            textShadow: [
              "0 0 20px rgba(163, 230, 53, 0.5)",
              "0 0 40px rgba(163, 230, 53, 0.8)",
              "0 0 20px rgba(163, 230, 53, 0.5)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-accent tracking-tight"
        >
          THE CARNIVAL IS HERE
        </motion.p>
      </motion.div>
    );
  }

  return (
    <div className={className}>
      <div className="mx-auto grid max-w-4xl grid-cols-4 gap-1 sm:gap-2 md:gap-4 lg:gap-12">
        <TimeUnit value={timeLeft.days} label="DAYS" />
        <TimeUnit value={timeLeft.hours} label="HOURS" />
        <TimeUnit value={timeLeft.minutes} label="MINUTES" />
        <TimeUnit value={timeLeft.seconds} label="SECONDS" />
      </div>
    </div>
  );
}
