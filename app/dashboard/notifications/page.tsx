"use client";

import { motion } from "framer-motion";
import { Bell, Check } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export default function NotificationsPage() {
  return (
    <Section className="bg-background min-h-screen">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div>
            <Heading as="h1" size="xl">
              <span className="text-accent">Notifications</span>
            </Heading>
            <p className="mt-2 text-muted-foreground">
              Stay updated with important alerts and updates.
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Check className="h-5 w-5" />
            Mark All Read
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 space-y-4"
        >
          {[
            { title: "Class Reminder", message: "Olympic Lifting starts in 1 hour", time: "4 hours ago", unread: true },
            { title: "Payment Successful", message: "Your July payment has been processed", time: "1 day ago", unread: true },
            { title: "New Class Available", message: "Mobility Workshop added to schedule", time: "2 days ago", unread: false },
            { title: "Welcome to Premium", message: "Thank you for upgrading your membership", time: "1 week ago", unread: false },
            { title: "Achievement Unlocked", message: "You've completed 100 workouts!", time: "2 weeks ago", unread: false },
          ].map((notification, index) => (
            <div
              key={index}
              className={`rounded-lg border p-4 ${
                notification.unread
                  ? "border-accent bg-accent/5"
                  : "border-border bg-card"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  notification.unread ? "bg-accent/20" : "bg-muted"
                }`}>
                  <Bell className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{notification.title}</p>
                    <span className="text-sm text-muted-foreground">{notification.time}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
