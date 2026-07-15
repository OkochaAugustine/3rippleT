"use client";

import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Store in Zustand
      login(data.user);

      // Check verification status
      if (!data.user.isVerified) {
        router.push(`/verify?email=${encodeURIComponent(data.user.email)}`);
        return;
      }

      // Redirect based on role
      if (data.user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
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
              <LogIn className="h-8 w-8 text-accent" />
            </div>
          </div>
          <Heading as="h1" size="xl" className="mt-6 text-center">
            Welcome Back
          </Heading>
          <p className="mt-4 text-center text-primary-foreground/72">
            Sign in to your account to access your dashboard.
          </p>

          {error && (
            <div className="mt-6 p-4 rounded bg-red-500/20 text-red-300 text-sm font-medium border border-red-500/30 text-center">
              {error}
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
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-white/20 bg-white/10" />
                <span className="text-sm text-primary-foreground/72">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-accent hover:underline">
                Forgot password?
              </Link>
            </div>
            <Button size="lg" className="w-full" type="submit" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-primary-foreground/72">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-accent hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
