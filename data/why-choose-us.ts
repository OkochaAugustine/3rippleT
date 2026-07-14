import { 
  Dumbbell, 
  Users, 
  Trophy, 
  Heart, 
  Clock, 
  Zap 
} from "lucide-react";

import type { WhyChooseUsItem } from "@/types";

export const whyChooseUs: WhyChooseUsItem[] = [
  {
    id: "1",
    icon: Dumbbell,
    title: "World-Class Coaching",
    description: "Certified trainers with years of competitive and coaching experience.",
  },
  {
    id: "2",
    icon: Users,
    title: "Supportive Community",
    description: "Train alongside like-minded individuals who push you to be your best.",
  },
  {
    id: "3",
    icon: Trophy,
    title: "Proven Results",
    description: "Our athletes consistently achieve PRs and reach their fitness goals.",
  },
  {
    id: "4",
    icon: Heart,
    title: "Personalized Attention",
    description: "Every workout is scaled to your ability level and goals.",
  },
  {
    id: "5",
    icon: Clock,
    title: "Flexible Schedule",
    description: "Multiple class times throughout the day to fit your lifestyle.",
  },
  {
    id: "6",
    icon: Zap,
    title: "State-of-the-Art Facility",
    description: "Premium equipment and space designed for optimal training.",
  },
];
