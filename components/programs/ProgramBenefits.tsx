"use client";

import { motion } from "framer-motion";
import { TrendingUp, Heart, Shield, Users, Zap, Target } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

const benefits = [
  { icon: TrendingUp, title: "Progressive Programming", description: "Structured programs that adapt as you get stronger." },
  { icon: Heart, title: "Expert Coaching", description: "Certified coaches with years of experience." },
  { icon: Shield, title: "Safe Environment", description: "Focus on proper technique and injury prevention." },
  { icon: Users, title: "Community Support", description: "Train with like-minded individuals who push you." },
  { icon: Zap, title: "Results-Driven", description: "Proven methods that deliver real transformations." },
  { icon: Target, title: "Goal-Oriented", description: "Personalized plans to help you reach your goals." },
];

export function ProgramBenefits() {
  return (
    <Section className="bg-background">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Heading as="h2" size="lg">
            Program <span className="text-accent">Benefits</span>
          </Heading>
          <p className="mt-4 text-lg text-muted-foreground">
            Why our programs deliver results.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="rounded-lg border border-border bg-card p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mt-4 text-lg font-bold">{benefit.title}</h3>
                <p className="mt-2 text-muted-foreground">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
