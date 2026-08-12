export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminAuthorization } from "@/lib/auth-admin";
import { sendRejectionEmail } from "@/lib/emails";

export async function POST(request) {
  try {
    const authCheck = await checkAdminAuthorization();
    if (!authCheck.authorized) {
      return NextResponse.json({ success: false, message: authCheck.reason || "Unauthorized" }, { status: 403 });
    }

    const { bookingId, reason } = await request.json();

    if (!bookingId) {
      return NextResponse.json({ success: false, message: "Booking ID is required." }, { status: 400 });
    }

    if (!reason || !reason.trim()) {
      return NextResponse.json({ success: false, message: "Rejection reason is required." }, { status: 400 });
    }

    const existingBooking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!existingBooking) {
      return NextResponse.json({ success: false, message: "Booking not found." }, { status: 404 });
    }

    // Save status REJECTED, rejectionReason, and timestamp
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: "REJECTED",
        rejectedAt: new Date(),
        rejectionReason: reason.trim(),
      },
    });

    // Send rejection email
    let emailSent = false;
    try {
      await sendRejectionEmail(updatedBooking, reason.trim());
      emailSent = true;
    } catch (emailErr) {
      console.error("Rejection Email Dispatch Failed:", emailErr);
    }

    return NextResponse.json({
      success: true,
      booking: updatedBooking,
      emailSent,
      message: emailSent
        ? "Booking rejected and notification email sent."
        : "Booking rejected, but email delivery failed.",
    });
  } catch (error) {
    console.error("Booking Rejection Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
