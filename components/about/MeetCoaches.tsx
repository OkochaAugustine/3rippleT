"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { Share2, Globe } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

const coaches = [
  {
    name: "Tim Thompson",
    role: "Head Coach & Founder",
    image: "/images/placeholders/tim-1.svg",
    bio: "12+ years of coaching experience. Certified Strength & Conditioning Specialist.",
    specialties: ["Strength Training", "Olympic Lifting", "Programming"],
  },
  {
    name: "Sarah Martinez",
    role: "Senior Coach",
    image: "/images/placeholders/trainer-1.svg",
    bio: "8+ years of coaching. CrossFit Level 3 Trainer and Mobility Specialist.",
    specialties: ["Mobility", "Endurance", "Recovery"],
  },
  {
    name: "Mike Chen",
    role: "Coach",
    image: "/images/placeholders/trainer-2.svg",
    bio: "5+ years of coaching. USA Weightlifting Certified and Nutrition Coach.",
    specialties: ["Olympic Lifting", "Nutrition", "Youth Training"],
  },
  {
    name: "Emily Rodriguez",
    role: "Coach",
    image: "/images/placeholders/trainer-3.svg",
    bio: "4+ years of coaching. Functional Training Specialist and Group Fitness Expert.",
    specialties: ["Group Fitness", "Functional Movement", "Beginner Programs"],
  },
];

export function MeetCoaches() {
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
            Meet Our <span className="text-accent">Coaches</span>
          </Heading>
          <p className="mt-4 text-lg text-muted-foreground">
            World-class coaching from experienced professionals.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {coaches.map((coach, index) => (
            <motion.div
              key={coach.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg border border-border bg-card">
                <Image
                  src={coach.image}
                  alt={coach.name}
                  width={400}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                  <h3 className="font-bold">{coach.name}</h3>
                  <p className="text-sm text-accent">{coach.role}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">{coach.bio}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {coach.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Globe className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
