"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Trophy, Calendar, Heart } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

export function MeetTim() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const achievements = [
    { icon: Trophy, title: "Certified Strength & Conditioning Specialist", description: "CSCS certified with proven track record" },
    { icon: Calendar, title: "12+ Years of Coaching", description: "Helping athletes reach their goals" },
    { icon: Heart, title: "1000+ Athletes Coached", description: "Transforming lives through fitness" },
  ];

  return (
    <Section ref={ref} id="meet-tim" className="bg-muted/30">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-lg border border-secondary/20 bg-secondary/5" />
            <div className="relative overflow-hidden rounded-lg border border-border shadow-2xl">
              <Image
                src="/images/hero.jpg"
                alt="Coach Tim"
                width={600}
                height={800}
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.36em] text-accent">
              Meet Your Coach
            </p>
            <Heading as="h2" size="lg" className="mt-3">
              Tim 
            </Heading>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              With over 12 years of coaching experience and a background in competitive fitness, Tim brings a unique approach to training that combines science, discipline, and heart.
            </p>

            <div className="mt-8 grid gap-4">
              {achievements.map((achievement, i) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 shrink-0">
                      <Icon className="text-accent size-6" />
                    </div>
                    <div>
                      <p className="font-semibold">{achievement.title}</p>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
