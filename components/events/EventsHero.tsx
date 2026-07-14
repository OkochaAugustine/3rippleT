import { PageHero } from "@/components/ui/page-hero";

export function EventsHero() {
  return (
    <PageHero
      variant="events"
      layout="diagonal"
      eyebrow="Community Events"
      title="Compete."
      highlight="Connect. Celebrate."
      description="Throwdowns, seminars, and community gatherings — register early or join the waiting list when spots fill up."
      image="/images/placeholders/event-1.svg"
      cta={{ label: "Upcoming Events", href: "#upcoming" }}
    />
  );
}
