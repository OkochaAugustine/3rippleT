"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function CarnivalCTA() {
  return (
    <Section className="bg-black py-20 sm:py-24 md:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 sm:mb-8">
            BE PART OF THE CARNIVAL
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/70 mb-8 sm:mb-12">
            Train. Compete. Connect. Celebrate.
          </p>
          <Link href="/events/delta-state-fitness-carnival/register">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                className="w-full sm:w-auto px-10 py-5 sm:px-12 sm:py-6 text-base sm:text-lg md:text-xl font-bold bg-accent hover:bg-accent/90 text-black rounded-full"
              >
                Register Now
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
