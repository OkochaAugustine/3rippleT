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
      className="bg-muted/30 py-16 sm:py-20 md:py-24"
    >
      <Container>
        <div className="mb-10 sm:mb-12 text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.36em] text-accent">
            Coming Up
          </p>

          <Heading
            as="h2"
            size="lg"
            className="mt-2 sm:mt-3"
          >
            Events
          </Heading>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
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
                <div className="relative mb-3 sm:mb-4 h-40 sm:h-48 overflow-hidden rounded-lg border border-border">
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
                  className="mb-2 !text-lg sm:!text-xl"
                >
                  {event.title}
                </Heading>

                <p className="mb-3 sm:mb-4 flex-1 text-xs sm:text-sm text-muted-foreground">
                  {event.description}
                </p>

                <div className="mb-4 sm:mb-5 space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                    <Calendar className="size-3.5 sm:size-4 shrink-0 text-accent" />
                    <span>{event.date}</span>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                    <Clock className="size-3.5 sm:size-4 shrink-0 text-accent" />
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                    <MapPin className="size-3.5 sm:size-4 shrink-0 text-accent" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <Button className="mt-auto w-full gap-2">
                  Register Now
                  <ArrowRight className="size-4" />
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}