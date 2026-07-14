import { EventsHero } from "@/components/events/EventsHero";
import { UpcomingEvents } from "@/components/events/UpcomingEvents";
import { PastEvents } from "@/components/events/PastEvents";
import { EventCalendar } from "@/components/events/EventCalendar";
import { EventRegistration } from "@/components/events/EventRegistration";
import { EventsCTA } from "@/components/events/EventsCTA";

export default function EventsPage() {
  return (
    <>
      <EventsHero />
      <UpcomingEvents />
      <PastEvents />
      <EventCalendar />
      <EventRegistration />
      <EventsCTA />
    </>
  );
}
