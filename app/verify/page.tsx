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
import { useAuth } from "@/hooks/useAuth";

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, updateUser } = useAuth();
  
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    } else if (user?.email) {
      setEmail(user.email);
    }
  }, [searchParams, user]);

  useEffect(() => {
    if (user?.isVerified || user?.verificationStatus === "verified") {
      setSuccess("Account is already verified! Redirecting...");
      const redirectTimer = setTimeout(() => {
        if (user.role === "ADMIN" || user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      }, 1500);
      return () => clearTimeout(redirectTimer);
    }
  }, [user, router]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (code.length < 6) {
      setError("Please enter a valid 6-digit code");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Verification failed");
      }

      setSuccess("Account verified successfully! Redirecting...");
      
      // Update store state
      updateUser({
        isVerified: true,
        verificationStatus: "verified",
      });

      // Redirect user after short delay
      setTimeout(() => {
        if (user?.role === "ADMIN" || data.user?.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      }, 1500);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Invalid or expired code";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;

    setResendLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to resend code");
      }

      setSuccess("New verification code sent!");
      setCountdown(60); // 60 second countdown
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Failed to resend code";
      setError(errMsg);
    } finally {
      setResendLoading(false);
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
          <KeyRound className="h-8 w-8 text-accent" />
        </div>
      </div>
      <Heading as="h1" size="xl" className="mt-6 text-center">
        Verify Account
      </Heading>
      <p className="mt-4 text-center text-primary-foreground/72">
        We sent a 6-digit verification code to <span className="font-semibold text-white">{email}</span>.
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
          <label htmlFor="code" className="block text-sm font-semibold mb-2">
            Verification Code
          </label>
          <input
            required
            type="text"
            id="code"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            className="w-full h-12 px-4 text-center text-xl font-bold tracking-[8px] rounded-md border border-white/20 bg-white/10 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="123456"
          />
        </div>
        <Button size="lg" className="w-full" type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify Code"}
        </Button>
      </form>

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={handleResend}
          disabled={resendLoading || countdown > 0}
          className="text-sm text-accent hover:underline disabled:text-muted-foreground disabled:no-underline disabled:cursor-not-allowed"
        >
          {resendLoading
            ? "Sending..."
            : countdown > 0
            ? `Resend Code (${countdown}s)`
            : "Resend Code"}
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-primary-foreground/72">
          Wrong email address?{" "}
          <Link href="/register" className="text-accent hover:underline">
            Register again
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

export default function VerifyPage() {
  return (
    <Section className="min-h-screen flex items-center justify-center bg-primary text-primary-foreground">
      <Container>
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <VerifyContent />
        </Suspense>
      </Container>
    </Section>
  );
}
