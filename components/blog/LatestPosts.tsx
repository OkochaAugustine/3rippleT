"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

const posts = [
  {
    id: "1",
    title: "5 Mobility Exercises Every Athlete Should Do",
    excerpt: "Improve your range of motion and prevent injuries with these essential movements.",
    date: "July 10, 2026",
    readTime: "5 min read",
    category: "recovery",
    image: "/images/placeholders/gym-1.svg",
  },
  {
    id: "2",
    title: "Nutrition Basics for Strength Training",
    excerpt: "Fuel your workouts with the right nutrients for optimal performance and recovery.",
    date: "July 8, 2026",
    readTime: "7 min read",
    category: "nutrition",
    image: "/images/placeholders/gym-2.svg",
  },
  {
    id: "3",
    title: "Building Consistency in Your Training",
    excerpt: "Tips and strategies to stay consistent with your fitness routine long-term.",
    date: "July 5, 2026",
    readTime: "6 min read",
    category: "motivation",
    image: "/images/placeholders/gym-3.svg",
  },
  {
    id: "4",
    title: "The Benefits of Olympic Lifting",
    excerpt: "Why Olympic lifting should be part of your training program.",
    date: "July 3, 2026",
    readTime: "8 min read",
    category: "training",
    image: "/images/placeholders/gym-4.svg",
  },
  {
    id: "5",
    title: "Recovery Techniques for Faster Results",
    excerpt: "Maximize your recovery with these proven techniques.",
    date: "July 1, 2026",
    readTime: "5 min read",
    category: "recovery",
    image: "/images/placeholders/gym-5.svg",
  },
  {
    id: "6",
    title: "Setting Realistic Fitness Goals",
    excerpt: "How to set achievable goals that keep you motivated and on track.",
    date: "June 28, 2026",
    readTime: "6 min read",
    category: "motivation",
    image: "/images/placeholders/gym-6.svg",
  },
];

interface LatestPostsProps {
  selectedCategory: string;
}

export function LatestPosts({ selectedCategory }: LatestPostsProps) {
  const filteredPosts = selectedCategory === "all"
    ? posts
    : posts.filter((post) => post.category === selectedCategory);

  return (
    <Section className="bg-primary text-primary-foreground">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Heading as="h2" size="lg">
            Latest <span className="text-accent">Posts</span>
          </Heading>
        </motion.div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              <Link href={`/blog/${post.id}`} className="block">
                <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={250}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <div className="flex items-center gap-4 text-sm text-primary-foreground/58">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h3 className="mt-3 text-lg font-bold group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-primary-foreground/72 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-accent">
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" className="border-white/18 bg-white/8 text-white hover:bg-white/14">
            Load More Posts
          </Button>
        </div>
      </Container>
    </Section>
  );
}
