"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

const TimeBlock = ({ value, label }: { value: number; label: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center"
  >
    <div className="relative">
      <motion.div
        key={value}
        initial={{ scale: 0.8, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        className="min-w-[80px] md:min-w-[120px] rounded-2xl border border-white/20 bg-black/60 p-4 md:p-6 backdrop-blur-xl"
      >
        <span className="block text-4xl md:text-6xl font-black text-white tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </motion.div>
      <div className="absolute -inset-1 rounded-2xl bg-accent/20 blur-xl" />
    </div>
    <span className="mt-3 text-xs md:text-sm font-bold uppercase tracking-widest text-white/60">
      {label}
    </span>
  </motion.div>
);

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

export function EventCountdown({ className = "" }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft());
  const isEventHere =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isEventHere) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`text-center ${className}`}
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-4xl md:text-6xl font-black text-accent"
        >
          THE CARNIVAL IS HERE! 🎉🔥
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className={`flex flex-wrap justify-center gap-4 md:gap-8 ${className}`}>
      <TimeBlock value={timeLeft.days} label="DAYS" />
      <TimeBlock value={timeLeft.hours} label="HOURS" />
      <TimeBlock value={timeLeft.minutes} label="MINUTES" />
      <TimeBlock value={timeLeft.seconds} label="SECONDS" />
    </div>
  );
}
