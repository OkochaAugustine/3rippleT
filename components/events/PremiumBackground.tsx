"use client";

import { motion } from "framer-motion";

interface PremiumBackgroundProps {
  className?: string;
}

export function PremiumBackground({ className = "" }: PremiumBackgroundProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-black" />
      
      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px]"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -50, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-[100px]"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px]"
      />

      {/* Moving light beams */}
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[200%] bg-gradient-to-r from-transparent via-accent/5 to-transparent opacity-30"
      />

      {/* Radial gradient spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_70%)]" />
    </div>
  );
}
