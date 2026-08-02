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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
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
      const errMsg =
        err instanceof Error
          ? err.message
          : "An error occurred. Please try again.";

      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-md"
        >
          <div className="rounded-3xl border border-border/50 bg-card/60 backdrop-blur-xl p-8 shadow-2xl">
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15">
                <LogIn className="h-8 w-8 text-accent" />
              </div>
            </div>

            <Heading as="h1" size="xl" className="mt-6 text-center">
              Welcome Back
            </Heading>

            <p className="mt-3 text-center text-muted-foreground">
              Sign in to your account to access your dashboard.
            </p>

            {error && (
              <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-center text-sm font-medium text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold"
                >
                  Email
                </label>

                <input
                  required
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="h-12 w-full rounded-xl border border-border bg-card/70 px-4 text-foreground placeholder:text-muted-foreground backdrop-blur-md transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold"
                >
                  Password
                </label>

                <input
                  required
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-12 w-full rounded-xl border border-border bg-card/70 px-4 text-foreground placeholder:text-muted-foreground backdrop-blur-md transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded border-border bg-card"
                  />

                  <span className="text-sm text-muted-foreground">
                    Remember me
                  </span>
                </label>

                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-accent transition hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full"
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-medium text-accent transition hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}