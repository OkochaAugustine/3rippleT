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
    type: "image",
    src: "/images/hero.jpg",
    alt: "3Ripple T Fitness training floor",
  },
  {
    id: "2",
    type: "image",
    src: "/images/training-floor.jpg",
    alt: "Athletes training together",
  },
  {
    id: "3",
    type: "image",
    src: "/images/hero3.jpg",
    alt: "Strength and conditioning session",
  },
];

export const heroStats = [
  { value: 500, suffix: "+", label: "Active Members" },
  { value: 12, suffix: "+", label: "Years Coaching" },
  { value: 50, suffix: "+", label: "Weekly Classes" },
];
