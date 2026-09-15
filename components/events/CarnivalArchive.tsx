"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { useRef } from "react";

export function CarnivalArchive() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <Section className="bg-black py-16 sm:py-20 md:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent border border-accent/30 rounded-full mb-4">
            From the 2025 Carnival
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            A MOMENT FROM OUR JOURNEY
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
            The Delta State Fitness Carnival has a real history
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          style={{ scale, y }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10">
            {/* Gold accent glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-50" />
            
            <Image
              src="/images/hero1.PNG"
              alt="2025 Delta State Fitness Carnival"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            
            {/* Archival frame */}
            <div className="absolute inset-2 border border-white/20 rounded-xl" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12">
              <p className="text-xs sm:text-sm text-white/60 mb-2 tracking-widest uppercase">2025</p>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">
                The First Delta State Fitness Carnival
              </p>
              <p className="text-sm sm:text-base text-white/70">
                A celebration of fitness, community, and the vibrant spirit of Delta State
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
