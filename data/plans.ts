import type { Plan } from "@/types";
import { formatNGN, PAYMENT_CONFIG } from "@/lib/payments";

export const plans: Plan[] = [
  {
    id: "daily",
    name: "Daily Pass",
    description: "Full facility access for a single day — perfect for drop-ins",
    price: formatNGN(PAYMENT_CONFIG.plans.daily.amount),
    features: [
      "Full gym access",
      "All group classes",
      "Locker room access",
      "Coach on floor",
    ],
  },
  {
    id: "monthly",
    name: "Monthly Membership",
    description: "Our most popular plan for committed athletes",
    price: formatNGN(PAYMENT_CONFIG.plans.monthly.amount),
    features: [
      "Unlimited group classes",
      "Open gym access",
      "Priority booking",
      "Weekly check-ins",
      "Nutrition guidance",
      "Recovery sessions",
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium Coaching",
    description: "Personal training and custom programming included",
    price: formatNGN(45000),
    features: [
      "Everything in Monthly",
      "Personal training (2x/month)",
      "Custom programming",
      "Body composition analysis",
      "Competition preparation",
    ],
  },
];

export const membershipOptions = PAYMENT_CONFIG.plans;
