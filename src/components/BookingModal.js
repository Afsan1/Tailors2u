'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BookingModal({ isOpen, onClose, initialService = '' }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    service: '',
    date: '',
    time: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validateField = (fieldName, value, currentFormData = formData) => {
    switch (fieldName) {
      case 'name': {
        const trimmedValue = value.trim();
        if (!trimmedValue) return 'Full name is required.';
        if (!/^[A-Za-z ]+$/.test(trimmedValue)) return 'Name can only contain letters and spaces.';
        if (trimmedValue.length < 3) return 'Name must contain at least 3 letters.';
        return '';
      }
      case 'email': {
        const trimmedValue = value.trim();
        if (!trimmedValue || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(trimmedValue)) {
          return 'Enter a valid email address.';
        }
        return '';
      }
      case 'phone': {
        const digitsOnly = (value || '').replace(/\D/g, '').slice(0, 10);
        if (!digitsOnly || digitsOnly.length < 10) return 'Phone number must contain exactly 10 digits.';
        return '';
      }
      case 'address': {
        const trimmedValue = value.trim();
        if (!trimmedValue) return 'Doorstep address is required.';
        if (trimmedValue.length < 6) return 'Address must be at least 6 characters.';
        return '';
      }
      case 'service':
        return value ? '' : 'Please select a service.';
      case 'date': {
        if (!value) return 'Please select a date.';
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(value);
        if (selectedDate < today) return 'Past dates are not allowed.';
        return '';
      }
      case 'time': {
        if (!value) return 'Please select a time.';
        if (currentFormData.date) {
          const today = new Date();
          const selectedDate = new Date(currentFormData.date);
          if (selectedDate.toDateString() === today.toDateString()) {
            const [hours, minutes] = value.split(':');
            const selectedTime = new Date();
            selectedTime.setHours(Number(hours));
            selectedTime.setMinutes(Number(minutes));
            selectedTime.setSeconds(0);
            if (selectedTime <= new Date()) return 'Please choose a future time.';
          }
        }
        return '';
      }
      default:
        return '';
    }
  };

  const handleFieldChange = (field, value) => {
    const nextValue = field === 'phone' ? (value || '').replace(/\D/g, '').slice(0, 10) : value;

    setFormData(prev => {
      const nextFormData = { ...prev, [field]: nextValue };
      const validationError = validateField(field, nextValue, nextFormData);

      setErrors(prevErrors => {
        const nextErrors = { ...prevErrors };
        if (validationError) {
          nextErrors[field] = validationError;
        } else {
          delete nextErrors[field];
        }

        if (field === 'date' && nextFormData.time) {
          const timeError = validateField('time', nextFormData.time, nextFormData);
          if (timeError) {
            nextErrors.time = timeError;
          } else {
            delete nextErrors.time;
          }
        }

        if (field === 'time' && nextFormData.date) {
          const dateError = validateField('date', nextFormData.date, nextFormData);
          if (dateError) {
            nextErrors.date = dateError;
          } else {
            delete nextErrors.date;
          }
        }

        return nextErrors;
      });

      return nextFormData;
    });
  };

  useEffect(() => {
    if (isOpen) {
      const notes = localStorage.getItem('tailors2u_booking_notes');
      if (notes) {
        setFormData(prev => ({ ...prev, notes }));
        localStorage.removeItem('tailors2u_booking_notes');
      }
      const savedAddress = localStorage.getItem('tailors2u_booking_address');
      if (savedAddress) {
        setFormData(prev => ({ ...prev, address: savedAddress }));
        localStorage.removeItem('tailors2u_booking_address');
      }
      if (initialService) {
        setFormData(prev => ({ ...prev, service: initialService }));
      }
    }
  }, [initialService, isOpen]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([fieldName, value]) => {
      const error = validateField(fieldName, value, formData);
      if (error) {
        newErrors[fieldName] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        setIsSuccess(true);
      } else {
        alert(data.message || "Booking request failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while submitting your request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setErrors({});
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      service: '',
      date: '',
      time: '',
      notes: ''
    });
    onClose();
  };

  const handleGoToMyBookings = () => {
    handleClose();
    router.push('/my-bookings');
  };

  const handleReturnHome = () => {
    handleClose();
    router.push('/');
  };

  return (
    <>
      <style jsx>{`
        .form-error {
          color: #ef4444;
          font-size: 13px;
          margin-top: 6px;
          font-weight: 500;
        }

        .pending-modal-wrapper {
          background-color: transparent;
          color: var(--white, #ffffff);
          padding: 2rem 1.5rem;
          text-align: center;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          overflow-y: auto;
          max-height: 90vh;
        }

        .pending-icon-ring {
          width: 72px;
          height: 72px;
          margin: 0 auto 1.5rem auto;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 217, 190, 0.2) 0%, rgba(6, 78, 59, 0.8) 100%);
          border: 2px solid var(--beige-gold, #FFD9BE);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulse-ring 2.5s infinite ease-in-out;
        }

        @keyframes pulse-ring {
          0% { transform: scale(0.96); box-shadow: 0 0 0 0 rgba(255, 217, 190, 0.4); }
          50% { transform: scale(1.04); box-shadow: 0 0 0 16px rgba(255, 217, 190, 0); }
          100% { transform: scale(0.96); box-shadow: 0 0 0 0 rgba(255, 217, 190, 0); }
        }

        .pending-icon-symbol {
          font-size: 32px;
          color: var(--beige-gold, #FFD9BE);
        }

        .pending-title {
          font-family: var(--font-serif);
          font-size: 1.75rem;
          color: var(--beige-gold, #FFD9BE);
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .pending-subtitle {
          font-size: 1.1rem;
          color: #e2ece9;
          margin-bottom: 1.5rem;
          font-weight: 500;
        }

        .pending-body-card {
          background: rgba(255, 217, 190, 0.06);
          border: 1px solid rgba(255, 217, 190, 0.15);
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          margin-bottom: 1.75rem;
          text-align: left;
        }

        .pending-body-card p {
          color: #e2ece9;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 0.85rem;
        }

        .pending-body-card p:last-child {
          margin-bottom: 0;
        }

        .notice-warning {
          background: rgba(251, 191, 36, 0.12);
          border-left: 3px solid #f59e0b;
          padding: 0.6rem 0.85rem;
          border-radius: 4px;
          color: #fef08a !important;
          font-size: 0.9rem !important;
          font-weight: 500;
        }

        .est-time-badge {
          display: inline-block;
          margin-top: 0.5rem;
          padding: 0.4rem 0.8rem;
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.4);
          border-radius: 6px;
          color: #34d399;
          font-size: 0.88rem;
          font-weight: 600;
        }

        .pending-btn-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        @media (min-width: 480px) {
          .pending-btn-group {
            flex-direction: row;
            justify-content: center;
          }
        }

        .btn-pending-primary {
          flex: 1;
          background-color: var(--beige-gold, #FFD9BE);
          color: #064e3b;
          font-weight: 700;
          padding: 0.85rem 1.5rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-size: 0.98rem;
          transition: all 0.2s ease;
        }

        .btn-pending-primary:hover {
          background-color: #ffe6d4;
          transform: translateY(-1px);
        }

        .btn-pending-secondary {
          flex: 1;
          background: transparent;
          color: var(--beige-gold, #FFD9BE);
          font-weight: 600;
          padding: 0.85rem 1.5rem;
          border-radius: 8px;
          border: 1px solid var(--beige-gold, #FFD9BE);
          cursor: pointer;
          font-size: 0.98rem;
          transition: all 0.2s ease;
        }

        .btn-pending-secondary:hover {
          background: rgba(255, 217, 190, 0.1);
        }

        @media (max-width: 640px) {
          .pending-modal-wrapper {
            padding: 1.25rem 1rem;
            max-height: 85vh;
          }

          .pending-icon-ring {
            width: 48px;
            height: 48px;
            margin: 0 auto 0.85rem auto;
          }

          .pending-title {
            font-size: 1.25rem;
            margin-bottom: 0.35rem;
          }

          .pending-subtitle {
            font-size: 0.92rem;
            margin-bottom: 0.85rem;
          }

          .pending-body-card {
            padding: 0.85rem 1rem;
            margin-bottom: 1rem;
            border-radius: 10px;
          }

          .pending-body-card p {
            font-size: 0.84rem;
            line-height: 1.45;
            margin-bottom: 0.5rem;
          }

          .est-time-badge {
            font-size: 0.76rem;
            padding: 0.3rem 0.6rem;
          }

          .btn-pending-primary,
          .btn-pending-secondary {
            padding: 0.65rem 1rem;
            font-size: 0.88rem;
          }

          .pending-btn-group {
            gap: 0.5rem;
            flex-direction: row;
          }
        }
      `}</style>
      <div className="modal-overlay" onClick={handleClose}>
        <div 
          className="modal-content" 
          style={isSuccess ? { backgroundColor: 'var(--emerald-deep, #064e3b)', border: '1px solid rgba(255, 217, 190, 0.25)' } : {}}
          onClick={(e) => e.stopPropagation()}
        >
          {!isSuccess && (
            <div className="modal-header">
              <h3>Book Tailors2U</h3>
              <p>We&apos;ll bring our master tailors to your doorstep.</p>
              <button className="modal-close-btn" onClick={handleClose} aria-label="Close modal">
                &times;
              </button>
            </div>
          )}

          {isSuccess ? (
            <div className="pending-modal-wrapper animate-fade-in">
              <div className="pending-icon-ring">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--beige-gold)" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>

              <h3 className="pending-title">Appointment Request Submitted</h3>
              <p className="pending-subtitle">Thank you, <strong>{formData.name}</strong>.</p>

              <div className="pending-body-card">
                <p>Your appointment request has been received successfully.</p>
                <p>Our executive will review your request and confirm availability shortly.</p>
                <p>A confirmation email will be sent to your registered email address once your appointment has been approved.</p>
                <div style={{ marginTop: '0.85rem', textAlign: 'center' }}>
                  <span className="est-time-badge">Estimated confirmation time: Within 1–2 hours during business hours.</span>
                </div>
              </div>

              <div className="pending-btn-group">
                <button className="btn-pending-primary" onClick={handleGoToMyBookings}>
                  Go to My Bookings
                </button>
                <button className="btn-pending-secondary" onClick={handleReturnHome}>
                  Return Home
                </button>
              </div>
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
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  placeholder="e.g. John Doe"
                />
                {errors.name && <div className="form-error">{errors.name}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="modal-email">Email Address</label>
                <input
                  id="modal-email"
                  type="email"
                  className="form-input"
                  required
                  value={formData.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  placeholder="e.g. john@example.com"
                />
                {errors.email && <div className="form-error">{errors.email}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="modal-phone">Phone Number</label>
                <input
                  id="modal-phone"
                  type="tel"
                  className="form-input"
                  required
                  value={formData.phone}
                  onChange={(e) => handleFieldChange('phone', e.target.value)}
                  placeholder="10-digit mobile number"
                />
                {errors.phone && <div className="form-error">{errors.phone}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="modal-address">Doorstep Address</label>
                <input
                  id="modal-address"
                  type="text"
                  className="form-input"
                  required
                  value={formData.address}
                  onChange={(e) => handleFieldChange('address', e.target.value)}
                  placeholder="e.g. 123 Luxury Road, Apt 4B, South Mumbai"
                />
                {errors.address && <div className="form-error">{errors.address}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="modal-service">Select Service</label>
                <select
                  id="modal-service"
                  className="form-select"
                  required
                  value={formData.service}
                  onChange={(e) => handleFieldChange('service', e.target.value)}
                >
                  <option value="" disabled>Choose a service...</option>
                  <option value="Alteration: Shirt">Alteration - Shirt</option>
                  <option value="Alteration: T-Shirt">Alteration - T-Shirt / Polo</option>
                  <option value="Alteration: Pant">Alteration - Pant</option>
                  <option value="Alteration: Kurtas">Alteration - Kurtas</option>
                  <option value="Bespoke Fabric Consultation">Bespoke Fabric Consultation</option>
                  <option value="Custom Tailoring Appointment">Custom Tailoring Appointment</option>
                </select>
                {errors.service && <div className="form-error">{errors.service}</div>}
              </div>

              <div className="form-row-2col">
                <div className="form-group">
                  <label htmlFor="modal-date">Preferred Date</label>
                  <input
                    id="modal-date"
                    type="date"
                    className="form-input"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={formData.date}
                    onChange={(e) => handleFieldChange('date', e.target.value)}
                  />
                  {errors.date && <div className="form-error">{errors.date}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="modal-time">Preferred Time</label>
                  <input
                    id="modal-time"
                    type="time"
                    className="form-input"
                    required
                    value={formData.time}
                    onChange={(e) => handleFieldChange('time', e.target.value)}
                  />
                  {errors.time && <div className="form-error">{errors.time}</div>}
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
    </>
  );
}
