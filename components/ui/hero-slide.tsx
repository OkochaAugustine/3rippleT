"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface HeroSlideProps {
  slide: {
    id: string;
    type: "image" | "video";
    src: string;
    alt: string;
    poster?: string;
  };
  enableVideo: boolean;
  className?: string;
}

export function HeroSlide({ slide, enableVideo, className = "" }: HeroSlideProps) {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // If video is disabled or video failed to load, show image
  const shouldShowImage = !enableVideo || slide.type === "image" || videoError;
  const imageSrc = slide.poster || slide.src.replace("/videos/", "/images/").replace(".mp4", ".jpg");

  if (shouldShowImage) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <Image
          src={imageSrc}
          alt={slide.alt}
          fill
          className="object-cover"
          priority
        />
      </div>
    );
  }

  // Render video with fallback to image on error
  return (
    <div className={`relative w-full h-full ${className}`}>
      <video
        ref={videoRef}
        src={slide.src}
        poster={slide.poster}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        onError={() => setVideoError(true)}
      />
      {slide.poster && (
        <Image
          src={slide.poster}
          alt={slide.alt}
          fill
          className="object-cover"
          priority
        />
      )}
    </div>
  );
}
