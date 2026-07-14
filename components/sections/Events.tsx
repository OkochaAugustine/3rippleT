"use client";

import { useMemo } from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
} from "lucide-react";

import { useEventStore } from "@/store/event-store";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Events() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // ✅ Select only stable state from Zustand
  const events = useEventStore((state) => state.events);

  // ✅ Memoize derived data
  const upcomingEvents = useMemo(
    () => events.filter((event) => !event.archived),
    [events]
  );

  return (
    <Section
      ref={ref}
      id="events"
      className="bg-muted/30"
    >
      <Container>
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.36em] text-accent">
            Coming Up
          </p>

          <Heading
            as="h2"
            size="lg"
            className="mt-3"
          >
            Events
          </Heading>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {upcomingEvents.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={
                inView
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {}
              }
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: "easeOut",
              }}
              whileHover={{
                y: -6,
              }}
            >
              <Card className="flex h-full flex-col overflow-hidden">
                <div className="relative mb-4 h-48 overflow-hidden rounded-lg border border-border">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110 hover:scale-110"
                  />
                </div>

                <Heading
                  as="h3"
                  size="sm"
                  className="mb-2 !text-xl"
                >
                  {event.title}
                </Heading>

                <p className="mb-4 flex-1 text-muted-foreground">
                  {event.description}
                </p>

                <div className="mb-5 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 shrink-0 text-accent" />
                    <span>{event.date}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="h-4 w-4 shrink-0 text-accent" />
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 shrink-0 text-accent" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <Button className="mt-auto w-full gap-2">
                  Register Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}