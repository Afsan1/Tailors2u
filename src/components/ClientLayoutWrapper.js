'use client';

import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import BookingModal from './BookingModal';

export default function ClientLayoutWrapper({ children }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const openBooking = (service = '') => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setSelectedService('');
  };

  // Clone children to inject openBooking callback if needed, or pass it via context.
  // A simpler way is to use context or just pass the openBooking function as a custom prop,
  // but since Next.js app router children are pages, let's store openBooking in a global event
  // or window event, or create a simple context provider.
  // Let's create a small Context for the Booking Modal so any page can open it!
  // That is the most professional React architectural pattern.
  
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

// Create and export the context so pages can use it
export const BookingContext = React.createContext({
  openBooking: () => {}
});
export const useBooking = () => React.useContext(BookingContext);
