"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function CarnivalVideo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Section id="carnival-video" className="bg-black py-16 sm:py-20 md:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            SEE WHAT HAPPENED
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
            Workout sessions from the previous Delta State Fitness Carnival
          </p>
        </motion.div>

        {/* Cinematic video thumbnail */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden cursor-pointer group"
          onClick={() => setIsOpen(true)}
        >
          {/* Thumbnail with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-black/40 to-orange-500/20" />
          
          {/* Animated border glow */}
          <motion.div
            animate={{
              boxShadow: [
                "0 0 20px rgba(163, 230, 53, 0.1)",
                "0 0 40px rgba(163, 230, 53, 0.3)",
                "0 0 20px rgba(163, 230, 53, 0.1)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-2xl"
          />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-accent/90 flex items-center justify-center"
              >
                <Play className="w-8 h-8 sm:w-10 sm:h-10 text-black fill-black ml-1" />
              </motion.div>
              <div className="absolute inset-0 rounded-full bg-accent/50 blur-xl" />
            </div>
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
            <p className="text-sm sm:text-base font-semibold text-white/90">
              Previous Carnival Workout Sessions
            </p>
            <p className="text-xs sm:text-sm text-white/60 mt-1">
              Click to watch the energy
            </p>
          </div>
        </motion.div>

        {/* Premium video modal */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/98 z-50 flex items-center justify-center p-4"
                onClick={() => setIsOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full max-w-6xl aspect-video"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute -top-14 right-0 text-white/70 hover:text-white transition-colors"
                  >
                    <X className="w-8 h-8" />
                  </button>
                  <video
                    src="/videos/carnival.mp4"
                    controls
                    autoPlay
                    className="w-full h-full rounded-lg"
                  />
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  );
}
