"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { Dumbbell, ShowerHead, Lock, Car, Wifi, Thermometer } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

const amenities = [
  { icon: Dumbbell, title: "Premium Equipment", description: "State-of-the-art training equipment from top brands." },
  { icon: ShowerHead, title: "Clean Showers", description: "Spacious, clean locker rooms with premium amenities." },
  { icon: Lock, title: "Secure Storage", description: "Personal lockers for your belongings." },
  { icon: Car, title: "Free Parking", description: "Convenient parking available for all members." },
  { icon: Wifi, title: "High-Speed WiFi", description: "Stay connected with fast, reliable internet." },
  { icon: Thermometer, title: "Climate Control", description: "Comfortable temperature year-round." },
];

export function Facility() {
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
            Our <span className="text-accent">Facility</span>
          </Heading>
          <p className="mt-4 text-lg text-primary-foreground/72">
            A training environment designed for excellence.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5">
              <Image
                src="/images/placeholders/gym-1.svg"
                alt="Training floor"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5">
              <Image
                src="/images/placeholders/gym-2.svg"
                alt="Equipment area"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {amenities.map((amenity, index) => {
                const Icon = amenity.icon;
                return (
                  <motion.div
                    key={amenity.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur"
                  >
                    <Icon className="h-6 w-6 text-accent" />
                    <h3 className="mt-3 font-bold">{amenity.title}</h3>
                    <p className="mt-1 text-sm text-primary-foreground/72">{amenity.description}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="rounded-lg border border-accent/30 bg-accent/10 p-6">
              <h3 className="text-lg font-bold text-accent">Facility Highlights</h3>
              <ul className="mt-4 space-y-2 text-primary-foreground/72">
                <li>• 10,000+ sq ft of training space</li>
                <li>• Multiple training zones for different modalities</li>
                <li>• Dedicated mobility and recovery area</li>
                <li>• Climate-controlled environment</li>
                <li>• Regular equipment maintenance and upgrades</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
