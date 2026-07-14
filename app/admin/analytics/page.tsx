"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

export default function AdminAnalyticsPage() {
  return (
    <Section className="bg-background min-h-screen">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Heading as="h1" size="xl">
            <span className="text-accent">Analytics</span>
          </Heading>
          <p className="mt-2 text-muted-foreground">
            Track your platform performance and growth metrics.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 space-y-6"
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" />
                <p className="text-sm text-muted-foreground">Total Members</p>
              </div>
              <p className="mt-2 text-3xl font-bold">524</p>
              <p className="text-sm text-green-500">+12% this month</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-accent" />
                <p className="text-sm text-muted-foreground">Revenue</p>
              </div>
              <p className="mt-2 text-3xl font-bold">$72,523</p>
              <p className="text-sm text-green-500">+8% this month</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                <p className="text-sm text-muted-foreground">Engagement</p>
              </div>
              <p className="mt-2 text-3xl font-bold">89%</p>
              <p className="text-sm text-green-500">+5% this month</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-accent" />
                <p className="text-sm text-muted-foreground">Page Views</p>
              </div>
              <p className="mt-2 text-3xl font-bold">12.4K</p>
              <p className="text-sm text-green-500">+15% this month</p>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-bold mb-4">Member Growth</h3>
            <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
              <p className="text-muted-foreground">Chart placeholder - Analytics visualization</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-lg font-bold mb-4">Revenue by Plan</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Premium</span>
                    <span>$45,000</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-3/4" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Elite</span>
                    <span>$20,000</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-1/2" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Starter</span>
                    <span>$7,523</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-1/4" />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-lg font-bold mb-4">Top Performing Programs</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Strength & Conditioning</span>
                  <span className="font-semibold">245 members</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Olympic Lifting</span>
                  <span className="font-semibold">189 members</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Mobility & Recovery</span>
                  <span className="font-semibold">156 members</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Personal Training</span>
                  <span className="font-semibold">98 members</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
