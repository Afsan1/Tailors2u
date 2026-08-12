export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminAuthorization } from "@/lib/auth-admin";
import { sendApprovalEmail } from "@/lib/emails";

export async function POST(request) {
  try {
    const authCheck = await checkAdminAuthorization();
    if (!authCheck.authorized) {
      return NextResponse.json({ success: false, message: authCheck.reason || "Unauthorized" }, { status: 403 });
    }

    const { bookingId } = await request.json();

    if (!bookingId) {
      return NextResponse.json({ success: false, message: "Booking ID is required." }, { status: 400 });
    }

    const existingBooking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!existingBooking) {
      return NextResponse.json({ success: false, message: "Booking not found." }, { status: 404 });
    }

    // Update status and save approval timestamp FIRST
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: "APPROVED",
        approvedAt: new Date(),
        approvedBy: authCheck.email || authCheck.userId,
      },
    });

    // Send confirmation email AFTER approval update in DB
    let emailSent = false;
    try {
      await sendApprovalEmail(updatedBooking);
      emailSent = true;
    } catch (emailErr) {
      console.error("Approval Email Dispatch Failed:", emailErr);
    }

    return NextResponse.json({
      success: true,
      booking: updatedBooking,
      emailSent,
      message: emailSent
        ? "Booking approved and confirmation email sent successfully."
        : "Booking approved, but email delivery failed. Please check mailer settings.",
    });
  } catch (error) {
    console.error("Booking Approval Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
