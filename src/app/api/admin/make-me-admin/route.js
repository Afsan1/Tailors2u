export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized: Sign in first." }, { status: 401 });
    }

    const client = await clerkClient();
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "admin",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Your Clerk account has been granted admin role (publicMetadata.role = 'admin').",
    });
  } catch (error) {
    console.error("Failed to grant admin role:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
