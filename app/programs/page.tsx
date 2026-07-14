import { ProgramsHero } from "@/components/programs/ProgramsHero";
import { ProgramList } from "@/components/programs/ProgramList";
import { TrainingSchedule } from "@/components/programs/TrainingSchedule";
import { ProgramBenefits } from "@/components/programs/ProgramBenefits";
import { ProgramPricing } from "@/components/programs/ProgramPricing";
import { ProgramCoaches } from "@/components/programs/ProgramCoaches";
import { ProgramFAQ } from "@/components/programs/ProgramFAQ";
import { ProgramCTA } from "@/components/programs/ProgramCTA";

export default function ProgramsPage() {
  return (
    <>
      <ProgramsHero />
      <ProgramList />
      <TrainingSchedule />
      <ProgramBenefits />
      <ProgramPricing />
      <ProgramCoaches />
      <ProgramFAQ />
      <ProgramCTA />
    </>
  );
}
