"use client";

import { motion } from "framer-motion";

interface CarnivalEffectsProps {
  className?: string;
}

export function CarnivalEffects({ className = "" }: CarnivalEffectsProps) {
  return (
    <div className={`pointer-events-none ${className}`}>
      {/* Floating confetti particles - subtle and sophisticated */}
      <motion.div
        animate={{
          y: [0, -100, 0],
          opacity: [0, 0.6, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0,
        }}
        className="absolute top-1/4 left-[10%] w-2 h-2 bg-accent/50 rounded-full"
      />
      <motion.div
        animate={{
          y: [0, -80, 0],
          opacity: [0, 0.5, 0],
          rotate: [0, -360],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute top-1/3 right-[15%] w-1.5 h-1.5 bg-orange-500/50 rounded-full"
      />
      <motion.div
        animate={{
          y: [0, -120, 0],
          opacity: [0, 0.4, 0],
          rotate: [0, 180],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute top-1/2 left-[20%] w-2 h-2 bg-cyan-500/50 rounded-full"
      />
      <motion.div
        animate={{
          y: [0, -90, 0],
          opacity: [0, 0.5, 0],
          rotate: [0, -180],
        }}
        transition={{
          duration: 10.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
        className="absolute top-2/3 right-[25%] w-1.5 h-1.5 bg-pink-500/50 rounded-full"
      />
      <motion.div
        animate={{
          y: [0, -110, 0],
          opacity: [0, 0.4, 0],
          rotate: [0, 270],
        }}
        transition={{
          duration: 9.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.2,
        }}
        className="absolute top-1/4 right-[30%] w-2 h-2 bg-yellow-500/50 rounded-full"
      />
      <motion.div
        animate={{
          y: [0, -70, 0],
          opacity: [0, 0.5, 0],
          rotate: [0, -270],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute top-3/4 left-[15%] w-1.5 h-1.5 bg-purple-500/50 rounded-full"
      />

      {/* Subtle light streak */}
      <motion.div
        animate={{
          x: [-20, 20, -20],
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent"
      />

      {/* Feather-like floating elements */}
      <motion.div
        animate={{
          y: [0, -150, 0],
          x: [0, 30, 0],
          rotate: [0, 45, 0],
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-[40%] left-[5%] w-3 h-1 bg-gradient-to-r from-accent/40 to-transparent rounded-full"
      />
      <motion.div
        animate={{
          y: [0, -120, 0],
          x: [0, -25, 0],
          rotate: [0, -30, 0],
          opacity: [0, 0.25, 0],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5,
        }}
        className="absolute top-[60%] right-[8%] w-2.5 h-1 bg-gradient-to-r from-orange-500/40 to-transparent rounded-full"
      />
    </div>
  );
}
