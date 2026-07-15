"use client";

import { motion } from "framer-motion";
import { KeyRound } from "lucide-react";
import { useState } from "react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send reset link");
      }

      setSuccess(data.message);
      setEmail("");
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "An error occurred. Please try again.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

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

          {error && (
            <div className="mt-6 p-4 rounded bg-red-500/20 text-red-300 text-sm font-medium border border-red-500/30 text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-6 p-4 rounded bg-green-500/20 text-green-300 text-sm font-medium border border-green-500/30 text-center">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2">
                Email
              </label>
              <input
                required
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 rounded-md border border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="your@email.com"
              />
            </div>
            <Button size="lg" className="w-full" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
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
