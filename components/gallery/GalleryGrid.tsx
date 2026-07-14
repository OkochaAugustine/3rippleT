"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useInView } from "react-intersection-observer";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { gallery } from "@/data/gallery";
import { cn } from "@/lib/utils/helpers";

interface GalleryGridProps {
  selectedCategory: string;
  onImageClick: (image: string, index: number) => void;
}

export function GalleryGrid({ selectedCategory, onImageClick }: GalleryGridProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const filteredGallery =
    selectedCategory === "all"
      ? gallery
      : gallery.filter((item) => item.category === selectedCategory);

  return (
    <Section className="bg-background">
      <Container>
        <div ref={ref} className="masonry-grid">
          {filteredGallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: (index % 6) * 0.06, duration: 0.5 }}
              className={cn(
                "masonry-item group relative cursor-pointer overflow-hidden rounded-2xl border border-border/60 bg-card",
                index % 5 === 0 && "sm:col-span-2",
              )}
              onClick={() => onImageClick(item.image, index)}
            >
              <Image
                src={item.image}
                alt={item.alt}
                width={600}
                height={index % 3 === 0 ? 500 : 400}
                loading={index < 6 ? "eager" : "lazy"}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                <p className="text-sm font-semibold text-white">{item.alt}</p>
                {item.category ? (
                  <p className="mt-0.5 text-xs capitalize text-white/60">{item.category}</p>
                ) : null}
              </div>
              {item.isVideo ? (
                <div className="absolute inset-0 flex items-center justify-center opacity-80 transition-opacity group-hover:opacity-100">
                  <div className="flex size-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                    <Play className="size-7 fill-white text-white" />
                  </div>
                </div>
              ) : null}
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
