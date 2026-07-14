"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

const features = [
  { name: "Unlimited Group Classes", starter: true, premium: true, elite: true },
  { name: "Open Gym Access", starter: true, premium: true, elite: true },
  { name: "Weekly Check-ins", starter: true, premium: true, elite: true },
  { name: "Nutrition Guidance", starter: true, premium: true, elite: true },
  { name: "Personal Training (2x/month)", starter: false, premium: true, elite: false },
  { name: "Priority Booking", starter: false, premium: true, elite: true },
  { name: "Custom Programming", starter: false, premium: true, elite: true },
  { name: "Recovery Sessions", starter: false, premium: true, elite: true },
  { name: "Personal Training (4x/month)", starter: false, premium: false, elite: true },
  { name: "1-on-1 Nutrition Coaching", starter: false, premium: false, elite: true },
  { name: "Competition Preparation", starter: false, premium: false, elite: true },
  { name: "Recovery Protocol", starter: false, premium: false, elite: true },
  { name: "Body Composition Analysis", starter: false, premium: false, elite: true },
];

export function PricingComparison() {
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
            Plan <span className="text-accent">Comparison</span>
          </Heading>
          <p className="mt-4 text-primary-foreground/72">
            See what&apos;s included in each plan.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-12 overflow-x-auto"
        >
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-4 px-4 text-left font-bold">Feature</th>
                <th className="py-4 px-4 text-center font-bold">Starter</th>
                <th className="py-4 px-4 text-center font-bold text-accent">Premium</th>
                <th className="py-4 px-4 text-center font-bold">Elite</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr key={feature.name} className="border-b border-white/10">
                  <td className="py-4 px-4">{feature.name}</td>
                  <td className="py-4 px-4 text-center">
                    {feature.starter ? (
                      <Check className="h-5 w-5 mx-auto text-accent" />
                    ) : (
                      <X className="h-5 w-5 mx-auto text-primary-foreground/40" />
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {feature.premium ? (
                      <Check className="h-5 w-5 mx-auto text-accent" />
                    ) : (
                      <X className="h-5 w-5 mx-auto text-primary-foreground/40" />
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {feature.elite ? (
                      <Check className="h-5 w-5 mx-auto text-accent" />
                    ) : (
                      <X className="h-5 w-5 mx-auto text-primary-foreground/40" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </Container>
    </Section>
  );
}
