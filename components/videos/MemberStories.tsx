"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

const stories = [
  { name: "John D.", title: "Lost 30 lbs in 3 months", thumbnail: "/images/placeholders/gym-2.svg" },
  { name: "Sarah M.", title: "First muscle-up achievement", thumbnail: "/images/placeholders/gym-3.svg" },
  { name: "Mike R.", title: "Competition champion", thumbnail: "/images/placeholders/gym-4.svg" },
];

export function MemberStories() {
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
            Member <span className="text-accent">Stories</span>
          </Heading>
          <p className="mt-4 text-muted-foreground">
            Real transformations from our community.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {stories.map((story, index) => (
            <motion.div
              key={story.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg border border-border bg-card aspect-video cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center bg-primary/20 group-hover:bg-primary/30 transition-colors">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
                    <Play className="h-6 w-6 text-accent fill-accent" />
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <p className="font-semibold">{story.name}</p>
                <p className="text-sm text-muted-foreground">{story.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
