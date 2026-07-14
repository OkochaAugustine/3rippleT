"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, MapPin, Phone, MessageSquare, Clock } from "lucide-react";

import { siteConfig } from "@/constants/site";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      value: siteConfig.links.address,
    },
    {
      icon: Mail,
      title: "Email",
      value: siteConfig.links.email,
    },
    {
      icon: Phone,
      title: "Phone",
      value: siteConfig.links.phone,
    },
    {
      icon: Clock,
      title: "Hours",
      value: "Mon-Fri: 5AM-10PM\nSat-Sun: 7AM-6PM",
    },
  ];

  return (
    <Section ref={ref} id="contact">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.36em] text-accent">
              Get In Touch
            </p>
            <Heading as="h2" size="lg" className="mt-3">
              Contact Us
            </Heading>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Have questions? Ready to start your fitness journey? We are here to help.
            </p>

            <div className="mt-8 space-y-4">
              {contactInfo.map((info, i) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 shrink-0">
                      <Icon className="text-accent size-6" />
                    </div>
                    <div>
                      <p className="font-semibold">{info.title}</p>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">{info.value}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <Card className="p-6">
              <form className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full h-12 rounded-lg border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full h-12 rounded-lg border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full h-12 rounded-lg border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={5}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <Button className="w-full gap-2" size="lg">
                  Send Message
                  <MessageSquare className="size-5" />
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

