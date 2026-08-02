"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const communityImages = [
  {
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
    alt: "Training together",
    caption: "Training Together",
  },
  {
    src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
    alt: "Celebrating wins",
    caption: "Celebrating Wins",
  },
  {
    src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop",
    alt: "Encouraging each other",
    caption: "Encouraging Each Other",
  },
];

export function MeetTheCommunity() {
  return (
    <Section className="bg-black py-24 md:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-4">
            Meet The Community
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            More than a gym. We are a family of athletes, dreamers, and supporters working together to become our best selves.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {communityImages.map((item, index) => (
            <motion.div
              key={item.alt}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden group"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xl font-bold text-white">{item.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            Every day, our members show up for each other. Whether it is celebrating a personal best, pushing through a tough workout, or simply being there to offer encouragement. This is what makes 3Ripple T Fitness special.
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}
