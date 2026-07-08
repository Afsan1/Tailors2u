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
        <div className="hero-container">
          <div className="hero-content">
            <span className="animate-slide-left" style={{ color: 'var(--beige-gold)', display: 'block', fontSize: '1.8rem', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', letterSpacing: '4px', fontWeight: 500, marginBottom: '0.5rem', animationDelay: '0.1s' }}>
              Delivered in <br /> 48 Hours
            </span>
            <h1 className="animate-slide-left" style={{ animationDelay: '0.25s' }}>
              Skip the trip to the Tailors.
            </h1>
            <p className="animate-slide-left" style={{ animationDelay: '0.4s' }}>
              75+ Tailors and fabric vendors Onboarded. 1000+ fabrics available. Live across mumbai.
            </p>
            <div className="hero-actions">
              <button
                className="btn-primary animate-slide-left"
                style={{ animationDelay: '0.55s' }}
                onClick={() => openBooking('Custom Tailoring Appointment')}
              >
                Book Doorstep Fitting
              </button>
              <Link href="/fabric" className="btn-secondary animate-slide-left" style={{ animationDelay: '0.7s' }}>
                Explore Fabrics
              </Link>
            </div>
          </div>
          <div className="hero-showcase animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="hero-video-bg"
            >
              <source
                src="/fabric.mp4"
                type="video/mp4"
              />
            </video>
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
            <div className="feature-icon-wrapper">📅</div>
            <h3>1. Book Online</h3>
            <p>Choose your preferred service: alterations or custom tailoring, and select a time that fits your busy schedule.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">📏</div>
            <h3>2. Doorstep Fitting</h3>
            <p>Our experienced Master Tailor visits you at home or the office to take precise measurements and showcase physical fabric samples.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">✨</div>
            <h3>3. Perfect Delivery</h3>
            <p>Within 7-10 days, your tailored garments are delivered to your door. Any final fitting micro-adjustments are completely free.</p>
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
              <div className="feature-icon-wrapper">✂️</div>
              <h3>Bespoke Alteration</h3>
              <p>Give your existing wardrobe a second life. We provide precise alterations for shirts, pants, kurtas, and more with exact details.</p>
              <Link href="/alteration" className="feature-link">
                Alteration Pricing & Estimator &rarr;
              </Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">🧵</div>
              <h3>Premium Fabrics</h3>
              <p>Browse our curated selection of high-quality fabrics including luxurious Egyptian cottons, breathing linens, silks, and wools.</p>
              <Link href="/fabric" className="feature-link">
                View Fabric Catalog &rarr;
              </Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">👔</div>
              <h3>Master Tailoring</h3>
              <p>Experience custom-made shirts, trousers, suits, and traditional ethnic wear crafted from scratch by our veteran tailors.</p>
              <Link href="/tailoring" className="feature-link">
                Meet Master Tailors &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-alt" style={{ borderTop: '1px solid var(--beige-border)' }}>
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
