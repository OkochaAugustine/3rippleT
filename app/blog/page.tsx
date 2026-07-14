"use client";

import { useState } from "react";

import { BlogHero } from "@/components/blog/BlogHero";
import { BlogCategories } from "@/components/blog/BlogCategories";
import { FeaturedArticle } from "@/components/blog/FeaturedArticle";
import { LatestPosts } from "@/components/blog/LatestPosts";
import { BlogNewsletter } from "@/components/blog/BlogNewsletter";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <>
      <BlogHero />
      <BlogCategories
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <FeaturedArticle />
      <LatestPosts selectedCategory={selectedCategory} />
      <BlogNewsletter />
    </>
  );
}
