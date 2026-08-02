import { AboutHero } from "@/components/about/AboutHero";
import { MissionVision } from "@/components/about/MissionVision";
import { OurStory } from "@/components/about/OurStory";
import { Timeline } from "@/components/about/Timeline";
import { ImageGallery } from "@/components/about/ImageGallery";
import { Statistics } from "@/components/about/Statistics";
import { WhyPeopleJoin } from "@/components/about/WhyPeopleJoin";
import { MeetTheCommunity } from "@/components/about/MeetTheCommunity";
import { DeltaStateFitnessCarnival } from "@/components/about/DeltaStateFitnessCarnival";
import { AboutCTA } from "@/components/about/AboutCTA";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurStory />
      <Timeline />
      <ImageGallery />
      <Statistics />
      <MissionVision />
      <WhyPeopleJoin />
      <MeetTheCommunity />
      <DeltaStateFitnessCarnival />
      <AboutCTA />
    </>
  );
}
