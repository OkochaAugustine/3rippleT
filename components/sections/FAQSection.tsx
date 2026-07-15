"use client";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronDown, ChevronUp } from "lucide-react";

import { faqs } from "@/data/faq";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Section ref={ref} id="faq" className="bg-muted/30 py-16 sm:py-20 md:py-24">
      <Container>
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.36em] text-accent">
            Got Questions?
          </p>
          <Heading as="h2" size="lg" className="mt-2 sm:mt-3">
            Frequently Asked Questions
          </Heading>
        </div>

        <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="rounded-2xl border border-border bg-card overflow-hidden"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="flex w-full items-center justify-between gap-4 sm:gap-6 p-4 sm:p-6 text-left"
              >
                <span className="font-semibold text-base sm:text-lg">{faq.question}</span>
                {openId === faq.id ? (
                  <ChevronUp className="shrink-0 text-accent" />
                ) : (
                  <ChevronDown className="shrink-0 text-muted-foreground" />
                )}
              </button>
              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0 text-sm sm:text-base text-muted-foreground">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

