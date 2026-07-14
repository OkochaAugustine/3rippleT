export interface TrainingVideo {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  focus: string;
  thumbnail: string;
  video: string;
}

export const trainingVideos: TrainingVideo[] = [
  {
    id: "primer",
    title: "Foundation Primer",
    description:
      "A coach-led introduction to bracing, tempo, and movement quality before the session intensity climbs.",
    duration: "08:40",
    level: "Beginner",
    focus: "Movement prep",
    thumbnail: "/videos/carnival.mp4",
    video: "/videos/carnival.mp4",
  },
  {
    id: "engine",
    title: "Engine Builder",
    description:
      "Structured conditioning intervals built for athletes who want sharper pacing without losing power.",
    duration: "14:25",
    level: "All levels",
    focus: "Conditioning",
    thumbnail: "/videos/engine-builder.mp4",
    video: "/videos/engine-builder.mp4",
  },
  {
    id: "barbell",
    title: "Barbell Mechanics",
    description:
      "Technical cues for smoother pulls, stronger receiving positions, and cleaner repeat efforts.",
    duration: "11:10",
    level: "Intermediate",
    focus: "Strength skill",
    thumbnail: "/videos/barbell-mechanics.mp4",
    video: "/videos/barbell-mechanics.mp4",
  },
  {
    id: "recovery",
    title: "Recovery Reset",
    description:
      "A low-impact mobility sequence for hips, ankles, shoulders, and controlled breathing after hard training.",
    duration: "09:55",
    level: "All levels",
    focus: "Mobility",
    thumbnail: "/videos/recovery-reset.mp4",
    video: "/videos/recovery-reset.mp4",
  },
  {
    id: "assessment",
    title: "Performance Check-In",
    description:
      "Simple benchmarks for tracking progress, spotting asymmetries, and choosing the right next training block.",
    duration: "12:30",
    level: "Advanced",
    focus: "Testing",
    thumbnail: "/videos/performance-check.mp4",
    video: "/videos/performance-check.mp4",
  },
];