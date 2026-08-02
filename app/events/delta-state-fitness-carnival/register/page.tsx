"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { User, Phone, Shield, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { EVENT_CONFIG } from "@/constants/event-config";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";

const registrationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  dateOfBirth: z.string().refine((val) => {
    const date = new Date(val);
    const now = new Date();
    const age = now.getFullYear() - date.getFullYear();
    return age >= 18;
  }, "You must be at least 18 years old"),
  gender: z.enum(["male", "female", "other"]),
  location: z.string().min(2, "Location must be at least 2 characters"),
  fitnessExperience: z.enum(["beginner", "intermediate", "advanced"]),
  emergencyContactName: z.string().min(2, "Emergency contact name is required"),
  emergencyContactPhone: z.string().min(10, "Emergency contact phone must be at least 10 characters"),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export default function RegistrationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationCode, setRegistrationCode] = useState<string | null>(null);
  const [capacityReached, setCapacityReached] = useState(false);
  const [registrationCount, setRegistrationCount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  useEffect(() => {
    // Check capacity on mount
    if (EVENT_CONFIG.MAX_CAPACITY !== null) {
      fetch("/api/events/delta-state-fitness-carnival/register")
        .then((res) => res.json())
        .then((data) => {
          setRegistrationCount(data.registrationCount || 0);
          setCapacityReached(data.registrationCount >= EVENT_CONFIG.MAX_CAPACITY);
        })
        .catch(console.error);
    }
  }, []);

  const onSubmit = async (data: RegistrationFormData) => {
    if (capacityReached) {
      toast.error("Registration is closed - event capacity reached");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/events/delta-state-fitness-carnival/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }

      setRegistrationCode(result.registrationCode);
      toast.success("Registration successful!");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (capacityReached) {
    return (
      <Section className="min-h-screen flex items-center justify-center bg-black py-20">
        <Container className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="text-6xl mb-6"
            >
              🔒
            </motion.div>
            <Heading as="h1" size="xl" className="text-4xl md:text-5xl font-black text-white mb-4">
              REGISTRATION CLOSED
            </Heading>
            <p className="text-xl text-white/80 mb-8">
              Event capacity has been reached. We can&apos;t wait to see you at the carnival!
            </p>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 mb-8 backdrop-blur-sm">
              <p className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-2">
                Registration Status
              </p>
              <p className="text-3xl font-black text-accent tracking-wider mb-2">
                {registrationCount} / {EVENT_CONFIG.MAX_CAPACITY}
              </p>
              <p className="text-sm text-white/60">Registered</p>
            </div>

            <Button
              asChild
              className="w-full bg-accent text-accent-foreground font-bold"
            >
              <a href="/events/delta-state-fitness-carnival">Back to Event Page</a>
            </Button>
          </motion.div>
        </Container>
      </Section>
    );
  }

  if (registrationCode) {
    return (
      <Section className="min-h-screen flex items-center justify-center bg-black py-20">
        <Container className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="text-6xl mb-6"
            >
              🎉
            </motion.div>
            <Heading as="h1" size="xl" className="text-4xl md:text-5xl font-black text-white mb-4">
              YOU&apos;RE IN!
            </Heading>
            <p className="text-xl text-white/80 mb-8">
              Your Delta State Fitness Carnival registration is confirmed.
            </p>

            <div className="rounded-2xl border border-accent/50 bg-accent/10 p-8 mb-8 backdrop-blur-sm">
              <p className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-2">
                Registration Code
              </p>
              <p className="text-4xl font-black text-accent tracking-wider mb-4">
                {registrationCode}
              </p>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(registrationCode);
                  toast.success("Code copied to clipboard!");
                }}
                variant="outline"
                className="w-full"
              >
                Copy Code
              </Button>
            </div>

            <div className="text-left rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="font-bold text-white mb-4">Event Details</h3>
              <div className="space-y-2 text-sm text-white/70">
                <p><strong>Date:</strong> {EVENT_CONFIG.EVENT_DETAILS.date}</p>
                <p><strong>Time:</strong> {EVENT_CONFIG.EVENT_DETAILS.time}</p>
                <p><strong>Venue:</strong> {EVENT_CONFIG.EVENT_DETAILS.venue}</p>
                <p><strong>Location:</strong> {EVENT_CONFIG.EVENT_DETAILS.location}</p>
              </div>
            </div>

            <Button
              asChild
              className="mt-8 w-full bg-accent text-accent-foreground font-bold"
            >
              <a href="/events/delta-state-fitness-carnival">Back to Event Page</a>
            </Button>
          </motion.div>
        </Container>
      </Section>
    );
  }

  return (
    <Section className="min-h-screen bg-black py-20">
      <Container className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Heading as="h1" size="xl" className="text-4xl md:text-5xl font-black text-white mb-4">
            REGISTER FOR THE
          </Heading>
          <Heading as="h2" size="lg" className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-500 mb-4">
            DELTA STATE FITNESS CARNIVAL
          </Heading>
          <p className="text-white/60 mb-8">
            Fill out the form below to secure your spot at the carnival
          </p>

          {EVENT_CONFIG.MAX_CAPACITY && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-accent/30 bg-accent/10 p-4 mb-8 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white">Registration Capacity</span>
                <span className="text-accent font-black">{registrationCount} / {EVENT_CONFIG.MAX_CAPACITY}</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(registrationCount / EVENT_CONFIG.MAX_CAPACITY) * 100}%` }}
                  className="h-full bg-accent"
                />
              </div>
            </motion.div>
          )}
        </motion.div>

        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
          {/* Personal Information */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-accent" />
              Personal Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Full Name *
                </label>
                <input
                  {...register("fullName")}
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/40 focus:border-accent focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-400">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Email Address *
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/40 focus:border-accent focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Phone Number *
                </label>
                <input
                  {...register("phone")}
                  type="tel"
                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/40 focus:border-accent focus:outline-none transition-colors"
                  placeholder="+234 XXX XXX XXXX"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Date of Birth *
                </label>
                <input
                  {...register("dateOfBirth")}
                  type="date"
                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white focus:border-accent focus:outline-none transition-colors"
                />
                {errors.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-400">{errors.dateOfBirth.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Gender *
                </label>
                <select
                  {...register("gender")}
                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white focus:border-accent focus:outline-none transition-colors"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-400">{errors.gender.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Location *
                </label>
                <input
                  {...register("location")}
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/40 focus:border-accent focus:outline-none transition-colors"
                  placeholder="City, State"
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-400">{errors.location.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Fitness Information */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent" />
              Fitness Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Fitness Experience *
                </label>
                <select
                  {...register("fitnessExperience")}
                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white focus:border-accent focus:outline-none transition-colors"
                >
                  <option value="">Select experience level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                {errors.fitnessExperience && (
                  <p className="mt-1 text-sm text-red-400">{errors.fitnessExperience.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-accent" />
              Emergency Contact
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Emergency Contact Name *
                </label>
                <input
                  {...register("emergencyContactName")}
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/40 focus:border-accent focus:outline-none transition-colors"
                  placeholder="Full name"
                />
                {errors.emergencyContactName && (
                  <p className="mt-1 text-sm text-red-400">{errors.emergencyContactName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Emergency Contact Phone *
                </label>
                <input
                  {...register("emergencyContactPhone")}
                  type="tel"
                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/40 focus:border-accent focus:outline-none transition-colors"
                  placeholder="+234 XXX XXX XXXX"
                />
                {errors.emergencyContactPhone && (
                  <p className="mt-1 text-sm text-red-400">{errors.emergencyContactPhone.message}</p>
                )}
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent text-accent-foreground font-bold py-4 text-lg shadow-[0_0_40px_-8px_var(--color-accent)] hover:shadow-[0_0_60px_-4px_var(--color-accent)] transition-all"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Registering...
              </>
            ) : (
              "Complete Registration"
            )}
          </Button>
        </motion.form>
      </Container>
    </Section>
  );
}

