export const PAYMENT_CONFIG = {
  currency: "NGN" as const,
  currencySymbol: "₦",
  locale: "en-NG",
  providers: ["paystack", "flutterwave"] as const,
  plans: {
    daily: {
      id: "daily",
      name: "Daily Pass",
      amount: 3000,
      interval: "day" as const,
      description: "Full facility access for one day",
    },
    monthly: {
      id: "monthly",
      name: "Monthly Membership",
      amount: 20000,
      interval: "month" as const,
      description: "Unlimited classes and open gym access",
    },
  },
};

export type PaymentProvider = (typeof PAYMENT_CONFIG.providers)[number];

export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

export type Invoice = {
  id: string;
  userId: string;
  amount: number;
  currency: typeof PAYMENT_CONFIG.currency;
  status: PaymentStatus;
  planId: string;
  createdAt: string;
  paidAt?: string;
  receiptUrl?: string;
  provider?: PaymentProvider;
  reference?: string;
};

export function formatNGN(amount: number): string {
  return new Intl.NumberFormat(PAYMENT_CONFIG.locale, {
    style: "currency",
    currency: PAYMENT_CONFIG.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateInvoiceId(): string {
  return `INV-${Date.now().toString(36).toUpperCase()}`;
}

export type PaystackInitParams = {
  email: string;
  amount: number;
  reference: string;
  metadata?: Record<string, string>;
};

export type FlutterwaveInitParams = {
  email: string;
  amount: number;
  txRef: string;
  customerName: string;
};

export async function initPaystackPayment(params: PaystackInitParams): Promise<void> {
  // Production: integrate @paystack/inline-js with NEXT_PUBLIC_PAYSTACK_KEY
  console.log('Paystack payment init:', params);
}

export async function initFlutterwavePayment(params: FlutterwaveInitParams): Promise<void> {
  // Production: integrate Flutterwave inline with NEXT_PUBLIC_FLUTTERWAVE_KEY
  console.log('Flutterwave payment init:', params);
}

export function calculateMembershipExpiry(
  planId: keyof typeof PAYMENT_CONFIG.plans,
  fromDate = new Date(),
): Date {
  const expiry = new Date(fromDate);
  if (planId === "daily") {
    expiry.setDate(expiry.getDate() + 1);
  } else {
    expiry.setMonth(expiry.getMonth() + 1);
  }
  return expiry;
}
