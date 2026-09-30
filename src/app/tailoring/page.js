'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBooking } from '../../components/ClientLayoutWrapper';

export default function Tailoring() {
  const router = useRouter();
  const { openBooking } = useBooking();
  const [activeTab, setActiveTab] = useState('suits'); // 'suits' | 'shirts-pants' | 'ethnic'

  const handleBookServiceDirect = (serviceName, startingPrice, serviceNotes = '') => {
    const notes = `Service: ${serviceName}\nEstimated Starting Price: ₹${startingPrice}\n${serviceNotes}`;
    localStorage.setItem('tailors2u_booking_notes', notes);
    openBooking(serviceName);
  };

  return (
    <div className="porcelain-theme suit-stitching-page">
      {/* Hero / Page Header */}
      <section className="suit-hero-section">
        <div className="suit-hero-container">
          <div className="suit-hero-badge">
            <span className="badge-sparkle">✦</span> BESPOKE STITCHING & COUTURE <span className="badge-sparkle">✦</span>
          </div>
          <h1 className="suit-hero-title" style={{ color: '#ffffff' }}>
            Custom Suits & Artisanal Stitching
          </h1>
          <p className="suit-hero-subtitle" style={{ color: '#ffffff' }}>
            From sharp <strong style={{ color: '#ffd9be' }}>Two-Piece</strong> boardroom suits to majestic <strong style={{ color: '#ffd9be' }}>Three-Piece</strong> wedding ensembles, our master tailors visit your doorstep to record 35+ precision anatomical measurements, draft an individual pattern, and handcraft your garment.
          </p>

          <div className="hero-stats-row">
            <div className="hero-stat-pill">
              <strong>35+</strong> Anatomical Datapoints
            </div>
            <div className="hero-stat-pill">
              <strong>100%</strong> Doorstep Trial & Fitting
            </div>
            <div className="hero-stat-pill">
              <strong>30-Day</strong> Free Fit Guarantee
            </div>
            <div className="hero-stat-pill">
              <strong>German</strong> Gütermann Thread Systems
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Interactive Category Navigation Bar */}
      <div className="category-tabs-wrapper">
        <div className="category-tabs-container">
          <div className="dynamic-tabs-pill-track">
            <button
              className={`dynamic-category-card ${activeTab === 'suits' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('suits');
                router.push('/suits');
              }}
              type="button"
            >
              <div className="tab-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16l-2 17H6L4 4z"/><path d="M4 4l8 8 8-8"/><path d="M12 12v9"/><path d="M9 4v3"/><path d="M15 4v3"/></svg>
                {activeTab === 'suits' && <span className="tab-live-pulse"></span>}
              </div>
              <div className="tab-text-content">
                <div className="tab-main-title">
                  <span>Suits Stitching</span>
                  <span className="tab-badge-pill">2-Piece & 3-Piece</span>
                </div>
                <span className="tab-sub-info">Jackets, Trousers & Vests • From ₹3,999</span>
              </div>
            </button>

            <button
              className={`dynamic-category-card ${activeTab === 'shirts-pants' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('shirts-pants');
                router.push('/shirts-and-trousers');
              }}
              type="button"
            >
              <div className="tab-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/><path d="M12 2v18"/></svg>
                {activeTab === 'shirts-pants' && <span className="tab-live-pulse"></span>}
              </div>
              <div className="tab-text-content">
                <div className="tab-main-title">
                  <span>Shirts & Trousers</span>
                  <span className="tab-badge-pill">Daily Bespoke</span>
                </div>
                <span className="tab-sub-info">Dress Shirts & Gurkha Pants • From ₹599</span>
              </div>
            </button>

            <button
              className={`dynamic-category-card ${activeTab === 'ethnic' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('ethnic');
                handleBookServiceDirect('Custom Stitching: Ethnic & Ceremonial', 899, 'Sherwani, Bandhgala & Kurta Pajama');
              }}
              type="button"
            >
              <div className="tab-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 3l5 3 5-3 3 5-2 1h-2v12H8V9H6L4 8z"/><path d="M12 6v6"/></svg>
                {activeTab === 'ethnic' && <span className="tab-live-pulse"></span>}
              </div>
              <div className="tab-text-content">
                <div className="tab-main-title">
                  <span>Ethnic & Ceremonial</span>
                  <span className="tab-badge-pill">Royal Couture</span>
                </div>
                <span className="tab-sub-info">Sherwani, Bandhgala & Kurta • From ₹899</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Scoped Page Styles */}
      <style jsx>{`
        .suit-stitching-page {
          min-height: calc(100vh - 80px);
          background-color: #fcfaf6;
          color: #1a2923;
          padding-bottom: 6rem;
        }

        /* Hero */
        .suit-hero-section {
          background: radial-gradient(circle at 50% 30%, #0d5c48 0%, #064e3b 100%);
          color: #ffffff !important;
          padding: 4.5rem 1.5rem 3.5rem 1.5rem;
          text-align: center;
        }

        .suit-hero-container {
          max-width: 920px;
          margin: 0 auto;
        }

        .suit-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 217, 190, 0.15);
          border: 1px solid rgba(255, 217, 190, 0.4);
          color: #ffd9be !important;
          padding: 0.4rem 1.1rem;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 2px;
          margin-bottom: 1.25rem;
        }

        .badge-sparkle {
          color: #ffd9be !important;
          font-size: 0.9rem;
        }

        .suit-hero-title {
          font-family: var(--font-serif, Georgia, serif);
          font-size: 2.9rem;
          line-height: 1.15;
          margin-bottom: 1rem;
          color: #ffffff !important;
          font-weight: 700;
        }

        .suit-hero-subtitle {
          color: #ffffff !important;
          font-size: 1.15rem;
          line-height: 1.7;
          max-width: 780px;
          margin: 0 auto 2rem auto;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
        }

        .suit-hero-subtitle strong {
          color: #ffd9be !important;
          font-weight: 700;
        }

        .hero-stats-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.85rem;
        }

        .hero-stat-pill {
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 217, 190, 0.25);
          color: #ffffff !important;
          padding: 0.5rem 1.1rem;
          border-radius: 8px;
          font-size: 0.88rem;
        }

        .hero-stat-pill strong {
          color: #ffd9be !important;
          font-size: 1rem;
        }

        /* Dynamic Category Tabs - Dark Luxury Black Theme */
        .category-tabs-wrapper {
          background: #000000;
          border-bottom: 1px solid rgba(255, 217, 190, 0.15);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          padding: 1.5rem 0 2rem 0;
          margin-bottom: 2rem;
        }

        .category-tabs-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .dynamic-tabs-pill-track {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          background: #0a110e;
          border: 1.5px solid rgba(255, 217, 190, 0.22);
          padding: 0.85rem;
          border-radius: 20px;
          box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.6);
        }

        .dynamic-category-card {
          display: flex;
          align-items: center;
          gap: 1.1rem;
          padding: 1.1rem 1.35rem;
          border: 1.5px solid rgba(255, 217, 190, 0.12);
          border-radius: 14px;
          background: #121c18;
          color: #ffffff;
          cursor: pointer;
          transition: all 0.28s cubic-bezier(0.2, 0.8, 0.2, 1);
          text-align: left;
          position: relative;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
        }

        .dynamic-category-card:hover {
          transform: translateY(-3px);
          background: #172620;
          border-color: #ffd9be;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
        }

        .dynamic-category-card.active {
          background: linear-gradient(135deg, #064e3b 0%, #0d6951 100%);
          border-color: #ffd9be;
          color: #ffffff;
          box-shadow: 0 10px 28px rgba(6, 78, 59, 0.45), inset 0 1px 0 rgba(255, 217, 190, 0.35);
          transform: translateY(-2px) scale(1.01);
        }

        .tab-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #080f0c;
          color: #ffd9be;
          border: 1px solid rgba(255, 217, 190, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          position: relative;
          transition: all 0.25s ease;
        }

        .dynamic-category-card:hover .tab-icon-box {
          background: #064e3b;
          color: #ffffff;
          border-color: #ffd9be;
        }

        .dynamic-category-card.active .tab-icon-box {
          background: rgba(255, 217, 190, 0.2);
          color: #ffd9be;
          border: 1px solid rgba(255, 217, 190, 0.5);
        }

        .tab-live-pulse {
          position: absolute;
          top: -3px;
          right: -3px;
          width: 10px;
          height: 10px;
          background-color: #ffd9be;
          border-radius: 50%;
          box-shadow: 0 0 0 rgba(255, 217, 190, 0.7);
          animation: tab-pulse-anim 1.8s infinite;
        }

        @keyframes tab-pulse-anim {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(255, 217, 190, 0.8);
          }
          70% {
            transform: scale(1.1);
            box-shadow: 0 0 0 8px rgba(255, 217, 190, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(255, 217, 190, 0);
          }
        }

        .tab-text-content {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          min-width: 0;
          flex: 1;
        }

        .tab-main-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .tab-main-title span:first-child {
          font-weight: 700;
          font-size: 1.05rem;
          font-family: var(--font-serif, Georgia, serif);
          letter-spacing: -0.2px;
          color: #ffffff;
        }

        .dynamic-category-card.active .tab-main-title span:first-child {
          color: #ffd9be;
        }

        .tab-badge-pill {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
          background: rgba(255, 217, 190, 0.12);
          color: #ffd9be;
          border: 1px solid rgba(255, 217, 190, 0.25);
          transition: all 0.25s ease;
        }

        .dynamic-category-card.active .tab-badge-pill {
          background: rgba(255, 217, 190, 0.25);
          color: #ffd9be;
          border: 1px solid rgba(255, 217, 190, 0.5);
        }

        .tab-sub-info {
          font-size: 0.8rem;
          color: #a0b6af;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: all 0.25s ease;
        }

        .dynamic-category-card.active .tab-sub-info {
          color: #e2ece9;
        }

        @media (max-width: 960px) {
          .dynamic-tabs-pill-track {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
