"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Clock, Dumbbell, PlayCircle, Radio } from "lucide-react";

import { trainingVideos } from "@/data/videos";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function Videos() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const featuredVideo = trainingVideos[0];
  const supportingVideos = trainingVideos.slice(1);

  return (
    <Section ref={ref} id="videos" className="overflow-hidden bg-muted/30">
      <Container>
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.36em] text-accent">
              Watch & Learn
            </p>
            <Heading as="h2" size="lg" className="mt-3">
              Training Library
            </Heading>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground lg:justify-self-end lg:text-lg">
            Coach-curated sessions for technique, conditioning, recovery, and
            performance testing, shaped to help every athlete train with more
            intent inside and beyond the gym.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="group relative overflow-hidden rounded-lg border border-border bg-card shadow-soft"
          >
            <div className="relative min-h-[26rem] overflow-hidden sm:min-h-[31rem]">
              <Image
                src={featuredVideo.thumbnail}
                alt={featuredVideo.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(min-width: 1024px) 48vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />
              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur">
                <Radio className="size-4 text-accent" />
                Featured Session
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                <Link
                  href="#contact"
                  aria-label={`Request access to ${featuredVideo.title}`}
                  className="mb-6 flex size-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-glow transition-transform duration-300 group-hover:scale-105"
                >
                  <PlayCircle className="size-8" />
                </Link>
                <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/72">
                  <span>{featuredVideo.focus}</span>
                  <span aria-hidden="true">/</span>
                  <span>{featuredVideo.level}</span>
                  <span aria-hidden="true">/</span>
                  <span>{featuredVideo.duration}</span>
                </div>
                <Heading as="h3" size="md" className="mt-3 text-white">
                  {featuredVideo.title}
                </Heading>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
                  {featuredVideo.description}
                </p>
              </div>
            </div>
          </motion.article>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {supportingVideos.map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.12 + i * 0.08,
                  ease: "easeOut",
                }}
                whileHover={{ y: -4 }}
                className="group grid overflow-hidden rounded-lg border border-border bg-card shadow-soft sm:grid-rows-[auto_1fr] lg:grid-cols-[13rem_1fr] lg:grid-rows-1"
              >
                <div className="relative aspect-video overflow-hidden lg:aspect-auto">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(min-width: 1024px) 13rem, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/35 transition-colors duration-300 group-hover:bg-black/45">
                    <Link
                      href="#contact"
                      aria-label={`Request access to ${video.title}`}
                      className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform duration-300 group-hover:scale-105"
                    >
                      <PlayCircle className="size-6" />
                    </Link>
                  </div>
                </div>
                <div className="flex min-h-0 flex-col p-5">
                  <div className="mb-3 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-3.5 text-accent" />
                      {video.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Dumbbell className="size-3.5 text-accent" />
                      {video.level}
                    </span>
                  </div>
                  <Heading as="h3" size="sm" className="!text-xl mb-1">
                    {video.title}
                  </Heading>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {video.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
          className="mt-10 flex flex-col gap-4 rounded-lg border border-border bg-background/60 p-5 backdrop-blur sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
              New Drops Weekly
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Build a smarter training week with video cues you can revisit
              before class, during open gym, or at home.
            </p>
          </div>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="#contact">
              Request Access
              <ArrowRight className="size-5" />
            </Link>
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
}
