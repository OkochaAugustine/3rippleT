"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Sparkles } from "lucide-react";

import { programs } from "@/data/programs";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ProgramsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Section ref={ref} id="programs" className="relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-accent mb-4">
            <Sparkles className="size-4" />
            What We Offer
          </div>
          <Heading as="h2" size="lg" className="mt-3">
            Our Programs
          </Heading>
        </motion.div>

        <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program, i) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="h-full"
              >
                <Card className="h-full flex flex-col overflow-hidden group bg-gradient-to-br from-card to-card/50 border-border/60 shadow-lg hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300 rounded-2xl">
                  <div className="relative overflow-hidden rounded-t-2xl h-48 sm:h-52">
                    <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/40 to-transparent z-10" />
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <motion.div 
                      className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-accent/95 backdrop-blur-md text-accent-foreground shadow-lg"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="size-5 sm:size-6" />
                    </motion.div>
                  </div>
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <Heading as="h3" size="sm" className="!text-lg sm:!text-xl mb-2 group-hover:text-accent transition-colors">
                      {program.title}
                    </Heading>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">
                      {program.description}
                    </p>
                    <Button 
                      asChild
                      variant="ghost" 
                      className="w-full justify-between px-0 hover:bg-transparent group-hover:px-4 transition-all duration-300"
                    >
                      <Link href="/programs">
                        <span>Explore Program</span>
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
