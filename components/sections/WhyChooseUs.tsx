"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Dumbbell, Users, Trophy, Heart, Clock, Zap } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

const features = [
  {
    id: "1",
    icon: Dumbbell,
    title: "World-Class Coaching",
    description: "Certified trainers with years of competitive and coaching experience.",
  },
  {
    id: "2",
    icon: Users,
    title: "Supportive Community",
    description: "Train alongside like-minded individuals who push you to be your best.",
  },
  {
    id: "3",
    icon: Trophy,
    title: "Proven Results",
    description: "Our athletes consistently reach PRs and their fitness goals.",
  },
  {
    id: "4",
    icon: Heart,
    title: "Personalized Attention",
    description: "Every workout is scaled to your ability level and goals.",
  },
  {
    id: "5",
    icon: Clock,
    title: "Flexible Schedule",
    description: "Multiple class times throughout the day to fit your lifestyle.",
  },
  {
    id: "6",
    icon: Zap,
    title: "State-of-the-Art Facility",
    description: "Premium equipment and space designed for optimal training.",
  },
];

export function WhyChooseUs() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Section ref={ref} id="why-choose-us" className="py-16 sm:py-20 md:py-24">
      <Container>
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.36em] text-accent">
            Why Us
          </p>
          <Heading as="h2" size="lg" className="mt-2 sm:mt-3">
            Why Choose 3Ripple T Fitness
          </Heading>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                whileHover={{ y: -4 }}
              >
                <Card className="h-full">
                  <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-accent/10 mb-4 sm:mb-5">
                    <Icon className="text-accent size-7 sm:size-8" />
                  </div>
                  <Heading as="h3" size="sm" className="!text-lg sm:!text-xl mb-2 sm:mb-3">
                    {feature.title}
                  </Heading>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
