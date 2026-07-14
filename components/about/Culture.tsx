"use client";

import { motion } from "framer-motion";
import { MessageCircle, Trophy, Sparkles, HeartHandshake } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

export function Culture() {
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
            Our <span className="text-accent">Culture</span>
          </Heading>
          <p className="mt-4 text-lg text-muted-foreground">
            More than a gym—it&apos;s a movement.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/20">
                <MessageCircle className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Open Communication</h3>
                <p className="mt-2 text-muted-foreground">
                  We encourage feedback, questions, and conversations. Your voice matters here.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/20">
                <Trophy className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Celebrate Wins</h3>
                <p className="mt-2 text-muted-foreground">
                  Every PR, every milestone, every personal victory—we celebrate them all together.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/20">
                <Sparkles className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Continuous Growth</h3>
                <p className="mt-2 text-muted-foreground">
                  We believe in constant improvement—for our members and our coaches alike.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/20">
                <HeartHandshake className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Support System</h3>
                <p className="mt-2 text-muted-foreground">
                  When you&apos;re here, you&apos;re never training alone. Our community has your back.
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-lg font-bold">What Our Members Say</h3>
              <blockquote className="mt-4 text-muted-foreground italic">
                &quot;The culture here is unlike anywhere else. It&apos;s not just about working out—it&apos;s about becoming part of something bigger.&quot;
              </blockquote>
              <p className="mt-4 font-semibold">— Member since 2019</p>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
