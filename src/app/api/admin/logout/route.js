export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminCookieName } from "@/lib/auth-admin";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(getAdminCookieName());

    return NextResponse.json({
      success: true,
      message: "Admin logged out successfully.",
    });
  } catch (error) {
    console.error("Admin Logout Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
