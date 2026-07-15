import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  Dumbbell,
  Home,
  Images,
  Info,
  Newspaper,
  Phone,
  Tags,
  Video,
} from "lucide-react";

export type MegaMenuItem = {
  title: string;
  description: string;
  href: string;
  image: string;
};

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  megaMenu?: MegaMenuItem[];
};

export const programsMegaMenu: MegaMenuItem[] = [
  {
    title: "Strength & Conditioning",
    description: "Build power, endurance, and athletic resilience.",
    href: "/programs#strength",
    image: "/images/placeholders/program-1.svg",
  },
  {
    title: "Olympic Lifting",
    description: "Master technique with expert barbell coaching.",
    href: "/programs#olympic",
    image: "/images/placeholders/program-2.svg",
  },
  {
    title: "Mobility & Recovery",
    description: "Move better, recover faster, stay injury-free.",
    href: "/programs#mobility",
    image: "/images/placeholders/program-3.svg",
  },
  {
    title: "Personal Training",
    description: "1-on-1 coaching tailored to your goals.",
    href: "/programs#personal",
    image: "/images/placeholders/program-4.svg",
  },
];

export const siteNavigation: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  {
    label: "Programs",
    href: "/programs",
    icon: Dumbbell,
    megaMenu: programsMegaMenu,
  },
  { label: "About", href: "/about", icon: Info },
  { label: "Pricing", href: "/pricing", icon: Tags },
  { label: "Gallery", href: "/gallery", icon: Images },
  { label: "Videos", href: "/videos", icon: Video },
  { label: "Events", href: "/events", icon: CalendarDays },
  { label: "Blog", href: "/blog", icon: Newspaper },
  { label: "Contact", href: "/contact", icon: Phone },
];

export const mainNavigation: NavItem[] = [
  { label: "Training", href: "#programs", icon: Dumbbell },
  { label: "Pricing", href: "#membership", icon: Tags },
  { label: "Events", href: "#events", icon: CalendarDays },
  { label: "Gallery", href: "#gallery", icon: Images },
  { label: "Stories", href: "#success-stories", icon: Newspaper },
  { label: "Contact", href: "#contact", icon: Phone },
];

export const footerNavigation = [
  {
    title: "Programs",
    links: [
      { label: "Training", href: "/programs" },
      { label: "Pricing", href: "/pricing" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Gallery", href: "/gallery" },
      { label: "Videos", href: "/videos" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Members",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Memberships", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const dashboardNavigation = [
  { label: "Overview", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Profile", href: "/dashboard/profile", icon: "User" },
  { label: "Membership", href: "/dashboard/membership", icon: "CreditCard" },
  { label: "Attendance", href: "/dashboard/attendance", icon: "CalendarCheck" },
  { label: "Bookings", href: "/dashboard/bookings", icon: "Calendar" },
  { label: "Invoices", href: "/dashboard/invoices", icon: "FileText" },
  { label: "Notifications", href: "/dashboard/notifications", icon: "Bell" },
  { label: "Settings", href: "/dashboard/settings", icon: "Settings" },
];

export const adminNavigation = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { label: "Events", href: "/admin/events", icon: "Calendar" },
  { label: "Gallery", href: "/admin/gallery", icon: "Images" },
  { label: "Media", href: "/admin/media", icon: "Video" },
  { label: "Posts", href: "/admin/posts", icon: "Newspaper" },
  { label: "Members", href: "/admin/members", icon: "Users" },
  { label: "Notifications", href: "/admin/notifications", icon: "Bell" },
  { label: "Emails", href: "/admin/emails", icon: "Mail" },
  { label: "Analytics", href: "/admin/analytics", icon: "BarChart3" },
  { label: "Settings", href: "/admin/settings", icon: "Settings" },
];
