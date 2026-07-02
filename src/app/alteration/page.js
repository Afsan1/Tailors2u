'use client';

import React, { useState } from 'react';
import { useBooking } from '../../components/ClientLayoutWrapper';

const ALTERATIONS_DATA = {
  shirt: {
    title: 'Shirt Alterations',
    icon: '👔',
    items: [
      { id: 's1', name: 'Sleeve Shortening', price: 15, desc: 'Shorten shirt sleeves to exact length' },
      { id: 's2', name: 'Slim Fit (Taper Sides)', price: 20, desc: 'Taper the torso sides for a modern contour' },
      { id: 's3', name: 'Shoulder Adjustment', price: 25, desc: 'Raise or narrow the shoulder seams' },
      { id: 's4', name: 'Collar Adjustment', price: 18, desc: 'Resize or repair the collar band' },
      { id: 's5', name: 'Length Shortening', price: 12, desc: 'Shorten shirt bottom hem' }
    ]
  },
  pant: {
    title: 'Pant & Trouser Alterations',
    icon: '👖',
    items: [
      { id: 'p1', name: 'Hemming (Length)', price: 15, desc: 'Shorten or lengthen pants with plain/cuffed hem' },
      { id: 'p2', name: 'Waist & Seat Adjustment', price: 22, desc: 'Taper or let out the waist and seat area' },
      { id: 'p3', name: 'Leg Tapering (Slim Fit)', price: 18, desc: 'Taper legs from thigh to ankle' },
      { id: 'p4', name: 'Crotch & Rise Adjustment', price: 25, desc: 'Adjust the height and fit of the rise' },
      { id: 'p5', name: 'Zipper/Button Repair', price: 12, desc: 'Replace broken zippers or buttons' }
    ]
  },
  kurtas: {
    title: 'Kurtas & Ethnic Alterations',
    icon: '✨',
    items: [
      { id: 'k1', name: 'Kurta Side Tapering', price: 20, desc: 'Slim down the side seams of the Kurta' },
      { id: 'k2', name: 'Sleeve Shortening', price: 15, desc: 'Shorten Kurta sleeves (with border adjustment)' },
      { id: 'k3', name: 'Neckline Alteration', price: 22, desc: 'Resize or change neck styles (e.g. Mandarin collar)' },
      { id: 'k4', name: 'Length Shortening', price: 15, desc: 'Shorten bottom hem of the Kurta' },
      { id: 'k5', name: 'Add Pockets / Side Slits', price: 12, desc: 'Add hidden pockets or customize side slits' }
    ]
  }
};

export default function Alteration() {
  const [selectedItems, setSelectedItems] = useState({});
  const { openBooking } = useBooking();

  const handleToggleItem = (category, item) => {
    const key = `${category}-${item.id}`;
    setSelectedItems(prev => {
      const copy = { ...prev };
      if (copy[key]) {
        delete copy[key];
      } else {
        copy[key] = { ...item, categoryTitle: ALTERATIONS_DATA[category].title, category };
      }
      return copy;
    });
  };

  const getCategoryTotal = (category) => {
    return Object.values(selectedItems)
      .filter(item => item.category === category)
      .reduce((sum, item) => sum + item.price, 0);
  };

  const selectedList = Object.values(selectedItems);
  const totalPrice = selectedList.reduce((sum, item) => sum + item.price, 0);

  const handleBookAlteration = () => {
    if (selectedList.length === 0) {
      openBooking('Alteration: Shirt');
      return;
    }

    // Pre-determine primary service type based on majority item category
    const categoriesCount = selectedList.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + 1;
      return acc;
    }, {});

    let primaryCategory = 'shirt';
    let maxCount = 0;
    Object.entries(categoriesCount).forEach(([cat, count]) => {
      if (count > maxCount) {
        maxCount = count;
        primaryCategory = cat;
      }
    });

    const serviceMap = {
      shirt: 'Alteration: Shirt',
      pant: 'Alteration: Pant',
      kurtas: 'Alteration: Kurtas'
    };

    const notesText = `Selected Alterations:\n${selectedList.map(item => `- [${item.categoryTitle}] ${item.name} ($${item.price})`).join('\n')}\n\nEstimated Total: $${totalPrice}`;
    
    // Open booking modal and pre-fill details!
    openBooking(serviceMap[primaryCategory]);
    
    // We can also temporarily set this in localstorage or window global if we want the booking modal to pull it,
    // let's save the notes to localstorage so our booking modal can retrieve it!
    localStorage.setItem('tailors2u_booking_notes', notesText);
  };

  return (
    <div>
      <section className="hero-section" style={{ padding: '5rem 2rem 4rem 2rem' }}>
        <div className="hero-overlay-pattern"></div>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Bespoke Garment Alterations</h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.1rem', color: 'var(--beige-light)' }}>
            Restore your favorite clothes to absolute perfection. Select your garment type and desired alterations below to calculate an instant cost estimate.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="alteration-container">
          {/* Options Section */}
          <div className="alteration-options">
            {Object.entries(ALTERATIONS_DATA).map(([catKey, catData]) => (
              <div key={catKey} className="alteration-category">
                <div className="category-title">
                  <h2>
                    <span style={{ marginRight: '0.8rem' }}>{catData.icon}</span>
                    {catData.title}
                  </h2>
                  {getCategoryTotal(catKey) > 0 && (
                    <span style={{ fontSize: '1rem', color: 'var(--emerald-deep)', fontWeight: 'bold' }}>
                      Subtotal: ${getCategoryTotal(catKey)}
                    </span>
                  )}
                </div>
                <div className="alteration-items-list">
                  {catData.items.map((item) => {
                    const isSelected = !!selectedItems[`${catKey}-${item.id}`];
                    return (
                      <div 
                        key={item.id} 
                        className={`alteration-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleToggleItem(catKey, item)}
                      >
                        <div className="item-details">
                          <input 
                            type="checkbox" 
                            className="item-checkbox" 
                            checked={isSelected}
                            onChange={() => {}} // handled by item click
                          />
                          <div>
                            <span className="item-name">{item.name}</span>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                              {item.desc}
                            </p>
                          </div>
                        </div>
                        <span className="item-price">${item.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Estimation Sidebar */}
          <div className="calculator-card">
            <h3>Estimation Summary</h3>
            <div className="calc-selections">
              {selectedList.length === 0 ? (
                <p className="calc-empty">No alterations selected yet. Select items on the left to begin.</p>
              ) : (
                selectedList.map((item) => (
                  <div key={item.id} className="calc-selected-item">
                    <span>{item.name}</span>
                    <span>${item.price}</span>
                  </div>
                ))
              )}
            </div>

            <div className="calc-total">
              <span>Estimated Total:</span>
              <span className="calc-total-amount">${totalPrice}</span>
            </div>

            <button 
              className="btn-primary" 
              style={{ width: '100%' }}
              onClick={handleBookAlteration}
            >
              {selectedList.length > 0 ? 'Book Selected Fittings' : 'Book Alteration Fitting'}
            </button>

            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                *Note: Final measurements and fit analysis will be conducted by our visiting tailor before stitching.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
