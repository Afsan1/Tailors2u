'use client';

import React, { useState } from 'react';
import { useBooking } from '../../components/ClientLayoutWrapper';

const FABRICS_DATA = [
  {
    id: 'f1',
    name: 'Giza Egyptian Cotton',
    category: 'cotton',
    patternClass: 'fabric-pattern-cotton',
    desc: 'The gold standard of shirting. Long-staple fibers yield an incredibly soft hand-feel and beautiful natural luster.',
    origin: 'Egypt',
    weight: '110 gsm',
    threadCount: '120s Double Ply',
    breathability: 'Excellent',
    badge: 'Best Seller'
  },
  {
    id: 'f2',
    name: 'Supima Luxury Cotton',
    category: 'cotton',
    patternClass: 'fabric-pattern-cotton',
    desc: 'Twice as strong as regular cotton, Supima is resilient, retains color exceptionally well, and becomes softer with each wash.',
    origin: 'USA',
    weight: '125 gsm',
    threadCount: '100s Double Ply',
    breathability: 'High',
    badge: 'Premium Fit'
  },
  {
    id: 'f3',
    name: 'Pure Irish Linen',
    category: 'linen',
    patternClass: 'fabric-pattern-linen',
    desc: 'Woven from premium flax, this open-weave fabric is highly breathable and features the signature natural slub texture.',
    origin: 'Ireland',
    weight: '145 gsm',
    threadCount: 'N/A (Pure Flax)',
    breathability: 'Outstanding',
    badge: 'Summer Essential'
  },
  {
    id: 'f4',
    name: 'Cotton-Linen Blend',
    category: 'linen',
    patternClass: 'fabric-pattern-linen',
    desc: 'Combines the structured crispness of linen with the soft, wrinkle-resisting features of premium cotton.',
    origin: 'Italy',
    weight: '135 gsm',
    threadCount: '90s Blend',
    breathability: 'High',
    badge: 'Casual Chic'
  },
  {
    id: 'f5',
    name: 'Mulberry Royal Silk',
    category: 'other',
    patternClass: 'fabric-pattern-silk',
    desc: 'Luxurious heavy silk with a magnificent fluid drape and a subtle, high-end satin glow. Perfect for kurtas and wedding attire.',
    origin: 'India',
    weight: '90 gsm',
    threadCount: '100% Pure Silk',
    breathability: 'Medium',
    badge: 'Wedding Grade'
  },
  {
    id: 'f6',
    name: 'Fine Merino Wool (Super 140s)',
    category: 'other',
    patternClass: 'fabric-pattern-wool',
    desc: 'Extremely fine wool fibers that regulate temperature naturally. Wrinkle-resistant with a premium drape for bespoke suits.',
    origin: 'Australia',
    weight: '260 gsm',
    threadCount: 'Super 140s',
    breathability: 'Medium-High',
    badge: 'Tailoring Grade'
  },
  {
    id: 'f7',
    name: 'Cashmere-Silk Blend',
    category: 'other',
    patternClass: 'fabric-pattern-wool',
    desc: 'The ultimate in comfort. Cashmere warmth combined with silk elasticity, producing a coat or blazer of unmatched prestige.',
    origin: 'Mongolia',
    weight: '290 gsm',
    threadCount: 'Exclusive Blend',
    breathability: 'Medium',
    badge: 'Signature Luxury'
  }
];

export default function Fabric() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { openBooking } = useBooking();

  const handleBookWithFabric = (fabricName) => {
    localStorage.setItem('tailors2u_booking_notes', `Customer is interested in custom tailoring using fabric: ${fabricName}`);
    openBooking('Bespoke Fabric Consultation');
  };

  const filteredFabrics = FABRICS_DATA.filter(fabric => {
    const matchesSearch = fabric.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          fabric.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          fabric.origin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || fabric.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <section className="hero-section" style={{ padding: '5rem 2rem 4rem 2rem' }}>
        <div className="hero-overlay-pattern"></div>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Bespoke Fabrics</h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.1rem', color: 'var(--beige-light)' }}>
            We source our fabrics from the world's most prestigious mills. Feel the differences in weight, weave, and texture during your doorstep fitting.
          </p>
        </div>
      </section>

      <section className="section">
        {/* Search and Filters */}
        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search fabrics by name, mill, or origin..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="filter-tabs">
            {['all', 'cotton', 'linen', 'other'].map((cat) => (
              <button
                key={cat}
                className={`filter-tab ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1) + (cat === 'other' ? 's (Silk / Wool)' : '')}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Grid */}
        {filteredFabrics.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            <h3>No fabrics found matching your criteria.</h3>
            <p style={{ marginTop: '0.5rem' }}>Try clearing your search or changing the filter category.</p>
          </div>
        ) : (
          <div className="fabric-grid">
            {filteredFabrics.map((fabric) => (
              <div key={fabric.id} className="fabric-card animate-fade-in">
                <div className="fabric-sample-render">
                  <div className={fabric.patternClass}></div>
                  <span className="fabric-badge">{fabric.badge}</span>
                </div>
                <div className="fabric-info">
                  <div className="fabric-title-row">
                    <h3>{fabric.name}</h3>
                    <span className="fabric-origin">{fabric.origin}</span>
                  </div>
                  <p className="fabric-description">{fabric.desc}</p>
                  
                  <div className="fabric-meta-grid">
                    <div className="fabric-meta-item">
                      <span>Weight</span>
                      <span>{fabric.weight}</span>
                    </div>
                    <div className="fabric-meta-item">
                      <span>Thread Count</span>
                      <span>{fabric.threadCount}</span>
                    </div>
                    <div className="fabric-meta-item">
                      <span>Breathability</span>
                      <span>{fabric.breathability}</span>
                    </div>
                    <div className="fabric-meta-item">
                      <span>Category</span>
                      <span style={{ textTransform: 'capitalize' }}>{fabric.category}</span>
                    </div>
                  </div>

                  <button 
                    className="btn-primary" 
                    style={{ width: '100%', padding: '0.8rem' }}
                    onClick={() => handleBookWithFabric(fabric.name)}
                  >
                    Select & Book Fitting
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
