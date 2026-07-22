'use client';

import React, { useState } from 'react';
import { useBooking } from '../../components/ClientLayoutWrapper';

const Icons = {
  shirt: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
      <path d="M12 2v18" />
      <path d="M12 6l-3-3" />
      <path d="M12 6l3-3" />
    </svg>
  ),
  tshirt: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l3 5-3 2v11H6V10L3 8z" />
      <path d="M9 3a3 3 0 0 0 6 0" />
    </svg>
  ),
  pant: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2h12v3H6z" />
      <path d="M6 5l1 16h3.5L12 10l1.5 11H17L18 5" />
    </svg>
  ),
  kurtas: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3l5 3 5-3 3 5-2 1h-2v12H8V9H6L4 8z" />
      <path d="M12 6v6" />
    </svg>
  ),
  suit: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16l-2 17H6L4 4z" />
      <path d="M4 4l8 8 8-8" />
      <path d="M12 12v9" />
      <path d="M9 4v3" />
      <path d="M15 4v3" />
    </svg>
  ),
  dress: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 2l-1 5 4 2 4-2-1-5z" />
      <path d="M8 7L4 22h16L16 7" />
    </svg>
  ),
  kurti: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 2h10l2 5-2 2h-1v11H8V9H7L5 7z" />
      <path d="M12 2v5" />
    </svg>
  ),
  blouse: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4h12l2 4-2 2h-2v6H8v-6H6L4 8z" />
      <path d="M9 4a3 3 0 0 0 6 0" />
    </svg>
  ),
  lehenga: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3h8v2H8z" />
      <path d="M8 5l-5 16h18L16 5" />
      <path d="M3 21c3-2 6-2 9 0 3-2 6-2 9 0" />
    </svg>
  ),
};

const ALTERATIONS_DATA = {
  mens: {
    shirt: {
      title: 'Shirt Alterations',
      icon: Icons.shirt,
      items: [
        { id: 'ms1', name: 'Sleeve Shortening', price: 149, desc: 'Shorten shirt sleeves to exact length' },
        { id: 'ms2', name: 'Slim Fit (Taper Sides)', price: 149, desc: 'Taper the torso sides for a modern contour' },
        { id: 'ms3', name: 'Shoulder Adjustment', price: 149, desc: 'Raise or narrow the shoulder seams' },
        { id: 'ms4', name: 'Collar Adjustment', price: 149, desc: 'Resize or repair the collar band' },
        { id: 'ms5', name: 'Length Shortening', price: 149, desc: 'Shorten shirt bottom hem' },
      ],
    },
    tshirt: {
      title: 'T-Shirt & Polo Alterations',
      icon: Icons.tshirt,
      items: [
        { id: 'ts1', name: 'Sleeve Shortening', price: 149, desc: 'Shorten sleeves with clean cover-stitch hem' },
        { id: 'ts2', name: 'Slim Fit (Side Tapering)', price: 149, desc: 'Take in torso sides for a streamlined fit' },
        { id: 'ts3', name: 'Length Shortening', price: 149, desc: 'Shorten overall T-shirt / polo body length' },
        { id: 'ts4', name: 'Collar & Neckline Adjustment', price: 149, desc: 'Resize or repair crew neck, V-neck, or polo collar' },
        { id: 'ts5', name: 'Shoulder Narrowing', price: 149, desc: 'Adjust droopy shoulder seams' },
        { id: 'ts6', name: 'Chest & Armhole Fitting', price: 149, desc: 'Tighten or adjust chest width and armhole comfort' },
      ],
    },
    pant: {
      title: 'Pant & Trouser Alterations',
      icon: Icons.pant,
      items: [
        { id: 'mp1', name: 'Hemming (Length)', price: 149, desc: 'Shorten or lengthen pants with plain/cuffed hem' },
        { id: 'mp2', name: 'Waist & Seat Adjustment', price: 149, desc: 'Taper or let out the waist and seat area' },
        { id: 'mp3', name: 'Leg Tapering (Slim Fit)', price: 149, desc: 'Taper legs from thigh to ankle' },
        { id: 'mp4', name: 'Crotch & Rise Adjustment', price: 149, desc: 'Adjust the height and fit of the rise' },
        { id: 'mp5', name: 'Zipper/Button Repair', price: 149, desc: 'Replace broken zippers or buttons' },
      ],
    },
    kurtas: {
      title: 'Kurtas & Ethnic Alterations',
      icon: Icons.kurtas,
      items: [
        { id: 'mk1', name: 'Kurta Side Tapering', price: 149, desc: 'Slim down the side seams of the Kurta' },
        { id: 'mk2', name: 'Sleeve Shortening', price: 149, desc: 'Shorten Kurta sleeves (with border adjustment)' },
        { id: 'mk3', name: 'Neckline Alteration', price: 149, desc: 'Resize or change neck styles (e.g. Mandarin collar)' },
        { id: 'mk4', name: 'Length Shortening', price: 149, desc: 'Shorten bottom hem of the Kurta' },
        { id: 'mk5', name: 'Add Pockets / Side Slits', price: 149, desc: 'Add hidden pockets or customize side slits' },
      ],
    },
    suit: {
      title: 'Suit & Blazer Alterations',
      icon: Icons.suit,
      items: [
        { id: 'su1', name: 'Jacket Sleeve Shortening', price: 149, desc: 'Shorten suit jacket sleeves precisely' },
        { id: 'su2', name: 'Jacket Waist Suppression', price: 149, desc: 'Nip in the waist for a tailored silhouette' },
        { id: 'su3', name: 'Shoulder Restructuring', price: 149, desc: 'Reshape shoulder width and padding' },
        { id: 'su4', name: 'Lapel Adjustment', price: 149, desc: 'Reshape or restyle suit lapels' },
        { id: 'su5', name: 'Back Vent Alteration', price: 149, desc: 'Add, remove or resize jacket vents' },
      ],
    },
  },
  womens: {
    dress: {
      title: 'Dress Alterations',
      icon: Icons.dress,
      items: [
        { id: 'wd1', name: 'Hem Shortening / Lengthening', price: 149, desc: 'Adjust dress hem to desired length' },
        { id: 'wd2', name: 'Waist Taking In / Out', price: 149, desc: 'Adjust waist seams for the perfect fit' },
        { id: 'wd3', name: 'Strap Adjustment', price: 149, desc: 'Shorten or replace shoulder straps' },
        { id: 'wd4', name: 'Zipper Replacement', price: 149, desc: 'Replace invisible or side zippers' },
        { id: 'wd5', name: 'Bust Adjustment', price: 149, desc: 'Add or reduce fabric at the bust line' },
      ],
    },
    tshirt: {
      title: 'T-Shirt & Casual Tops',
      icon: Icons.tshirt,
      items: [
        { id: 'wts1', name: 'Sleeve Shortening', price: 149, desc: 'Shorten T-shirt or top sleeves to desired length' },
        { id: 'wts2', name: 'Side Seam Tapering', price: 149, desc: 'Take in sides for a fitted contour' },
        { id: 'wts3', name: 'Length Shortening', price: 149, desc: 'Adjust bottom hem length' },
        { id: 'wts4', name: 'Neckline Restructuring', price: 149, desc: 'Adjust scoop, crew, or V-neckline' },
        { id: 'wts5', name: 'Crop Top Conversion', price: 149, desc: 'Convert regular T-shirt/top into a custom crop top' },
        { id: 'wts6', name: 'Chest & Bust Line Fitting', price: 149, desc: 'Adjust chest width, armhole, and contour around chest area' },
      ],
    },
    kurti: {
      title: 'Kurti & Salwar Kameez',
      icon: Icons.kurti,
      items: [
        { id: 'wk1', name: 'Kurti Tapering', price: 149, desc: 'Slim down the sides for a flattering fit' },
        { id: 'wk2', name: 'Dupatta Hemming', price: 149, desc: 'Hem dupatta edges with plain or decorative finish' },
        { id: 'wk3', name: 'Salwar Waist Tightening', price: 149, desc: 'Adjust elastic or drawstring waist' },
        { id: 'wk4', name: 'Sleeve Style Change', price: 149, desc: 'Convert to cap sleeve, flutter sleeve, etc.' },
        { id: 'wk5', name: 'Neckline Embellishment', price: 149, desc: 'Add embroidery or lace trim to neckline' },
      ],
    },
    blouse: {
      title: 'Blouse & Top Alterations',
      icon: Icons.blouse,
      items: [
        { id: 'wb1', name: 'Blouse Sleeve Shortening', price: 149, desc: 'Shorten blouse sleeves to exact measurement' },
        { id: 'wb2', name: 'Blouse Side Seam Adjustment', price: 149, desc: 'Take in or let out the side seams' },
        { id: 'wb3', name: 'Back Hook & Eye Repair', price: 149, desc: 'Replace or add hooks and eyes at back' },
        { id: 'wb4', name: 'Deep Neck Conversion', price: 149, desc: 'Convert neckline style or depth' },
        { id: 'wb5', name: 'Peplum Addition', price: 149, desc: 'Add a peplum frill to the bottom of blouse' },
      ],
    },
    lehenga: {
      title: 'Lehenga & Bridal Wear',
      icon: Icons.lehenga,
      items: [
        { id: 'wl1', name: 'Lehenga Hem Adjustment', price: 149, desc: 'Shorten or lengthen heavy lehenga hem' },
        { id: 'wl2', name: 'Blouse Back Alteration', price: 149, desc: 'Reshape back design, strings, or padding' },
        { id: 'wl3', name: 'Waistband Replacement', price: 149, desc: 'Replace or resize the inner waistband' },
        { id: 'wl4', name: 'Lace / Border Addition', price: 149, desc: 'Add decorative lace trim to skirt or dupatta' },
        { id: 'wl5', name: 'Fall & Pico Finishing', price: 149, desc: 'Add fall lining and pico border finishing' },
      ],
    },
  },
};

export default function Alteration() {
  const [gender, setGender] = useState('mens');
  const [selectedItems, setSelectedItems] = useState({});
  const [categoryNotes, setCategoryNotes] = useState({});
  const [generalNote, setGeneralNote] = useState('');
  const [animating, setAnimating] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const { openBooking } = useBooking();

  const handleGenderSwitch = (newGender) => {
    if (newGender === gender || animating) return;
    setAnimating(true);
    setOpenCategory(null);
    setSelectedItems({});
    setCategoryNotes({});
    setGeneralNote('');
    setTimeout(() => {
      setGender(newGender);
      setAnimating(false);
    }, 300);
  };

  const handleToggleCategory = (catKey) => {
    setOpenCategory((prev) => (prev === catKey ? null : catKey));
  };

  const handleToggleItem = (category, item) => {
    const key = `${category}-${item.id}`;
    setSelectedItems((prev) => {
      const copy = { ...prev };
      if (copy[key]) {
        delete copy[key];
      } else {
        copy[key] = {
          ...item,
          categoryTitle: ALTERATIONS_DATA[gender][category].title,
          category,
        };
      }
      return copy;
    });
  };

  const getCategoryTotal = (category) =>
    Object.values(selectedItems)
      .filter((item) => item.category === category)
      .reduce((sum, item) => sum + item.price, 0);

  const selectedList = Object.values(selectedItems);
  const subtotal = selectedList.reduce((sum, item) => sum + item.price, 0);
  const hasDiscount = selectedList.length >= 4;
  const discountAmount = hasDiscount ? Math.round(subtotal * 0.15) : 0;
  const totalPrice = subtotal - discountAmount;

  const handleBookAlteration = () => {
    let notesParts = [];

    if (selectedList.length === 0) {
      notesParts.push(`Standard Alteration Appointment\nBase Price: ₹0`);
    } else {
      notesParts.push(
        `Selected Alterations (${gender === 'mens' ? "Men's" : "Women's"}):\n` +
          selectedList
            .map((item) => `- [${item.categoryTitle}] ${item.name} (₹${item.price})`)
            .join('\n')
      );
    }

    const filledCatNotes = Object.entries(categoryNotes).filter(
      ([_, note]) => note && note.trim().length > 0
    );
    if (filledCatNotes.length > 0) {
      const formattedCatNotes = filledCatNotes
        .map(([catKey, note]) => {
          const title = currentData[catKey]?.title || catKey;
          return `- [${title} Notes]: ${note.trim()}`;
        })
        .join('\n');
      notesParts.push(`Specific Category Notes:\n${formattedCatNotes}`);
    }

    if (generalNote.trim()) {
      notesParts.push(`General Instructions:\n${generalNote.trim()}`);
    }

    notesParts.push(
      `Subtotal: ₹${subtotal}${hasDiscount ? `\n15% Bundle Discount (4+ items): -₹${discountAmount}` : ''}\nEstimated Total: ₹${totalPrice}`
    );

    const notesText = notesParts.join('\n\n');

    openBooking(`Alteration: ${gender === 'mens' ? "Men's" : "Women's"}`);
    localStorage.setItem('tailors2u_booking_notes', notesText);
  };

  const currentData = ALTERATIONS_DATA[gender];

  return (
    <div className="porcelain-theme">
      {/* Main Content */}
      <section className="section" style={{ paddingTop: '3rem' }}>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto 3rem auto' }}>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '0.8rem', color: '#1E2D27' }}>Bespoke Garment Alterations</h1>
          <p style={{ color: '#4A5B55', fontSize: '1.1rem', maxWidth: '750px', lineHeight: '1.6', marginBottom: '0.8rem' }}>
            Restore your favourite clothes to absolute perfection. Choose your category below and select the alterations you need for an instant cost estimate.
          </p>
          <div style={{ color: 'var(--emerald-medium)', fontSize: '0.95rem', fontStyle: 'italic', marginBottom: '2.5rem', fontWeight: '500' }}>
            *Price may vary according to the areas
          </div>

          {/* ── Dynamic Island Gender Toggle ── */}
          <div className="gender-island-wrap" style={{ justifyContent: 'flex-start', marginTop: '2rem' }}>
            <div className="gender-island">
              {/* sliding pill */}
              <div
                className="island-pill"
                style={{ transform: gender === 'womens' ? 'translateX(100%)' : 'translateX(0)' }}
              />
              <button
                id="gender-mens"
                className={`island-btn ${gender === 'mens' ? 'island-btn--active' : ''}`}
                onClick={() => handleGenderSwitch('mens')}
              >
                <span className="island-btn-icon">♂</span>
                Men&apos;s
              </button>
              <button
                id="gender-womens"
                className={`island-btn ${gender === 'womens' ? 'island-btn--active' : ''}`}
                onClick={() => handleGenderSwitch('womens')}
              >
                <span className="island-btn-icon">♀</span>
                Women&apos;s
              </button>
            </div>
          </div>
        </div>
        <div className="alteration-container">
          {/* Accordion Options */}
          <div
            className={`alteration-options gender-panel ${animating ? 'gender-panel--exit' : 'gender-panel--enter'}`}
          >
            {Object.entries(currentData).map(([catKey, catData], idx) => {
              const isOpen = openCategory === catKey;
              const subtotal = getCategoryTotal(catKey);
              const selectedCount = Object.values(selectedItems).filter(
                (i) => i.category === catKey
              ).length;

              return (
                <div
                  key={catKey}
                  className={`acc-card ${isOpen ? 'acc-card--open' : ''}`}
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  {/* ── Accordion Header ── */}
                  <button
                    className="acc-header"
                    onClick={() => handleToggleCategory(catKey)}
                    aria-expanded={isOpen}
                  >
                    <div className="acc-header-left">
                      <span className="acc-icon">{catData.icon}</span>
                      <div>
                        <span className="acc-title">{catData.title}</span>
                        <span className="acc-meta">
                          {catData.items.length} alterations
                          {selectedCount > 0 && (
                            <span className="acc-badge">{selectedCount} selected</span>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="acc-header-right">
                      {subtotal > 0 && (
                        <span className="acc-subtotal">₹{subtotal}</span>
                      )}
                      <span className={`acc-chevron ${isOpen ? 'acc-chevron--open' : ''}`}>
                        ›
                      </span>
                    </div>
                  </button>

                  {/* ── Accordion Body ── */}
                  <div className={`acc-body ${isOpen ? 'acc-body--open' : ''}`}>
                    <div className="acc-body-inner">
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
                                  onChange={() => {}}
                                />
                                <div>
                                  <span className="item-name">{item.name}</span>
                                  <p className="item-desc">
                                    {item.desc}
                                  </p>
                                </div>
                              </div>
                              <span className="item-price">₹{item.price}</span>
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* ── Category Specific Note Section ── */}
                      <div style={{ marginTop: '1.2rem', paddingTop: '1rem', borderTop: '1px dashed var(--beige-border)' }}>
                        <label
                          htmlFor={`note-${catKey}`}
                          style={{
                            fontSize: '0.84rem',
                            fontWeight: '600',
                            color: '#1E2D27',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            marginBottom: '0.4rem',
                          }}
                        >
                          <span>✏️</span> Custom Notes / Requirements for {catData.title}
                        </label>
                        <textarea
                          id={`note-${catKey}`}
                          placeholder={`Specify exact measurements or custom requests for ${catData.title.toLowerCase()} (e.g. shorten sleeves by 1.5", narrow shoulders)...`}
                          value={categoryNotes[catKey] || ''}
                          onChange={(e) =>
                            setCategoryNotes((prev) => ({
                              ...prev,
                              [catKey]: e.target.value,
                            }))
                          }
                          rows={2}
                          style={{
                            width: '100%',
                            padding: '0.65rem 0.85rem',
                            fontSize: '0.85rem',
                            borderRadius: '8px',
                            border: '1px solid #D5DDD8',
                            backgroundColor: '#FAFCFB',
                            color: '#1E2D27',
                            fontFamily: 'inherit',
                            resize: 'vertical',
                            outline: 'none',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pricing Estimation Sidebar */}
          <div className="calculator-card">
            <h3>Estimation Summary</h3>
            {/* Gender badge */}
            <div className="calc-gender-badge">
              {gender === 'mens' ? "♂ Men's Alterations" : "♀ Women's Alterations"}
            </div>
            <div className="calc-selections">
              <div className="calc-selected-item" style={{ borderBottom: '1px dashed var(--beige-border)', paddingBottom: '0.75rem', marginBottom: '0.75rem', fontWeight: '500' }}>
                <span>Standard Alteration Price</span>
                <span>₹0</span>
              </div>
              {selectedList.length === 0 ? (
                <p className="calc-empty" style={{ fontSize: '0.85rem' }}>
                  No extra alterations selected yet. Open a category and select items to add.
                </p>
              ) : (
                <>
                  {selectedList.map((item) => (
                    <div key={item.id} className="calc-selected-item">
                      <span>{item.name}</span>
                      <span>₹{item.price}</span>
                    </div>
                  ))}

                  {selectedList.length < 4 ? (
                    <div style={{ marginTop: '0.75rem', padding: '0.5rem 0.75rem', background: '#F0F7F4', borderRadius: '6px', fontSize: '0.82rem', color: '#1E2D27', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span>🏷️</span>
                      <span>Add <strong>{4 - selectedList.length} more item{4 - selectedList.length > 1 ? 's' : ''}</strong> to unlock 15% OFF!</span>
                    </div>
                  ) : (
                    <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px dashed var(--beige-border)' }}>
                      <div className="calc-selected-item" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        <span>Subtotal ({selectedList.length} items)</span>
                        <span>₹{subtotal}</span>
                      </div>
                      <div className="calc-selected-item" style={{ color: '#059669', fontWeight: '600', fontSize: '0.9rem', marginTop: '0.3rem' }}>
                        <span>🎉 15% Bulk Discount (4+ items)</span>
                        <span>-₹{discountAmount}</span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="calc-total">
              <span>Estimated Total:</span>
              <span className="calc-total-amount">₹{totalPrice}</span>
            </div>

            {/* General Instructions Note Box */}
            <div style={{ marginTop: '1.25rem', marginBottom: '1.25rem' }}>
              <label
                htmlFor="general-alteration-note"
                style={{
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  color: '#1E2D27',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  marginBottom: '0.4rem',
                }}
              >
                <span>📝</span> Additional Instructions for Visiting Tailor
              </label>
              <textarea
                id="general-alteration-note"
                placeholder="Any special instructions, timing preferences, or extra requests..."
                value={generalNote}
                onChange={(e) => setGeneralNote(e.target.value)}
                rows={2}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.75rem',
                  fontSize: '0.82rem',
                  borderRadius: '8px',
                  border: '1px solid #D5DDD8',
                  backgroundColor: '#FAFCFB',
                  color: '#1E2D27',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
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
                *Note: Final measurements and fit analysis will be conducted by our visiting tailor
                before stitching.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
