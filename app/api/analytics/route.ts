import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/mongodb";
import { User } from "@/models/user";
import { Booking } from "@/models/booking";
import { Attendance } from "@/models/attendance";
import { Invoice } from "@/models/invoice";
import { EmailLog } from "@/models/emailLog";
import { getSessionUser } from "@/lib/auth/auth";

export async function GET() {
  try {
    const session = await getSessionUser();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await dbConnect();

    const totalMembers = await User.countDocuments({});
    const activeMembers = await User.countDocuments({ membership: { $ne: "none" } });
    const verifiedMembers = await User.countDocuments({ isVerified: true });
    
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const newRegistrations = await User.countDocuments({ createdAt: { $gte: startOfMonth } });

    const invoices = await Invoice.find({ status: "completed", paidAt: { $gte: startOfMonth } });
    const monthlyRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0);

    const totalBookings = await Booking.countDocuments({});
    const confirmedBookings = await Booking.countDocuments({ status: "confirmed" });
    const completedBookings = await Booking.countDocuments({ status: "completed" });

    const totalAttendance = await Attendance.countDocuments({});
    const thisMonthAttendance = await Attendance.countDocuments({ date: { $gte: startOfMonth } });

    const emailStats = {
      total: await EmailLog.countDocuments({}),
      sent: await EmailLog.countDocuments({ status: "sent" }),
      failed: await EmailLog.countDocuments({ status: "failed" }),
    };

    return NextResponse.json({
      members: {
        total: totalMembers,
        active: activeMembers,
        verified: verifiedMembers,
        newThisMonth: newRegistrations,
      },
      revenue: {
        monthly: monthlyRevenue,
        total: await Invoice.countDocuments({ status: "completed" }),
      },
      bookings: {
        total: totalBookings,
        confirmed: confirmedBookings,
        completed: completedBookings,
      },
      attendance: {
        total: totalAttendance,
        thisMonth: thisMonthAttendance,
      },
      email: emailStats,
    });
  } catch (error: unknown) {
    console.error("GET analytics error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
