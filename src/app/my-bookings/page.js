import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function MyBookingsPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-in?redirect_url=/my-bookings');
  }

  const bookings = await prisma.booking.findMany({
    where: {
      clerkUserId: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formatDate = (dateObj) => {
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCreatedDate = (dateObj) => {
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="my-bookings-page animate-fade-in">
      <div className="my-bookings-container">
        <div className="my-bookings-header">
          <h1 className="my-bookings-title">My Bookings</h1>
          <p className="my-bookings-subtitle">Manage your doorstep styling and alteration appointments</p>
        </div>

        {bookings.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📅</span>
            <h2 className="empty-title">No bookings yet</h2>
            <p className="empty-description">
              You haven't scheduled any Tailors2U appointments yet.
            </p>
            <Link href="/" className="btn-primary" style={{ display: 'inline-block' }}>
              Book Your First Appointment
            </Link>
          </div>
        ) : (
          <div className="booking-cards-list">
            {bookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                <div className="booking-card-header">
                  <span className="booking-service">{booking.service}</span>
                  <span className="booking-badge">Scheduled</span>
                </div>

                <div className="booking-card-body">
                  <div className="booking-detail-item">
                    <span className="booking-detail-label">Date</span>
                    <span className="booking-detail-value">{formatDate(booking.date)}</span>
                  </div>
                  <div className="booking-detail-item">
                    <span className="booking-detail-label">Time</span>
                    <span className="booking-detail-value">{booking.time}</span>
                  </div>
                </div>

                {booking.notes && (
                  <div className="booking-detail-item" style={{ marginBottom: '1.5rem' }}>
                    <span className="booking-detail-label" style={{ marginBottom: '0.4rem' }}>Notes</span>
                    <div className="booking-notes-section">
                      <p className="booking-notes-text">{booking.notes}</p>
                    </div>
                  </div>
                )}

                <div className="booking-card-footer">
                  <span>Booked on: {formatCreatedDate(booking.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
