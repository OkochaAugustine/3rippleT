"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function MissionVision() {
  return (
    <Section className="bg-black py-24 md:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-4">
            Mission & Vision
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Our purpose drives everything we do. Building stronger bodies, sharper minds, and lasting community.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 md:p-10"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/20">
              <Target className="h-8 w-8 text-accent" />
            </div>
            <h3 className="mt-6 text-2xl md:text-3xl font-bold text-white">Our Mission</h3>
            <p className="mt-4 text-lg text-white/70 leading-relaxed">
              Helping people become healthier, stronger, more confident, and more disciplined through fitness. We believe in transforming lives through expert coaching, supportive community, and unwavering commitment to excellence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 md:p-10"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/20">
              <Eye className="h-8 w-8 text-accent" />
            </div>
            <h3 className="mt-6 text-2xl md:text-3xl font-bold text-white">Our Vision</h3>
            <p className="mt-4 text-lg text-white/70 leading-relaxed">
              To build the largest fitness community in Delta State and become one of Nigeria&apos;s leading fitness brands. We envision a future where fitness is accessible, inspiring, and transformative for everyone.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">Our Values</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {["Discipline", "Consistency", "Community", "Excellence", "Transformation", "Healthy Living"].map((value, index) => (
              <motion.div
                key={value}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 backdrop-blur-sm"
              >
                <Heart className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold uppercase tracking-wider text-white">{value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
