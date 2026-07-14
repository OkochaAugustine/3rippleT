import { AboutHero } from "@/components/about/AboutHero";
import { MissionVision } from "@/components/about/MissionVision";
import { OurStory } from "@/components/about/OurStory";
import { Timeline } from "@/components/about/Timeline";
import { MeetCoaches } from "@/components/about/MeetCoaches";
import { CoreValues } from "@/components/about/CoreValues";
import { Culture } from "@/components/about/Culture";
import { Facility } from "@/components/about/Facility";
import { Statistics } from "@/components/about/Statistics";
import { AboutCTA } from "@/components/about/AboutCTA";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MissionVision />
      <OurStory />
      <Timeline />
      <MeetCoaches />
      <CoreValues />
      <Culture />
      <Facility />
      <Statistics />
      <AboutCTA />
    </>
  );
}
