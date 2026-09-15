import { EventHero } from "@/components/events/EventHero";
import { CarnivalVideo } from "@/components/events/CarnivalVideo";
import { CarnivalIntro } from "@/components/events/CarnivalIntro";
import { CarnivalEnergy } from "@/components/events/CarnivalEnergy";
import { CarnivalCommunity } from "@/components/events/CarnivalCommunity";
import { CarnivalArchive } from "@/components/events/CarnivalArchive";
import { CarnivalExpect } from "@/components/events/CarnivalExpect";
import { CarnivalChallenges } from "@/components/events/CarnivalChallenges";
import { CarnivalGallery } from "@/components/events/CarnivalGallery";
import { CarnivalCTA } from "@/components/events/CarnivalCTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delta State Fitness Carnival With Tim | 3Ripple T Fitness",
  description: "Join the ultimate fitness experience - Delta State Fitness Carnival with Tim. Train, compete, connect, and celebrate!",
};

export default function DeltaStateFitnessCarnivalPage() {
  return (
    <main>
      <EventHero />
      <CarnivalVideo />
      <CarnivalIntro />
      <CarnivalEnergy />
      <CarnivalCommunity />
      <CarnivalArchive />
      <CarnivalExpect />
      <CarnivalChallenges />
      <CarnivalGallery />
      <CarnivalCTA />
    </main>
  );
}
