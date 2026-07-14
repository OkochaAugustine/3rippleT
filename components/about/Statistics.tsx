"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

const stats = [
  { value: 500, suffix: "+", label: "Active Members" },
  { value: 12, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Weekly Classes" },
  { value: 8, suffix: "", label: "Expert Coaches" },
  { value: 15, suffix: "+", label: "Programs Offered" },
  { value: 98, suffix: "%", label: "Member Satisfaction" },
];

export function Statistics() {
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
            By The <span className="text-accent">Numbers</span>
          </Heading>
          <p className="mt-4 text-lg text-muted-foreground">
            Our impact measured in achievements and community.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <p className="text-5xl font-black text-accent">
                <CountUp end={stat.value} duration={2} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
