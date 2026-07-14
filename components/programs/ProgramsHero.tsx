import { PageHero } from "@/components/ui/page-hero";

export function ProgramsHero() {
  return (
    <PageHero
      variant="programs"
      layout="split"
      eyebrow="Training Programs"
      title="Engineered for"
      highlight="Performance"
      description="World-class programs designed for beginners, competitors, and everyone in between. Each track is built on assessment, progression, and coach accountability."
      image="/images/placeholders/program-1.svg"
      cta={{ label: "View Schedule", href: "#schedule" }}
      stats={[
        { value: "4+", label: "Program tracks" },
        { value: "50+", label: "Weekly classes" },
      ]}
    />
  );
}
