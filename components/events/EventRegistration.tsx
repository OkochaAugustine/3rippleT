"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function EventRegistration() {
  return (
    <Section className="bg-primary text-primary-foreground">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-lg border border-white/10 bg-white/5 p-12 text-center backdrop-blur"
        >
          <Heading as="h2" size="lg">
            Register for <span className="text-accent">Events</span>
          </Heading>
          <p className="mt-4 text-lg text-primary-foreground/72">
            Sign up for upcoming events and competitions.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="/contact">
                Contact Us
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/18 bg-white/8 text-white hover:bg-white/14">
              <Link href="/membership">
                Become a Member
              </Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
