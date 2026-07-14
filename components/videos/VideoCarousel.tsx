"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

const videos = [
  { title: "Olympic Lifting Tips", duration: "5:30", thumbnail: "/images/placeholders/gym-1.svg" },
  { title: "Mobility Routine", duration: "12:00", thumbnail: "/images/placeholders/gym-2.svg" },
  { title: "HIIT Workout", duration: "20:00", thumbnail: "/images/placeholders/gym-3.svg" },
  { title: "Strength Training", duration: "15:00", thumbnail: "/images/placeholders/gym-4.svg" },
];

export function VideoCarousel() {
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
            Latest <span className="text-accent">Videos</span>
          </Heading>
        </motion.div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {videos.map((video, index) => (
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
                <div className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1 text-xs">
                  {video.duration}
                </div>
              </div>
              <h3 className="mt-3 font-semibold">{video.title}</h3>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" className="border-white/18 bg-white/8 text-white hover:bg-white/14">
            View All Videos
          </Button>
        </div>
      </Container>
    </Section>
  );
}
