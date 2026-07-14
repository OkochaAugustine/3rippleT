import { PageHero } from "@/components/ui/page-hero";

export function AboutHero() {
  return (
    <PageHero
      variant="about"
      layout="split"
      eyebrow="Our Story"
      title="Built on"
      highlight="Discipline & Community"
      description="From a single training room to a premium fitness destination — 3Ripple T Fitness exists to elevate how people train, recover, and belong."
      image="/images/placeholders/tim-portrait.svg"
      stats={[
        { value: "12+", label: "Years coaching" },
        { value: "500+", label: "Members transformed" },
      ]}
    />
  );
}
