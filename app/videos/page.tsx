import { VideosHero } from "@/components/videos/VideosHero";
import { FeaturedVideo } from "@/components/videos/FeaturedVideo";
import { VideoCarousel } from "@/components/videos/VideoCarousel";
import { TrainingHighlights } from "@/components/videos/TrainingHighlights";
import { CoachVideos } from "@/components/videos/CoachVideos";
import { MemberStories } from "@/components/videos/MemberStories";
import { VideosCTA } from "@/components/videos/VideosCTA";

export default function VideosPage() {
  return (
    <>
      <VideosHero />
      <FeaturedVideo />
      <VideoCarousel />
      <TrainingHighlights />
      <CoachVideos />
      <MemberStories />
      <VideosCTA />
    </>
  );
}
