'use client';

import React, { useState, useEffect } from 'react';

export default function BookingModal({ isOpen, onClose, initialService = '' }) {
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

    if (!validateForm()) {
  return;
}

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

            alert(data.message || "Booking failed");

        }

    } catch (err) {

        console.error(err);

        alert("Something went wrong.");

    }

    setIsSubmitting(false);

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

  return (
    <>
      <style jsx>{`
        .form-error {
          color: #dc2626;
          font-size: 13px;
          margin-top: 6px;
          font-weight: 500;
        }
      `}</style>
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
  Thank you, <strong>{formData.name}</strong>.
</p>

<p style={{ marginTop: "10px" }}>
  Your booking confirmation has been recorded.
</p>

<p style={{ marginTop: "10px" }}>
  📧 Confirmation Email:
  <br />
  <strong>{formData.email}</strong>
</p>

<p style={{ marginTop: "10px" }}>
  A master stylist will reach out to you within the next 2 hours to confirm your appointment details.
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
                onChange={(e) =>
                  handleFieldChange('phone', e.target.value)
                }
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
                <option value="Alteration: Pant">Alteration - Pant</option>
                <option value="Alteration: Kurtas">Alteration - Kurtas</option>
                <option value="Bespoke Fabric Consultation">Bespoke Fabric Consultation</option>
                <option value="Custom Tailoring Appointment">Custom Tailoring Appointment</option>
              </select>
              {errors.service && <div className="form-error">{errors.service}</div>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="modal-date">Preferred Date</label>
                <input
  id="modal-date"
  type="date"
  className="form-input"
  required
  min={new Date().toISOString().split("T")[0]}
  value={formData.date}
  onChange={(e) =>
    handleFieldChange('date', e.target.value)
  }
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
