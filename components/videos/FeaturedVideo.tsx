"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function FeaturedVideo() {
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
            Featured <span className="text-accent">Video</span>
          </Heading>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8"
        >
          <div className="relative overflow-hidden rounded-lg border border-border bg-card aspect-video">
            <div className="absolute inset-0 flex items-center justify-center bg-primary/20">
              <Button size="lg" className="gap-2">
                <Play className="h-6 w-6 fill-current" />
                Watch Now
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-bold">Summer Throwdown 2026 Highlights</h3>
            <p className="mt-2 text-muted-foreground">
              Watch the best moments from our annual fitness competition.
            </p>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
