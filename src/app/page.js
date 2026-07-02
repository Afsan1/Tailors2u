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
          <div className="hero-content animate-fade-in">
            <h1>
              <span>Tailors2U Bespoke</span>
              Perfect Fits, Craftsmanship & Convenience
            </h1>
            <p>
              Skip the trip to the tailors. We bring world-class bespoke tailoring, sizing, and custom styling experts directly to your home or office.
            </p>
            <div className="hero-actions">
              <button 
                className="btn-primary" 
                onClick={() => openBooking('Custom Tailoring Appointment')}
              >
                Book Doorstep Fitting
              </button>
              <Link href="/fabric" className="btn-secondary">
                Explore Fabrics
              </Link>
            </div>
          </div>
          <div className="hero-showcase animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="showcase-badge">
              <h3>100%</h3>
              <p>Fit Guarantee</p>
              <div className="showcase-divider"></div>
              <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>Handcrafted Excellence</p>
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
            <div className="feature-icon-wrapper">📅</div>
            <h3>1. Book Online</h3>
            <p>Choose your preferred service: alterations, custom tailoring, or combo bundles, and select a time that fits your busy schedule.</p>
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

      {/* Combo Showcase Section */}
      <section className="section">
        <div className="section-header">
          <span className="section-subtitle">Best Value Packages</span>
          <h2 className="section-title">Curated Combo Bundles</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.2rem', color: 'var(--emerald-deep)' }}>
              Complete Wardrobe Solutions
            </h3>
            <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem' }}>
              We understand that upgrading your wardrobe is an investment. Our curated Standard, Premium, and Luxury combo packages bundle premium fabrics, custom styling, and expert fittings at a significant savings.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontWeight: 500 }}>
                <span style={{ color: 'var(--beige-gold)', fontSize: '1.2rem' }}>✓</span> Complete outfits: shirt, trousers & jacket combos
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontWeight: 500 }}>
                <span style={{ color: 'var(--beige-gold)', fontSize: '1.2rem' }}>✓</span> Premium fittings and digital measurement styling logs
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontWeight: 500 }}>
                <span style={{ color: 'var(--beige-gold)', fontSize: '1.2rem' }}>✓</span> Save up to 25% compared to individual items
              </li>
            </ul>
            <Link href="/combo" className="btn-primary">
              View Combo Packages
            </Link>
          </div>
          <div style={{ backgroundColor: 'var(--white)', border: '2px solid var(--beige-gold)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', textAlign: 'center', boxShadow: 'var(--shadow-md)' }}>
            <h4 style={{ color: 'var(--beige-dark)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Popular Package</h4>
            <h3 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>The Executive</h3>
            <p style={{ color: 'var(--emerald-deep)', fontSize: '1.8rem', fontFamily: 'var(--font-serif)', fontWeight: 700, marginBottom: '1rem' }}>$299</p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>2 Custom Shirts + 2 Custom Pants + Accessories</p>
            <button className="btn-secondary" style={{ borderColor: 'var(--emerald-deep)', color: 'var(--emerald-deep)', width: '100%' }} onClick={() => openBooking('Combo Package: Premium')}>
              Book Package Fitting
            </button>
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
            <div style={{ backgroundColor: 'var(--white)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--beige-border)' }}>
              <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                "As a busy executive, I never found time to visit tailoring stores. Tailors2U visited me at my office, took measurements, and 10 days later I had three perfectly fitted shirts. Amazing!"
              </p>
              <strong style={{ color: 'var(--emerald-deep)', fontSize: '0.9rem' }}>— David K., Corporate Director</strong>
            </div>
            <div style={{ backgroundColor: 'var(--white)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--beige-border)' }}>
              <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                "The alteration service is remarkable. They altered my wedding Kurtas and three pairs of trousers. The fits are flawless, and the deep emerald linen fabric feels absolutely premium."
              </p>
              <strong style={{ color: 'var(--emerald-deep)', fontSize: '0.9rem' }}>— Priya R., Event Designer</strong>
            </div>
            <div style={{ backgroundColor: 'var(--white)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--beige-border)' }}>
              <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                "I ordered the Luxury Combo package. The merino wool suit fits like a glove and the silk linings are exquisite. Alessandro is a true master of his craft. Highly recommend!"
              </p>
              <strong style={{ color: 'var(--emerald-deep)', fontSize: '0.9rem' }}>— Marcus T., Entrepreneur</strong>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
