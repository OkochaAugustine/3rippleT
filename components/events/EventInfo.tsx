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
      description: "Compete in various fitness challenges",
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
      description: "Win prizes from our sponsors and partners",
    },
  ];

  return (
    <Section className="bg-black py-16 md:py-24">
      <Container>
        {/* Event Details Cards */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3 mb-16 md:mb-20">
          {infoCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 md:p-8 backdrop-blur-sm"
            >
              <div className="absolute inset-0 rounded-2xl bg-accent/5 blur-xl" />
              <div className="relative">
                <card.icon className="w-6 h-6 sm:w-8 sm:h-8 text-accent mb-3 sm:mb-4" />
                <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/60 mb-1 sm:mb-2">
                  {card.title}
                </h3>
                <p className="text-lg sm:text-xl font-bold text-white mb-0.5 sm:mb-1">{card.value}</p>
                <p className="text-xs sm:text-sm text-white/60">{card.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* What to Expect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-center text-white mb-3 sm:mb-4">
            What to Expect
          </h2>
          <p className="text-center text-white/60 mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
            An unforgettable experience packed with fitness, fun, and community
          </p>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
            {whatToExpect.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group relative rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 backdrop-blur-sm transition-all hover:border-accent/50"
              >
                <div className="absolute inset-0 rounded-2xl bg-accent/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="rounded-full border border-white/20 bg-white/5 p-2.5 sm:p-3 w-fit mb-3 sm:mb-4">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-white/60">{item.description}</p>
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
          className="relative rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/10 to-orange-500/10 p-6 sm:p-8 md:p-12 backdrop-blur-sm"
        >
          <div className="absolute inset-0 rounded-3xl bg-accent/5 blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4">
              Fitness Challenges
            </h2>
            <p className="text-white/80 mb-4 sm:mb-6 max-w-3xl text-sm sm:text-base">
              Test your limits with our carefully designed fitness challenges. Whether you are a beginner
              or a seasoned athlete, there is a challenge for everyone.
            </p>
            <ul className="space-y-2 sm:space-y-3 text-white/70 text-sm sm:text-base">
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-accent mt-0.5 sm:mt-1">•</span>
                <span>Strength & Power competitions</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-accent mt-0.5 sm:mt-1">•</span>
                <span>Endurance challenges</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-accent mt-0.5 sm:mt-1">•</span>
                <span>Team relay events</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-accent mt-0.5 sm:mt-1">•</span>
                <span>Skill-based competitions</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
