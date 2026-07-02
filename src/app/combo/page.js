'use client';

import React from 'react';
import { useBooking } from '../../components/ClientLayoutWrapper';

const COMBOS_DATA = [
  {
    id: 'c1',
    name: 'Standard Combo',
    price: '199',
    subtitle: 'The Essential Wardrobe',
    desc: 'Perfect for day-to-day business comfort and fresh office basics.',
    featured: false,
    serviceKey: 'Combo Package: Standard',
    features: [
      '2 Custom Shirts (Choice of standard cotton & cotton-blends)',
      '1 Custom Trouser (Precisely styled & tapered)',
      'Standard collar types (Classic, Button-down) & button styles',
      'Doorstep styling & fitting session included',
      'Delivery in 10 working days',
      '1 complimentary fit adjustment within 14 days of delivery'
    ]
  },
  {
    id: 'c2',
    name: 'Premium Combo',
    price: '299',
    subtitle: 'The Executive Elegance',
    desc: 'Our most popular bundle, featuring high-end fabrics and customizable design details.',
    featured: true,
    serviceKey: 'Combo Package: Premium',
    features: [
      '2 Custom Shirts (Choice of Supima Luxury or Egyptian Giza Cotton)',
      '2 Custom Trousers (Fine linen or lightweight stretch cotton-blends)',
      'Advanced options: custom monograms, contrast lining, cuff details',
      'Personal fitting session conducted by a Senior Tailor',
      'Priority delivery in 7 working days',
      'Unlimited free fit alterations within 30 days of delivery'
    ]
  },
  {
    id: 'c3',
    name: 'Luxury Combo',
    price: '499',
    subtitle: 'The Signature Bespoke',
    desc: 'The ultimate tailoring prestige for weddings, formal galas, and VIP styling.',
    featured: false,
    serviceKey: 'Combo Package: Luxury',
    features: [
      '1 Bespoke Wool Suit (Fully structured Jacket + Trousser in Super 140s Wool)',
      '2 Bespoke Shirts (Choice of Mulberry Silk or double-ply Egyptian Cotton)',
      'Heritage features: full canvas build, hand-finished lapel roll, horn buttons',
      'Dedicated fit session and style design with our Master Tailor',
      'Expedited VIP delivery in 5 working days',
      'Lifetime alteration guarantee on the suit'
    ]
  }
];

export default function Combo() {
  const { openBooking } = useBooking();

  const handleSelectPackage = (serviceKey) => {
    openBooking(serviceKey);
  };

  return (
    <div>
      <section className="hero-section" style={{ padding: '5rem 2rem 4rem 2rem' }}>
        <div className="hero-overlay-pattern"></div>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Bespoke Combo Bundles</h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.1rem', color: 'var(--beige-light)' }}>
            Maximize value without sacrificing quality. Choose from our standard, premium, and luxury bundles for complete doorstep customization.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="combo-grid">
          {COMBOS_DATA.map((combo) => (
            <div 
              key={combo.id} 
              className={`combo-column ${combo.featured ? 'featured' : ''} animate-fade-in`}
            >
              {combo.featured && (
                <span className="featured-tag">Most Popular</span>
              )}
              
              <h2 className="combo-name">{combo.name}</h2>
              <span className="combo-subtitle">{combo.subtitle}</span>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '1.8rem', minHeight: '45px' }}>
                {combo.desc}
              </p>

              <div className="combo-price-block">
                <span className="combo-currency">$</span>
                <span className="combo-price">{combo.price}</span>
                <span className="combo-period"> / package</span>
              </div>

              <ul className="combo-features">
                {combo.features.map((feature, idx) => (
                  <li key={idx} className="combo-feature-item">
                    <span className="combo-feature-icon">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`combo-action-btn ${combo.featured ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => handleSelectPackage(combo.serviceKey)}
                style={!combo.featured ? { color: 'var(--emerald-deep)', borderColor: 'var(--emerald-deep)' } : {}}
              >
                Select Package & Book
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Package Comparison FAQ */}
      <section className="section-alt">
        <div className="section-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="section-header" style={{ marginBottom: '3rem' }}>
            <span className="section-subtitle">Got Questions?</span>
            <h2 className="section-title">Package Details FAQ</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ backgroundColor: 'var(--white)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--beige-border)' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--emerald-deep)', marginBottom: '0.8rem' }}>
                Can I mix and match fabrics in a combo package?
              </h3>
              <p style={{ fontSize: '0.95rem' }}>
                Absolutely. If your package includes 2 shirts, you can select Giza Cotton for one and Linen for the other. During the fitting session, you can browse and match any fabric cards included in your package tier.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--white)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--beige-border)' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--emerald-deep)', marginBottom: '0.8rem' }}>
                What happens if my body measurements change after delivery?
              </h3>
              <p style={{ fontSize: '0.95rem' }}>
                Our Standard combo includes 1 free alteration within 14 days. Our Premium combo gives you 30 days of unlimited alterations. The Luxury combo includes a lifetime alteration warranty. If you gain or lose weight, we will adjust the seams for you!
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--white)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--beige-border)' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--emerald-deep)', marginBottom: '0.8rem' }}>
                Are there any hidden travel charges for doorstep fittings?
              </h3>
              <p style={{ fontSize: '0.95rem' }}>
                None at all. The price shown for all our packages includes the travel and consultation time of our stylist and tailors. You only pay for the tailoring package price.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
