import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/mongodb";
import { Notification } from "@/models/notification";
import { getSessionUser } from "@/lib/auth/auth";

export async function GET() {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const notifications = await Notification.find({ userId: session.id }).sort({ createdAt: -1 });
    return NextResponse.json({ notifications });
  } catch (error: unknown) {
    console.error("GET notifications error:", error);
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();
    const { markAllRead, notificationIds } = body;

    if (markAllRead) {
      await Notification.updateMany({ userId: session.id, read: false }, { read: true });
    } else if (notificationIds && Array.isArray(notificationIds)) {
      await Notification.updateMany(
        { _id: { $in: notificationIds }, userId: session.id },
        { read: true }
      );
    }

    return NextResponse.json({ message: "Notifications updated" });
  } catch (error: unknown) {
    console.error("PATCH notifications error:", error);
    return NextResponse.json({ error: "Failed to update notifications" }, { status: 500 });
  }
}
