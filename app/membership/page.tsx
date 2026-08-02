"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, animate } from "framer-motion";
import {
  Check,
  ArrowRight,
  Loader2,
  CreditCard,
  Calendar,
  User,
  Mail,
  Phone,
  Sparkles,
  ShieldCheck,
  Lock,
  Flame,
  Tag,
  BadgeCheck,
  Minus,
} from "lucide-react";
import { toast } from "sonner";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Heading } from "@/components/ui/heading";
import { categories } from "@/data/categories";
import { formatNGN } from "@/lib/payments";
import { useAuth } from "@/hooks/useAuth";
import type { FitnessCategory, MembershipPackage } from "@/types";

// Zod Schema for Checkout Form
const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  startDate: z.string().min(1, "Start date is required"),
  notes: z.string().optional(),
  promoCode: z.string().optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms to continue",
  }),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

type BillingCycle = "monthly" | "yearly";

// Real, transparent math — 2 months free when paying yearly. Not a data
// field, just price * 10 computed at render time, so what's shown is
// exactly what gets charged.
const YEARLY_MULTIPLIER = 10;

function getBillingAmount(price: number, cycle: BillingCycle) {
  return cycle === "yearly" ? price * YEARLY_MULTIPLIER : price;
}

// Animated count-up for the hero stat strip — counts real numbers derived
// from the actual categories/packages data, nothing fabricated.
function StatCounter({ value, label }: { value: number; label: string }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [value]);

  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-3xl font-black text-white sm:text-4xl">
        {display}
        <span className="text-accent">+</span>
      </span>
      <span className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
        {label}
      </span>
    </div>
  );
}

export default function MembershipPage() {
  const router = useRouter();
  const { user, isAuthenticated, updateUser } = useAuth();

  // State for selected plan
  const [selectedCategory, setSelectedCategory] = useState<FitnessCategory | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<MembershipPackage | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      startDate: new Date().toISOString().split("T")[0],
      notes: "",
      promoCode: "",
      agreeToTerms: false,
    },
  });

  const agreeToTerms = useWatch({
    control,
    name: "agreeToTerms",
    defaultValue: false,
  });

  // Total categories / packages — real counts from the actual data, used
  // for the hero stat strip instead of invented marketing numbers.
  const totalPackages = useMemo(
    () => categories.reduce((sum, c) => sum + c.packages.length, 0),
    []
  );

  // Union of every feature across the selected category's packages, so the
  // comparison table below is built entirely from real package data.
  const comparisonFeatures = useMemo(() => {
    if (!selectedCategory) return [];
    const set = new Set<string>();
    selectedCategory.packages.forEach((pkg) => pkg.features.forEach((f) => set.add(f)));
    return Array.from(set);
  }, [selectedCategory]);

  const checkoutAmount = selectedPackage
    ? getBillingAmount(selectedPackage.price, billingCycle)
    : 0;

  // Handle selecting a package and opening checkout
  const handleSelectPackage = (category: FitnessCategory, pkg: MembershipPackage) => {
    setSelectedCategory(category);
    setSelectedPackage(pkg);
    setCheckoutOpen(true);
    if (user?.name) setValue("fullName", user.name);
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
  };

  // Handle checkout submission and payment
  const onSubmitCheckout = useCallback(async (data: CheckoutFormData) => {
    if (!selectedPackage || !selectedCategory) return;

    if (!isAuthenticated || !user) {
      toast.error("Please log in to purchase membership");
      router.push("/login?redirect=/membership");
      return;
    }

    const amount = getBillingAmount(selectedPackage.price, billingCycle);

    setIsProcessing(true);
    try {
      // Step 1: Create invoice
      const invoiceResponse = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          planId: selectedPackage.id,
          planName: `${selectedCategory.name} - ${selectedPackage.name} (${billingCycle})`,
          dueDate: data.startDate,
        }),
      });

      if (!invoiceResponse.ok) {
        const errorData = await invoiceResponse.json();
        throw new Error(errorData.error || "Failed to create invoice");
      }

      const { invoice } = await invoiceResponse.json();

      // Step 2: Initialize Paystack
      const paystackModule = await import("@paystack/inline-js");
      const PaystackInline = paystackModule.default;
      const paystack = new PaystackInline();
      const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_dummy_key";

      paystack.callback(async (response: { reference: string }) => {
        try {
          const successResponse = await fetch("/api/payments/success", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              invoiceId: invoice.invoiceId,
              paymentProvider: "paystack",
              paymentReference: response.reference,
              receiptUrl: `https://dashboard.paystack.com/#/receipts/${response.reference}`,
            }),
          });

          if (!successResponse.ok) {
            throw new Error("Failed to confirm payment");
          }

          const successData = await successResponse.json();
          updateUser({
            membership: successData.user.membership,
            membershipPlan: successData.user.membershipPlan,
            membershipExpiry: successData.user.membershipExpiry,
          });

          toast.success("Payment successful! Your membership is now active");
          setCheckoutOpen(false);
          router.push("/dashboard/membership");
        } catch (err) {
          console.error("Payment success error:", err);
          toast.error("Payment confirmed, but failed to activate membership. Please contact support.");
          setCheckoutOpen(false);
          router.push("/dashboard/membership");
        } finally {
          setIsProcessing(false);
        }
      });

      paystack.onClose(() => {
        toast.info("Payment cancelled");
        setIsProcessing(false);
      });

      paystack.newTransaction({
        key: publicKey,
        email: data.email,
        amount: amount * 100, // Paystack uses kobo
        reference: invoice.invoiceId,
        metadata: {
          fullName: data.fullName,
          phone: data.phone,
          userId: user.id,
          planId: selectedPackage.id,
          planName: `${selectedCategory.name} - ${selectedPackage.name}`,
          billingCycle,
          promoCode: data.promoCode || undefined,
          notes: data.notes,
        },
        currency: "NGN",
      });
    } catch (error: unknown) {
      console.error("Checkout error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to proceed with checkout");
      setIsProcessing(false);
    }
  }, [selectedCategory, selectedPackage, user, isAuthenticated, router, updateUser, billingCycle]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Ambient glow + faint grid — same material language as the rest of the site */}
      <div
        className="pointer-events-none absolute -top-40 right-0 size-[36rem] rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-[40rem] -left-32 size-[28rem] rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      {/* Hero Section */}
      <div className="relative pt-32 pb-16 sm:pt-40">
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent sm:text-sm"
            >
              <Sparkles className="size-4" />
              Premium fitness foundation
            </motion.div>

            <Heading
              as="h1"
              size="xl"
              className="text-4xl font-black leading-tight md:text-6xl lg:text-7xl"
            >
              <span className="bg-gradient-to-r from-white via-white to-accent bg-clip-text text-transparent">
                Elevate Your
              </span>
              <br />
              <span className="text-accent">Training Standard</span>
            </Heading>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
              World-class coaching, premium facilities, and elite programs — built for
              people serious about their progress.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-10 sm:gap-16"
            >
              <StatCounter value={categories.length} label="Training paths" />
              <StatCounter value={totalPackages} label="Membership tiers" />
              <div className="flex flex-col items-center">
                <span className="flex items-center gap-1.5 font-display text-3xl font-black text-white sm:text-4xl">
                  <ShieldCheck className="size-7 text-accent" />
                </span>
                <span className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  Secure checkout
                </span>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </div>

      {/* Membership Categories Section */}
      <Section className="relative py-16 sm:py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-12 max-w-2xl text-center sm:mb-16"
          >
            <Heading as="h2" size="xl" className="!text-white">
              Choose Your Fitness Path
            </Heading>
            <p className="mt-3 text-white/60">
              Every path leads to a program built around how you actually want to train.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
              >
                <Card
                  className={`group relative h-full cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 ${
                    selectedCategory?.id === category.id
                      ? "border-accent/60 shadow-[0_0_0_1px_var(--color-accent),0_20px_60px_-15px_var(--color-accent)]"
                      : "border-white/10 bg-white/[0.03] hover:border-accent/40 hover:shadow-[0_20px_60px_-15px_var(--color-accent)]"
                  } backdrop-blur-sm`}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCheckoutOpen(false);
                  }}
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
                    <span className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-[0_0_25px_-4px_var(--color-accent)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                      <Sparkles className="size-4" />
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white transition-colors group-hover:text-accent">
                      {category.name}
                    </h3>
                    <p className="mt-2 text-sm text-white/60">{category.description}</p>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-lg font-bold text-accent">
                        {formatNGN(category.startingPrice)}
                        <span className="text-xs font-normal text-white/50"> /month</span>
                      </span>
                      <Button
                        variant="primary"
                        className="gap-1.5 px-4 py-2 text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCategory(category);
                          setCheckoutOpen(false);
                        }}
                      >
                        Explore
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Category Packages */}
      <AnimatePresence mode="wait">
        {selectedCategory && !checkoutOpen && (
          <motion.div
            key={selectedCategory.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Section className="relative py-16 sm:py-20">
              <Container>
                <div className="mb-10 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <Heading as="h2" size="xl" className="!text-white">
                      {selectedCategory.name} Packages
                    </Heading>
                    <p className="mt-2 text-white/60">
                      Pick the tier that matches your training intensity.
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => setSelectedCategory(null)}>
                    ← Back to Categories
                  </Button>
                </div>

                {/* Billing cycle toggle */}
                <div className="mb-10 flex justify-center">
                  <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
                    {(["monthly", "yearly"] as BillingCycle[]).map((cycle) => (
                      <button
                        key={cycle}
                        type="button"
                        onClick={() => setBillingCycle(cycle)}
                        className={`relative rounded-full px-5 py-2 text-sm font-semibold capitalize transition-colors ${
                          billingCycle === cycle ? "text-black" : "text-white/60 hover:text-white"
                        }`}
                      >
                        {billingCycle === cycle && (
                          <motion.span
                            layoutId="billingPill"
                            className="absolute inset-0 rounded-full bg-accent"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">
                          {cycle}
                          {cycle === "yearly" && (
                            <span className="ml-1.5 text-[10px] font-bold">
                              (2 months free)
                            </span>
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
                  {selectedCategory.packages.map((pkg, index) => {
                    const amount = getBillingAmount(pkg.price, billingCycle);
                    return (
                      <motion.div
                        key={pkg.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ y: -8 }}
                        className="h-full"
                      >
                        <Card
                          className={`relative flex h-full flex-col overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
                            pkg.popular
                              ? "border-accent/60 bg-white/[0.05] shadow-[0_0_0_1px_var(--color-accent),0_25px_70px_-20px_var(--color-accent)]"
                              : "border-white/10 bg-white/[0.03] hover:border-accent/30"
                          }`}
                        >
                          {pkg.popular && (
                            <div className="flex items-center justify-center gap-1.5 bg-accent py-2 text-xs font-bold uppercase tracking-wide text-accent-foreground">
                              <Flame className="size-3.5" fill="currentColor" />
                              Most Popular
                            </div>
                          )}

                          <div className="flex flex-1 flex-col p-7">
                            <h3 className="text-2xl font-bold text-white">{pkg.name}</h3>
                            <p className="mt-2 text-sm text-white/60">{pkg.description}</p>

                            <div className="mt-6 flex items-baseline gap-1.5">
                              <span className="text-4xl font-black text-white">
                                {formatNGN(amount)}
                              </span>
                              <span className="text-sm text-white/50">
                                /{billingCycle === "yearly" ? "yr" : "mo"}
                              </span>
                            </div>
                            {billingCycle === "yearly" && (
                              <span className="mt-1 text-xs font-semibold text-accent">
                                Save {formatNGN(pkg.price * 2)} vs monthly
                              </span>
                            )}

                            <div className="mt-7 flex-1">
                              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
                                What&apos;s included
                              </p>
                              <ul className="space-y-3">
                                {pkg.features.map((feature, i) => (
                                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/80">
                                    <Check className="mt-0.5 size-4 flex-shrink-0 text-accent" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <Button
                              variant={pkg.popular ? "primary" : "outline"}
                              className="mt-8 w-full gap-1.5"
                              onClick={() => handleSelectPackage(selectedCategory, pkg)}
                            >
                              Get Started
                              <ArrowRight className="size-4" />
                            </Button>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Feature comparison table — built entirely from real package features */}
                {comparisonFeatures.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto mt-16 hidden max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm md:block"
                  >
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="p-5 font-semibold text-white/50">Feature</th>
                            {selectedCategory.packages.map((pkg) => (
                              <th key={pkg.id} className="p-5 text-center font-semibold text-white">
                                {pkg.name}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {comparisonFeatures.map((feature, i) => (
                            <tr
                              key={feature}
                              className={i % 2 === 0 ? "bg-white/[0.015]" : ""}
                            >
                              <td className="p-5 text-white/70">{feature}</td>
                              {selectedCategory.packages.map((pkg) => (
                                <td key={pkg.id} className="p-5 text-center">
                                  {pkg.features.includes(feature) ? (
                                    <Check className="mx-auto size-4 text-accent" />
                                  ) : (
                                    <Minus className="mx-auto size-4 text-white/20" />
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}
              </Container>
            </Section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {checkoutOpen && selectedCategory && selectedPackage && (
          <Dialog
            isOpen={checkoutOpen}
            onClose={() => setCheckoutOpen(false)}
            title="Complete Your Purchase"
          >
            <div className="mt-4">
              {/* Order summary */}
              <div className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm">
                <div className="flex items-center justify-between border-b border-white/10 p-5">
                  <div>
                    <p className="font-bold text-white">
                      {selectedCategory.name} — {selectedPackage.name}
                    </p>
                    <p className="mt-0.5 text-xs capitalize text-white/50">
                      {billingCycle} billing
                    </p>
                  </div>
                  <BadgeCheck className="size-6 text-accent" />
                </div>
                <div className="space-y-2 p-5">
                  <div className="flex justify-between text-sm text-white/60">
                    <span>Subtotal</span>
                    <span>{formatNGN(checkoutAmount)}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-3 text-base font-bold text-white">
                    <span>Total</span>
                    <span className="text-accent">{formatNGN(checkoutAmount)}</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmitCheckout)} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Full Name</label>
                  <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-black/40 px-3 py-2">
                    <User className="h-5 w-5 text-white/40" />
                    <input
                      type="text"
                      {...register("fullName")}
                      className="w-full bg-transparent text-white outline-none placeholder:text-white/30"
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.fullName && <p className="text-sm text-red-400">{errors.fullName.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Email</label>
                  <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-black/40 px-3 py-2">
                    <Mail className="h-5 w-5 text-white/40" />
                    <input
                      type="email"
                      {...register("email")}
                      className="w-full bg-transparent text-white outline-none placeholder:text-white/30"
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Phone</label>
                  <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-black/40 px-3 py-2">
                    <Phone className="h-5 w-5 text-white/40" />
                    <input
                      type="tel"
                      {...register("phone")}
                      className="w-full bg-transparent text-white outline-none placeholder:text-white/30"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {errors.phone && <p className="text-sm text-red-400">{errors.phone.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Start Date</label>
                  <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-black/40 px-3 py-2">
                    <Calendar className="h-5 w-5 text-white/40" />
                    <input
                      type="date"
                      {...register("startDate")}
                      className="w-full bg-transparent text-white outline-none"
                    />
                  </div>
                  {errors.startDate && <p className="text-sm text-red-400">{errors.startDate.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Promo Code (optional)</label>
                  <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-black/40 px-3 py-2">
                    <Tag className="h-5 w-5 text-white/40" />
                    <input
                      type="text"
                      {...register("promoCode")}
                      className="w-full bg-transparent text-white outline-none placeholder:text-white/30"
                      placeholder="Have a code? Enter it here"
                    />
                  </div>
                  <p className="text-xs text-white/40">
                    Codes are reviewed by our team — your total above won&apos;t change automatically.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Notes (optional)</label>
                  <textarea
                    {...register("notes")}
                    className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-white outline-none placeholder:text-white/30"
                    rows={3}
                    placeholder="Any additional notes"
                  />
                </div>

                {/* Terms */}
                <label className="flex items-start gap-2.5 pt-1 text-sm text-white/70">
                  <input
                    type="checkbox"
                    {...register("agreeToTerms")}
                    className="mt-0.5 size-4 rounded border-white/20 bg-black/40 accent-[var(--color-accent)]"
                  />
                  I agree to the membership terms and cancellation policy.
                </label>
                {errors.agreeToTerms && (
                  <p className="text-sm text-red-400">{errors.agreeToTerms.message}</p>
                )}

                {/* Trust badges */}
                <div className="flex flex-wrap items-center gap-4 border-t border-white/10 pt-4 text-xs text-white/50">
                  <span className="inline-flex items-center gap-1.5">
                    <Lock className="size-3.5" /> Secure payment
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="size-3.5" /> SSL encrypted
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CreditCard className="size-3.5" /> Verified by Paystack
                  </span>
                </div>

                <div className="flex gap-4 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setCheckoutOpen(false)}
                    disabled={isProcessing}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    className="flex-1"
                    disabled={isProcessing || !agreeToTerms}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Pay {formatNGN(checkoutAmount)} with Paystack
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}