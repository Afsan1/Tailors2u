'use client';

import React from 'react';
import { useBooking } from '../../components/ClientLayoutWrapper';

const TAILORS_DATA = [
  {
    id: 't1',
    name: 'Master Tailor Alessandro',
    specialty: 'Bespoke Suits & Italian Cuts',
    initials: 'AM',
    bio: 'Trained in Milan, Alessandro brings a heritage of Italian pattern drafting and tailoring to Tailors2U. He specializes in structured blazers, bespoke formal trousers, and classic tuxedos.',
    rating: '4.9',
    reviewsCount: 340,
    experience: '18 Years',
    fitsCompleted: '4,500+'
  },
  {
    id: 't2',
    name: 'Master Tailor Priya',
    specialty: 'Kurtas & Traditional Couture',
    initials: 'PK',
    bio: 'A specialist in ethnic couture, Priya is an expert in traditional pattern cutting, necklines, and hand-detailing for premium Kurtas, Sherwanis, and luxury ethnic ensembles.',
    rating: '5.0',
    reviewsCount: 412,
    experience: '15 Years',
    fitsCompleted: '3,800+'
  },
  {
    id: 't3',
    name: 'Master Tailor Marcus',
    specialty: 'Casual Shirting & Slim Fit Pants',
    initials: 'MW',
    bio: 'Marcus focuses on modern silhouettes, smart casual attire, and athletic fits. He is renowned for his attention to details like collar stance, cuff design, and custom trousers ergonomics.',
    rating: '4.8',
    reviewsCount: 290,
    experience: '12 Years',
    fitsCompleted: '3,200+'
  }
];

export default function Tailoring() {
  const { openBooking } = useBooking();

  const handleRequestTailor = (tailorName) => {
    localStorage.setItem('tailors2u_booking_notes', `Requested Master Tailor: ${tailorName}`);
    openBooking('Custom Tailoring Appointment');
  };

  return (
    <div>
      <section className="hero-section" style={{ padding: '5rem 2rem 4rem 2rem' }}>
        <div className="hero-overlay-pattern"></div>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Meet Our Master Tailors</h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.1rem', color: 'var(--beige-light)' }}>
            Our tailors possess decades of collective experience in luxury fashion. Request your preferred artisan to conduct your doorstep fitting session.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <span className="section-subtitle">Artisanal Craftsmanship</span>
          <h2 className="section-title">The Master Craftsmen</h2>
        </div>

        <div className="tailors-grid">
          {TAILORS_DATA.map((tailor) => (
            <div key={tailor.id} className="tailor-card animate-fade-in">
              <div className="tailor-avatar-block">
                <div className="tailor-avatar-pattern"></div>
                <div className="tailor-initials">{tailor.initials}</div>
              </div>
              
              <div className="tailor-card-info">
                <div className="tailor-header">
                  <h3>{tailor.name}</h3>
                  <span className="tailor-rating">
                    ★ {tailor.rating}
                  </span>
                </div>
                <span className="tailor-specialty-badge">{tailor.specialty}</span>
                <p className="tailor-bio">{tailor.bio}</p>
                
                <div className="tailor-stats">
                  <div className="stat-item">
                    <span>Experience</span>
                    <span>{tailor.experience}</span>
                  </div>
                  <div className="stat-item">
                    <span>Fits Done</span>
                    <span>{tailor.fitsCompleted}</span>
                  </div>
                  <div className="stat-item">
                    <span>Reviews</span>
                    <span>{tailor.reviewsCount}</span>
                  </div>
                </div>

                <button 
                  className="btn-primary" 
                  style={{ width: '100%' }}
                  onClick={() => handleRequestTailor(tailor.name)}
                >
                  Request Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="section-alt">
        <div className="section-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center' }}>
          <div style={{ border: '2px solid var(--beige-gold)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', backgroundColor: 'var(--white)' }}>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--emerald-deep)', marginBottom: '1rem' }}>
              The Golden Ratio of Styling
            </h3>
            <p style={{ marginBottom: '1.2rem', fontSize: '0.95rem' }}>
              Our doorstep fitting is not just about measuring inches. It is an interactive design consultation. Your visiting tailor assesses shoulder slope, posture, and chest profile to draft a custom pattern unique to your anatomy.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ padding: '1rem', border: '1px solid var(--beige-border)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <strong style={{ fontSize: '1.5rem', color: 'var(--emerald-deep)', display: 'block' }}>35+</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Anatomical Datapoints</span>
              </div>
              <div style={{ padding: '1rem', border: '1px solid var(--beige-border)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <strong style={{ fontSize: '1.5rem', color: 'var(--emerald-deep)', display: 'block' }}>100%</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Bespoke Drafting</span>
              </div>
            </div>
          </div>
          <div>
            <span className="section-subtitle">Our Quality Standard</span>
            <h2 style={{ fontSize: '2.4rem', color: 'var(--white)', marginBottom: '1.2rem' }}>
              Hand-Cut & Hand-Finished Detailings
            </h2>
            <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem' }}>
              Every shirt and trouser we tailor passes through strict multi-phase quality inspections. Our tailors focus on double-reinforced stitching, high-density buttonholes, hand-basted lining inserts, and perfect seam matching.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontWeight: 500 }}>
                <span style={{ color: 'var(--beige-gold)', fontSize: '1.2rem' }}>✓</span> German gutermann thread systems for durability
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontWeight: 500 }}>
                <span style={{ color: 'var(--beige-gold)', fontSize: '1.2rem' }}>✓</span> High collar stances & removable collar stays
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontWeight: 500 }}>
                <span style={{ color: 'var(--beige-gold)', fontSize: '1.2rem' }}>✓</span> Seamless side-slits & custom sleeve plackets
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
