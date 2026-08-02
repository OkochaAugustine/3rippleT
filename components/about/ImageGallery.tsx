"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const GALLERY_IMAGES = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
    alt: "CrossFit training session",
    category: "Training",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop",
    alt: "Gym workout",
    category: "Gym",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
    alt: "Community celebration",
    category: "Community",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1552674605-469523d5b5f4?q=80&w=2070&auto=format&fit=crop",
    alt: "Running event",
    category: "Events",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069&auto=format&fit=crop",
    alt: "Functional fitness",
    category: "Training",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=2069&auto=format&fit=crop",
    alt: "Group workout",
    category: "Community",
  },
];

export function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<typeof GALLERY_IMAGES[0] | null>(null);

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
            Our Community
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Moments that define who we are. Training, celebrating, and growing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {GALLERY_IMAGES.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white font-bold">{image.category}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl max-h-[90vh] w-full"
              >
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={2070}
                  height={2070}
                  className="w-full h-auto object-contain rounded-2xl"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 rounded-full bg-white/10 backdrop-blur-md p-2 text-white hover:bg-white/20 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  );
}
