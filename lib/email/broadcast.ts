import type { AuthUser } from "@/store/auth-store";
import { User } from "@/models/user";
import { dbConnect } from "@/lib/db/mongodb";
import { sendBroadcastEmail } from "./nodemailer";
import { EmailLog } from "@/models/emailLog";

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
  await dbConnect();
  const users = await User.find({});
  return users.map((u) => ({
    id: u._id.toString(),
    name: u.name,
    email: u.email,
    role: u.role,
    membership: u.membership,
    isVerified: u.isVerified,
    verificationStatus: u.verificationStatus,
    phone: u.phone,
    createdAt: u.createdAt?.toISOString(),
    profileComplete: u.phone ? 100 : 75,
  }));
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
  for (const recipient of recipients) {
    try {
      await sendBroadcastEmail(recipient.email, recipient.name, subject, body);
      await EmailLog.create({
        recipient: recipient.email,
        subject,
        type: "broadcast",
        status: "sent",
      });
    } catch (err: unknown) {
      console.error(`Failed to send broadcast email to ${recipient.email}:`, err);
      await EmailLog.create({
        recipient: recipient.email,
        subject,
        type: "broadcast",
        status: "failed",
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }
}

async function createBulkNotifications(
  recipients: AuthUser[],
  title: string,
  body: string,
): Promise<void> {
  // Notification stub: to be extended when WebSocket/SSE system is active
  console.log(`[NOTIFICATIONS BROADCAST] Recipients: ${recipients.length} | Title: ${title}`);
  void recipients;
  void title;
  void body;
}
