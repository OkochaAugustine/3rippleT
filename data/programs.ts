import { Activity, Dumbbell, HeartPulse, Footprints } from "lucide-react";

import type { Program } from "@/types";

export const programs: Program[] = [
  {
    id: "1",
    title: "Strength & Conditioning",
    description: "Build functional strength and endurance with our signature program.",
    icon: Activity,
    image: "/images/strength-training2.png",
  },
  {
    id: "2",
    title: "Olympic Lifting",
    description: "Master the snatch and clean & jerk with expert technique coaching.",
    icon: Dumbbell,
    image: "/images/lifting.jpg",
  },
  {
    id: "3",
    title: "Mobility & Recovery",
    description: "Improve flexibility, prevent injury, and speed up recovery.",
    icon: HeartPulse,
    image: "/images/mobility.jpg",
  },
  {
    id: "4",
    title: "Personal Training",
    description: "1-on-1 coaching tailored specifically to your goals.",
    icon: Footprints,
    image: "/images/oneonone.jpg",
  },
];
