"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const galleryImages = [
  {
    src: "/images/gallary6.jpg",
    alt: "Carnival celebration moment",
    caption: "Celebration",
  },
  {
    src: "/images/hero3.jpg",
    alt: "Fitness action",
    caption: "Action",
  },
  {
    src: "/images/gallaryy.jpg",
    alt: "Carnival energy",
    caption: "Energy",
  },
];

export function CarnivalGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const nextImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % galleryImages.length);
  };

  const prevImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + galleryImages.length) % galleryImages.length);
  };

  const closeLightbox = () => setSelectedIndex(null);

  return (
    <Section className="bg-black py-16 sm:py-20 md:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            PHOTO GALLERY
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
            Moments from the Delta State Fitness Carnival
          </p>
        </motion.div>

        {/* Gallery grid - asymmetric composition */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group ${
                index === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-square"
              }`}
              onClick={() => setSelectedIndex(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm font-semibold text-white">{image.caption}</p>
              </div>
              <div className="absolute inset-0 border border-transparent group-hover:border-accent/50 transition-colors duration-300 rounded-2xl" />
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedIndex !== null && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                onClick={closeLightbox}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full max-w-5xl max-h-[90vh]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close button */}
                  <button
                    onClick={closeLightbox}
                    className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
                  >
                    <X className="w-8 h-8" />
                  </button>

                  {/* Image */}
                  <div className="relative w-full aspect-video md:aspect-auto md:h-[80vh] rounded-lg overflow-hidden">
                    <Image
                      src={galleryImages[selectedIndex].src}
                      alt={galleryImages[selectedIndex].alt}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority
                    />
                  </div>

                  {/* Caption */}
                  {galleryImages[selectedIndex].caption && (
                    <p className="text-center text-white/80 mt-4 text-sm sm:text-base">
                      {galleryImages[selectedIndex].caption}
                    </p>
                  )}

                  {/* Navigation */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  );
}
