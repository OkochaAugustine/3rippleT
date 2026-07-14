import { PageHero } from "@/components/ui/page-hero";

export function VideosHero() {
  return (
    <PageHero
      variant="videos"
      layout="split"
      eyebrow="Video Library"
      title="Train. Watch."
      highlight="Repeat."
      description="Featured sessions, coach breakdowns, member transformations, and event highlights — all in one cinematic library."
      image="/images/placeholders/video-placeholder.svg"
      cta={{ label: "Featured Video", href: "#featured" }}
    />
  );
}
