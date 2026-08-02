"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Award, Users, Heart, Calendar } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const stats = [
  { value: 10, suffix: "+", label: "Years of Experience", icon: <Award className="w-6 h-6" /> },
  { value: 200, suffix: "+", label: "Active Members", icon: <Users className="w-6 h-6" /> },
  { value: 1000, suffix: "+", label: "Lives Inspired", icon: <Heart className="w-6 h-6" /> },
  { value: 50, suffix: "+", label: "Community Events", icon: <Calendar className="w-6 h-6" /> },
];

function AnimatedStat({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-display font-black">
      {count}
      {suffix}
    </span>
  );
}

export function Statistics() {
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
            By The Numbers
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Our impact measured in achievements, community, and lives transformed.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-accent/20 p-3 text-accent">
                  {stat.icon}
                </div>
              </div>
              <p className="text-4xl md:text-5xl font-black text-white mb-2">
                <AnimatedStat value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm md:text-base font-semibold uppercase tracking-wider text-white/60">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
