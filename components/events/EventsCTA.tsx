"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function EventsCTA() {
  return (
    <Section className="bg-background">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-lg border border-border bg-card p-12 text-center"
        >
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
              <Calendar className="h-8 w-8 text-accent" />
            </div>
          </div>
          <Heading as="h2" size="lg" className="mt-6">
            Don&apos;t Miss Our Next Event
          </Heading>
          <p className="mt-4 text-lg text-muted-foreground">
            Stay updated on all upcoming events and competitions.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/contact">
                Join Our Newsletter
              </Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
