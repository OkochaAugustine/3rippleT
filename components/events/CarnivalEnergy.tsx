"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { useRef } from "react";

export function CarnivalEnergy() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const x = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <Section className="bg-black py-16 sm:py-20 md:py-24">
      <Container>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left order-2 md:order-1"
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 sm:mb-8">
              THE ENERGY
            </h2>
            <p className="text-base sm:text-lg text-white/80 mb-4 sm:mb-6 leading-relaxed">
              The carnival comes alive through action. High-intensity challenges, explosive movements,
              and the raw power of athletes pushing their limits.
            </p>
            <p className="text-base sm:text-lg text-white/80 mb-4 sm:mb-6 leading-relaxed">
              Every rep tells a story. Every challenge builds character. The energy in the arena is
              electric—cheers, music, and the sound of determination.
            </p>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">
              This is where fitness transforms into something bigger.
            </p>
          </motion.div>

          {/* Photograph with parallax */}
          <motion.div
            ref={ref}
            style={{ scale, x }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden order-1 md:order-2"
          >
            <Image
              src="/images/gallary3.jpg"
              alt="Fitness competition action"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
