"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CreditCard, Calendar, ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function MembershipPage() {
  const { user } = useAuth();

  // Check if membership is active
  const isMembershipActive = user?.membership && user?.membershipExpiry && new Date(user.membershipExpiry) > new Date();
  const membershipStatus = isMembershipActive ? "Active" : "Inactive";

  if (!user) {
    return (
      <Section className="bg-background min-h-screen">
        <Container>
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-64 bg-muted rounded" />
            <div className="h-48 bg-muted rounded-lg" />
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section className="bg-background min-h-screen">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Heading as="h1" size="xl">
            Membership <span className="text-accent">Details</span>
          </Heading>
          <p className="mt-2 text-muted-foreground">
            View and manage your membership plan.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 space-y-6"
        >
          {/* Membership Info */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <h3 className="text-2xl font-bold">
                  {user?.membershipPlan || "No Membership"}
                </h3>
                <p className="mt-1 text-muted-foreground">
                  {isMembershipActive ? (
                    "Your membership is currently active"
                  ) : (
                    "You don't have an active membership yet"
                  )}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      isMembershipActive
                        ? "bg-green-500/20 text-green-500"
                        : "bg-gray-500/20 text-gray-500"
                    }`}
                  >
                    {membershipStatus}
                  </span>
                  {user?.membershipExpiry && (
                    <span className="text-sm text-muted-foreground">
                      Expires {new Date(user.membershipExpiry).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              {!isMembershipActive ? (
                <Link href="/membership">
                  <Button className="gap-2">
                    Purchase Membership
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <Link href="/membership">
                  <Button variant="outline" className="gap-2">
                    Upgrade Plan
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Billing & Payment History (if no active membership, show CTA) */}
          {isMembershipActive ? (
            <>
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-lg font-bold mb-4">Billing Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold">Credit Card (Paystack)</p>
                        <p className="text-sm text-muted-foreground">Managed via Paystack</p>
                      </div>
                    </div>
                  </div>
                  {user?.membershipExpiry && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-semibold">Next billing date</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(user.membershipExpiry).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-border bg-card p-8">
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
            </div>
          )}

          {/* Link to Invoices */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">Payment History & Invoices</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  View all your invoices and download receipts
                </p>
              </div>
              <Link href="/dashboard/invoices">
                <Button variant="outline" className="gap-2">
                  View Invoices
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
