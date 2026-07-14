"use client";

import { motion } from "framer-motion";
import { CreditCard, Calendar, Check } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export default function MembershipPage() {
  return (
    <Section className="bg-background min-h-screen">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Heading as="h1" size="xl">
            Membership <span className="text-accent">Details</span>
          </Heading>
          <p className="mt-2 text-muted-foreground">
            View and manage your membership plan.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 space-y-6"
        >
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold">Premium Plan</h3>
                <p className="mt-1 text-muted-foreground">$149/month</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="rounded-full bg-green-500/20 text-green-500 px-3 py-1 text-sm font-semibold">
                    Active
                  </span>
                  <span className="text-sm text-muted-foreground">Since January 2024</span>
                </div>
              </div>
              <Button>Upgrade Plan</Button>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-3">Included Features</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-accent" />
                  <span>Unlimited group classes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-accent" />
                  <span>Open gym access</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-accent" />
                  <span>Personal training (2x/month)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-accent" />
                  <span>Priority booking</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-accent" />
                  <span>Custom programming</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-accent" />
                  <span>Recovery sessions</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-bold mb-4">Billing Information</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold">Visa ending in 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/2026</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Update</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold">Next billing date</p>
                    <p className="text-sm text-muted-foreground">August 1, 2026</p>
                  </div>
                </div>
                <span className="font-semibold">$149.00</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-bold mb-4">Payment History</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-semibold">July 2026</p>
                  <p className="text-sm text-muted-foreground">Premium Plan</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">$149.00</p>
                  <p className="text-sm text-green-500">Paid</p>
                </div>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-semibold">June 2026</p>
                  <p className="text-sm text-muted-foreground">Premium Plan</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">$149.00</p>
                  <p className="text-sm text-green-500">Paid</p>
                </div>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-semibold">May 2026</p>
                  <p className="text-sm text-muted-foreground">Premium Plan</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">$149.00</p>
                  <p className="text-sm text-green-500">Paid</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
