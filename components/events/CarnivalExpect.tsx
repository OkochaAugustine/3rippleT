"use client";

import { motion } from "framer-motion";
import { Trophy, Music, Gift, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const features = [
  {
    icon: Trophy,
    title: "Fitness Challenges",
    description: "Compete in strength, endurance, and skill-based competitions",
  },
  {
    icon: Users,
    title: "Community",
    description: "Connect with fitness enthusiasts from across Delta State",
  },
  {
    icon: Music,
    title: "Live Music",
    description: "Energizing performances throughout the event",
  },
  {
    icon: Gift,
    title: "Prizes & Giveaways",
    description: "Win prizes from sponsors and partners",
  },
];

export function CarnivalExpect() {
  return (
    <Section className="bg-black py-16 sm:py-20 md:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            WHAT TO EXPECT
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
            Fitness. Music. Community.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-accent/30 bg-accent/10 mb-4">
                <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm sm:text-base text-white/60">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
