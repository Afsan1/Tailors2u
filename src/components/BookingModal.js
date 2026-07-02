'use client';

import React, { useState, useEffect } from 'react';

export default function BookingModal({ isOpen, onClose, initialService = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const notes = localStorage.getItem('tailors2u_booking_notes');
      if (notes) {
        setFormData(prev => ({ ...prev, notes }));
        localStorage.removeItem('tailors2u_booking_notes');
      }
      if (initialService) {
        setFormData(prev => ({ ...prev, service: initialService }));
      }
    }
  }, [initialService, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      date: '',
      time: '',
      notes: ''
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Book Tailors2U</h3>
          <p>We'll bring our master tailors to your doorstep.</p>
          <button className="modal-close-btn" onClick={handleClose} aria-label="Close modal">
            &times;
          </button>
        </div>

        {isSuccess ? (
          <div className="modal-success-screen animate-fade-in">
            <span className="success-icon">✓</span>
            <h4 className="success-title">Booking Received!</h4>
            <p>
              Thank you, <strong>{formData.name}</strong>. A master stylist will reach out to you within the next 2 hours to confirm your appointment details.
            </p>
            <button className="btn-primary" onClick={handleClose}>
              Done
            </button>
          </div>
        ) : (
          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="modal-name">Your Full Name</label>
              <input
                id="modal-name"
                type="text"
                className="form-input"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. John Doe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="modal-email">Email Address</label>
              <input
                id="modal-email"
                type="email"
                className="form-input"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. john@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="modal-phone">Phone Number</label>
              <input
                id="modal-phone"
                type="tel"
                className="form-input"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. +1 (555) 123-4567"
              />
            </div>

            <div className="form-group">
              <label htmlFor="modal-service">Select Service</label>
              <select
                id="modal-service"
                className="form-select"
                required
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              >
                <option value="" disabled>Choose a service...</option>
                <option value="Alteration: Shirt">Alteration - Shirt</option>
                <option value="Alteration: Pant">Alteration - Pant</option>
                <option value="Alteration: Kurtas">Alteration - Kurtas</option>
                <option value="Bespoke Fabric Consultation">Bespoke Fabric Consultation</option>
                <option value="Custom Tailoring Appointment">Custom Tailoring Appointment</option>
                <option value="Combo Package: Standard">Standard Combo Package</option>
                <option value="Combo Package: Premium">Premium Combo Package</option>
                <option value="Combo Package: Luxury">Luxury Combo Package</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="modal-date">Preferred Date</label>
                <input
                  id="modal-date"
                  type="date"
                  className="form-input"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="modal-time">Preferred Time</label>
                <input
                  id="modal-time"
                  type="time"
                  className="form-input"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="modal-notes">Measurements or Style Notes</label>
              <textarea
                id="modal-notes"
                className="form-textarea"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Enter any specific preferences, fit issues, or sizing details..."
              ></textarea>
            </div>

            <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Scheduling...' : 'Schedule Home Visit'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
