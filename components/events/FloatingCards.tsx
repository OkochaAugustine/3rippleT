"use client";

import { motion } from "framer-motion";
import { Trophy, Flame, Music, Gift, Apple, Heart, Dumbbell, Users } from "lucide-react";

interface FloatingCard {
  icon: React.ReactNode;
  label: string;
  position: string;
  delay: number;
  duration: number;
}

const FLOATING_CARDS: FloatingCard[] = [
  { icon: <Trophy className="w-5 h-5" />, label: "500+ Athletes", position: "top-20 left-10", delay: 0, duration: 6 },
  { icon: <Flame className="w-5 h-5" />, label: "Elite Coaches", position: "top-32 right-16", delay: 0.5, duration: 7 },
  { icon: <Music className="w-5 h-5" />, label: "Live DJ", position: "top-48 left-20", delay: 1, duration: 5 },
  { icon: <Dumbbell className="w-5 h-5" />, label: "Competitions", position: "bottom-32 right-12", delay: 1.5, duration: 6.5 },
  { icon: <Gift className="w-5 h-5" />, label: "Giveaways", position: "bottom-48 left-16", delay: 2, duration: 5.5 },
  { icon: <Apple className="w-5 h-5" />, label: "Nutrition", position: "top-64 right-24", delay: 2.5, duration: 7.5 },
  { icon: <Heart className="w-5 h-5" />, label: "Wellness", position: "bottom-64 right-20", delay: 3, duration: 6 },
  { icon: <Users className="w-5 h-5" />, label: "Community", position: "top-40 left-32", delay: 0.8, duration: 5.8 },
];

interface FloatingCardsProps {
  className?: string;
}

export function FloatingCards({ className = "" }: FloatingCardsProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {FLOATING_CARDS.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: card.delay, duration: 0.6 }}
          className={`absolute ${card.position}`}
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: card.duration, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md p-4 shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-accent/20 p-2 text-accent">
                {card.icon}
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-white">
                {card.label}
              </span>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
