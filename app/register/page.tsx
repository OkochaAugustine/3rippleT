/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [membership, setMembership] = useState("none");

  useEffect(() => {
    const plan = searchParams.get("plan");
    if (plan) {
      setMembership(plan.toLowerCase());
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (!agreed) {
      setError("You must agree to the Terms of Service and Privacy Policy");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
          membership,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Store in Zustand
      login(data.user);

      // Redirect to email verification
      router.push(`/verify?email=${encodeURIComponent(data.user.email)}`);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "An error occurred during registration. Please try again.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-md"
    >
      <div className="flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
          <UserPlus className="h-8 w-8 text-accent" />
        </div>
      </div>
      <Heading as="h1" size="xl" className="mt-6 text-center">
        Create Account
      </Heading>
      <p className="mt-4 text-center text-primary-foreground/72">
        Join 3Ripple T Fitness and start your journey today.
      </p>

      {error && (
        <div className="mt-6 p-4 rounded bg-red-500/20 text-red-300 text-sm font-medium border border-red-500/30 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold mb-2">
            Full Name
          </label>
          <input
            required
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-12 px-4 rounded-md border border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="John Doe"
          />
        </div>
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
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full h-12 px-4 rounded-md border border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="+234 801 234 5678"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-semibold mb-2">
            Password
          </label>
          <input
            required
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 px-4 rounded-md border border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="••••••••"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2">
            Confirm Password
          </label>
          <input
            required
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full h-12 px-4 rounded-md border border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="••••••••"
          />
        </div>
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 rounded border-white/20 bg-white/10"
          />
          <span className="text-sm text-primary-foreground/72">
            I agree to the{" "}
            <Link href="#" className="text-accent hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-accent hover:underline">
              Privacy Policy
            </Link>
          </span>
        </div>
        <Button size="lg" className="w-full" type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-primary-foreground/72">
          Already have an account?{" "}
          <Link href="/login" className="text-accent hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

export default function RegisterPage() {
  return (
    <Section className="min-h-screen flex items-center justify-center bg-primary text-primary-foreground">
      <Container>
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <RegisterContent />
        </Suspense>
      </Container>
    </Section>
  );
}
