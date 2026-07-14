import { Hero } from "@/components/sections/Hero";
import { MeetTim } from "@/components/sections/MeetTim";
import { About } from "@/components/sections/About";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { Membership } from "@/components/sections/Membership";
import { Testimonials } from "@/components/sections/Testimonials";
import { GallerySection } from "@/components/sections/GallerySection";
import { Videos } from "@/components/sections/Videos";
import { Events } from "@/components/sections/Events";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { FAQSection } from "@/components/sections/FAQSection";
import { Contact } from "@/components/sections/Contact";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MeetTim />
      <About />
      <ProgramsSection />
      <Membership />
      <Testimonials />
      <GallerySection />
      <Videos />
      <Events />
      <WhyChooseUs />
      <FAQSection />
      <Contact />
      <FinalCTA />
    </>
  );
}

