import type { LucideIcon } from "lucide-react";
import { CalendarDays, Dumbbell, Images, Newspaper, Phone, Tags } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const mainNavigation: NavItem[] = [
  { label: "Training", href: "/membership", icon: Dumbbell },
  { label: "Pricing", href: "/pricing", icon: Tags },
  { label: "Events", href: "/events", icon: CalendarDays },
  { label: "Gallery", href: "/gallery", icon: Images },
  { label: "Journal", href: "/blog", icon: Newspaper },
  { label: "Contact", href: "/contact", icon: Phone },
];

export const footerNavigation = [
  {
    title: "Programs",
    links: [
      { label: "Training", href: "/membership" },
      { label: "Pricing", href: "/pricing" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Gallery", href: "/gallery" },
      { label: "Journal", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Members",
    links: [
      { label: "Login", href: "/login" },
      { label: "Register", href: "/register" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
];
