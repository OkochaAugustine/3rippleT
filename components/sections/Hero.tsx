"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ArrowRight, ChevronDown, PlayCircle } from "lucide-react";
import CountUp from "react-countup";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { heroSlides, heroStats } from "@/data/hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

import "swiper/css";
import "swiper/css/effect-fade";

const floatingCards = [
  {
    number: "01",
    title: "Assessment first",
    text: "Every athlete starts with movement, goals, and coach fit.",
  },
  {
    number: "02",
    title: "Precision coaching",
    text: "Technique, progression, and accountability at every session.",
  },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  // Scroll opacity for scroll indicator and orbs
  const { scrollY } = useScroll();
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  // Mouse Parallax values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  
  // Parallax offsets for different layers
  const textParallaxX = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const textParallaxY = useTransform(springY, [-0.5, 0.5], [-5, 5]);

  const backgroundParallaxX = useTransform(springX, [-0.5, 0.5], [-25, 25]);
  const backgroundParallaxY = useTransform(springY, [-0.5, 0.5], [-20, 20]);

  const cardsParallaxX = useTransform(springX, [-0.5, 0.5], [20, -20]);
  const cardsParallaxY = useTransform(springY, [-0.5, 0.5], [15, -15]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ 
        defaults: { ease: "power4.out" },
        onComplete: () => setStatsVisible(true) 
      });

      // Split text reveal
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".hero-word");
        tl.fromTo(words, 
          { y: "110%", opacity: 0, rotate: 3 },
          {
            y: "0%",
            opacity: 1,
            rotate: 0,
            stagger: 0.08,
            duration: 1.2,
            transformOrigin: "0% 50%",
          }
        );
      }

      tl.fromTo(
        ".hero-badge",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.9"
      );
      tl.fromTo(
        ".hero-subtitle",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.7"
      );
      tl.fromTo(
        ".hero-cta-group",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.6"
      );
      tl.fromTo(
        ".hero-stat",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.7 },
        "-=0.5"
      );
      tl.fromTo(
        ".hero-float-card",
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.15, duration: 0.9 },
        "-=0.6"
      );
      tl.fromTo(
        ".hero-main-img",
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.1 },
        "-=0.8"
      );

      // Bounce scroll indicator
      gsap.to(".hero-scroll-indicator", {
        y: 6,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const headlineWords = ["Train", "with", "Intent.", "Move", "with", "Power."];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-dvh items-center overflow-hidden pt-[4.5rem] bg-black"
      onMouseMove={handleMouseMove}
    >
      {/* Background Media Layer */}
      <motion.div 
        style={{ x: backgroundParallaxX, y: backgroundParallaxY }}
        className="absolute inset-0 scale-105"
      >
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop
          speed={1500}
          className="h-full w-full"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              {slide.type === "video" ? (
                <div className="relative h-full w-full overflow-hidden">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={slide.poster}
                    className="h-full w-full object-cover"
                  >
                    <source src={slide.src} type="video/mp4" />
                  </video>
                </div>
              ) : (
                <div className="relative h-full w-full">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority={slide.id === "1"}
                  />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Layered overlay gradients for high cinematic immersion */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/35" />
      </motion.div>

      {/* Floating Geometric accent elements */}
      <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
        {/* Circle wireframe */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute right-10 top-1/4 size-80 rounded-full border border-white/5 opacity-30 hidden lg:block"
        />
        {/* Abstract crosshair grids */}
        <div className="absolute left-[8%] bottom-[12%] size-12 border-l border-b border-white/10 opacity-40 hidden md:block" />
        <div className="absolute right-[12%] top-[12%] size-16 border-r border-t border-white/10 opacity-40 hidden md:block" />
      </div>

      {/* Ambient Gradient Orbs */}
      <motion.div
        style={{ x: textParallaxX, y: textParallaxY }}
        className="hero-gradient-orb absolute -left-32 top-1/4 size-96 bg-accent/20"
      />
      <motion.div
        style={{ x: cardsParallaxX }}
        className="hero-gradient-orb absolute -right-24 bottom-1/4 size-80 bg-secondary/15 [animation-delay:4s]"
      />

      <Container className="relative z-10 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Hero Left Content Column */}
          <motion.div 
            style={{ x: textParallaxX, y: textParallaxY }}
            className="lg:col-span-7"
          >
            {/* Tag Badge */}
            <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-md">
              <span className="size-2 animate-pulse rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
              Premium coaching. Measurable momentum.
            </div>

            {/* Split Reveal Title */}
            <h1
              ref={headlineRef}
              className="mt-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[1.05] tracking-tight text-white"
            >
              {headlineWords.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.25em] pb-1.5">
                  <span className="hero-word inline-block origin-left">
                    {word === "Intent." || word === "Power." ? (
                      <span className="text-accent">{word}</span>
                    ) : (
                      word
                    )}
                  </span>
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              Strength, conditioning, mobility, and coaching precision for people who want a sharper body, a clearer mind, and a training room that raises the standard.
            </p>

            {/* CTAs with animated transitions */}
            <div className="hero-cta-group mt-8 flex flex-wrap items-center gap-4">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                <Button
                  asChild
                  size="lg"
                  className="group gap-2 rounded-full bg-accent text-accent-foreground shadow-glow hover:shadow-[0_0_24px_var(--color-accent)] transition-all font-bold"
                >
                  <Link href="#contact">
                    Book a Free Intro
                    <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="gap-2 rounded-full border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-all"
                >
                  <Link href="#videos">
                    <PlayCircle className="size-5 text-accent" />
                    Watch Training
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Staggered Stats Counters */}
            <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-8 border-t border-white/10 pt-8 max-w-lg">
              {heroStats.map((stat) => (
                <div key={stat.label} className="hero-stat text-left">
                  <p className="text-3xl font-black text-white sm:text-4xl tracking-tight">
                    {statsVisible ? (
                      <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
                    ) : (
                      "0"
                    )}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/50">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero Right Column: Floating Visual Cards */}
          <div className="relative hidden lg:col-span-5 lg:block">
            {/* Interactive Cards */}
            {floatingCards.map((card, i) => (
              <motion.div
                key={card.number}
                style={{ x: cardsParallaxX, y: cardsParallaxY }}
                className="hero-float-card glass-card absolute rounded-2xl p-5 text-white shadow-2xl z-20 hover:border-accent/40 transition-colors border border-white/10"
                initial={{
                  top: i === 0 ? "8%" : "52%",
                  right: i === 0 ? "-2%" : "18%",
                  width: i === 0 ? "16.5rem" : "15rem",
                }}
                animate={{ y: [0, i % 2 === 0 ? -15 : 12, 0] }}
                transition={{
                  duration: 5 + i * 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <p className="font-display text-3xl font-black text-accent">{card.number}</p>
                <p className="mt-2 font-bold text-base">{card.title}</p>
                <p className="mt-1 text-xs text-white/70 leading-relaxed">{card.text}</p>
              </motion.div>
            ))}

            {/* Main Visual Image Frame */}
            <motion.div 
              style={{ x: textParallaxX, y: textParallaxY }}
              className="hero-main-img relative ml-auto mr-8 mt-8 w-4/5 overflow-hidden rounded-2xl border border-white/15 shadow-2xl scale-100"
            >
              <Image
                src="/images/hero3.jpg"
                alt="Training session"
                width={500}
                height={400}
                className="w-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </Container>

      {/* Scroll indicator with opacity mapped to scroll offset */}
      <motion.div 
        style={{ opacity: scrollIndicatorOpacity }}
        className="hero-scroll-indicator absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 cursor-pointer pointer-events-none"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
          Scroll
        </span>
        <ChevronDown className="size-5 text-accent" />
      </motion.div>
    </section>
  );
}
