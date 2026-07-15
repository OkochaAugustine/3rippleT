"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckCircle2, ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatNGN } from "@/lib/payments";

export function Membership() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
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
    <Section ref={ref} id="membership" className="relative bg-muted/20 py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-accent/5 blur-3xl pointer-events-none" aria-hidden="true" />
      
      <Container>
        <div className="text-center mb-10 sm:mb-12 flex flex-col items-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.36em] text-accent">
            Join Us
          </p>
          <Heading as="h2" size="lg" className="mt-2 sm:mt-3">
            Membership Plans
          </Heading>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Choose the plan that fits your goals and commitment level. All plans include access to our amazing community.
          </p>

          {/* Animated Billing Period Switch */}
          <div className="relative mt-8 sm:mt-10 flex items-center p-1.5 bg-card border border-border/80 rounded-full shadow-sm z-10">
            <button
              type="button"
              onClick={() => setBillingPeriod("monthly")}
              className={`relative px-4 sm:px-6 py-2 text-xs sm:text-sm font-bold rounded-full transition-colors duration-300 z-10 ${
                billingPeriod === "monthly" ? "text-accent-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
              {billingPeriod === "monthly" && (
                <motion.span
                  layoutId="billingPeriodCapsule"
                  className="absolute inset-0 rounded-full bg-accent -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
            </button>
            <button
              type="button"
              onClick={() => setBillingPeriod("annually")}
              className={`relative px-4 sm:px-6 py-2 text-xs sm:text-sm font-bold rounded-full transition-colors duration-300 z-10 flex items-center gap-1.5 ${
                billingPeriod === "annually" ? "text-accent-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Annually
              <span className="text-[9px] sm:text-[10px] bg-accent-foreground/15 text-accent px-1.5 py-0.5 rounded-full font-extrabold uppercase">
                Save 20%
              </span>
              {billingPeriod === "annually" && (
                <motion.span
                  layoutId="billingPeriodCapsule"
                  className="absolute inset-0 rounded-full bg-accent -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
            </button>
          </div>
        </div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3 items-stretch">
          {plansList.map((plan, i) => {
            const displayPrice = billingPeriod === "monthly" ? plan.monthlyPrice : plan.annualPrice;
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="h-full flex"
              >
                <Card
                  className={`w-full flex flex-col relative overflow-hidden transition-all duration-300 border-2 ${
                    plan.popular
                      ? "border-accent bg-accent/[0.03] shadow-glow"
                      : "border-border hover:border-foreground/20"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-4 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-bl-xl">
                      MOST POPULAR
                    </div>
                  )}

                  <Heading as="h3" size="sm" className="mb-2 mt-2">
                    {plan.name}
                  </Heading>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 line-clamp-2">
                    {plan.description}
                  </p>

                  <div className="mb-4 sm:mb-6 flex flex-col justify-end min-h-16">
                    <div className="flex items-baseline">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={displayPrice}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.25 }}
                          className="text-4xl sm:text-5xl font-black tracking-tight"
                        >
                          {formatNGN(displayPrice)}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    <p className="text-muted-foreground text-[10px] sm:text-xs font-semibold mt-1 uppercase tracking-wide">
                      {plan.periodText}
                    </p>
                  </div>

                  <ul className="space-y-3 sm:space-y-3.5 flex-1 mb-6 sm:mb-8 border-t border-border/60 pt-4 sm:pt-6">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 shrink-0 text-accent size-4 sm:size-4.5" />
                        <span className="text-xs sm:text-sm text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.popular ? "primary" : "outline"}
                    className={`w-full gap-2 rounded-full font-bold py-5 sm:py-6 transition-all duration-300 ${
                      plan.popular ? "bg-accent text-accent-foreground shadow-glow hover:scale-[1.02]" : "hover:bg-muted"
                    }`}
                    size="lg"
                  >
                    Get Started
                    <ArrowRight className="size-4" />
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
