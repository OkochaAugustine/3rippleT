"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, User, Music, Trophy, Gift, Users } from "lucide-react";
import { EVENT_CONFIG } from "@/constants/event-config";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function EventInfo() {
  const details = EVENT_CONFIG.EVENT_DETAILS;

  const infoCards = [
    {
      icon: Calendar,
      title: "Event Date",
      value: details.date,
      subtitle: details.time,
    },
    {
      icon: MapPin,
      title: "Venue",
      value: details.venue,
      subtitle: details.location,
    },
    {
      icon: User,
      title: "Host",
      value: details.host,
      subtitle: "3Ripple T Fitness",
    },
  ];

  const whatToExpect = [
    {
      icon: Trophy,
      title: "Fitness Challenges",
      description: "Compete in various fitness challenges and win exciting prizes",
    },
    {
      icon: Users,
      title: "Community",
      description: "Connect with fitness enthusiasts from across Delta State",
    },
    {
      icon: Music,
      title: "Live Music",
      description: "Energizing performances to keep you motivated throughout",
    },
    {
      icon: Gift,
      title: "Prizes & Giveaways",
      description: "Win amazing prizes from our sponsors and partners",
    },
  ];

  return (
    <Section className="bg-black py-20">
      <Container>
        {/* Event Details Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-20">
          {infoCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
            >
              <div className="absolute inset-0 rounded-2xl bg-accent/5 blur-xl" />
              <div className="relative">
                <card.icon className="w-8 h-8 text-accent mb-4" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-2">
                  {card.title}
                </h3>
                <p className="text-xl font-bold text-white mb-1">{card.value}</p>
                <p className="text-sm text-white/60">{card.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* What to Expect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="font-display text-4xl md:text-5xl font-black text-center text-white mb-4">
            What to Expect
          </h2>
          <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
            An unforgettable experience packed with fitness, fun, and community
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {whatToExpect.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-accent/50"
              >
                <div className="absolute inset-0 rounded-2xl bg-accent/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="rounded-full border border-white/20 bg-white/5 p-3 w-fit mb-4">
                    <item.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/60">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Fitness Challenges Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/10 to-orange-500/10 p-8 md:p-12 backdrop-blur-sm"
        >
          <div className="absolute inset-0 rounded-3xl bg-accent/5 blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-4">
              Fitness Challenges
            </h2>
            <p className="text-white/80 mb-6 max-w-3xl">
              Test your limits with our carefully designed fitness challenges. Whether you are a beginner
              or a seasoned athlete, there is a challenge for everyone.
            </p>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>Strength & Power competitions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>Endurance challenges</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>Team relay events</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>Skill-based competitions</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
