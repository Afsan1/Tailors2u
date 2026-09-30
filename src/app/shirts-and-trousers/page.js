'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useBooking } from '../../components/ClientLayoutWrapper';

// Rich Fabric Catalog for Shirts & Trousers
const SHIRT_TROUSER_FABRICS = [
  {
    id: 'st_white_giza',
    name: 'Pristine White Pure Egyptian Giza Cotton',
    shortName: 'White Giza Cotton',
    category: 'cotton',
    dressCode: 'Business Formal',
    color: 'White',
    colorHex: '#ffffff',
    fabric: '100% Pure Egyptian Giza Cotton',
    count: '160s 2-Ply Giza',
    pattern: 'Solid Sateen',
    image: '/pure_egyptian_giza_cotton/White giza cotton 1.png',
    hoverImage: '/pure_egyptian_giza_cotton/White giza cotton 2.png',
    origin: 'Giza Valley, Egypt',
    weight: '115 gsm',
    badge: 'Essential Formal',
    priceShirt: 1899,
    priceTrouser: 2199,
    priceCombo: 3799,
    description: 'The definitive executive white shirt fabric. Extra-long staple Giza cotton with a natural silky luster, non-transparent weave, and crisp collar stance.'
  },
  {
    id: 'st_sky_blue_giza',
    name: 'Sky Blue Pure Egyptian Giza Cotton',
    shortName: 'Sky Blue Giza Cotton',
    category: 'cotton',
    dressCode: 'Business Formal',
    color: 'Sky Blue',
    colorHex: '#4b7bb0',
    fabric: '100% Pure Egyptian Giza Cotton',
    count: '160s 2-Ply Giza',
    pattern: 'Solid Twill',
    image: '/pure_egyptian_giza_cotton/Blue giza cotton fabric 1.png',
    hoverImage: '/pure_egyptian_giza_cotton/Blue giza cotton fabric 2.png',
    origin: 'Giza Valley, Egypt',
    weight: '120 gsm',
    badge: 'Best Seller',
    priceShirt: 1899,
    priceTrouser: 2199,
    priceCombo: 3799,
    description: 'Refined sky blue shirting crafted from premium Egyptian staple fibers. Offers unparalleled breathability, smooth skin touch, and wrinkle recovery.'
  },
  {
    id: 'st_cream_giza',
    name: 'Warm Cream Pure Egyptian Giza Cotton',
    shortName: 'Cream Giza Cotton',
    category: 'cotton',
    dressCode: 'Smart Casual',
    color: 'Cream',
    colorHex: '#ece3d2',
    fabric: '100% Pure Egyptian Giza Cotton',
    count: '140s Double Ply',
    pattern: 'Solid',
    image: '/pure_egyptian_giza_cotton/Cream giza cotton 1.png',
    hoverImage: '/pure_egyptian_giza_cotton/Cream giza cotton 2.png',
    origin: 'Giza Valley, Egypt',
    weight: '120 gsm',
    badge: 'Atelier Favorite',
    priceShirt: 1899,
    priceTrouser: 2199,
    priceCombo: 3799,
    description: 'Warm, buttery cream shirting with a rich natural sheen. Ideal for pairing with earthy tailored Gurkha trousers or navy blazers.'
  },
  {
    id: 'st_forest_green_giza',
    name: 'Regal Forest Green Egyptian Cotton',
    shortName: 'Forest Green Giza',
    category: 'cotton',
    dressCode: 'Evening / Festive',
    color: 'Forest Green',
    colorHex: '#264230',
    fabric: '100% Pure Egyptian Giza Cotton',
    count: '140s Double Ply',
    pattern: 'Solid',
    image: '/pure_egyptian_giza_cotton/forest green giza cotton 1.png',
    hoverImage: '/pure_egyptian_giza_cotton/forest green giza cotton 2.png',
    origin: 'Giza Valley, Egypt',
    weight: '125 gsm',
    badge: 'Signature',
    priceShirt: 1999,
    priceTrouser: 2399,
    priceCombo: 3999,
    description: 'Deep botanical emerald-forest green shirting. Unmatched color depth with a sleek hand-feel for statement shirts and coordinated sets.'
  },
  {
    id: 'st_stone_beige_giza',
    name: 'Stone Beige Egyptian Giza Cotton',
    shortName: 'Stone Beige Cotton',
    category: 'cotton',
    dressCode: 'Smart Casual',
    color: 'Beige',
    colorHex: '#d8cbb8',
    fabric: '100% Pure Egyptian Giza Cotton',
    count: '140s Double Ply',
    pattern: 'Fine Twill',
    image: '/pure_egyptian_giza_cotton/stone beige giza fabric 1.png',
    hoverImage: '/pure_egyptian_giza_cotton/stone beige giza fabric 2.png',
    origin: 'Giza Valley, Egypt',
    weight: '130 gsm',
    badge: 'Gurkha Essential',
    priceShirt: 1899,
    priceTrouser: 2299,
    priceCombo: 3899,
    description: 'Sophisticated stone beige twill with rich drape. The benchmark textile for custom Gurkha waistband trousers and safari shirts.'
  },
  {
    id: 'st_mauve_giza',
    name: 'Dusty Mauve Egyptian Giza Cotton',
    shortName: 'Mauve Giza Cotton',
    category: 'cotton',
    dressCode: 'Smart Casual',
    color: 'Mauve',
    colorHex: '#9b7685',
    fabric: '100% Pure Egyptian Giza Cotton',
    count: '160s 2-Ply',
    pattern: 'Solid',
    image: '/pure_egyptian_giza_cotton/Mauve giza cotton 1.png',
    hoverImage: '/pure_egyptian_giza_cotton/Mauve giza cotton 2.png',
    origin: 'Giza Valley, Egypt',
    weight: '120 gsm',
    badge: 'Pastel Luxury',
    priceShirt: 1999,
    priceTrouser: 2399,
    priceCombo: 3999,
    description: 'Subtle dusty mauve with refined pastel undertones. Smooth fluid drape engineered for modern relaxed collars and summer days.'
  },
  {
    id: 'st_olive_giza',
    name: 'Olive Green Pure Egyptian Giza Cotton',
    shortName: 'Olive Green Cotton',
    category: 'cotton',
    dressCode: 'Smart Casual',
    color: 'Olive Green',
    colorHex: '#525d3f',
    fabric: '100% Pure Egyptian Giza Cotton',
    count: '140s Double Ply',
    pattern: 'Fine Twill',
    image: '/pure_egyptian_giza_cotton/olive green giza cotton 1.png',
    hoverImage: '/pure_egyptian_giza_cotton/olive green giza cotton 2.png',
    origin: 'Giza Valley, Egypt',
    weight: '125 gsm',
    badge: 'Military Sartorial',
    priceShirt: 1899,
    priceTrouser: 2299,
    priceCombo: 3899,
    description: 'Distinguished earthy olive green Giza cotton. Perfect for button-down dress shirts and single-pleat military chinos.'
  },
  {
    id: 'st_sage_giza',
    name: 'Soft Sage Green Pure Giza Cotton',
    shortName: 'Sage Green Cotton',
    category: 'cotton',
    dressCode: 'Resort / Casual',
    color: 'Sage Green',
    colorHex: '#8da693',
    fabric: '100% Pure Egyptian Giza Cotton',
    count: '140s Double Ply',
    pattern: 'Solid',
    image: '/pure_egyptian_giza_cotton/soft sage giza cotton fabric 1.png',
    hoverImage: '/pure_egyptian_giza_cotton/soft sage giza cotton fabric 2.png',
    origin: 'Giza Valley, Egypt',
    weight: '118 gsm',
    badge: 'Resort Chic',
    priceShirt: 1899,
    priceTrouser: 2199,
    priceCombo: 3799,
    description: 'Cooling soft sage green cotton with supreme airflow. Tailored for camp-collar shirts and light summer trousers.'
  },
  {
    id: 'st_camel_giza',
    name: 'Camel Tan Pure Egyptian Giza Cotton',
    shortName: 'Camel Tan Cotton',
    category: 'cotton',
    dressCode: 'Smart Casual',
    color: 'Camel',
    colorHex: '#b58b57',
    fabric: '100% Pure Egyptian Giza Cotton',
    count: '140s Double Ply',
    pattern: 'Solid Twill',
    image: '/pure_egyptian_giza_cotton/Camel giza cotton fabric 1.png',
    hoverImage: '/pure_egyptian_giza_cotton/Camel giza cotton fabric 2.png',
    origin: 'Giza Valley, Egypt',
    weight: '135 gsm',
    badge: 'Timeless Tan',
    priceShirt: 1899,
    priceTrouser: 2299,
    priceCombo: 3899,
    description: 'Warm camel tan textile with substantial body and drape. Unbeatable for bespoke trousers with brass buckle side-adjusters.'
  },
  {
    id: 'st_terracotta_giza',
    name: 'Terracotta Rust Egyptian Giza Cotton',
    shortName: 'Terracotta Giza',
    category: 'cotton',
    dressCode: 'Smart Casual',
    color: 'Terracotta',
    colorHex: '#b85437',
    fabric: '100% Pure Egyptian Giza Cotton',
    count: '140s Double Ply',
    pattern: 'Solid',
    image: '/pure_egyptian_giza_cotton/Terracotta giza cotton 1.png',
    hoverImage: '/pure_egyptian_giza_cotton/Terracotta giza cotton 2.png',
    origin: 'Giza Valley, Egypt',
    weight: '125 gsm',
    badge: 'Statement Shade',
    priceShirt: 1999,
    priceTrouser: 2399,
    priceCombo: 3999,
    description: 'Vibrant Mediterranean terracotta with earthy richness and soft handle. Accentuates mother-of-pearl buttons and custom cuffs.'
  }
];

// Garment Types
const GARMENT_TYPES = [
  {
    id: 'combo',
    name: 'Shirt + Trouser Combo',
    subtitle: 'Synchronized 2-Piece Bespoke Set',
    badge: 'Most Popular',
    savings: 'Save ₹300',
    description: 'Matching or coordinated custom dress shirt and tailored trousers tailored during a single doorstep fitting.'
  },
  {
    id: 'shirt',
    name: 'Custom Dress Shirt',
    subtitle: 'Hand-Cut Bespoke Shirting',
    badge: 'Wardrobe Essential',
    savings: 'From ₹599 Stitching',
    description: 'Engineered with 22 stitches per inch, split back yoke, removable collar stays, and mother-of-pearl buttons.'
  },
  {
    id: 'trouser',
    name: 'Tailored Trousers / Chinos',
    subtitle: 'Gurkha, Pleated or Flat-Front',
    badge: 'Signature Inseam',
    savings: 'From ₹699 Stitching',
    description: 'Flawless leg drape with deep Italian slant pockets, reinforced crotch, and extended Gurkha waistband.'
  }
];

export default function ShirtsAndTrousersPage() {
  const router = useRouter();
  const { openBooking } = useBooking();

  // Navigation steps: 1 = Choose Fabric & Garment, 2 = Customise Details, 3 = Book Fitting
  const [currentStep, setCurrentStep] = useState(1);

  // Selected Garment Type
  const [selectedGarment, setSelectedGarment] = useState('combo'); // 'combo' | 'shirt' | 'trouser'

  // Selected Fabric
  const [selectedFabric, setSelectedFabric] = useState(SHIRT_TROUSER_FABRICS[0]);

  // Order Mode & Customer Type
  const [orderMode, setOrderMode] = useState('recommends'); // 'recommends' | 'customize' | 'previous'
  const [customerType, setCustomerType] = useState('new'); // 'new' | 'existing'
  const [previousOrderRef, setPreviousOrderRef] = useState('');
  const [fabricSource, setFabricSource] = useState('catalog'); // 'catalog' | 'doorstep-swatches' | 'self-provided'

  // SHIRT CUSTOMIZATION OPTIONS (Matching Reference Images with Round Collars)
  const [sleeveStyle, setSleeveStyle] = useState('long'); // 'long' | 'short'
  const [shirtFit, setShirtFit] = useState('tapered'); // 'tapered' | 'classic' | 'slim'
  const [collarStyle, setCollarStyle] = useState('classic'); // 'classic' | 'spread' | 'cutaway' | 'button-down' | 'hidden-button' | 'mandarin'
  const [pocketStyle, setPocketStyle] = useState('no-pocket'); // 'no-pocket' | 'classic-round' | 'diamond-straight' | 'round-flap'
  const [placketStyle, setPlacketStyle] = useState('french-seamless'); // 'french-seamless' | 'classic-stitched' | 'concealed'
  const [cuffStyle, setCuffStyle] = useState('round-1'); // 'round-1' | 'angle-2' | 'french-double' | 'convertible'
  const [monogramPlacement, setMonogramPlacement] = useState('cuff'); // 'cuff' | 'chest' | 'hem' | 'none'
  const [monogramText, setMonogramText] = useState('');
  const [monogramColor, setMonogramColor] = useState('navy'); // 'navy' | 'gold' | 'white' | 'match'

  // TROUSER CUSTOMIZATION OPTIONS
  const [waistbandStyle, setWaistbandStyle] = useState('gurkha'); // 'gurkha' | 'side-adjusters' | 'belt-loops' | 'elastic-hybrid'
  const [pleatStyle, setPleatStyle] = useState('flat-front'); // 'flat-front' | 'single-pleat' | 'double-pleat'
  const [trouserFit, setTrouserFit] = useState('tapered'); // 'tapered' | 'straight'
  const [hemStyle, setHemStyle] = useState('cuffs'); // 'cuffs' | 'plain-blind'

  // FILTERS STATE
  const [dressCodeFilter, setDressCodeFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Dropdown filter unique values
  const dressCodeOptions = useMemo(() => {
    return Array.from(new Set(SHIRT_TROUSER_FABRICS.map(f => f.dressCode))).sort();
  }, []);

  const colorOptions = useMemo(() => {
    return Array.from(new Set(SHIRT_TROUSER_FABRICS.map(f => f.color))).sort();
  }, []);

  // Filtered fabrics
  const filteredFabrics = useMemo(() => {
    return SHIRT_TROUSER_FABRICS.filter(item => {
      if (dressCodeFilter && item.dressCode !== dressCodeFilter) return false;
      if (colorFilter && item.color !== colorFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.color.toLowerCase().includes(q) ||
          item.dressCode.toLowerCase().includes(q) ||
          item.count.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [dressCodeFilter, colorFilter, searchQuery]);

  const hasActiveFilters = Boolean(dressCodeFilter || colorFilter || searchQuery);

  const handleResetFilters = () => {
    setDressCodeFilter('');
    setColorFilter('');
    setSearchQuery('');
  };

  const handleSelectAndCustomise = (fabric) => {
    setSelectedFabric(fabric);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Price Calculation
  const calculatedPrice = useMemo(() => {
    if (fabricSource === 'self-provided') {
      if (selectedGarment === 'shirt') return 599;
      if (selectedGarment === 'trouser') return 699;
      return 1199;
    }
    if (selectedGarment === 'shirt') return selectedFabric.priceShirt;
    if (selectedGarment === 'trouser') return selectedFabric.priceTrouser;
    return selectedFabric.priceCombo;
  }, [selectedFabric, selectedGarment, fabricSource]);

  const handleProceedToBooking = () => {
    const customerInfo = customerType === 'existing'
      ? `Existing Customer (Use measurements on file${previousOrderRef ? ` - Ref: ${previousOrderRef}` : ''})`
      : 'New Customer (Doorstep fitting & 35+ measurements)';

    const garmentTitle = selectedGarment === 'combo'
      ? 'Executive Shirt + Trouser Combo'
      : selectedGarment === 'shirt'
      ? 'Bespoke Dress Shirt'
      : 'Tailored Trousers / Chinos';

    const fabricInfo = fabricSource === 'self-provided'
      ? 'Self Provided Fabric (Stitching Only)'
      : fabricSource === 'doorstep-swatches'
      ? 'Master Tailor to bring Swatch Kit'
      : `${selectedFabric.name} (${selectedFabric.count})`;

    const shirtSpecs = selectedGarment !== 'trouser' ? [
      `Sleeves: ${sleeveStyle === 'long' ? 'LONG SLEEVES' : 'SHORT SLEEVES'}`,
      `Fit: FIT ${shirtFit.toUpperCase()}`,
      `Collar: ${collarStyle.toUpperCase()}`,
      `Pocket: ${pocketStyle.replace(/-/g, ' ').toUpperCase()}`,
      `Placket: ${placketStyle.replace(/-/g, ' ').toUpperCase()}`,
      `Cuff: ${cuffStyle.replace(/-/g, ' ').toUpperCase()}`,
      monogramText.trim() ? `Monogram: "${monogramText.trim().toUpperCase()}" on ${monogramPlacement.toUpperCase()} (${monogramColor})` : ''
    ].filter(Boolean).join(' | ') : '';

    const trouserSpecs = selectedGarment !== 'shirt' ? [
      `Waist: ${waistbandStyle.replace(/-/g, ' ').toUpperCase()}`,
      `Pleats: ${pleatStyle.replace(/-/g, ' ').toUpperCase()}`,
      `Leg Cut: ${trouserFit.toUpperCase()}`,
      `Hem: ${hemStyle === 'cuffs' ? "1.5 INCH ITALIAN CUFFS" : "PLAIN BLIND HEM"}`
    ].join(' | ') : '';

    const notes = [
      `Garment: ${garmentTitle}`,
      `Estimated Starting Price: ₹${calculatedPrice.toLocaleString('en-IN')}`,
      `Customer Type: ${customerInfo}`,
      `Fabric: ${fabricInfo}`,
      shirtSpecs ? `Shirt Specs: [${shirtSpecs}]` : '',
      trouserSpecs ? `Trouser Specs: [${trouserSpecs}]` : ''
    ].filter(Boolean).join('\n');

    localStorage.setItem('tailors2u_booking_notes', notes);
    openBooking(`Custom Stitching: ${garmentTitle}`);
  };

  return (
    <div className="shirts-page-container">
      {/* Top Header & Breadcrumbs & Step Tracker */}
      <div className="shirts-header-bar">
        <div className="shirts-header-inner">
          <div className="shirts-breadcrumb">
            <Link href="/" className="crumb-link">Home</Link>
            <span className="crumb-sep">/</span>
            <Link href="/tailoring" className="crumb-link">Stitching</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">Shirts & Trousers Studio</span>
          </div>

          <div className="shirts-step-tracker">
            <button
              className={`step-tab ${currentStep === 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}
              onClick={() => setCurrentStep(1)}
              type="button"
            >
              <span className="step-num">{currentStep > 1 ? '✓' : '1'}</span>
              <span className="step-label">1. Choose Fabric</span>
            </button>
            <span className="step-arrow">→</span>
            <button
              className={`step-tab ${currentStep === 2 ? 'active' : ''}`}
              onClick={() => setCurrentStep(2)}
              type="button"
            >
              <span className="step-num">2</span>
              <span className="step-label">2. Customise Options</span>
            </button>
            <span className="step-arrow">→</span>
            <button
              className="step-tab"
              onClick={handleProceedToBooking}
              type="button"
            >
              <span className="step-num">3</span>
              <span className="step-label">3. Book Fitting</span>
            </button>
          </div>
        </div>
      </div>

      {/* Garment Category Mode Bar */}
      <div className="garment-type-bar">
        <div className="garment-type-container">
          <div className="garment-type-grid">
            {GARMENT_TYPES.map((g) => {
              const isSelected = selectedGarment === g.id;
              return (
                <button
                  key={g.id}
                  type="button"
                  className={`garment-card-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedGarment(g.id)}
                >
                  <div className="garment-top">
                    <span className="garment-badge">{g.badge}</span>
                    <span className="garment-savings">{g.savings}</span>
                  </div>
                  <h3 className="garment-name">{g.name}</h3>
                  <p className="garment-subtitle">{g.subtitle}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* STEP 1: FABRIC SELECTION VIEW */}
      {currentStep === 1 && (
        <div className="shirts-catalog-wrapper">
          <div className="shirts-layout-grid">
            
            {/* Left Filter Sidebar */}
            <aside className="shirts-filter-sidebar">
              <div className="filter-header-row">
                <h2 className="filter-heading">Filter Fabrics</h2>
                {hasActiveFilters && (
                  <button onClick={handleResetFilters} className="clear-filter-btn" title="Clear filters">
                    Clear All
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="filter-group">
                <label className="filter-label">Search Fabric</label>
                <div className="search-input-wrap">
                  <input
                    type="text"
                    placeholder="Search Giza, color, weave..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="filter-search-input"
                  />
                  {searchQuery && (
                    <button className="clear-search-btn" onClick={() => setSearchQuery('')}>×</button>
                  )}
                </div>
              </div>

              {/* Dress Code / Occasion */}
              <div className="filter-group">
                <label className="filter-label">Dress Code / Occasion</label>
                <select
                  value={dressCodeFilter}
                  onChange={(e) => setDressCodeFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Dress Codes</option>
                  {dressCodeOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Color */}
              <div className="filter-group">
                <label className="filter-label">Color Palette</label>
                <select
                  value={colorFilter}
                  onChange={(e) => setColorFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Colors</option>
                  {colorOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Fabric Source Preference */}
              <div className="filter-group highlight-box">
                <label className="filter-label">Fabric Supply Mode</label>
                <div className="supply-radio-stack">
                  <label className="supply-radio-item">
                    <input
                      type="radio"
                      name="fabricSource"
                      checked={fabricSource === 'catalog'}
                      onChange={() => setFabricSource('catalog')}
                    />
                    <span>Choose from Premium Giza Catalog</span>
                  </label>
                  <label className="supply-radio-item">
                    <input
                      type="radio"
                      name="fabricSource"
                      checked={fabricSource === 'doorstep-swatches'}
                      onChange={() => setFabricSource('doorstep-swatches')}
                    />
                    <span>Master Tailor brings Swatches to Home</span>
                  </label>
                  <label className="supply-radio-item">
                    <input
                      type="radio"
                      name="fabricSource"
                      checked={fabricSource === 'self-provided'}
                      onChange={() => setFabricSource('self-provided')}
                    />
                    <span>I will provide my own fabric (Stitching Only)</span>
                  </label>
                </div>
              </div>

              {/* Quality Guarantee Box */}
              <div className="atelier-perks-card">
                <div className="perk-title">✦ Tailors2U Standard</div>
                <ul className="perk-list">
                  <li>22 Stitches Per Inch High-Density Seams</li>
                  <li>Hand-cut Split Back Yokes for Mobility</li>
                  <li>Brass Buckled Gurkha Waistband Finishes</li>
                  <li>30-Day Free Fit Alteration Guarantee</li>
                </ul>
              </div>
            </aside>

            {/* Right Product Grid */}
            <main className="shirts-products-main">
              <div className="shirts-grid-header">
                <span className="shirts-result-count">
                  Showing <strong>{filteredFabrics.length}</strong> Premium Fabrics
                </span>
                <span className="shirts-category-note">
                  {selectedGarment === 'combo' ? 'Configuring Shirt + Trouser Combo' : selectedGarment === 'shirt' ? 'Configuring Custom Dress Shirt' : 'Configuring Tailored Trousers'}
                </span>
              </div>

              <div className="shirts-fabric-grid">
                {filteredFabrics.map((fabric) => {
                  const price = selectedGarment === 'combo' ? fabric.priceCombo : selectedGarment === 'shirt' ? fabric.priceShirt : fabric.priceTrouser;
                  const isSelected = selectedFabric.id === fabric.id;

                  return (
                    <div
                      key={fabric.id}
                      className={`fabric-card ${isSelected ? 'active-fabric' : ''}`}
                      onClick={() => handleSelectAndCustomise(fabric)}
                    >
                      <div className="fabric-img-wrap">
                        {fabric.badge && <span className="fabric-badge">{fabric.badge}</span>}
                        <Image
                          src={fabric.image}
                          alt={fabric.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="fabric-img"
                        />
                        <div className="fabric-overlay-hover">
                          <button
                            className="customize-btn-overlay"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectAndCustomise(fabric);
                            }}
                          >
                            Customise This Fabric →
                          </button>
                        </div>
                      </div>

                      <div className="fabric-details-body">
                        <div className="fabric-header-line">
                          <span className="fabric-dresscode">{fabric.dressCode}</span>
                          <span className="fabric-count-pill">{fabric.count}</span>
                        </div>
                        <h3 className="fabric-title">{fabric.name}</h3>
                        <p className="fabric-desc">{fabric.description}</p>

                        <div className="fabric-meta-row">
                          <span>Origin: <strong>{fabric.origin}</strong></span>
                          <span>Weight: <strong>{fabric.weight}</strong></span>
                        </div>

                        <div className="fabric-price-row">
                          <div className="price-stack">
                            <span className="price-val">₹{price.toLocaleString('en-IN')}</span>
                            <span className="price-sub">
                              {fabricSource === 'self-provided' ? 'Stitching Only' : 'Fabric + Master Tailoring'}
                            </span>
                          </div>
                          <button
                            className="select-customise-cta"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectAndCustomise(fabric);
                            }}
                          >
                            Select & Customise →
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </main>
          </div>
        </div>
      )}

      {/* STEP 2: INTERACTIVE ATELIER CUSTOMIZATION STUDIO (EXACT REFERENCE DESIGN WITH ROUND COLLARS) */}
      {currentStep === 2 && (
        <div className="studio-wrapper">
          <div className="studio-container">
            
            {/* Selected Fabric Top Banner */}
            <div className="studio-fabric-showcase-bar">
              <div className="showcase-fabric-img">
                <Image
                  src={selectedFabric.image}
                  alt={selectedFabric.name}
                  fill
                  className="showcase-img-fit"
                />
              </div>
              <div className="showcase-text">
                <span className="showcase-badge">Customizing In Selected Fabric</span>
                <h3>{selectedFabric.name}</h3>
                <div className="showcase-tags">
                  <span>Count: <strong>{selectedFabric.count}</strong></span>
                  <span>Weave: <strong>{selectedFabric.pattern}</strong></span>
                  <span>Origin: <strong>{selectedFabric.origin}</strong></span>
                </div>
              </div>
              <button
                type="button"
                className="showcase-change-btn"
                onClick={() => setCurrentStep(1)}
              >
                ← Change Fabric Swatch
              </button>
            </div>

            {/* Customization Options Grid + Summary */}
            <div className="studio-grid">
              
              {/* Left Column: Clean Reference-Image Styled Groups */}
              <div className="studio-options-column">
                
                {/* 1. SHIRT CUSTOMIZATION OPTIONS */}
                {selectedGarment !== 'trouser' && (
                  <div className="beige-customizer-panel">
                    
                    {/* SECTION 1: STYLE (SLEEVES) */}
                    <div className="beige-option-section">
                      <h3 className="section-title-label">Style</h3>
                      <div className="beige-items-row">
                        
                        {/* Long Sleeves */}
                        <div
                          className={`beige-choice-card ${sleeveStyle === 'long' ? 'selected' : ''}`}
                          onClick={() => setSleeveStyle('long')}
                        >
                          {sleeveStyle === 'long' && <span className="card-top-icon">T</span>}
                          <div className="beige-svg-viewport">
                            <svg width="100%" height="100%" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                              {/* Left Long Sleeve */}
                              <path d="M40 28C32 54 26 84 23 106L35 109C38 88 42 66 45 50L40 28Z" fill="#F0EAE0" stroke="#6F5D4B" strokeWidth="1.8" strokeLinejoin="round"/>
                              {/* Left Cuff */}
                              <path d="M22 106L20 114L34 117L35 109L22 106Z" fill="#D6C5AF" stroke="#6F5D4B" strokeWidth="1.8" strokeLinejoin="round"/>
                              <circle cx="27" cy="112" r="1.3" fill="#FFFFFF" stroke="#6F5D4B" strokeWidth="1"/>

                              {/* Right Long Sleeve */}
                              <path d="M100 28C108 54 114 84 117 106L105 109C102 88 98 66 95 50L100 28Z" fill="#F0EAE0" stroke="#6F5D4B" strokeWidth="1.8" strokeLinejoin="round"/>
                              {/* Right Cuff */}
                              <path d="M118 106L120 114L106 117L105 109L118 106Z" fill="#D6C5AF" stroke="#6F5D4B" strokeWidth="1.8" strokeLinejoin="round"/>
                              <circle cx="113" cy="112" r="1.3" fill="#FFFFFF" stroke="#6F5D4B" strokeWidth="1"/>

                              {/* Shirt Body / Torso */}
                              <path d="M54 18L40 28L45 50L44 114C56 120 84 120 96 114L95 50L100 28L86 18H54Z" fill="#F7F3EC" stroke="#6F5D4B" strokeWidth="1.8" strokeLinejoin="round"/>
                              
                              {/* Center Placket */}
                              <rect x="67" y="29" width="6" height="85" fill="#EDE4D6" stroke="#6F5D4B" strokeWidth="1.5"/>
                              <circle cx="70" cy="38" r="1.8" fill="#FFFFFF" stroke="#6F5D4B" strokeWidth="1.2"/>
                              <circle cx="70" cy="56" r="1.8" fill="#FFFFFF" stroke="#6F5D4B" strokeWidth="1.2"/>
                              <circle cx="70" cy="74" r="1.8" fill="#FFFFFF" stroke="#6F5D4B" strokeWidth="1.2"/>
                              <circle cx="70" cy="92" r="1.8" fill="#FFFFFF" stroke="#6F5D4B" strokeWidth="1.2"/>
                              <circle cx="70" cy="108" r="1.8" fill="#FFFFFF" stroke="#6F5D4B" strokeWidth="1.2"/>

                              {/* Back Neck Band */}
                              <path d="M54 20C54 12 86 12 86 20L86 17C86 10 54 10 54 17Z" fill="#C5B49E" stroke="#6F5D4B" strokeWidth="1.6"/>
                              {/* Proper Crisp Dress Shirt Collar Wings */}
                              <path d="M54 17C53 26 56 36 63 43L70 29C64 23 58 19 54 17Z" fill="#D6C5AF" stroke="#6F5D4B" strokeWidth="1.8" strokeLinejoin="round"/>
                              <path d="M86 17C87 26 84 36 77 43L70 29C76 23 82 19 86 17Z" fill="#D6C5AF" stroke="#6F5D4B" strokeWidth="1.8" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span className="card-item-title">Long Sleeves</span>
                        </div>

                        {/* Short Sleeves */}
                        <div
                          className={`beige-choice-card ${sleeveStyle === 'short' ? 'selected' : ''}`}
                          onClick={() => setSleeveStyle('short')}
                        >
                          {sleeveStyle === 'short' && <span className="card-top-icon">T</span>}
                          <div className="beige-svg-viewport">
                            <svg width="100%" height="100%" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                              {/* Left Short Sleeve */}
                              <path d="M40 28L22 56L36 62L45 50L40 28Z" fill="#F0EAE0" stroke="#6F5D4B" strokeWidth="1.8" strokeLinejoin="round"/>
                              {/* Left Sleeve Hem Band */}
                              <path d="M22 56L19 61L33 67L36 62L22 56Z" fill="#D6C5AF" stroke="#6F5D4B" strokeWidth="1.8" strokeLinejoin="round"/>

                              {/* Right Short Sleeve */}
                              <path d="M100 28L118 56L104 62L95 50L100 28Z" fill="#F0EAE0" stroke="#6F5D4B" strokeWidth="1.8" strokeLinejoin="round"/>
                              {/* Right Sleeve Hem Band */}
                              <path d="M118 56L121 61L107 67L104 62L118 56Z" fill="#D6C5AF" stroke="#6F5D4B" strokeWidth="1.8" strokeLinejoin="round"/>

                              {/* Shirt Body / Torso */}
                              <path d="M54 18L40 28L45 50L44 114C56 120 84 120 96 114L95 50L100 28L86 18H54Z" fill="#F7F3EC" stroke="#6F5D4B" strokeWidth="1.8" strokeLinejoin="round"/>
                              
                              {/* Center Placket */}
                              <rect x="67" y="29" width="6" height="85" fill="#EDE4D6" stroke="#6F5D4B" strokeWidth="1.5"/>
                              <circle cx="70" cy="38" r="1.8" fill="#FFFFFF" stroke="#6F5D4B" strokeWidth="1.2"/>
                              <circle cx="70" cy="56" r="1.8" fill="#FFFFFF" stroke="#6F5D4B" strokeWidth="1.2"/>
                              <circle cx="70" cy="74" r="1.8" fill="#FFFFFF" stroke="#6F5D4B" strokeWidth="1.2"/>
                              <circle cx="70" cy="92" r="1.8" fill="#FFFFFF" stroke="#6F5D4B" strokeWidth="1.2"/>
                              <circle cx="70" cy="108" r="1.8" fill="#FFFFFF" stroke="#6F5D4B" strokeWidth="1.2"/>

                              {/* Back Neck Band */}
                              <path d="M54 20C54 12 86 12 86 20L86 17C86 10 54 10 54 17Z" fill="#C5B49E" stroke="#6F5D4B" strokeWidth="1.6"/>
                              {/* Proper Crisp Dress Shirt Collar Wings */}
                              <path d="M54 17C53 26 56 36 63 43L70 29C64 23 58 19 54 17Z" fill="#D6C5AF" stroke="#6F5D4B" strokeWidth="1.8" strokeLinejoin="round"/>
                              <path d="M86 17C87 26 84 36 77 43L70 29C76 23 82 19 86 17Z" fill="#D6C5AF" stroke="#6F5D4B" strokeWidth="1.8" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span className="card-item-title">Short Sleeves</span>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: FIT */}
                    <div className="beige-option-section">
                      <h3 className="section-title-label">Fit</h3>
                      <div className="beige-items-row">
                        
                        {/* Fit Tapered */}
                        <div
                          className={`beige-choice-card ${shirtFit === 'tapered' ? 'selected' : ''}`}
                          onClick={() => setShirtFit('tapered')}
                        >
                          {shirtFit === 'tapered' && <span className="card-top-icon">T</span>}
                          <div className="beige-svg-viewport">
                            <svg width="100%" height="100%" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                              {/* Sleeves */}
                              <path d="M38 28L26 60L36 64L44 48" fill="#F0EAE0" stroke="#6F5D4B" strokeWidth="1.6"/>
                              <path d="M102 28L114 60L104 64L96 48" fill="#F0EAE0" stroke="#6F5D4B" strokeWidth="1.6"/>

                              {/* Tapered Torso Silhouette */}
                              <path d="M54 18L38 28L44 48C48 72 46 92 45 116C58 121 82 121 95 116C94 92 92 72 96 48L102 28L86 18H54Z" fill="#F7F3EC" stroke="#6F5D4B" strokeWidth="1.8" strokeLinejoin="round"/>
                              
                              {/* Tailor Waist Taper Darts */}
                              <path d="M54 62C51 76 51 90 53 102" stroke="#6F5D4B" strokeWidth="1.3" strokeDasharray="3 3"/>
                              <path d="M86 62C89 76 89 90 87 102" stroke="#6F5D4B" strokeWidth="1.3" strokeDasharray="3 3"/>

                              <rect x="67" y="29" width="6" height="85" fill="#EDE4D6" stroke="#6F5D4B" strokeWidth="1.5"/>
                              <circle cx="70" cy="38" r="1.8" fill="#FFFFFF" stroke="#6F5D4B" strokeWidth="1.2"/>
                              <circle cx="70" cy="56" r="1.8" fill="#FFFFFF" stroke="#6F5D4B" strokeWidth="1.2"/>
                              <circle cx="70" cy="74" r="1.8" fill="#FFFFFF" stroke="#6F5D4B" strokeWidth="1.2"/>
                              <circle cx="70" cy="92" r="1.8" fill="#FFFFFF" stroke="#6F5D4B" strokeWidth="1.2"/>
                              <circle cx="70" cy="108" r="1.8" fill="#FFFFFF" stroke="#6F5D4B" strokeWidth="1.2"/>

                              {/* Back Neck Band */}
                              <path d="M54 20C54 12 86 12 86 20L86 17C86 10 54 10 54 17Z" fill="#C5B49E" stroke="#6F5D4B" strokeWidth="1.6"/>
                              {/* Proper Crisp Dress Shirt Collar Wings */}
                              <path d="M54 17C53 26 56 36 63 43L70 29C64 23 58 19 54 17Z" fill="#D6C5AF" stroke="#6F5D4B" strokeWidth="1.8" strokeLinejoin="round"/>
                              <path d="M86 17C87 26 84 36 77 43L70 29C76 23 82 19 86 17Z" fill="#D6C5AF" stroke="#6F5D4B" strokeWidth="1.8" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span className="card-item-title">Fit Tapered</span>
                        </div>

                        {/* Fit Classic */}
                        <div
                          className={`beige-choice-card ${shirtFit === 'classic' ? 'selected' : ''}`}
                          onClick={() => setShirtFit('classic')}
                        >
                          {shirtFit === 'classic' && <span className="card-top-icon">T</span>}
                          <div className="beige-svg-viewport">
                            <svg width="100%" height="100%" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                              {/* Sleeves */}
                              <path d="M38 28L26 60L36 64L43 48" fill="#F0EAE0" stroke="#6F5D4B" strokeWidth="1.6"/>
                              <path d="M102 28L114 60L104 64L97 48" fill="#F0EAE0" stroke="#6F5D4B" strokeWidth="1.6"/>

                              {/* Classic Straight Drape Torso */}
                              <path d="M54 18L38 28L43 48L42 116C56 120 84 120 98 116L97 48L102 28L86 18H54Z" fill="#F7F3EC" stroke="#6F5D4B" strokeWidth="1.8" strokeLinejoin="round"/>
                              
                              <rect x="67" y="29" width="6" height="85" fill="#EDE4D6" stroke="#6F5D4B" strokeWidth="1.5"/>
                              <circle cx="70" cy="38" r="1.8" fill="#FFFFFF" stroke="#6F5D4B" strokeWidth="1.2"/>
                              <circle cx="70" cy="56" r="1.8" fill="#FFFFFF" stroke="#6F5D4B" strokeWidth="1.2"/>
                              <circle cx="70" cy="74" r="1.8" fill="#FFFFFF" stroke="#6F5D4B" strokeWidth="1.2"/>
                              <circle cx="70" cy="92" r="1.8" fill="#FFFFFF" stroke="#6F5D4B" strokeWidth="1.2"/>
                              <circle cx="70" cy="108" r="1.8" fill="#FFFFFF" stroke="#6F5D4B" strokeWidth="1.2"/>

                              {/* Back Neck Band */}
                              <path d="M54 20C54 12 86 12 86 20L86 17C86 10 54 10 54 17Z" fill="#C5B49E" stroke="#6F5D4B" strokeWidth="1.6"/>
                              {/* Proper Crisp Dress Shirt Collar Wings */}
                              <path d="M54 17C53 26 56 36 63 43L70 29C64 23 58 19 54 17Z" fill="#D6C5AF" stroke="#6F5D4B" strokeWidth="1.8" strokeLinejoin="round"/>
                              <path d="M86 17C87 26 84 36 77 43L70 29C76 23 82 19 86 17Z" fill="#D6C5AF" stroke="#6F5D4B" strokeWidth="1.8" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span className="card-item-title">Fit Classic</span>
                        </div>

                        {/* Fit Slim */}
                        <div
                          className={`beige-choice-card ${shirtFit === 'slim' ? 'selected' : ''}`}
                          onClick={() => setShirtFit('slim')}
                        >
                          {shirtFit === 'slim' && <span className="card-top-icon">T</span>}
                          <div className="beige-svg-viewport">
                            <svg width="100%" height="100%" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                              {/* Sleeves */}
                              <path d="M38 28L26 60L36 64L45 48" fill="#F0EAE0" stroke="#6F5D4B" strokeWidth="1.6"/>
                              <path d="M102 28L114 60L104 64L95 48" fill="#F0EAE0" stroke="#6F5D4B" strokeWidth="1.6"/>

                              {/* Slim Suppressed Waist Torso */}
                              <path d="M54 18L38 28L45 48C50 70 49 90 47 116C59 121 81 121 93 116C91 90 90 70 95 48L102 28L86 18H54Z" fill="#F7F3EC" stroke="#6F5D4B" strokeWidth="1.8" strokeLinejoin="round"/>
                              
                              <rect x="67" y="29" width="6" height="85" fill="#EDE4D6" stroke="#6F5D4B" strokeWidth="1.5"/>
                              <circle cx="70" cy="38" r="1.8" fill="#FFFFFF" stroke="#6F5D4B" strokeWidth="1.2"/>
                              <circle cx="70" cy="56" r="1.8" fill="#FFFFFF" stroke="#6F5D4B" strokeWidth="1.2"/>
                              <circle cx="70" cy="74" r="1.8" fill="#FFFFFF" stroke="#6F5D4B" strokeWidth="1.2"/>
                              <circle cx="70" cy="92" r="1.8" fill="#FFFFFF" stroke="#6F5D4B" strokeWidth="1.2"/>
                              <circle cx="70" cy="108" r="1.8" fill="#FFFFFF" stroke="#6F5D4B" strokeWidth="1.2"/>

                              {/* Back Neck Band */}
                              <path d="M54 20C54 12 86 12 86 20L86 17C86 10 54 10 54 17Z" fill="#C5B49E" stroke="#6F5D4B" strokeWidth="1.6"/>
                              {/* Proper Crisp Dress Shirt Collar Wings */}
                              <path d="M54 17C53 26 56 36 63 43L70 29C64 23 58 19 54 17Z" fill="#D6C5AF" stroke="#6F5D4B" strokeWidth="1.8" strokeLinejoin="round"/>
                              <path d="M86 17C87 26 84 36 77 43L70 29C76 23 82 19 86 17Z" fill="#D6C5AF" stroke="#6F5D4B" strokeWidth="1.8" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span className="card-item-title">Fit Slim</span>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 3: COLLAR (REFERENCE ARTWORK IN LUXURY BEIGE) */}
                    <div className="beige-option-section">
                      <h3 className="section-title-label">Collar</h3>
                      <div className="beige-items-row">
                        
                        {/* 1. Classic */}
                        <div
                          className={`beige-choice-card ${collarStyle === 'classic' ? 'selected' : ''}`}
                          onClick={() => setCollarStyle('classic')}
                        >
                          {collarStyle === 'classic' && <span className="card-top-icon">T</span>}
                          <div className="beige-svg-viewport">
                            <Image
                              src="/shirt_customizer/collar_classic.png"
                              alt="Classic Collar"
                              width={130}
                              height={115}
                              className="visual-option-img"
                              priority
                            />
                          </div>
                          <span className="card-item-title">Classic</span>
                          {collarStyle === 'classic' && <span className="recommends-pill-badge">Tailors2U Recommends</span>}
                        </div>

                        {/* 2. Spread */}
                        <div
                          className={`beige-choice-card ${collarStyle === 'spread' ? 'selected' : ''}`}
                          onClick={() => setCollarStyle('spread')}
                        >
                          {collarStyle === 'spread' && <span className="card-top-icon">T</span>}
                          <div className="beige-svg-viewport">
                            <Image
                              src="/shirt_customizer/collar_spread.png"
                              alt="Spread Collar"
                              width={130}
                              height={115}
                              className="visual-option-img"
                            />
                          </div>
                          <span className="card-item-title">Spread</span>
                          {collarStyle === 'spread' && <span className="recommends-pill-badge">Tailors2U Recommends</span>}
                        </div>

                        {/* 3. Cutaway */}
                        <div
                          className={`beige-choice-card ${collarStyle === 'cutaway' ? 'selected' : ''}`}
                          onClick={() => setCollarStyle('cutaway')}
                        >
                          {collarStyle === 'cutaway' && <span className="card-top-icon">T</span>}
                          <div className="beige-svg-viewport">
                            <Image
                              src="/shirt_customizer/collar_cutaway.png"
                              alt="Cutaway Collar"
                              width={130}
                              height={115}
                              className="visual-option-img"
                            />
                          </div>
                          <span className="card-item-title">Cutaway</span>
                          {collarStyle === 'cutaway' && <span className="recommends-pill-badge">Tailors2U Recommends</span>}
                        </div>

                        {/* 4. Button Down */}
                        <div
                          className={`beige-choice-card ${collarStyle === 'button-down' ? 'selected' : ''}`}
                          onClick={() => setCollarStyle('button-down')}
                        >
                          {collarStyle === 'button-down' && <span className="card-top-icon">T</span>}
                          <div className="beige-svg-viewport">
                            <Image
                              src="/shirt_customizer/collar_button_down.png"
                              alt="Button Down Collar"
                              width={130}
                              height={115}
                              className="visual-option-img"
                            />
                          </div>
                          <span className="card-item-title">Button Down</span>
                          {collarStyle === 'button-down' && <span className="recommends-pill-badge">Tailors2U Recommends</span>}
                        </div>

                        {/* 5. Hidden Button */}
                        <div
                          className={`beige-choice-card ${collarStyle === 'hidden-button' ? 'selected' : ''}`}
                          onClick={() => setCollarStyle('hidden-button')}
                        >
                          {collarStyle === 'hidden-button' && <span className="card-top-icon">T</span>}
                          <div className="beige-svg-viewport">
                            <Image
                              src="/shirt_customizer/collar_hidden_button.png"
                              alt="Hidden Button Collar"
                              width={130}
                              height={115}
                              className="visual-option-img"
                            />
                          </div>
                          <span className="card-item-title">Hidden Button</span>
                          {collarStyle === 'hidden-button' && <span className="recommends-pill-badge">Tailors2U Recommends</span>}
                        </div>

                        {/* 6. Mandarin */}
                        <div
                          className={`beige-choice-card ${collarStyle === 'mandarin' ? 'selected' : ''}`}
                          onClick={() => setCollarStyle('mandarin')}
                        >
                          {collarStyle === 'mandarin' && <span className="card-top-icon">T</span>}
                          <div className="beige-svg-viewport">
                            <Image
                              src="/shirt_customizer/collar_mandarin.png"
                              alt="Mandarin Collar"
                              width={130}
                              height={115}
                              className="visual-option-img"
                            />
                          </div>
                          <span className="card-item-title">Mandarin</span>
                          {collarStyle === 'mandarin' && <span className="recommends-pill-badge">Tailors2U Recommends</span>}
                        </div>
                      </div>
                    </div>

                    {/* SECTION 4: POCKETS STYLE (MATCHING REFERENCE IMAGE IN BEIGE) */}
                    <div className="beige-option-section">
                      <h3 className="section-title-label">Pockets Style</h3>
                      <div className="beige-items-row">
                        
                        {/* 1. No Pocket */}
                        <div
                          className={`beige-choice-card ${pocketStyle === 'no-pocket' ? 'selected' : ''}`}
                          onClick={() => setPocketStyle('no-pocket')}
                        >
                          {pocketStyle === 'no-pocket' && <span className="card-top-icon">T</span>}
                          <div className="beige-svg-viewport">
                            <Image
                              src="/shirt_customizer/pocket_no_pocket.png"
                              alt="No pocket"
                              width={130}
                              height={115}
                              className="visual-option-img"
                            />
                          </div>
                          <span className="card-item-title">No pocket</span>
                        </div>

                        {/* 2. Classic Round Pocket */}
                        <div
                          className={`beige-choice-card ${pocketStyle === 'classic-round' ? 'selected' : ''}`}
                          onClick={() => setPocketStyle('classic-round')}
                        >
                          {pocketStyle === 'classic-round' && <span className="card-top-icon">T</span>}
                          <div className="beige-svg-viewport">
                            <Image
                              src="/shirt_customizer/pocket_classic_round.png"
                              alt="Classic Round Pocket"
                              width={130}
                              height={115}
                              className="visual-option-img"
                            />
                          </div>
                          <span className="card-item-title">Classic Round</span>
                        </div>

                        {/* 3. Diamond Straight Pocket */}
                        <div
                          className={`beige-choice-card ${pocketStyle === 'diamond-straight' ? 'selected' : ''}`}
                          onClick={() => setPocketStyle('diamond-straight')}
                        >
                          {pocketStyle === 'diamond-straight' && <span className="card-top-icon">T</span>}
                          <div className="beige-svg-viewport">
                            <Image
                              src="/shirt_customizer/pocket_diamond_straight.png"
                              alt="Diamond Straight Pocket"
                              width={130}
                              height={115}
                              className="visual-option-img"
                            />
                          </div>
                          <span className="card-item-title">Diamond Straight</span>
                        </div>

                        {/* 4. Round Flap Pocket */}
                        <div
                          className={`beige-choice-card ${pocketStyle === 'round-flap' ? 'selected' : ''}`}
                          onClick={() => setPocketStyle('round-flap')}
                        >
                          {pocketStyle === 'round-flap' && <span className="card-top-icon">T</span>}
                          <div className="beige-svg-viewport">
                            <Image
                              src="/shirt_customizer/pocket_round_flap.png"
                              alt="Round Flap Pocket"
                              width={130}
                              height={115}
                              className="visual-option-img"
                            />
                          </div>
                          <span className="card-item-title">Round Flap</span>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 5: PLACKET STYLE (MATCHING REFERENCE IMAGE IN BEIGE) */}
                    <div className="beige-option-section">
                      <h3 className="section-title-label">Placket</h3>
                      <div className="beige-items-row">
                        
                        {/* French Seamless */}
                        <div
                          className={`beige-choice-card ${placketStyle === 'french-seamless' ? 'selected' : ''}`}
                          onClick={() => setPlacketStyle('french-seamless')}
                        >
                          {placketStyle === 'french-seamless' && <span className="card-top-icon">T</span>}
                          <div className="beige-svg-viewport">
                            <Image
                              src="/shirt_customizer/placket_french.png"
                              alt="French Seamless Placket"
                              width={130}
                              height={115}
                              className="visual-option-img"
                            />
                          </div>
                          <span className="card-item-title">French Seamless</span>
                        </div>

                        {/* Classic Stitched */}
                        <div
                          className={`beige-choice-card ${placketStyle === 'classic-stitched' ? 'selected' : ''}`}
                          onClick={() => setPlacketStyle('classic-stitched')}
                        >
                          {placketStyle === 'classic-stitched' && <span className="card-top-icon">T</span>}
                          <div className="beige-svg-viewport">
                            <Image
                              src="/shirt_customizer/placket_classic.png"
                              alt="Classic Stitched Placket"
                              width={130}
                              height={115}
                              className="visual-option-img"
                            />
                          </div>
                          <span className="card-item-title">Classic Stitched</span>
                        </div>

                        {/* Concealed */}
                        <div
                          className={`beige-choice-card ${placketStyle === 'concealed' ? 'selected' : ''}`}
                          onClick={() => setPlacketStyle('concealed')}
                        >
                          {placketStyle === 'concealed' && <span className="card-top-icon">T</span>}
                          <div className="beige-svg-viewport">
                            <Image
                              src="/shirt_customizer/placket_concealed.png"
                              alt="Concealed Placket"
                              width={130}
                              height={115}
                              className="visual-option-img"
                            />
                          </div>
                          <span className="card-item-title">Concealed</span>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 6: CUFFS */}
                    <div className="beige-option-section">
                      <h3 className="section-title-label">Cuffs</h3>
                      <div className="beige-items-row">
                        
                        {/* 1. Round 1-Button */}
                        <div
                          className={`beige-choice-card ${cuffStyle === 'round-1' ? 'selected' : ''}`}
                          onClick={() => setCuffStyle('round-1')}
                        >
                          {cuffStyle === 'round-1' && <span className="card-top-icon">T</span>}
                          <div className="beige-svg-viewport">
                            <svg width="100%" height="100%" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M30 30L34 70H106L110 30H30Z" fill="#F6F2EC" stroke="#6F5D4B" strokeWidth="2"/>
                              <path d="M32 70H108C108 92 98 106 88 106H52C42 106 32 92 32 70Z" fill="#D6C5AF" stroke="#6F5D4B" strokeWidth="2.2"/>
                              <circle cx="70" cy="88" r="3" fill="#FFFFFF" stroke="#6F5D4B" strokeWidth="1.5"/>
                            </svg>
                          </div>
                          <span className="card-item-title">1-Button Round</span>
                        </div>

                        {/* 2. 2-Button Mitered */}
                        <div
                          className={`beige-choice-card ${cuffStyle === 'angle-2' ? 'selected' : ''}`}
                          onClick={() => setCuffStyle('angle-2')}
                        >
                          {cuffStyle === 'angle-2' && <span className="card-top-icon">T</span>}
                          <div className="beige-svg-viewport">
                            <svg width="100%" height="100%" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M30 30L34 70H106L110 30H30Z" fill="#F6F2EC" stroke="#6F5D4B" strokeWidth="2"/>
                              <path d="M32 70H108L98 106H42L32 70Z" fill="#D6C5AF" stroke="#6F5D4B" strokeWidth="2.2"/>
                              <circle cx="70" cy="82" r="2.5" fill="#FFFFFF" stroke="#6F5D4B" strokeWidth="1.4"/>
                              <circle cx="70" cy="94" r="2.5" fill="#FFFFFF" stroke="#6F5D4B" strokeWidth="1.4"/>
                            </svg>
                          </div>
                          <span className="card-item-title">2-Button Mitered</span>
                        </div>

                        {/* 3. French Double */}
                        <div
                          className={`beige-choice-card ${cuffStyle === 'french-double' ? 'selected' : ''}`}
                          onClick={() => setCuffStyle('french-double')}
                        >
                          {cuffStyle === 'french-double' && <span className="card-top-icon">T</span>}
                          <div className="beige-svg-viewport">
                            <svg width="100%" height="100%" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M30 30L34 60H106L110 30H30Z" fill="#F6F2EC" stroke="#6F5D4B" strokeWidth="2"/>
                              <rect x="28" y="60" width="84" height="48" rx="3" fill="#D6C5AF" stroke="#6F5D4B" strokeWidth="2.2"/>
                              <line x1="28" y1="84" x2="112" y2="84" stroke="#6F5D4B" strokeWidth="1.5" strokeDasharray="3 3"/>
                              <rect x="66" y="78" width="8" height="12" rx="1.5" fill="#7A6A58"/>
                            </svg>
                          </div>
                          <span className="card-item-title">French Double</span>
                        </div>

                        {/* 4. Convertible */}
                        <div
                          className={`beige-choice-card ${cuffStyle === 'convertible' ? 'selected' : ''}`}
                          onClick={() => setCuffStyle('convertible')}
                        >
                          {cuffStyle === 'convertible' && <span className="card-top-icon">T</span>}
                          <div className="beige-svg-viewport">
                            <svg width="100%" height="100%" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M30 30L34 70H106L110 30H30Z" fill="#F6F2EC" stroke="#6F5D4B" strokeWidth="2"/>
                              <rect x="30" y="70" width="80" height="36" rx="3" fill="#D6C5AF" stroke="#6F5D4B" strokeWidth="2.2"/>
                              <circle cx="56" cy="88" r="2.8" fill="#FFFFFF" stroke="#6F5D4B" strokeWidth="1.4"/>
                              <rect x="78" y="82" width="4" height="12" rx="1" fill="#7A6A58"/>
                            </svg>
                          </div>
                          <span className="card-item-title">Convertible Dual</span>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 7: MONOGRAM EMBROIDERY */}
                    <div className="beige-option-section monogram-box-beige">
                      <h3 className="section-title-label">Monogram Embroidery</h3>
                      <div className="monogram-inputs-strip">
                        <div className="mono-col">
                          <label>Initials</label>
                          <input
                            type="text"
                            maxLength={5}
                            placeholder="e.g. A.S.K"
                            value={monogramText}
                            onChange={(e) => setMonogramText(e.target.value.toUpperCase())}
                            className="mono-text-input"
                          />
                        </div>
                        <div className="mono-col">
                          <label>Placement</label>
                          <select
                            value={monogramPlacement}
                            onChange={(e) => setMonogramPlacement(e.target.value)}
                            className="mono-select-input"
                          >
                            <option value="cuff">Left Cuff (Watch Position)</option>
                            <option value="chest">Left Chest / Pocket</option>
                            <option value="hem">Lower Bottom Hem</option>
                            <option value="none">No Monogram</option>
                          </select>
                        </div>
                        <div className="mono-col">
                          <label>Thread Color</label>
                          <select
                            value={monogramColor}
                            onChange={(e) => setMonogramColor(e.target.value)}
                            className="mono-select-input"
                          >
                            <option value="navy">Navy Blue Silk</option>
                            <option value="gold">Champagne Gold</option>
                            <option value="white">Pure White</option>
                            <option value="match">Tone-on-Tone Beige</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. TROUSER CUSTOMIZATION OPTIONS */}
                {selectedGarment !== 'shirt' && (
                  <div className="beige-customizer-panel" style={{ marginTop: selectedGarment === 'combo' ? '2.5rem' : '0' }}>
                    <div className="trouser-header-tag">
                      <span className="trouser-badge">TROUSERS</span>
                      <h3>Bespoke Trouser Styling</h3>
                    </div>

                    {/* WAISTBAND STYLE */}
                    <div className="beige-option-section">
                      <h3 className="section-title-label">Waistband</h3>
                      <div className="beige-items-row">
                        
                        {/* Gurkha */}
                        <div
                          className={`beige-choice-card ${waistbandStyle === 'gurkha' ? 'selected' : ''}`}
                          onClick={() => setWaistbandStyle('gurkha')}
                        >
                          {waistbandStyle === 'gurkha' && <span className="card-top-icon">T</span>}
                          <div className="beige-svg-viewport">
                            <svg width="100%" height="100%" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M26 36H114L104 124H36L26 36Z" fill="#F6F2EC" stroke="#6F5D4B" strokeWidth="2"/>
                              <rect x="26" y="36" width="88" height="22" fill="#D6C5AF" stroke="#6F5D4B" strokeWidth="2"/>
                              <path d="M26 47H82L98 38" stroke="#6F5D4B" strokeWidth="2.2"/>
                              <rect x="96" y="42" width="12" height="12" rx="2" fill="#CBB69D" stroke="#6F5D4B" strokeWidth="1.8"/>
                              <line x1="70" y1="58" x2="70" y2="124" stroke="#6F5D4B" strokeWidth="1.5"/>
                            </svg>
                          </div>
                          <span className="card-item-title">Gurkha Buckle</span>
                        </div>

                        {/* Side Adjusters */}
                        <div
                          className={`beige-choice-card ${waistbandStyle === 'side-adjusters' ? 'selected' : ''}`}
                          onClick={() => setWaistbandStyle('side-adjusters')}
                        >
                          {waistbandStyle === 'side-adjusters' && <span className="card-top-icon">T</span>}
                          <div className="beige-svg-viewport">
                            <svg width="100%" height="100%" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M26 36H114L104 124H36L26 36Z" fill="#F6F2EC" stroke="#6F5D4B" strokeWidth="2"/>
                              <rect x="26" y="36" width="88" height="18" fill="#D6C5AF" stroke="#6F5D4B" strokeWidth="2"/>
                              <rect x="26" y="40" width="10" height="10" rx="2" fill="#CBB69D" stroke="#6F5D4B" strokeWidth="1.5"/>
                              <rect x="104" y="40" width="10" height="10" rx="2" fill="#CBB69D" stroke="#6F5D4B" strokeWidth="1.5"/>
                              <line x1="70" y1="54" x2="70" y2="124" stroke="#6F5D4B" strokeWidth="1.5"/>
                            </svg>
                          </div>
                          <span className="card-item-title">Side Adjusters</span>
                        </div>

                        {/* Belt Loops */}
                        <div
                          className={`beige-choice-card ${waistbandStyle === 'belt-loops' ? 'selected' : ''}`}
                          onClick={() => setWaistbandStyle('belt-loops')}
                        >
                          {waistbandStyle === 'belt-loops' && <span className="card-top-icon">T</span>}
                          <div className="beige-svg-viewport">
                            <svg width="100%" height="100%" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M26 36H114L104 124H36L26 36Z" fill="#F6F2EC" stroke="#6F5D4B" strokeWidth="2"/>
                              <rect x="26" y="36" width="88" height="18" fill="#D6C5AF" stroke="#6F5D4B" strokeWidth="2"/>
                              <rect x="42" y="32" width="5" height="26" rx="1" fill="#6F5D4B"/>
                              <rect x="68" y="32" width="5" height="26" rx="1" fill="#6F5D4B"/>
                              <rect x="94" y="32" width="5" height="26" rx="1" fill="#6F5D4B"/>
                              <line x1="70" y1="54" x2="70" y2="124" stroke="#6F5D4B" strokeWidth="1.5"/>
                            </svg>
                          </div>
                          <span className="card-item-title">Belt Loops</span>
                        </div>
                      </div>
                    </div>

                    {/* PLEATS */}
                    <div className="beige-option-section">
                      <h3 className="section-title-label">Front Pleats</h3>
                      <div className="beige-items-row">
                        
                        {/* Flat Front */}
                        <div
                          className={`beige-choice-card ${pleatStyle === 'flat-front' ? 'selected' : ''}`}
                          onClick={() => setPleatStyle('flat-front')}
                        >
                          {pleatStyle === 'flat-front' && <span className="card-top-icon">T</span>}
                          <div className="beige-svg-viewport">
                            <svg width="100%" height="100%" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M26 36H114L104 124H36L26 36Z" fill="#F6F2EC" stroke="#6F5D4B" strokeWidth="2"/>
                              <rect x="26" y="36" width="88" height="18" fill="#D6C5AF" stroke="#6F5D4B" strokeWidth="2"/>
                              <line x1="48" y1="54" x2="48" y2="124" stroke="#6F5D4B" strokeWidth="1.4" strokeDasharray="3 3"/>
                              <line x1="92" y1="54" x2="92" y2="124" stroke="#6F5D4B" strokeWidth="1.4" strokeDasharray="3 3"/>
                            </svg>
                          </div>
                          <span className="card-item-title">Flat Front</span>
                        </div>

                        {/* Single Pleat */}
                        <div
                          className={`beige-choice-card ${pleatStyle === 'single-pleat' ? 'selected' : ''}`}
                          onClick={() => setPleatStyle('single-pleat')}
                        >
                          {pleatStyle === 'single-pleat' && <span className="card-top-icon">T</span>}
                          <div className="beige-svg-viewport">
                            <svg width="100%" height="100%" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M26 36H114L104 124H36L26 36Z" fill="#F6F2EC" stroke="#6F5D4B" strokeWidth="2"/>
                              <rect x="26" y="36" width="88" height="18" fill="#D6C5AF" stroke="#6F5D4B" strokeWidth="2"/>
                              <path d="M46 54L42 90L46 124" stroke="#6F5D4B" strokeWidth="2"/>
                              <path d="M94 54L98 90L94 124" stroke="#6F5D4B" strokeWidth="2"/>
                            </svg>
                          </div>
                          <span className="card-item-title">Single Pleat</span>
                        </div>
                      </div>
                    </div>

                    {/* BOTTOM HEM */}
                    <div className="beige-option-section">
                      <h3 className="section-title-label">Bottom Hem</h3>
                      <div className="beige-items-row">
                        
                        {/* Italian Cuffs */}
                        <div
                          className={`beige-choice-card ${hemStyle === 'cuffs' ? 'selected' : ''}`}
                          onClick={() => setHemStyle('cuffs')}
                        >
                          {hemStyle === 'cuffs' && <span className="card-top-icon">T</span>}
                          <div className="beige-svg-viewport">
                            <svg width="100%" height="100%" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M36 30L40 86H100L104 30H36Z" fill="#F6F2EC" stroke="#6F5D4B" strokeWidth="2"/>
                              <rect x="36" y="86" width="68" height="24" rx="2" fill="#D6C5AF" stroke="#6F5D4B" strokeWidth="2.2"/>
                            </svg>
                          </div>
                          <span className="card-item-title">1.5" Italian Cuffs</span>
                        </div>

                        {/* Plain Blind Hem */}
                        <div
                          className={`beige-choice-card ${hemStyle === 'plain-blind' ? 'selected' : ''}`}
                          onClick={() => setHemStyle('plain-blind')}
                        >
                          {hemStyle === 'plain-blind' && <span className="card-top-icon">T</span>}
                          <div className="beige-svg-viewport">
                            <svg width="100%" height="100%" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M36 30L40 110H100L104 30H36Z" fill="#F6F2EC" stroke="#6F5D4B" strokeWidth="2"/>
                              <line x1="40" y1="98" x2="100" y2="98" stroke="#6F5D4B" strokeWidth="1.5" strokeDasharray="3 3"/>
                            </svg>
                          </div>
                          <span className="card-item-title">Plain Blind Hem</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Sticky Summary & Booking Box */}
              <div className="studio-summary-column">
                <div className="summary-sticky-box">
                  <div className="summary-card-panel">
                    <div className="summary-head">
                      <span className="summary-tag">Your Custom Configuration</span>
                      <h3>{selectedGarment === 'combo' ? 'Shirt + Trouser Combo' : selectedGarment === 'shirt' ? 'Bespoke Dress Shirt' : 'Tailored Trousers'}</h3>
                      <div className="summary-price-box">
                        <span className="sum-curr">₹</span>
                        <span className="sum-amt">{calculatedPrice.toLocaleString('en-IN')}</span>
                        <span className="sum-sub">
                          {fabricSource === 'self-provided' ? 'Stitching Only' : 'Fabric + Master Tailoring'}
                        </span>
                      </div>
                    </div>

                    <div className="summary-fabric-strip">
                      <div className="strip-img-wrap">
                        <Image
                          src={selectedFabric.image}
                          alt={selectedFabric.name}
                          width={56}
                          height={56}
                          className="strip-thumb"
                        />
                      </div>
                      <div className="strip-text">
                        <strong>{selectedFabric.shortName}</strong>
                        <span>{selectedFabric.count} • {selectedFabric.origin}</span>
                        <span className="strip-color-pill">
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: selectedFabric.colorHex, border: '1px solid #ccc' }}></span>
                          {selectedFabric.color}
                        </span>
                      </div>
                    </div>

                    {/* Specs List */}
                    <div className="summary-specs-block">
                      <div className="spec-item">
                        <span>Garment:</span>
                        <strong>{GARMENT_TYPES.find(g => g.id === selectedGarment)?.name}</strong>
                      </div>

                      {selectedGarment !== 'trouser' && (
                        <>
                          <div className="spec-item">
                            <span>Sleeves:</span>
                            <strong>{sleeveStyle === 'long' ? 'Long Sleeves' : 'Short Sleeves'}</strong>
                          </div>
                          <div className="spec-item">
                            <span>Fit:</span>
                            <strong>Fit {shirtFit.toUpperCase()}</strong>
                          </div>
                          <div className="spec-item">
                            <span>Collar:</span>
                            <strong>{collarStyle.toUpperCase()}</strong>
                          </div>
                          <div className="spec-item">
                            <span>Pocket:</span>
                            <strong>{pocketStyle.replace(/-/g, ' ').toUpperCase()}</strong>
                          </div>
                          <div className="spec-item">
                            <span>Placket:</span>
                            <strong>{placketStyle.replace(/-/g, ' ').toUpperCase()}</strong>
                          </div>
                          <div className="spec-item">
                            <span>Cuff:</span>
                            <strong>{cuffStyle.replace(/-/g, ' ').toUpperCase()}</strong>
                          </div>
                          {monogramText.trim() && (
                            <div className="spec-item highlight-spec-row">
                              <span>Monogram:</span>
                              <strong>[{monogramText.trim()}] ({monogramColor})</strong>
                            </div>
                          )}
                        </>
                      )}

                      {selectedGarment !== 'shirt' && (
                        <>
                          <div className="spec-item">
                            <span>Waistband:</span>
                            <strong>{waistbandStyle.replace(/-/g, ' ').toUpperCase()}</strong>
                          </div>
                          <div className="spec-item">
                            <span>Pleats:</span>
                            <strong>{pleatStyle.replace(/-/g, ' ').toUpperCase()}</strong>
                          </div>
                          <div className="spec-item">
                            <span>Hem:</span>
                            <strong>{hemStyle === 'cuffs' ? '1.5" Italian Cuffs' : 'Plain Blind Hem'}</strong>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Guarantees */}
                    <div className="doorstep-guarantee-pill">
                      <div className="g-line">
                        <span className="g-icon">✦</span>
                        <span>Master Tailor takes 35+ measurements at home</span>
                      </div>
                      <div className="g-line">
                        <span className="g-icon">✦</span>
                        <span>30-Day Free Fit Alteration Guarantee</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      className="studio-submit-booking-btn"
                      onClick={handleProceedToBooking}
                    >
                      Book Master Tailor Fitting Session →
                    </button>

                    <div className="studio-sub-links">
                      <button
                        type="button"
                        className="sub-link-action"
                        onClick={() => setCurrentStep(1)}
                      >
                        ← Change Selected Fabric
                      </button>
                      <Link href="/ai-tryon" className="sub-link-action">
                        Preview on AI Try-On ↗
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scoped CSS Styles */}
      <style jsx>{`
        .shirts-page-container {
          min-height: 100vh;
          background: #fcfaf6;
          color: #1a2923;
          padding-bottom: 6rem;
        }

        /* Header Bar */
        .shirts-header-bar {
          background: #000000;
          border-bottom: 1px solid rgba(255, 217, 190, 0.15);
          padding: 1.1rem 0;
          position: sticky;
          top: 0;
          z-index: 40;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
        }

        .shirts-header-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .shirts-breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
        }

        .crumb-link {
          color: #a0b6af;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .crumb-link:hover {
          color: #ffd9be;
        }

        .crumb-sep {
          color: rgba(255, 217, 190, 0.3);
        }

        .crumb-current {
          color: #ffd9be;
          font-weight: 600;
        }

        .shirts-step-tracker {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .step-tab {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: transparent;
          border: 1px solid rgba(255, 217, 190, 0.2);
          color: #a0b6af;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .step-tab:hover {
          border-color: #ffd9be;
          color: #ffffff;
        }

        .step-tab.active {
          background: #064e3b;
          border-color: #ffd9be;
          color: #ffd9be;
          box-shadow: 0 2px 10px rgba(6, 78, 59, 0.5);
        }

        .step-tab.completed {
          background: rgba(255, 217, 190, 0.15);
          color: #ffd9be;
          border-color: rgba(255, 217, 190, 0.4);
        }

        .step-num {
          font-size: 0.75rem;
        }

        .step-arrow {
          color: rgba(255, 217, 190, 0.3);
          font-size: 0.8rem;
        }

        /* Garment Type Bar */
        .garment-type-bar {
          background: radial-gradient(circle at 50% 30%, #0d5c48 0%, #064e3b 100%);
          padding: 2rem 0 2.25rem 0;
          border-bottom: 1.5px solid rgba(255, 217, 190, 0.18);
        }

        .garment-type-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .garment-type-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }

        .garment-card-btn {
          background: #0a1310;
          border: 1.5px solid rgba(255, 217, 190, 0.18);
          border-radius: 16px;
          padding: 1.25rem 1.4rem;
          text-align: left;
          color: #ffffff;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
        }

        .garment-card-btn:hover {
          transform: translateY(-3px);
          border-color: #ffd9be;
          background: #121f1a;
        }

        .garment-card-btn.active {
          background: linear-gradient(135deg, #0d6951 0%, #064e3b 100%);
          border-color: #ffd9be;
          box-shadow: 0 10px 30px rgba(6, 78, 59, 0.5), inset 0 1px 0 rgba(255, 217, 190, 0.4);
          transform: translateY(-2px) scale(1.01);
        }

        .garment-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.6rem;
        }

        .garment-badge {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          background: rgba(255, 217, 190, 0.15);
          color: #ffd9be;
          border: 1px solid rgba(255, 217, 190, 0.3);
        }

        .garment-savings {
          font-size: 0.75rem;
          font-weight: 700;
          color: #ffd9be;
        }

        .garment-name {
          font-family: var(--font-serif, Georgia, serif);
          font-size: 1.2rem;
          color: #ffffff;
          margin-bottom: 0.25rem;
        }

        .garment-card-btn.active .garment-name {
          color: #ffd9be;
        }

        .garment-subtitle {
          font-size: 0.8rem;
          color: #a0b6af;
          line-height: 1.35;
        }

        /* Catalog Layout */
        .shirts-catalog-wrapper {
          max-width: 1280px;
          margin: 2.5rem auto 0 auto;
          padding: 0 1.5rem;
        }

        .shirts-layout-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 2rem;
          align-items: flex-start;
        }

        .shirts-filter-sidebar {
          background: #ffffff;
          border: 1.5px solid #e8e2d5;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.03);
          position: sticky;
          top: 90px;
        }

        .filter-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #e8e2d5;
        }

        .filter-heading {
          font-family: var(--font-serif, Georgia, serif);
          font-size: 1.2rem;
          color: #064e3b;
        }

        .clear-filter-btn {
          background: transparent;
          border: none;
          color: #a47843;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          text-decoration: underline;
        }

        .filter-group {
          margin-bottom: 1.25rem;
        }

        .filter-group.highlight-box {
          background: #fdfbf7;
          border: 1px solid #e8e2d5;
          border-radius: 10px;
          padding: 0.85rem;
        }

        .filter-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 700;
          color: #064e3b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.4rem;
        }

        .search-input-wrap {
          position: relative;
        }

        .filter-search-input, .filter-select {
          width: 100%;
          padding: 0.65rem 0.85rem;
          border-radius: 8px;
          border: 1.5px solid #dcd5c8;
          background: #ffffff;
          font-size: 0.88rem;
          color: #1a2923;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .filter-search-input:focus, .filter-select:focus {
          border-color: #064e3b;
        }

        .clear-search-btn {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          border: none;
          font-size: 1.1rem;
          color: #8c7355;
          cursor: pointer;
        }

        .supply-radio-stack {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .supply-radio-item {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.78rem;
          color: #3b4d46;
          cursor: pointer;
          line-height: 1.35;
        }

        .supply-radio-item input {
          margin-top: 2px;
        }

        .atelier-perks-card {
          background: #064e3b;
          color: #ffffff;
          border-radius: 12px;
          padding: 1rem;
          margin-top: 1.5rem;
        }

        .perk-title {
          font-size: 0.8rem;
          font-weight: 700;
          color: #ffd9be;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.6rem;
        }

        .perk-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .perk-list li {
          font-size: 0.75rem;
          color: #d1e4de;
          line-height: 1.35;
          position: relative;
          padding-left: 0.8rem;
        }

        .perk-list li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #ffd9be;
        }

        .shirts-grid-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #e8e2d5;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .shirts-result-count {
          font-size: 0.95rem;
          color: #556962;
        }

        .shirts-result-count strong {
          color: #064e3b;
        }

        .shirts-category-note {
          font-size: 0.85rem;
          font-weight: 600;
          color: #a47843;
        }

        .shirts-fabric-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .fabric-card {
          background: #ffffff;
          border: 1.5px solid #e8e2d5;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          display: flex;
          flex-direction: column;
        }

        .fabric-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 36px rgba(6, 78, 59, 0.1);
          border-color: #c5a880;
        }

        .fabric-card.active-fabric {
          border-color: #064e3b;
          outline: 2px solid #064e3b;
        }

        .fabric-img-wrap {
          position: relative;
          width: 100%;
          height: 220px;
          background: #f4efe6;
          overflow: hidden;
        }

        .fabric-img {
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .fabric-card:hover .fabric-img {
          transform: scale(1.05);
        }

        .fabric-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #064e3b;
          color: #ffd9be;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
          border: 1px solid #ffd9be;
          z-index: 10;
        }

        .fabric-overlay-hover {
          position: absolute;
          inset: 0;
          background: rgba(6, 78, 59, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.25s ease;
          z-index: 15;
        }

        .fabric-card:hover .fabric-overlay-hover {
          opacity: 1;
        }

        .customize-btn-overlay {
          background: #ffd9be;
          color: #064e3b;
          font-weight: 700;
          font-size: 0.85rem;
          padding: 0.75rem 1.25rem;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
        }

        .fabric-details-body {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .fabric-header-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .fabric-dresscode {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #a47843;
          letter-spacing: 0.5px;
        }

        .fabric-count-pill {
          font-size: 0.7rem;
          font-weight: 600;
          background: #f4efe6;
          color: #556962;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
        }

        .fabric-title {
          font-family: var(--font-serif, Georgia, serif);
          font-size: 1.05rem;
          color: #064e3b;
          margin-bottom: 0.4rem;
        }

        .fabric-desc {
          font-size: 0.8rem;
          color: #556962;
          line-height: 1.45;
          margin-bottom: 0.85rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .fabric-meta-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: #718780;
          padding: 0.5rem 0;
          border-top: 1px dashed #e8e2d5;
          border-bottom: 1px dashed #e8e2d5;
          margin-bottom: 1rem;
        }

        .fabric-price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
        }

        .price-stack {
          display: flex;
          flex-direction: column;
        }

        .price-val {
          font-size: 1.35rem;
          font-weight: 800;
          color: #064e3b;
        }

        .price-sub {
          font-size: 0.7rem;
          color: #8c7355;
          text-transform: uppercase;
          font-weight: 600;
        }

        .select-customise-cta {
          padding: 0.55rem 0.95rem;
          border-radius: 8px;
          border: 1.5px solid #064e3b;
          background: #064e3b;
          color: #ffffff;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
        }

        /* Step 2: Customization Studio */
        .studio-wrapper {
          max-width: 1280px;
          margin: 2rem auto 0 auto;
          padding: 0 1.5rem;
        }

        .studio-fabric-showcase-bar {
          background: #ffffff;
          border: 1.5px solid #e8e2d5;
          border-radius: 16px;
          padding: 1.25rem 1.5rem;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.03);
          flex-wrap: wrap;
        }

        .showcase-fabric-img {
          position: relative;
          width: 80px;
          height: 80px;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid #064e3b;
          flex-shrink: 0;
        }

        .showcase-img-fit {
          object-fit: cover;
        }

        .showcase-text {
          flex: 1;
          min-width: 260px;
        }

        .showcase-badge {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #a47843;
          letter-spacing: 1px;
          display: block;
          margin-bottom: 0.2rem;
        }

        .showcase-text h3 {
          font-family: var(--font-serif, Georgia, serif);
          font-size: 1.25rem;
          color: #064e3b;
          margin-bottom: 0.25rem;
        }

        .showcase-tags {
          display: flex;
          gap: 1rem;
          font-size: 0.75rem;
          color: #718780;
          flex-wrap: wrap;
        }

        .showcase-tags strong {
          color: #1a2923;
        }

        .showcase-change-btn {
          background: transparent;
          border: 1.5px solid #064e3b;
          color: #064e3b;
          font-weight: 700;
          font-size: 0.85rem;
          padding: 0.6rem 1.1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .showcase-change-btn:hover {
          background: #064e3b;
          color: #ffffff;
        }

        .studio-grid {
          display: grid;
          grid-template-columns: 1.7fr 1fr;
          gap: 2.5rem;
          align-items: flex-start;
        }

        /* BEIGE CUSTOMIZER PANEL (MATCHING REFERENCE IMAGE) */
        .beige-customizer-panel {
          background: #ffffff;
          border: 1px solid #e8e2d5;
          border-radius: 16px;
          padding: 2rem 2.25rem;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
        }

        .trouser-header-tag {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #e8e2d5;
        }

        .trouser-badge {
          background: #064e3b;
          color: #ffd9be;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 1px;
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
        }

        .trouser-header-tag h3 {
          font-family: var(--font-serif, Georgia, serif);
          font-size: 1.35rem;
          color: #064e3b;
        }

        .beige-option-section {
          margin-bottom: 2.5rem;
        }

        .section-title-label {
          font-size: 1.18rem;
          font-weight: 700;
          color: #1a2923;
          margin-bottom: 1rem;
          letter-spacing: -0.2px;
        }

        .beige-items-row {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
          gap: 1.25rem;
        }

        /* Choice Card Styled Exactly Like Screenshot */
        .beige-choice-card {
          border: 1.5px solid #eae5dc;
          border-radius: 12px;
          background: #ffffff;
          padding: 0.85rem 0.5rem 0.85rem 0.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          min-height: 175px;
          cursor: pointer;
          position: relative;
          transition: all 0.2s ease;
        }

        .beige-choice-card:hover {
          border-color: #a47843;
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.06);
        }

        .beige-choice-card.selected {
          border: 2px solid #5c1d24;
          box-shadow: 0 4px 14px rgba(92, 29, 36, 0.15);
          background: #ffffff;
        }

        .card-top-icon {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 19px;
          height: 19px;
          border-radius: 50%;
          background: #5c1d24;
          color: #ffffff;
          font-size: 0.68rem;
          font-weight: 800;
          font-family: var(--font-serif, Georgia, serif);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .beige-svg-viewport {
          width: 100%;
          height: 110px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.25rem;
        }

        .card-item-title {
          font-size: 0.82rem;
          font-weight: 700;
          color: #1a2923;
          text-align: center;
          margin-top: 0.4rem;
          white-space: nowrap;
        }

        .beige-choice-card.selected .card-item-title {
          color: #5c1d24;
          font-weight: 800;
        }

        .recommends-pill-badge {
          display: block;
          background: #5c1d24;
          color: #ffffff;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
          margin-top: 0.35rem;
          text-align: center;
          white-space: nowrap;
        }

        /* Monogram Input Strip */
        .monogram-box-beige {
          background: #fdfbf8;
          border: 1px solid #e8e2d5;
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
        }

        .monogram-inputs-strip {
          display: grid;
          grid-template-columns: 1fr 1.2fr 1fr;
          gap: 1rem;
        }

        .mono-col label {
          display: block;
          font-size: 0.78rem;
          font-weight: 700;
          color: #445952;
          margin-bottom: 0.35rem;
        }

        .mono-text-input, .mono-select-input {
          width: 100%;
          padding: 0.65rem 0.85rem;
          border-radius: 8px;
          border: 1.5px solid #ddd5c7;
          background: #ffffff;
          font-size: 0.88rem;
          color: #1a2923;
          outline: none;
        }

        .mono-text-input:focus, .mono-select-input:focus {
          border-color: #064e3b;
        }

        /* Summary Panel Right */
        .summary-sticky-box {
          position: sticky;
          top: 90px;
        }

        .summary-card-panel {
          background: #ffffff;
          border: 2px solid #064e3b;
          border-radius: 16px;
          padding: 1.75rem;
          box-shadow: 0 16px 36px rgba(6, 78, 59, 0.08);
        }

        .summary-head {
          border-bottom: 1px solid #e8e2d5;
          padding-bottom: 1.15rem;
          margin-bottom: 1.15rem;
        }

        .summary-tag {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #a47843;
          font-weight: 700;
          display: block;
          margin-bottom: 0.25rem;
        }

        .summary-head h3 {
          font-family: var(--font-serif, Georgia, serif);
          font-size: 1.45rem;
          color: #064e3b;
          margin-bottom: 0.6rem;
        }

        .summary-price-box {
          display: flex;
          align-items: baseline;
          gap: 0.35rem;
        }

        .sum-curr {
          font-size: 1.1rem;
          font-weight: 700;
          color: #064e3b;
        }

        .sum-amt {
          font-size: 2rem;
          font-weight: 800;
          color: #064e3b;
          letter-spacing: -0.5px;
        }

        .sum-sub {
          font-size: 0.75rem;
          color: #718780;
          text-transform: uppercase;
          font-weight: 600;
          margin-left: 0.35rem;
        }

        .summary-fabric-strip {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          background: #f4efe6;
          border: 1px solid #e2d8c7;
          border-radius: 10px;
          padding: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .strip-thumb {
          border-radius: 6px;
          object-fit: cover;
        }

        .strip-text {
          display: flex;
          flex-direction: column;
        }

        .strip-text strong {
          font-size: 0.88rem;
          color: #064e3b;
        }

        .strip-text span {
          font-size: 0.74rem;
          color: #647b73;
        }

        .strip-color-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.72rem;
          margin-top: 2px;
        }

        .summary-specs-block {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }

        .spec-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.82rem;
          padding-bottom: 0.35rem;
          border-bottom: 1px dashed #e8e2d5;
        }

        .spec-item span {
          color: #647b73;
        }

        .spec-item strong {
          color: #064e3b;
          text-align: right;
        }

        .spec-item.highlight-spec-row {
          background: #f0f7f4;
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          border-bottom: none;
        }

        .doorstep-guarantee-pill {
          background: #fdfbf7;
          border: 1px solid #e8e2d5;
          border-radius: 10px;
          padding: 0.85rem;
          margin-bottom: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .g-line {
          display: flex;
          align-items: flex-start;
          gap: 0.45rem;
          font-size: 0.76rem;
          color: #445952;
          line-height: 1.35;
        }

        .g-icon {
          color: #a47843;
          font-size: 0.8rem;
        }

        .studio-submit-booking-btn {
          width: 100%;
          padding: 0.95rem;
          border-radius: 10px;
          background: #064e3b;
          color: #ffffff;
          font-weight: 700;
          font-size: 0.92rem;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(6, 78, 59, 0.25);
          margin-bottom: 0.85rem;
        }

        .studio-submit-booking-btn:hover {
          background: #0d5c48;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(6, 78, 59, 0.35);
        }

        .studio-sub-links {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .sub-link-action {
          background: transparent;
          border: none;
          font-size: 0.78rem;
          color: #064e3b;
          text-decoration: underline;
          cursor: pointer;
        }

        .sub-link-action:hover {
          color: #a47843;
        }

        @media (max-width: 960px) {
          .garment-type-grid {
            grid-template-columns: 1fr;
          }
          .shirts-layout-grid {
            grid-template-columns: 1fr;
          }
          .studio-grid {
            grid-template-columns: 1fr;
          }
          .monogram-inputs-strip {
            grid-template-columns: 1fr;
          }
          .beige-items-row {
            grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
          }
        }
      `}</style>
    </div>
  );
}
