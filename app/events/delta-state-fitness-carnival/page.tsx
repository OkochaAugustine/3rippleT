import { EventHero } from "@/components/events/EventHero";
import { EventInfo } from "@/components/events/EventInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delta State Fitness Carnival With Tim | 3Ripple T Fitness",
  description: "Join the ultimate fitness experience - Delta State Fitness Carnival with Tim. Train, compete, connect, and celebrate!",
};

export default function DeltaStateFitnessCarnivalPage() {
  return (
    <main>
      <EventHero />
      <EventInfo />
    </main>
  );
}
