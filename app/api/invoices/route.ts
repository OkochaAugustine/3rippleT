import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/mongodb";
import { Invoice } from "@/models/invoice";
import { getSessionUser } from "@/lib/auth/auth";
import { generateInvoiceId } from "@/lib/payments";

export async function GET() {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const invoices = await Invoice.find({ userId: session.id }).sort({ createdAt: -1 });
    return NextResponse.json({ invoices });
  } catch (error: unknown) {
    console.error("GET invoices error:", error);
    return NextResponse.json({ error: "Failed to fetch invoices" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();
    const { amount, planId, planName, dueDate } = body;

    if (!amount || !planId || !planName || !dueDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const invoiceId = generateInvoiceId();
    const invoice = await Invoice.create({
      invoiceId,
      userId: session.id,
      userName: session.name,
      userEmail: session.email,
      amount,
      planId,
      planName,
      dueDate: new Date(dueDate),
    });

    return NextResponse.json({ invoice }, { status: 201 });
  } catch (error: unknown) {
    console.error("POST invoice error:", error);
    return NextResponse.json({ error: "Failed to create invoice" }, { status: 500 });
  }
}
