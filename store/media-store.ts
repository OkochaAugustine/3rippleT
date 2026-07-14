import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GalleryItem } from "@/types";

type MediaStore = {
  media: GalleryItem[];
  addMedia: (item: Omit<GalleryItem, "id">) => void;
  deleteMedia: (id: string) => void;
};

const initialMedia: GalleryItem[] = [
  { id: "1", image: "/images/gallary1.jpg", alt: "Gym interior", category: "Facility" },
  { id: "2", image: "/images/gallary3.jpg", alt: "Group training", category: "Classes" },
  { id: "3", image: "/images/gallaryy.jpg", alt: "Strength training", category: "Training" },
  { id: "4", image: "/images/gallary4.jpg", alt: "Personal training", category: "Personal Training" },
  { id: "5", image: "/images/gallary5.jpg", alt: "Box jump", category: "Training" },
  { id: "6", image: "/images/hero1.PNG", alt: "Deadlift", category: "Training" },
];

export const useMediaStore = create<MediaStore>()(
  persist(
    (set) => ({
      media: initialMedia,
      addMedia: (item) =>
        set((state) => ({
          media: [
            ...state.media,
            { ...item, id: crypto.randomUUID() },
          ],
        })),
      deleteMedia: (id) =>
        set((state) => ({
          media: state.media.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "3ripplet-media",
    }
  )
);
