"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const milestones = [
  { year: "2016", title: "Founded", description: "3Ripple T Fitness began as a small local fitness community in Asaba with a vision to transform lives through fitness." },
  { year: "2018", title: "Community Expansion", description: "Our community grew as more people joined our mission. We built lasting friendships and transformed countless lives." },
  { year: "2020", title: "100 Members", description: "Reached our first major milestone with 100 active members. Our impact on the Delta State fitness community was growing." },
  { year: "2022", title: "Regional Recognition", description: "Became recognized as one of the leading fitness communities in Delta State, known for excellence and community spirit." },
  { year: "2024", title: "Fitness Carnival Begins", description: "Launched the Delta State Fitness Carnival, bringing together athletes and fitness enthusiasts from across the region." },
  { year: "Today", title: "200+ Members", description: "Now a leader in community fitness with over 200 active members, continuing to inspire and transform lives daily." },
];

export function Timeline() {
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
            Our Journey
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            From humble beginnings to becoming one of Delta State&apos;s leading fitness communities.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/50 to-transparent" />

            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`relative flex items-start gap-8 mb-12 last:mb-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-accent shadow-[0_0_20px_var(--color-accent)] -translate-x-1/2 z-10" />

                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}>
                  <div className="ml-16 md:ml-0 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                    <p className="text-3xl md:text-4xl font-black text-accent mb-2">{milestone.year}</p>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{milestone.title}</h3>
                    <p className="text-white/70 leading-relaxed">{milestone.description}</p>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
