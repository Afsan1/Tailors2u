import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { transporter } from "@/lib/mailer";
import { auth } from "@clerk/nextjs/server";

// console.log("EMAIL_USER:", process.env.EMAIL_USER);
// console.log("EMAIL_PASS:", process.env.EMAIL_PASS?.length);

export async function POST(request) {
  try {
    const { userId } = await auth();
    const body = await request.json();

    const booking = await prisma.booking.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        service: body.service,
        date: new Date(body.date),
        time: body.time,
        notes: body.notes,
        clerkUserId: userId || null,
      },
    });

    // -----------------------------
    // Email to Tailors2U
    // -----------------------------
    await transporter.sendMail({
      from: `"Tailors2U" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "📌 New Tailors2U Booking",
      html: `
        <h2>New Booking Received</h2>

        <p><strong>Name:</strong> ${booking.name}</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Phone:</strong> ${booking.phone}</p>
        <p><strong>Service:</strong> ${booking.service}</p>
        <p><strong>Date:</strong> ${booking.date.toDateString()}</p>
        <p><strong>Time:</strong> ${booking.time}</p>
        <p><strong>Notes:</strong> ${booking.notes || "None"}</p>
      `,
    });

    // -----------------------------
    // Confirmation Email to Customer
    // -----------------------------
    await transporter.sendMail({
      from: `"Tailors2U" <${process.env.EMAIL_USER}>`,
      to: booking.email,
      subject: "✅ Booking Confirmed",
      html: `
        <h2>Hello ${booking.name},</h2>

        <p>Thank you for booking with <strong>Tailors2U</strong>.</p>

        <h3>Your Booking Details</h3>

        <p><strong>Service:</strong> ${booking.service}</p>
        <p><strong>Date:</strong> ${booking.date.toDateString()}</p>
        <p><strong>Time:</strong> ${booking.time}</p>
        <p><strong>Notes:</strong> ${booking.notes || "None"}</p>

        <br>

        <p>
          Our master stylist will contact you within the next
          <strong>2 hours</strong>.
        </p>

        <p>Thank you for choosing Tailors2U.</p>
      `,
    });

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}