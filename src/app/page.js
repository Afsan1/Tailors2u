'use client';

import React from 'react';
import Link from 'next/link';
import { useBooking } from '../components/ClientLayoutWrapper';

export default function Home() {
  const { openBooking } = useBooking();

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay-pattern"></div>
        {/* Video as full-bleed background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video-bg"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlay: solid left → transparent right */}
        <div className="hero-video-overlay"></div>
        <div className="hero-container">
          <div className="hero-content">
            <span className="animate-slide-left" style={{ color: 'var(--beige-gold)', display: 'block', fontSize: '1.8rem', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', letterSpacing: '4px', fontWeight: 500, marginBottom: '0.5rem', animationDelay: '0.1s' }}>
              Delivered in <br /> 48 Hours
            </span>
            <h1 className="animate-slide-left" style={{ animationDelay: '0.25s', fontFamily: 'var(--font-serif)' }}>
              Skip the trip to the Tailors
            </h1>
            <div className="hero-list-item animate-slide-left" style={{ animationDelay: '0.4s' }}>
              75+ Tailors and fabric vendors Onboarded
            </div>
            <div className="hero-list-item animate-slide-left" style={{ animationDelay: '0.5s' }}>
              1000+ fabrics available
            </div>
            <div className="hero-list-item animate-slide-left" style={{ animationDelay: '0.6s', marginBottom: '1.5rem' }}>
              Live across Mumbai
            </div>
            <div className="hero-actions">
              <button
                className="btn-primary animate-slide-left"
                style={{ animationDelay: '0.7s' }}
                onClick={() => openBooking('Custom Tailoring Appointment')}
              >
                Book Doorstep Fitting
              </button>
              <Link href="/fabric" className="btn-secondary animate-slide-left" style={{ animationDelay: '0.8s' }}>
                Explore Fabrics
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Concept Section */}
      <section className="section">
        <div className="section-header">
          <span className="section-subtitle">How it works</span>
          <h2 className="section-title">The Doorstep Tailoring Experience</h2>
        </div>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <h3>1. Book Online</h3>
            <p>A quick alteration, a custom outfit, or both pick a service and a slot that fits your schedule.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.3 15.3l-7.6-7.6a2 2 0 0 0-2.8 0l-7.6 7.6a2 2 0 0 0 0 2.8l2.8 2.8a2 2 0 0 0 2.8 0l7.6-7.6a2 2 0 0 0 0-2.8z"/>
                <line x1="6.8" y1="13.7" x2="8.2" y2="15.1"/>
                <line x1="9.6" y1="10.9" x2="11.8" y2="13.1"/>
                <line x1="13.9" y1="8.1" x2="15.3" y2="9.5"/>
              </svg>
            </div>
            <h3>2. Doorstep Consultation</h3>
            <p>Our mediator visits at a time that suits you, takes accurate measurements, and brings a range of fabric samples right to your door.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </div>
            <h3>3. Perfect Delivery</h3>
            <p>Basic customizations delivered in 48 hours.*Terms and conditions apply.</p>
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="section-alt">
        <div className="section-container">
          <div className="section-header">
            <span className="section-subtitle">Bespoke Services</span>
            <h2 className="section-title">What We Offer</h2>
          </div>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="6" cy="6" r="3"/>
                  <circle cx="6" cy="18" r="3"/>
                  <line x1="20" y1="4" x2="8.12" y2="15.88"/>
                  <line x1="14.47" y1="14.47" x2="20" y2="20"/>
                  <line x1="8.12" y1="8.12" x2="12" y2="12"/>
                </svg>
              </div>
              <h3>Custom Alteration</h3>
              <p>Give your existing wardrobe a second life. We provide precise alterations for shirts, pants, kurtas, and more with exact details.</p>
              <Link href="/alteration" className="feature-link">
                Alteration Pricing & Estimator &rarr;
              </Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                  <polyline points="2 17 12 22 22 17"/>
                  <polyline points="2 12 12 17 22 12"/>
                </svg>
              </div>
              <h3>Premium Fabrics</h3>
              <p>Browse our curated selection of high-quality fabrics including luxurious Egyptian cottons, breathing linens, silks, and wools.</p>
              <Link href="/fabric" className="feature-link">
                View Fabric Catalog &rarr;
              </Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
                  <path d="M12 2v18" />
                  <path d="M12 6l-3-3" />
                  <path d="M12 6l3-3" />
                </svg>
              </div>
              <h3>The Master's Touch</h3>
              <p>Shirts, trousers, suits, and ethnic wear — made to measure and crafted from scratch by our finest tailors.</p>
              <Link href="/tailoring" className="feature-link">
                Meet Master Tailors &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-alt" style={{ borderTop: '1px solid #ebdccf' }}>
        <div className="section-container">
          <div className="section-header">
            <span className="section-subtitle">Testimonials</span>
            <h2 className="section-title">What Our Clients Say</h2>
          </div>
          <div className="feature-grid">
            <div className="feature-card" style={{ padding: '2rem' }}>
              <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                "As a busy executive, I never found time to visit tailoring stores. Tailors2U visited me at my office, took measurements, and 10 days later I had three perfectly fitted shirts. Amazing!"
              </p>
              <strong style={{ color: 'var(--beige-gold)', fontSize: '0.9rem' }}>— David K., Corporate Director</strong>
            </div>
            <div className="feature-card" style={{ padding: '2rem' }}>
              <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                "The alteration service is remarkable. They altered my wedding Kurtas and three pairs of trousers. The fits are flawless, and the deep emerald linen fabric feels absolutely premium."
              </p>
              <strong style={{ color: 'var(--beige-gold)', fontSize: '0.9rem' }}>— Priya R., Event Designer</strong>
            </div>
            <div className="feature-card" style={{ padding: '2rem' }}>
              <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                "I ordered the Luxury Combo package. The merino wool suit fits like a glove and the silk linings are exquisite. Alessandro is a true master of his craft. Highly recommend!"
              </p>
              <strong style={{ color: 'var(--beige-gold)', fontSize: '0.9rem' }}>— Marcus T., Entrepreneur</strong>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
