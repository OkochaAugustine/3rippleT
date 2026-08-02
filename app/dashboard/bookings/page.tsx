"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, CreditCard, ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

type Booking = {
  id: string;
  className: string;
  date: string;
  time: string;
  status: string;
};

export default function BookingsPage() {
  const { user } = useAuth();
  const upcomingBookings: Booking[] = [];
  const pastBookings: Booking[] = [];

  // Check if membership is active
  const isMembershipActive = user?.membership && user?.membershipExpiry && new Date(user.membershipExpiry) > new Date();

  return (
    <Section className="bg-background min-h-screen">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <Heading as="h1" size="xl">
              Class <span className="text-accent">Bookings</span>
            </Heading>

            <p className="mt-2 text-muted-foreground">
              {isMembershipActive 
                ? "Book your preferred fitness classes here" 
                : "Purchase a membership package before booking your preferred class"}
            </p>
          </div>

          {isMembershipActive ? (
            <Button className="gap-2">
              <Calendar className="h-5 w-5" />
              Book a Class
            </Button>
          ) : (
            <Link href="/membership">
              <Button className="gap-2">
                <CreditCard className="h-5 w-5" />
                Purchase Membership
              </Button>
            </Link>
          )}
        </motion.div>

        {/* Membership CTA if not active */}
        {!isMembershipActive && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-10 rounded-2xl border border-border bg-card p-8"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="text-2xl font-bold">
                  Ready to start your fitness journey?
                </h3>

                <p className="mt-3 max-w-2xl text-muted-foreground">
                  Choose the membership package that fits your goals. Once payment
                  is completed, your membership will be activated automatically,
                  invoices generated, and you&apos;ll be able to reserve classes from
                  your dashboard.
                </p>
              </div>

              <Link href="/membership">
                <Button size="lg" className="gap-2">
                  View Membership Packages
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Upcoming Bookings */}
        {isMembershipActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 rounded-xl border border-border bg-card p-6"
          >
            <h3 className="mb-6 text-xl font-bold">
              Upcoming Bookings
            </h3>

            {upcomingBookings.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border py-14 text-center">
                <Calendar className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />

                <h4 className="text-lg font-semibold">
                  No upcoming bookings
                </h4>

                <p className="mt-2 text-muted-foreground">
                  Book your first class to get started!
                </p>

                <Button className="mt-6">
                  Book a Class
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingBookings.map((booking: { id: string; className: string; date: string; time: string }) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between rounded-xl bg-muted p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20">
                        <Calendar className="h-6 w-6 text-accent" />
                      </div>

                      <div>
                        <p className="font-semibold">
                          {booking.className}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {booking.date} • {booking.time}
                        </p>
                      </div>
                    </div>

                    <Button variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Past Bookings */}
        {isMembershipActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-8 rounded-xl border border-border bg-card p-6"
          >
            <h3 className="mb-6 text-xl font-bold">
              Booking History
            </h3>

            {pastBookings.length === 0 ? (
              <div className="py-10 text-center text-muted-foreground">
                Your completed classes will appear here after attendance.
              </div>
            ) : (
              <div className="space-y-4">
                {pastBookings.map((booking: { id: string; className: string; date: string; status: string }) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between border-b border-border py-4 last:border-none"
                  >
                    <div>
                      <p className="font-semibold">
                        {booking.className}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {booking.date}
                      </p>
                    </div>

                    <span
                      className={`font-semibold ${
                        booking.status === "Attended"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </Container>
    </Section>
  );
}
