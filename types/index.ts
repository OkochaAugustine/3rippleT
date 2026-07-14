import type React from "react";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  quote: string;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  popular?: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  archived?: boolean;
  maxAttendees?: number;
  registeredCount?: number;
  waitingListCount?: number;
  gallery?: string[];
  registrationOpen?: boolean;
}

export interface GalleryItem {
  id: string;
  image: string;
  alt: string;
  category?: string;
  isVideo?: boolean;

  // optional video file for gallery items
  video?: string;
}

export interface WhyChooseUsItem {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  image: string;
}

/* ===========================
   Training Videos
=========================== */

export interface TrainingVideo {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  focus: string;

  // image shown before playback
  thumbnail: string;

  // actual mp4 file
  video?: string;
}