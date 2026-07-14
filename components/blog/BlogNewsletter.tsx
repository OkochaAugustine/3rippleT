"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function BlogNewsletter() {
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
              <Mail className="h-8 w-8 text-accent" />
            </div>
          </div>
          <Heading as="h2" size="lg" className="mt-6">
            Subscribe to Our Newsletter
          </Heading>
          <p className="mt-4 text-lg text-muted-foreground">
            Get the latest fitness tips, articles, and updates delivered to your inbox.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-12 px-4 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <Button size="lg" className="shrink-0">
              Subscribe
            </Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
