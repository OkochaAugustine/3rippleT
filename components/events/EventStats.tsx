"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Users, Calendar, Trophy, Target } from "lucide-react";

interface StatItem {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  label: string;
}

const EVENT_STATS: StatItem[] = [
  { icon: <Users className="w-5 h-5" />, value: 500, suffix: "+", label: "Participants" },
  { icon: <Calendar className="w-5 h-5" />, value: 20, suffix: "+", label: "Coaches" },
  { icon: <Trophy className="w-5 h-5" />, value: 3, suffix: "", label: "Days" },
  { icon: <Target className="w-5 h-5" />, value: 10, suffix: "+", label: "Competitions" },
];

interface AnimatedStatProps {
  value: number;
  suffix?: string;
  duration?: number;
}

function AnimatedStat({ value, suffix = "", duration = 2 }: AnimatedStatProps) {
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
      
      // Easing function for smooth animation
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

interface EventStatsProps {
  className?: string;
}

export function EventStats({ className = "" }: EventStatsProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 ${className}`}>
      {EVENT_STATS.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 text-center"
        >
          <div className="flex justify-center mb-3">
            <div className="rounded-full bg-accent/20 p-3 text-accent">
              {stat.icon}
            </div>
          </div>
          <div className="text-3xl md:text-4xl font-black text-white mb-1">
            <AnimatedStat value={stat.value} suffix={stat.suffix} />
          </div>
          <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-white/60">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
