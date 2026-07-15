/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { motion } from "framer-motion";
import { KeyRound } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validToken, setValidToken] = useState(true);

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (!tokenParam) {
      setValidToken(false);
      setError("Invalid or missing reset token");
    } else {
      setToken(tokenParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to reset password");
      }

      setSuccess("Password reset successfully! Redirecting to login...");
      
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "An error occurred. Please try again.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  if (!validToken) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-md text-center"
      >
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
            <KeyRound className="h-8 w-8 text-red-500" />
          </div>
        </div>
        <Heading as="h1" size="xl" className="mt-6 text-center">
          Invalid Link
        </Heading>
        <p className="mt-4 text-center text-primary-foreground/72">
          {error}
        </p>
        <div className="mt-6 text-center">
          <Link href="/forgot-password" className="text-sm text-accent hover:underline">
            Request a new reset link
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
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
        Enter your new password below.
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
          <label htmlFor="password" className="block text-sm font-semibold mb-2">
            New Password
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
        <Button size="lg" className="w-full" type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link href="/login" className="text-sm text-accent hover:underline">
          Back to Sign In
        </Link>
      </div>
    </motion.div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Section className="min-h-screen flex items-center justify-center bg-primary text-primary-foreground">
      <Container>
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <ResetPasswordContent />
        </Suspense>
      </Container>
    </Section>
  );
}
