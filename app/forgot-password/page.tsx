"use client";

import { motion } from "framer-motion";
import { KeyRound } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <Section className="min-h-screen flex items-center justify-center bg-primary text-primary-foreground">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-md"
        >
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
              <KeyRound className="h-8 w-8 text-accent" />
            </div>
          </div>
          <Heading as="h1" size="xl" className="mt-6 text-center">
            Reset Password
          </Heading>
          <p className="mt-4 text-center text-primary-foreground/72">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>

          <form className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full h-12 px-4 rounded-md border border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="your@email.com"
              />
            </div>
            <Button size="lg" className="w-full">
              Send Reset Link
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/login" className="text-sm text-accent hover:underline">
              Back to Sign In
            </Link>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
