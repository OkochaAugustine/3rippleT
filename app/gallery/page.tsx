"use client";

import { useState } from "react";

import { GalleryHero } from "@/components/gallery/GalleryHero";
import { GalleryFilter } from "@/components/gallery/GalleryFilter";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <GalleryHero />
      <GalleryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <GalleryGrid
        selectedCategory={selectedCategory}
        onImageClick={setSelectedImage}
      />
      {selectedImage && (
        <GalleryLightbox
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}
