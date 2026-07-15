import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/auth/auth";

export async function POST() {
  try {
    await clearAuthCookie();
    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error: unknown) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "An error occurred during logout" },
      { status: 500 },
    );
  }
}
