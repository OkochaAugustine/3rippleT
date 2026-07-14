import type { AuthUser } from "@/store/auth-store";

export type BroadcastMessage = {
  id: string;
  subject: string;
  body: string;
  sentAt: string;
  recipientCount: number;
  type: "email" | "notification" | "both";
};

export type BroadcastPayload = {
  subject: string;
  body: string;
  type: "email" | "notification" | "both";
};

export async function getRegisteredUsers(): Promise<AuthUser[]> {
  // Production: fetch from MongoDB via API route
  return [];
}

export async function sendBroadcast(
  payload: BroadcastPayload,
  recipients: AuthUser[],
): Promise<BroadcastMessage> {
  const message: BroadcastMessage = {
    id: crypto.randomUUID(),
    subject: payload.subject,
    body: payload.body,
    sentAt: new Date().toISOString(),
    recipientCount: recipients.length,
    type: payload.type,
  };

  if (payload.type === "email" || payload.type === "both") {
    await sendBulkEmail(recipients, payload.subject, payload.body);
  }

  if (payload.type === "notification" || payload.type === "both") {
    await createBulkNotifications(recipients, payload.subject, payload.body);
  }

  return message;
}

async function sendBulkEmail(
  recipients: AuthUser[],
  subject: string,
  body: string,
): Promise<void> {
  // Production: use lib/email/nodemailer.ts with batched sends
  void recipients;
  void subject;
  void body;
}

async function createBulkNotifications(
  recipients: AuthUser[],
  title: string,
  body: string,
): Promise<void> {
  // Production: persist to notifications collection + push via WebSocket/SSE
  void recipients;
  void title;
  void body;
}
