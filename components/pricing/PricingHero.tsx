import { PageHero } from "@/components/ui/page-hero";

export function PricingHero() {
  return (
    <PageHero
      variant="pricing"
      layout="diagonal"
      eyebrow="Membership"
      title="Invest in"
      highlight="Your Best Self"
      description="Flexible plans priced in NGN. From daily drop-ins to full monthly membership — choose what fits your commitment level."
      image="/images/placeholders/gym-4.svg"
      cta={{ label: "Compare Plans", href: "#plans" }}
      stats={[
        { value: "₦3,000", label: "Daily pass" },
        { value: "₦20,000", label: "Monthly" },
      ]}
    />
  );
}
