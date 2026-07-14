"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

const coachVideos = [
  { name: "Tim Thompson", title: "Olympic Lifting Fundamentals", thumbnail: "/images/placeholders/tim-1.svg" },
  { name: "Sarah Martinez", title: "Mobility for Athletes", thumbnail: "/images/placeholders/trainer-1.svg" },
  { name: "Mike Chen", title: "Strength Programming", thumbnail: "/images/placeholders/trainer-2.svg" },
];

export function CoachVideos() {
  return (
    <Section className="bg-primary text-primary-foreground">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Heading as="h2" size="lg">
            Coach <span className="text-accent">Tips</span>
          </Heading>
          <p className="mt-4 text-primary-foreground/72">
            Learn from our expert coaches.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {coachVideos.map((video, index) => (
            <motion.div
              key={video.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5 aspect-video cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center bg-primary/30 group-hover:bg-primary/40 transition-colors">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
                    <Play className="h-6 w-6 text-accent fill-accent" />
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-accent/20">
                  <Image
                    src={video.thumbnail}
                    alt={video.name}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold">{video.name}</p>
                  <p className="text-xs text-primary-foreground/58">{video.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
