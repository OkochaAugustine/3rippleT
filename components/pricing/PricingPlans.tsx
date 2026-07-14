"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { formatNGN } from "@/lib/payments";

export function PricingPlans() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annually">("monthly");

  const plansList = [
    {
      id: "daily",
      name: "Daily Pass",
      description: "Full facility access for a single day — perfect for drop-ins",
      monthlyPrice: 3000,
      annualPrice: 3000,
      periodText: "per visit",
      features: [
        "Full gym access",
        "All group classes",
        "Locker room access",
        "Coach on floor",
      ],
      popular: false,
    },
    {
      id: "monthly",
      name: "Monthly Membership",
      description: "Our most popular plan for committed athletes",
      monthlyPrice: 20000,
      annualPrice: 16000, // 20% discount
      periodText: billingPeriod === "monthly" ? "per month" : "per month, billed annually",
      features: [
        "Unlimited group classes",
        "Open gym access",
        "Priority booking",
        "Weekly check-ins",
        "Nutrition guidance",
        "Recovery sessions",
      ],
      popular: true,
    },
    {
      id: "premium",
      name: "Premium Coaching",
      description: "Personal training and custom programming included",
      monthlyPrice: 45000,
      annualPrice: 36000, // 20% discount
      periodText: billingPeriod === "monthly" ? "per month" : "per month, billed annually",
      features: [
        "Everything in Monthly",
        "Personal training (2x/month)",
        "Custom programming",
        "Body composition analysis",
        "Competition preparation",
      ],
      popular: false,
    },
  ];

  return (
    <Section className="bg-background relative py-20 overflow-hidden">
      <div className="absolute top-0 right-0 w-[30%] h-[30%] bg-accent/5 blur-3xl pointer-events-none" aria-hidden="true" />
      
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col items-center"
        >
          <Heading as="h2" size="lg">
            Choose Your <span className="text-accent">Plan</span>
          </Heading>
          <p className="mt-4 text-muted-foreground max-w-xl">
            Flexible options for every fitness journey. Choose the billing period that fits your budget.
          </p>

          {/* Animated Billing Switch */}
          <div className="relative mt-8 flex items-center p-1.5 bg-card border border-border rounded-full shadow-sm z-10">
            <button
              type="button"
              onClick={() => setBillingPeriod("monthly")}
              className={`relative px-6 py-2 text-sm font-bold rounded-full transition-colors duration-300 z-10 ${
                billingPeriod === "monthly" ? "text-accent-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
              {billingPeriod === "monthly" && (
                <motion.span
                  layoutId="pricingBillingCapsule"
                  className="absolute inset-0 rounded-full bg-accent -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
            </button>
            <button
              type="button"
              onClick={() => setBillingPeriod("annually")}
              className={`relative px-6 py-2 text-sm font-bold rounded-full transition-colors duration-300 z-10 flex items-center gap-1.5 ${
                billingPeriod === "annually" ? "text-accent-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Annually
              <span className="text-[10px] bg-accent-foreground/15 text-accent px-1.5 py-0.5 rounded-full font-extrabold uppercase">
                Save 20%
              </span>
              {billingPeriod === "annually" && (
                <motion.span
                  layoutId="pricingBillingCapsule"
                  className="absolute inset-0 rounded-full bg-accent -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
            </button>
          </div>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3 items-stretch">
          {plansList.map((plan, index) => {
            const displayPrice = billingPeriod === "monthly" ? plan.monthlyPrice : plan.annualPrice;
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="h-full flex"
              >
                <div
                  className={`w-full relative rounded-2xl border-2 p-8 flex flex-col transition-all duration-300 ${
                    plan.popular
                      ? "border-accent bg-accent/[0.03] scale-105 shadow-glow"
                      : "border-border bg-card hover:border-foreground/20"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold text-accent-foreground shadow-sm">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mt-2">{plan.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{plan.description}</p>
                  
                  <div className="mt-6 flex flex-col min-h-16 justify-end">
                    <div className="flex items-baseline">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={displayPrice}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.25 }}
                          className="text-4xl font-black tracking-tight"
                        >
                          {formatNGN(displayPrice)}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    <p className="text-xs text-muted-foreground font-semibold mt-1 uppercase tracking-wide">
                      {plan.periodText}
                    </p>
                  </div>

                  <ul className="mt-8 space-y-3.5 flex-1 border-t border-border/60 pt-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check className="h-5 w-5 shrink-0 text-accent mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.popular ? "primary" : "outline"}
                    className={`mt-8 w-full rounded-full font-bold py-6 transition-all duration-300 ${
                      plan.popular ? "bg-accent text-accent-foreground shadow-glow hover:scale-[1.02]" : "hover:bg-muted"
                    }`}
                    size="lg"
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
