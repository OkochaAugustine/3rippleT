"use client";

import { motion } from "framer-motion";

import { easing } from "@/lib/animations";

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: easing }}
    >
      {children}
    </motion.div>
  );
}
