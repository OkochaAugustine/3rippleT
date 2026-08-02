import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/mongodb";
import { User } from "@/models/user";
import { Invoice } from "@/models/invoice";
import { Notification } from "@/models/notification";
import { getSessionUser } from "@/lib/auth/auth";
import { calculateMembershipExpiry } from "@/lib/payments";

export async function POST(req: Request) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await dbConnect();
    const {
      invoiceId,
      paymentProvider,
      paymentReference,
      receiptUrl,
    } = await req.json();
    if (!invoiceId || !paymentProvider || !paymentReference) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Find invoice and update it
    const invoice = await Invoice.findOne({ invoiceId, userId: session.id });
    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }
    invoice.status = "completed";
    invoice.paymentProvider = paymentProvider;
    invoice.paymentReference = paymentReference;
    invoice.receiptUrl = receiptUrl || "";
    invoice.paidAt = new Date();
    await invoice.save();

    // Activate user's membership
    const user = await User.findById(session.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    user.membership = invoice.planId;
    user.membershipPlan = invoice.planName;
    user.membershipExpiry = calculateMembershipExpiry(invoice.planId as keyof typeof import("@/lib/payments").PAYMENT_CONFIG.plans);
    await user.save();

    // Create notification
    await Notification.create({
      userId: session.id,
      title: "Membership Activated",
      message: `Your ${invoice.planName} membership is now active!`,
      type: "success",
    });

    return NextResponse.json({
      message: "Payment successful, membership activated",
      invoice,
      user: {
        id: user._id,
        membership: user.membership,
        membershipPlan: user.membershipPlan,
        membershipExpiry: user.membershipExpiry,
      },
    });
  } catch (error: unknown) {
    console.error("Payment success error:", error);
    return NextResponse.json(
      { error: "Failed to process payment success" },
      { status: 500 },
    );
  }
}
