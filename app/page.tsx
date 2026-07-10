import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/constants/site";

export default function HomePage() {
  return (
    <Section className="min-h-[72dvh] items-center justify-center pt-32">
      <Container className="flex flex-col items-center text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
          {siteConfig.name}
        </p>
        <h1 className="mt-4 font-display text-2xl font-black tracking-normal text-foreground">
          Foundation ready
        </h1>
      </Container>
    </Section>
  );
}
