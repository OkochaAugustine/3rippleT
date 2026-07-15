import { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const routes = [
    "",
    "/about",
    "/contact",
    "/events",
    "/gallery",
    "/videos",
    "/programs",
    "/pricing",
    "/blog",
    "/login",
    "/register",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
