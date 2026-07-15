/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Calendar, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const { user, updateUser, isAuthenticated } = useAuth();
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("1990-01-01");
  const [address, setAddress] = useState("123 Fitness Street, Gym City, GC 12345");
  const [bio, setBio] = useState("Fitness enthusiast working towards strength goals.");
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  if (!mounted) {
    return (
      <div className="py-24 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        Please log in to view profile settings.
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update profile");

      updateUser(data.user);
      setSuccess("Profile updated successfully!");
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "An error occurred updating profile";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section className="bg-background min-h-screen">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Heading as="h1" size="xl">
            Profile <span className="text-accent">Settings</span>
          </Heading>
          <p className="mt-2 text-muted-foreground">
            Manage your personal information and preferences.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 max-w-2xl"
        >
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-6">
              <div className="h-24 w-24 rounded-full bg-accent/20 flex items-center justify-center">
                <User className="h-12 w-12 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{user.name}</h3>
                <p className="text-muted-foreground capitalize">{user.membershipPlan || user.membership || "none"} Member</p>
                <Button size="sm" className="mt-2">
                  Change Photo
                </Button>
              </div>
            </div>

            {success && (
              <div className="mt-6 p-4 rounded bg-green-500/20 text-green-300 text-sm font-medium border border-green-500/30 text-center">
                {success}
              </div>
            )}

            {error && (
              <div className="mt-6 p-4 rounded bg-red-500/20 text-red-300 text-sm font-medium border border-red-500/30 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                    <User className="h-4 w-4" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-12 px-4 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </label>
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full h-12 px-4 rounded-md border border-border bg-background/50 text-muted-foreground cursor-not-allowed focus:outline-none"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                    <Phone className="h-4 w-4" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-12 px-4 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                    <Calendar className="h-4 w-4" />
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full h-12 px-4 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                  <MapPin className="h-4 w-4" />
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full h-12 px-4 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">Bio</label>
                <textarea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                />
              </div>
              <Button size="lg" type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
