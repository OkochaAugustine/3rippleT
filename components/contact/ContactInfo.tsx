"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Share2, MessageCircle } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/constants/site";

export function ContactInfo() {
  return (
    <Section className="bg-background">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Heading as="h2" size="lg">
            Contact <span className="text-accent">Information</span>
          </Heading>
        </motion.div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-center"
          >
            <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-lg bg-accent/20">
              <Phone className="h-6 w-6 text-accent" />
            </div>
            <h3 className="mt-4 font-bold">Phone</h3>
            <p className="mt-2 text-muted-foreground">{siteConfig.links.phone}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center"
          >
            <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-lg bg-accent/20">
              <Mail className="h-6 w-6 text-accent" />
            </div>
            <h3 className="mt-4 font-bold">Email</h3>
            <p className="mt-2 text-muted-foreground">{siteConfig.links.email}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center"
          >
            <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-lg bg-accent/20">
              <MapPin className="h-6 w-6 text-accent" />
            </div>
            <h3 className="mt-4 font-bold">Location</h3>
            <p className="mt-2 text-muted-foreground">{siteConfig.links.address}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center"
          >
            <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-lg bg-accent/20">
              <Share2 className="h-6 w-6 text-accent" />
            </div>
            <h3 className="mt-4 font-bold">Social</h3>
            <div className="mt-2 flex justify-center gap-2">
              <a href={siteConfig.links.instagram} className="text-muted-foreground hover:text-accent">
                <Share2 className="h-5 w-5" />
              </a>
              <a href={siteConfig.links.twitter} className="text-muted-foreground hover:text-accent">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
