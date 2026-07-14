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
    src: "/videos/hero.mp4",
    alt: "3Ripple T Fitness training floor",
    poster: "/images/placeholders/hero-bg.svg",
  },
  {
    id: "2",
    type: "image",
    src: "/images/placeholders/gym-1.svg",
    alt: "Athletes training together",
  },
  {
    id: "3",
    type: "image",
    src: "/images/placeholders/gym-3.svg",
    alt: "Strength and conditioning session",
  },
];

export const heroStats = [
  { value: 500, suffix: "+", label: "Active Members" },
  { value: 12, suffix: "+", label: "Years Coaching" },
  { value: 50, suffix: "+", label: "Weekly Classes" },
];
