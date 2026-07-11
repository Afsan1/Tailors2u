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
  },
  {
    id: 'f8',
    name: 'Armani Suiting Wool',
    category: 'armani',
    patternClass: 'fabric-pattern-armani',
    desc: 'Exclusive high-end suiting fabric from the house of Armani. Exceptionally fluid drape, structure, and prestige.',
    origin: 'Italy',
    weight: '275 gsm',
    threadCount: 'Super 150s Wool-Silk',
    breathability: 'High',
    badge: 'Armani Suiting',
    variants: [
      { id: 'v1', name: 'Cream / Beige', colorHex: '#e8e4d3', image: '/armani.png' },
      { id: 'v2', name: 'Slate Grey', colorHex: '#737a7a', image: '/armani_grey.png' },
      { id: 'v3', name: 'Chocolate Brown', colorHex: '#4d2d22', image: '/armani_brown.png' },
      { id: 'v4', name: 'Dark Espresso', colorHex: '#2b1f1d', image: '/armani_darkbrown.png' },
      { id: 'v5', name: 'Royal Purple', colorHex: '#442b45', image: '/armani_purple.png' },
      { id: 'v6', name: 'Burgundy Wine', colorHex: '#421f24', image: '/armani_burgundy.png' }
    ]
  }
];

export default function Fabric() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeLightboxFabric, setActiveLightboxFabric] = useState(null);
  const [selectedVariants, setSelectedVariants] = useState({});
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
    <div className="fabric-page-wrapper">

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
            {['all', 'cotton', 'linen', 'other', 'armani'].map((cat) => (
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
            {filteredFabrics.map((fabric) => {
              const activeVariantId = selectedVariants[fabric.id] || (fabric.variants ? fabric.variants[0].id : null);
              const activeVariant = fabric.variants?.find(v => v.id === activeVariantId);
              return (
                <div key={fabric.id} className="fabric-card animate-fade-in">
                  <div 
                    className="fabric-sample-render" 
                    style={{ cursor: 'zoom-in' }}
                    onClick={() => setActiveLightboxFabric({ ...fabric, activeVariant })}
                    title="Click to view full fabric swatch"
                  >
                    <div 
                      className={fabric.patternClass}
                      style={activeVariant ? { backgroundImage: `url(${activeVariant.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                    ></div>
                    <span className="fabric-badge">{fabric.badge}</span>
                  </div>
                  <div className="fabric-info">
                    <div className="fabric-title-row">
                      <h3>{fabric.name}</h3>
                      <span className="fabric-origin">{fabric.origin}</span>
                    </div>
                    <p className="fabric-description">{fabric.desc}</p>

                    {fabric.variants && (
                      <div style={{ marginBottom: '1.2rem', marginTop: '0.6rem' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--beige-light)', display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                          Select Color: <span style={{ color: 'var(--white)', fontWeight: 600 }}>{activeVariant?.name}</span>
                        </span>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {fabric.variants.map((v) => (
                            <button
                              key={v.id}
                              style={{
                                width: '26px',
                                height: '26px',
                                borderRadius: '50%',
                                backgroundColor: v.colorHex,
                                border: activeVariantId === v.id ? '2px solid var(--beige-gold)' : '1px solid rgba(255,255,255,0.2)',
                                cursor: 'pointer',
                                padding: 0,
                                transform: activeVariantId === v.id ? 'scale(1.15)' : 'scale(1)',
                                boxShadow: activeVariantId === v.id ? '0 0 8px var(--beige-gold)' : 'none',
                                transition: 'all 0.2s ease',
                                outline: 'none'
                              }}
                              onClick={() => {
                                setSelectedVariants(prev => ({ ...prev, [fabric.id]: v.id }));
                              }}
                              title={v.name}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  
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
              );
            })}
          </div>
        )}
      </section>

      {/* Lightbox Modal for Fabric Swatch Popup */}
      {activeLightboxFabric && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem',
            animation: 'modalFadeIn 0.25s ease-out forwards'
          }}
          onClick={() => setActiveLightboxFabric(null)}
        >
          <div 
            className="lightbox-modal-content"
            style={{
              backgroundColor: 'var(--emerald-deep)',
              border: '1px solid rgba(197, 168, 128, 0.3)',
              borderRadius: '16px',
              maxWidth: '500px',
              width: '100%',
              maxHeight: '80vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              padding: 0,
              paddingRight: '6px',
              position: 'relative',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
              animation: 'modalScaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button - Fixed position */}
            <button 
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1.5rem',
                background: 'rgba(0, 0, 0, 0.25)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--beige-gold)',
                fontSize: '1.5rem',
                cursor: 'pointer',
                lineHeight: 1,
                padding: 0,
                transition: 'transform 0.2s ease',
                zIndex: 10
              }}
              onClick={() => setActiveLightboxFabric(null)}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              &times;
            </button>

            {/* Scrollable contents wrapper */}
            <div 
              className="lightbox-scroll-container"
              style={{ 
                overflowY: 'auto',
                flexGrow: 1,
                padding: '2.5rem 1.8rem 3rem 2.2rem'
              }}
            >
              <h3 style={{ 
                fontSize: '1.6rem', 
                color: 'var(--beige-gold)', 
                marginBottom: '0.5rem',
                fontFamily: 'var(--font-serif)',
                textAlign: 'center'
              }}>
                {activeLightboxFabric.name}
              </h3>
              
              <p style={{ 
                color: 'var(--white)', 
                fontSize: '0.9rem', 
                textAlign: 'center', 
                marginBottom: '1.5rem',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Origin: {activeLightboxFabric.origin}
              </p>

              {/* Large swatch render box */}
              <div 
                style={{
                  width: '100%',
                  height: '300px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '2px solid rgba(197, 168, 128, 0.4)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                  marginBottom: '1.5rem',
                  position: 'relative'
                }}
              >
                <div 
                  className={activeLightboxFabric.patternClass}
                  style={activeLightboxFabric.activeVariant ? { backgroundImage: `url(${activeLightboxFabric.activeVariant.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                ></div>
                <span className="fabric-badge" style={{ top: '1rem', right: '1rem' }}>
                  {activeLightboxFabric.badge}
                </span>
              </div>

              {/* In-Lightbox Color Picker */}
              {activeLightboxFabric.variants && (
                <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--beige-light)', display: 'block', marginBottom: '0.5rem' }}>
                    Available Colors: <span style={{ color: 'var(--white)', fontWeight: 'bold' }}>{activeLightboxFabric.activeVariant?.name}</span>
                  </span>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {activeLightboxFabric.variants.map((v) => (
                      <button
                        key={v.id}
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          backgroundColor: v.colorHex,
                          border: activeLightboxFabric.activeVariant?.id === v.id ? '2px solid var(--beige-gold)' : '1px solid rgba(255,255,255,0.2)',
                          cursor: 'pointer',
                          padding: 0,
                          transform: activeLightboxFabric.activeVariant?.id === v.id ? 'scale(1.15)' : 'scale(1)',
                          boxShadow: activeLightboxFabric.activeVariant?.id === v.id ? '0 0 8px var(--beige-gold)' : 'none',
                          transition: 'all 0.2s ease',
                          outline: 'none'
                        }}
                        onClick={() => {
                          setActiveLightboxFabric(prev => ({ ...prev, activeVariant: v }));
                          setSelectedVariants(prev => ({ ...prev, [activeLightboxFabric.id]: v.id }));
                        }}
                        title={v.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              <p style={{ 
                color: 'var(--beige-light)', 
                lineHeight: '1.6', 
                textAlign: 'center',
                fontSize: '1rem',
                marginBottom: '1.5rem'
              }}>
                {activeLightboxFabric.desc}
              </p>

              <div 
                className="lightbox-meta-grid"
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '1rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(197, 168, 128, 0.1)',
                  marginBottom: '1.5rem'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Weight</span>
                  <span style={{ color: 'var(--white)', fontWeight: 'bold' }}>{activeLightboxFabric.weight}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Thread Count</span>
                  <span style={{ color: 'var(--white)', fontWeight: 'bold' }}>{activeLightboxFabric.threadCount}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Breathability</span>
                  <span style={{ color: 'var(--white)', fontWeight: 'bold' }}>{activeLightboxFabric.breathability}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Category</span>
                  <span style={{ color: 'var(--white)', fontWeight: 'bold', textTransform: 'capitalize' }}>{activeLightboxFabric.category}</span>
                </div>
              </div>

              <button 
                className="btn-primary" 
                style={{ width: '100%', padding: '1rem' }}
                onClick={() => {
                  handleBookWithFabric(activeLightboxFabric.name);
                  setActiveLightboxFabric(null);
                }}
              >
                Book Fitting With This Fabric
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
