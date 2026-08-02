// Feature flag to enable/disable hero videos
// Set to true when video files are available in public/videos/
export const ENABLE_HERO_VIDEO = false;

export type HeroSlide = {
  id: string;
  type: "image" | "video";
  src: string;
  alt: string;
  poster?: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "1",
    type: "video",
    src: "/videos/hero-slide-1.mp4",
    poster: "/images/hero.jpg",
    alt: "3Ripple T Fitness training floor",
  },
  {
    id: "2",
    type: "video",
    src: "/videos/hero-slide-2.mp4",
    poster: "/images/training-floor.jpg",
    alt: "Athletes training together",
  },
  {
    id: "3",
    type: "video",
    src: "/videos/hero-slide-3.mp4",
    poster: "/images/hero3.jpg",
    alt: "Strength and conditioning session",
  },
];

export const heroStats = [
  { value: 500, suffix: "+", label: "Active Members" },
  { value: 12, suffix: "+", label: "Years Coaching" },
  { value: 50, suffix: "+", label: "Weekly Classes" },
];
