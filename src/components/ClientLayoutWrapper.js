'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import BookingModal from './BookingModal';
import { useAuth, useClerk } from '@clerk/nextjs';

export default function ClientLayoutWrapper({ children }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const { isSignedIn } = useAuth();
  const clerk = useClerk();
  const pathname = usePathname();

  const isAdminPage = pathname?.startsWith('/admin');

  const openBooking = (service = '') => {
    if (!isSignedIn) {
      localStorage.setItem('pending_booking_service', service || 'Custom Tailoring Appointment');
      clerk.openSignIn();
      return;
    }
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setSelectedService('');
  };

  useEffect(() => {
    if (isSignedIn) {
      const pendingService = localStorage.getItem('pending_booking_service');
      if (pendingService) {
        localStorage.removeItem('pending_booking_service');
        setSelectedService(pendingService);
        setIsBookingOpen(true);
      }
    }
  }, [isSignedIn]);

  if (isAdminPage) {
    return (
      <BookingContext.Provider value={{ openBooking }}>
        <main>{children}</main>
      </BookingContext.Provider>
    );
  }

  return (
    <BookingContext.Provider value={{ openBooking }}>
      <Navbar onOpenBooking={() => openBooking()} />
      <main>{children}</main>
      <Footer onOpenBooking={() => openBooking()} />
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={closeBooking} 
        initialService={selectedService} 
      />
    </BookingContext.Provider>
  );
}

export const BookingContext = React.createContext({
  openBooking: () => {}
});
export const useBooking = () => React.useContext(BookingContext);
