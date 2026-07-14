import { PageHero } from "@/components/ui/page-hero";

export function ContactHero() {
  return (
    <PageHero
      variant="contact"
      layout="split"
      eyebrow="Reach Out"
      title="Let's Start"
      highlight="Your Journey"
      description="Questions about membership, programs, or scheduling? Our team responds within 24 hours. Lagos, Nigeria."
      image="/images/placeholders/gym-6.svg"
      cta={{ label: "Send Message", href: "#form" }}
    />
  );
}
