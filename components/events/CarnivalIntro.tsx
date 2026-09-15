"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { useRef } from "react";

export function CarnivalIntro() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <Section id="carnival-intro" className="bg-black py-16 sm:py-20 md:py-24">
      <Container>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Photograph with parallax */}
          <motion.div
            ref={ref}
            style={{ scale, y }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden"
          >
            <Image
              src="/images/hero.jpg"
              alt="Delta State Fitness Carnival athletes"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 sm:mb-8">
              THE CARNIVAL
            </h2>
            <p className="text-base sm:text-lg text-white/80 mb-4 sm:mb-6 leading-relaxed">
              The Delta State Fitness Carnival is more than an event. It is a celebration of movement,
              community, and the vibrant spirit of Delta State.
            </p>
            <p className="text-base sm:text-lg text-white/80 mb-4 sm:mb-6 leading-relaxed">
              Fitness meets carnival energy. Athletes, families, and communities come together to train,
              compete, and celebrate. From intense challenges to live music, every moment is designed to
              inspire.
            </p>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">
              Come ready to move. Leave stronger than you arrived.
            </p>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
