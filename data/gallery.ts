import type { GalleryItem } from "@/types";

const images = [
  "/images/placeholders/gym-1.svg",
  "/images/placeholders/gym-2.svg",
  "/images/placeholders/gym-3.svg",
  "/images/placeholders/gym-4.svg",
  "/images/placeholders/gym-5.svg",
  "/images/placeholders/gym-6.svg",
  "/images/placeholders/program-1.svg",
  "/images/placeholders/program-2.svg",
  "/images/placeholders/program-3.svg",
  "/images/placeholders/program-4.svg",
  "/images/placeholders/event-1.svg",
  "/images/placeholders/event-2.svg",
  "/images/placeholders/event-3.svg",
  "/images/placeholders/testimonial-1.svg",
  "/images/placeholders/testimonial-2.svg",
  "/images/placeholders/testimonial-3.svg",
  "/images/placeholders/tim-portrait.svg",
  "/images/placeholders/video-placeholder.svg",
  "/images/placeholders/hero-bg.svg",
];

const categories = ["training", "community", "events", "coaches"] as const;
const alts = [
  "Gym interior with athletes training",
  "Group fitness class in session",
  "Athlete performing squats",
  "Personal training session",
  "Box jump workout",
  "Deadlift training",
  "Strength program showcase",
  "Olympic lifting technique",
  "Mobility and recovery session",
  "One-on-one coaching",
  "Summer competition event",
  "Lifting seminar",
  "Community gathering",
  "Member transformation story",
  "Athlete success story",
  "Community member spotlight",
  "Coach portrait",
  "Training video highlight",
  "Facility overview",
  "Open gym atmosphere",
  "Competition day energy",
  "Recovery zone",
  "Team workout",
  "Evening class session",
];

export const galleryCategories = [
  { id: "all", label: "All" },
  { id: "training", label: "Training" },
  { id: "community", label: "Community" },
  { id: "events", label: "Events" },
  { id: "coaches", label: "Coaches" },
];

export const gallery: GalleryItem[] = Array.from({ length: 24 }, (_, i) => ({
  id: String(i + 1),
  image: images[i % images.length],
  alt: alts[i % alts.length],
  category: categories[i % categories.length],
  isVideo: i === 17,
}));
