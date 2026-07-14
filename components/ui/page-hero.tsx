"use client";

import { useEffect, useRef } from "react";

import Image from "next/image";
import Link from "next/link";

import gsap from "gsap";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/helpers";

export type PageHeroVariant =
  | "about"
  | "programs"
  | "pricing"
  | "gallery"
  | "videos"
  | "events"
  | "blog"
  | "contact"
  | "auth"
  | "dashboard";

type PageHeroProps = {
  variant: PageHeroVariant;
  eyebrow?: string;
  title: string;
  highlight?: string;
  description: string;
  image?: string;
  cta?: { label: string; href: string };
  stats?: { value: string; label: string }[];
  layout?: "center" | "split" | "diagonal" | "minimal";
};

const variantStyles: Record<
  PageHeroVariant,
  { accent: string; gradient: string; pattern: string }
> = {
  about: {
    accent: "text-orange-400",
    gradient: "from-orange-950/90 via-primary/80 to-primary/60",
    pattern: "page-accent-orange",
  },
  programs: {
    accent: "text-accent",
    gradient: "from-emerald-950/90 via-primary/80 to-primary/50",
    pattern: "page-accent-green",
  },
  pricing: {
    accent: "text-amber-400",
    gradient: "from-amber-950/90 via-primary/80 to-primary/50",
    pattern: "page-accent-amber",
  },
  gallery: {
    accent: "text-purple-400",
    gradient: "from-purple-950/90 via-primary/80 to-primary/50",
    pattern: "page-accent-purple",
  },
  videos: {
    accent: "text-blue-400",
    gradient: "from-blue-950/90 via-primary/80 to-primary/50",
    pattern: "page-accent-blue",
  },
  events: {
    accent: "text-secondary",
    gradient: "from-red-950/90 via-primary/80 to-primary/50",
    pattern: "page-accent-orange",
  },
  blog: {
    accent: "text-accent",
    gradient: "from-primary via-primary/90 to-emerald-950/80",
    pattern: "page-accent-green",
  },
  contact: {
    accent: "text-accent",
    gradient: "from-primary/95 via-primary/85 to-emerald-900/70",
    pattern: "page-accent-green",
  },
  auth: {
    accent: "text-accent",
    gradient: "from-primary via-primary/95 to-black/80",
    pattern: "",
  },
  dashboard: {
    accent: "text-accent",
    gradient: "from-primary/90 to-primary/70",
    pattern: "",
  },
};

export function PageHero({
  variant,
  eyebrow,
  title,
  highlight,
  description,
  image = "/images/placeholders/hero-bg.svg",
  cta,
  stats,
  layout = "split",
}: PageHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const styles = variantStyles[variant];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".page-hero-reveal", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative overflow-hidden pt-[4.5rem] text-primary-foreground",
        layout === "minimal" ? "pb-12 pt-28" : "min-h-[50vh] pb-16 lg:min-h-[60vh]",
        styles.pattern,
      )}
    >
      <div className="absolute inset-0">
        <Image src={image} alt="" fill className="object-cover" sizes="100vw" priority />
        <div className={cn("absolute inset-0 bg-gradient-to-br", styles.gradient)} />
        <div className="surface-grid absolute inset-0 opacity-20" />
      </div>

      {layout === "diagonal" ? (
        <div className="absolute -right-1/4 top-0 h-full w-1/2 skew-x-[-12deg] bg-accent/10 blur-3xl" />
      ) : null}

      <Container className="relative z-10 flex min-h-[inherit] items-center py-12">
        <div
          className={cn(
            "w-full",
            layout === "center" && "mx-auto max-w-3xl text-center",
            layout === "split" && "grid gap-10 lg:grid-cols-2 lg:items-center",
            layout === "diagonal" && "max-w-2xl",
            layout === "minimal" && "max-w-xl",
          )}
        >
          <div>
            {eyebrow ? (
              <motion.p
                className="page-hero-reveal text-xs font-bold uppercase tracking-[0.35em] text-white/60"
              >
                {eyebrow}
              </motion.p>
            ) : null}
            <h1 className="page-hero-reveal mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight tracking-tight">
              {title}{" "}
              {highlight ? (
                <span className={styles.accent}>{highlight}</span>
              ) : null}
            </h1>
            <p className="page-hero-reveal mt-4 max-w-xl text-lg leading-relaxed text-white/70">
              {description}
            </p>
            {cta ? (
              <div className="page-hero-reveal mt-8">
                <Button asChild size="lg" className="gap-2 rounded-full">
                  <Link href={cta.href}>
                    {cta.label}
                    <ArrowRight className="size-5" />
                  </Link>
                </Button>
              </div>
            ) : null}
            {stats ? (
              <div className="page-hero-reveal mt-10 flex flex-wrap gap-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl font-black">{stat.value}</p>
                    <p className="text-sm text-white/55">{stat.label}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {layout === "split" && image ? (
            <motion.div
              className="page-hero-reveal relative hidden aspect-[4/3] overflow-hidden rounded-2xl border border-white/15 shadow-2xl lg:block"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <Image src={image} alt="" fill className="object-cover" sizes="50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </motion.div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
