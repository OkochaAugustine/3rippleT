"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "all", label: "All Posts" },
  { id: "training", label: "Training" },
  { id: "nutrition", label: "Nutrition" },
  { id: "recovery", label: "Recovery" },
  { id: "motivation", label: "Motivation" },
];

interface BlogCategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function BlogCategories({ selectedCategory, onCategoryChange }: BlogCategoriesProps) {
  return (
    <div className="border-b border-border bg-background">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap gap-2 py-6 justify-center"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "primary" : "ghost"}
              onClick={() => onCategoryChange(category.id)}
            >
              {category.label}
            </Button>
          ))}
        </motion.div>
      </Container>
    </div>
  );
}
