export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(request) {
  try {
    const { userId } = await auth();
    const body = await request.json();

    const booking = await prisma.booking.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        address: body.address || null,
        service: body.service,
        date: new Date(body.date),
        time: body.time,
        notes: body.notes || null,
        clerkUserId: userId || null,
        status: "PENDING",
      },
    });

    // NOTE: In the new workflow, no confirmation email is sent immediately on booking creation.
    // The booking is saved with status "PENDING".
    // Confirmation email is sent ONLY after admin approval in /admin.

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("Booking Creation Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to submit appointment request.",
      },
      {
        status: 500,
      }
    );
  }
}