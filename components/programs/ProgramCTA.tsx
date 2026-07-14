"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ProgramCTA() {
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
          <Heading as="h2" size="lg">
            Ready to <span className="text-accent">Start</span>?
          </Heading>
          <p className="mt-4 text-lg text-muted-foreground">
            Join our programs and transform your fitness journey today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="/contact">
                Book Free Intro
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/membership">
                View Memberships
              </Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
