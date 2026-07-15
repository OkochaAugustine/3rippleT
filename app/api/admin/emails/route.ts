import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/mongodb";
import { EmailLog } from "@/models/emailLog";
import { User } from "@/models/user";
import { getSessionUser } from "@/lib/auth/auth";
import { sendBroadcastEmail } from "@/lib/email/nodemailer";

export async function GET() {
  try {
    const session = await getSessionUser();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await dbConnect();

    // Fetch all logs, sorted by most recent
    const logs = await EmailLog.find({}).sort({ sentAt: -1 }).limit(100);

    // Aggregate counts
    const successCount = await EmailLog.countDocuments({ status: "sent" });
    const failureCount = await EmailLog.countDocuments({ status: "failed" });
    const totalSent = await EmailLog.countDocuments({});

    return NextResponse.json({
      logs: logs.map((log) => ({
        id: log._id.toString(),
        recipient: log.recipient,
        subject: log.subject,
        type: log.type,
        status: log.status,
        error: log.error || "",
        sentAt: log.sentAt ? log.sentAt.toISOString() : new Date().toISOString(),
      })),
      stats: {
        successCount,
        failureCount,
        totalSent,
      },
    });
  } catch (error: unknown) {
    console.error("GET email logs error:", error);
    return NextResponse.json(
      { error: "An error occurred fetching email logs" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSessionUser();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await dbConnect();
    const body = await req.json();
    const { subject, message, buttonText, buttonUrl } = body;

    if (!subject || !message) {
      return NextResponse.json(
        { error: "Subject and message are required" },
        { status: 400 },
      );
    }

    // Retrieve all registered users
    const users = await User.find({});
    if (users.length === 0) {
      return NextResponse.json(
        { error: "No users found in database to broadcast to" },
        { status: 400 },
      );
    }

    let successCount = 0;
    let failureCount = 0;

    // Send emails individually and log each send, allowing tolerance for individual SMTP errors
    for (const user of users) {
      try {
        await sendBroadcastEmail(
          user.email,
          user.name,
          subject,
          message,
          buttonText || undefined,
          buttonUrl || undefined
        );

        await EmailLog.create({
          recipient: user.email,
          subject,
          type: "broadcast",
          status: "sent",
        });
        successCount++;
      } catch (err: unknown) {
        console.error(`Failed to send broadcast email to ${user.email}:`, err);
        await EmailLog.create({
          recipient: user.email,
          subject,
          type: "broadcast",
          status: "failed",
          error: err instanceof Error ? err.message : String(err),
        });
        failureCount++;
      }
    }

    return NextResponse.json({
      message: "Broadcast completed",
      stats: {
        successCount,
        failureCount,
        totalSent: successCount + failureCount,
      },
    });
  } catch (error: unknown) {
    console.error("POST email broadcast error:", error);
    return NextResponse.json(
      { error: "An error occurred during email broadcast" },
      { status: 500 },
    );
  }
}
