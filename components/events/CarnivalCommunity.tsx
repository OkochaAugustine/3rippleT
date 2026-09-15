"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { useRef } from "react";

export function CarnivalCommunity() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <Section className="bg-black py-16 sm:py-20 md:py-24">
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
              src="/images/gallary1.jpg"
              alt="Carnival community crowd"
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
              MORE THAN FITNESS
            </h2>
            <p className="text-base sm:text-lg text-white/80 mb-4 sm:mb-6 leading-relaxed">
              The carnival brings people together. Fitness is the foundation, but community is the
              heart. Families cheer, friends compete, and strangers become teammates.
            </p>
            <p className="text-base sm:text-lg text-white/80 mb-4 sm:mb-6 leading-relaxed">
              Music fills the air. Laughter echoes through the arena. Victory is celebrated together.
              This is what happens when fitness meets carnival celebration.
            </p>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">
              Train. Compete. Connect.
            </p>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
