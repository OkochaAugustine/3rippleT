"use client";

import { motion } from "framer-motion";
import { Dumbbell, Users, Zap, Apple, Target, Heart } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const reasons = [
  { icon: <Dumbbell className="w-6 h-6" />, title: "Professional Coaching", description: "Expert guidance from certified trainers dedicated to your success." },
  { icon: <Users className="w-6 h-6" />, title: "Friendly Community", description: "Join a supportive family that celebrates every milestone together." },
  { icon: <Zap className="w-6 h-6" />, title: "Modern Equipment", description: "Train with state-of-the-art facilities and cutting-edge gear." },
  { icon: <Target className="w-6 h-6" />, title: "Fitness Events", description: "Participate in exciting competitions and community challenges." },
  { icon: <Apple className="w-6 h-6" />, title: "Nutrition Guidance", description: "Comprehensive nutrition plans to fuel your fitness journey." },
  { icon: <Heart className="w-6 h-6" />, title: "Wellness Focus", description: "Holistic approach to health covering mind, body, and spirit." },
];

export function WhyPeopleJoin() {
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
            Why People Join
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Discover what makes 3Ripple T Fitness different. More than a gym—we are a community dedicated to your transformation.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/20 group-hover:bg-accent/30 transition-colors">
                <div className="text-accent">{reason.icon}</div>
              </div>
              <h3 className="mt-4 text-xl font-bold text-white">{reason.title}</h3>
              <p className="mt-2 text-white/70 leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
