'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useBooking } from '../../components/ClientLayoutWrapper';

const SUIT_FABRICS = [
  {
    id: 'sf_royal_blue',
    name: 'Royal Blue Solid 100% Italian Merino Wool Fabric',
    shortName: 'Royal Blue Merino Wool',
    price: 21000,
    dressCode: 'Business Formal',
    color: 'Royal Blue',
    colorHex: '#1e3d6b',
    fabric: '100% Italian Merino Wool',
    count: 'Super 140s',
    pattern: 'Solid',
    image: '/wool/Blue wool fabric 1.png',
    hoverImage: '/wool/Blue wool fabric 2.png',
    origin: 'Biella, Italy',
    weight: '270 gsm',
    badge: 'Best Seller',
    description: 'Crisp royal blue extra-fine Merino wool woven with high natural resilience, subtle sheen, and sharp executive drape.'
  },
  {
    id: 'sf_burgundy',
    name: 'Burgundy Solid 100% Italian Merino Wool Fabric',
    shortName: 'Burgundy Merino Wool',
    price: 21000,
    dressCode: 'Wedding / Festive',
    color: 'Burgundy',
    colorHex: '#4d1921',
    fabric: '100% Italian Merino Wool',
    count: 'Super 150s',
    pattern: 'Solid',
    image: '/wool/burgundy wool fabric 1.png',
    hoverImage: '/wool/burgundy wool fabric 2.png',
    origin: 'Biella, Italy',
    weight: '280 gsm',
    badge: 'Signature',
    description: 'Deep wine burgundy pure wool with luxurious silky hand-feel and dramatic color depth for evening wear and festive galas.'
  },
  {
    id: 'sf_jet_black',
    name: 'Jet Black Solid 100% Italian Merino Wool Fabric',
    shortName: 'Jet Black Merino Wool',
    price: 21000,
    dressCode: 'Black Tie / Evening',
    color: 'Black',
    colorHex: '#111215',
    fabric: '100% Italian Merino Wool',
    count: 'Super 150s',
    pattern: 'Solid',
    image: '/wool/Charcol black wool fabric 1.png',
    hoverImage: '/wool/Charcol black wool fabric 2.png',
    origin: 'Huddersfield, England',
    weight: '285 gsm',
    badge: 'Black Tie Essential',
    description: 'Ultra-deep jet black suiting wool engineered for immaculate black-tie tuxedos, dinner jackets, and executive formalwear.'
  },
  {
    id: 'sf_midnight_blue',
    name: 'Midnight Blue Solid 100% Italian Merino Wool Fabric',
    shortName: 'Midnight Blue Merino Wool',
    price: 21000,
    dressCode: 'Business Formal',
    color: 'Midnight Blue',
    colorHex: '#182436',
    fabric: '100% Italian Merino Wool',
    count: 'Super 160s',
    pattern: 'Solid',
    image: '/wool/sapphire blue wool fabric 1.png',
    hoverImage: '/wool/sapphire blue wool fabric 2.png',
    origin: 'Biella, Italy',
    weight: '275 gsm',
    badge: 'Executive Choice',
    description: 'The pinnacle of bespoke business suiting. Midnight blue Merino wool offering superior crease-recovery and formal elegance.'
  },
  {
    id: 'sf_slate_grey',
    name: 'Slate Grey Solid 100% Italian Merino Wool Fabric',
    shortName: 'Slate Grey Merino Wool',
    price: 21000,
    dressCode: 'Business Formal',
    color: 'Slate Grey',
    colorHex: '#585e65',
    fabric: '100% Italian Merino Wool',
    count: 'Super 140s',
    pattern: 'Solid',
    image: '/wool/Grey wool fabric 1.png',
    hoverImage: '/wool/Grey wool fabric 2.png',
    origin: 'Huddersfield, England',
    weight: '275 gsm',
    badge: 'Classic Corporate',
    description: 'Timeless slate grey suiting wool. High structural resilience, all-season breathability, and subtle refined luster.'
  },
  {
    id: 'sf_petrol_blue',
    name: 'Petrol Blue Solid 100% Italian Merino Wool Fabric',
    shortName: 'Petrol Blue Merino Wool',
    price: 21000,
    dressCode: 'Business Formal',
    color: 'Petrol Blue',
    colorHex: '#254457',
    fabric: '100% Italian Merino Wool',
    count: 'Super 140s',
    pattern: 'Solid',
    image: '/wool/Petrol blue wool fabric 1.png',
    hoverImage: '/wool/Petrol blue wool fabric 2.png',
    origin: 'Biella, Italy',
    weight: '265 gsm',
    badge: 'Modern Executive',
    description: 'Distinguished oceanic petrol blue wool suiting. Creates a commanding, modern executive statement under boardroom lighting.'
  },
  {
    id: 'sf_espresso_brown',
    name: 'Espresso Brown Solid 100% Italian Merino Wool Fabric',
    shortName: 'Espresso Brown Merino Wool',
    price: 21000,
    dressCode: 'Smart Casual',
    color: 'Espresso Brown',
    colorHex: '#4a3328',
    fabric: '100% Italian Merino Wool',
    count: 'Super 130s',
    pattern: 'Solid',
    image: '/wool/Brown wool fabric 1.png',
    hoverImage: '/wool/Brown wool fabric 2.png',
    origin: 'Biella, Italy',
    weight: '270 gsm',
    badge: 'Heritage Wool',
    description: 'Rich dark espresso brown suiting wool featuring a velvety smooth hand feel and warm sartorial sophistication.'
  },
  {
    id: 'sf_sandy_khaki',
    name: 'Sandy Khaki Solid 100% Italian Merino Wool Fabric',
    shortName: 'Sandy Khaki Merino Wool',
    price: 21000,
    dressCode: 'Smart Casual',
    color: 'Sandy Khaki',
    colorHex: '#9c8a6b',
    fabric: '100% Italian Merino Wool',
    count: 'Super 130s',
    pattern: 'Solid',
    image: '/wool/Khaki wool fabric 1.png',
    hoverImage: '/wool/Khaki wool fabric 2.png',
    origin: 'Biella, Italy',
    weight: '250 gsm',
    badge: 'Summer Suiting',
    description: 'Airy, lightweight sandy khaki pure wool. Perfect for destination weddings, summer celebrations, and smart casual blazers.'
  },
  {
    id: 'sf_warm_latte',
    name: 'Warm Latte Solid 100% Italian Merino Wool Fabric',
    shortName: 'Warm Latte Merino Wool',
    price: 21000,
    dressCode: 'Smart Casual',
    color: 'Latte / Cream',
    colorHex: '#b8a186',
    fabric: '100% Italian Merino Wool',
    count: 'Super 140s',
    pattern: 'Solid',
    image: '/wool/Latte wool fabric 1.png',
    hoverImage: '/wool/Latte wool fabric 2.png',
    origin: 'Biella, Italy',
    weight: '255 gsm',
    badge: 'Pure Wool',
    description: 'Creamy warm latte beige fine suiting wool. Subtle neutral aesthetic, compact weave structure, and luxurious fluid drape.'
  },
  {
    id: 'sf_forest_pine',
    name: 'Forest Pine Solid 100% Italian Merino Wool Fabric',
    shortName: 'Forest Pine Merino Wool',
    price: 21000,
    dressCode: 'Wedding / Festive',
    color: 'Forest Green',
    colorHex: '#223829',
    fabric: '100% Italian Merino Wool',
    count: 'Super 140s',
    pattern: 'Solid',
    image: '/wool/forest pine wool fabric 1.png',
    hoverImage: '/wool/forest pine wool fabric 2.png',
    origin: 'Biella, Italy',
    weight: '275 gsm',
    badge: 'Royal Festive',
    description: 'Deep regal forest green wool combining opulent botanical richness with structured softness for winter galas and festive suits.'
  },
  {
    id: 'sf_earthy_olive',
    name: 'Earthy Olive Solid 100% Italian Merino Wool Fabric',
    shortName: 'Earthy Olive Merino Wool',
    price: 21000,
    dressCode: 'Smart Casual',
    color: 'Olive Green',
    colorHex: '#454f38',
    fabric: '100% Italian Merino Wool',
    count: 'Super 140s',
    pattern: 'Solid',
    image: '/wool/Olive wool fabric 1.png',
    hoverImage: '/wool/Olive wool fabric 2.png',
    origin: 'Biella, Italy',
    weight: '270 gsm',
    badge: 'Contemporary',
    description: 'Muted earthy olive green suiting wool with smooth Italian twill finish. Highly versatile for tailored blazers and complete suits.'
  },
  {
    id: 'sf_dusty_mauve',
    name: 'Dusty Mauve Solid 100% Italian Merino Wool Fabric',
    shortName: 'Dusty Mauve Merino Wool',
    price: 21000,
    dressCode: 'Wedding / Festive',
    color: 'Dusty Mauve',
    colorHex: '#8c6b75',
    fabric: '100% Italian Merino Wool',
    count: 'Super 140s',
    pattern: 'Solid',
    image: '/wool/Mauve wool fabric 1.png',
    hoverImage: '/wool/Mauve wool fabric 2.png',
    origin: 'France',
    weight: '260 gsm',
    badge: 'Pastel Luxury',
    description: 'Refined dusty mauve pink wool suiting with light-catching texture and breathable extra-fine Merino yarns for standout cocktail wear.'
  },
  {
    id: 'sf_camel_tan',
    name: 'Camel Tan Solid 100% Italian Merino Wool Fabric',
    shortName: 'Camel Tan Merino Wool',
    price: 21000,
    dressCode: 'Smart Casual',
    color: 'Camel Tan',
    colorHex: '#a88554',
    fabric: '100% Italian Merino Wool',
    count: 'Super 130s',
    pattern: 'Solid',
    image: '/wool/camel wool fabric 1.png',
    hoverImage: '/wool/camel wool fabric  2.png',
    origin: 'Biella, Italy',
    weight: '270 gsm',
    badge: 'Timeless Tan',
    description: 'Iconic camel golden-tan pure wool suiting. Delivers effortless European flair and plush year-round tailoring drape.'
  },
  {
    id: 'sf_plum_purple',
    name: 'Plum Purple Solid 100% Italian Merino Wool Fabric',
    shortName: 'Plum Purple Merino Wool',
    price: 21000,
    dressCode: 'Wedding / Festive',
    color: 'Plum Purple',
    colorHex: '#4e2840',
    fabric: '100% Italian Merino Wool',
    count: 'Super 140s',
    pattern: 'Solid',
    image: '/wool/plum purple wool fabric 1.png',
    hoverImage: '/wool/plum purple wool fabric 2.png',
    origin: 'Biella, Italy',
    weight: '275 gsm',
    badge: 'Statement Gala',
    description: 'Opulent deep plum purple wool suiting. Majestic jewel-toned luster that turns heads at ceremonial evenings and awards nights.'
  },
  {
    id: 'sf_honey_gold',
    name: 'Honey Gold Solid 100% Italian Merino Wool Fabric',
    shortName: 'Honey Gold Merino Wool',
    price: 21000,
    dressCode: 'Royal Ceremonial',
    color: 'Honey Gold',
    colorHex: '#c7923e',
    fabric: '100% Italian Merino Wool',
    count: 'Super 130s',
    pattern: 'Solid',
    image: '/wool/Honey gold wool fabric 1.png',
    hoverImage: '/wool/Honey gold wool fabric 2.png',
    origin: 'Biella, Italy',
    weight: '260 gsm',
    badge: 'Royal Edition',
    description: 'Warm honey gold Italian wool featuring soft golden sheen and fine tailoring structure for celebratory royal occasions.'
  },
  {
    id: 'sf_rust_boucle',
    name: 'Rust Bouclé Textured 100% Italian Merino Wool Fabric',
    shortName: 'Rust Bouclé Merino Wool',
    price: 21000,
    dressCode: 'Smart Casual',
    color: 'Rust Orange',
    colorHex: '#a04834',
    fabric: '100% Italian Merino Wool',
    count: 'Super 130s',
    pattern: 'Bouclé Texture',
    image: '/wool/rust Bouclé wool fabric 1.png',
    hoverImage: '/wool/rust Bouclé wool fabric 2.png',
    origin: 'Biella, Italy',
    weight: '290 gsm',
    badge: 'Textured Weave',
    description: 'Tactile rust bouclé weave wool suiting. Rich dimensional surface with warm Mediterranean rust tones for signature sports jackets and winter suits.'
  },
  {
    id: 'sf_pearl_white',
    name: 'Pearl White Solid 100% Italian Merino Wool Fabric',
    shortName: 'Pearl White Merino Wool',
    price: 21000,
    dressCode: 'Royal Ceremonial',
    color: 'Pearl White',
    colorHex: '#edebe8',
    fabric: '100% Italian Merino Wool',
    count: 'Super 150s',
    pattern: 'Solid',
    image: '/wool/Pearl white wool fabric 1.png',
    hoverImage: '/wool/Pearl white wool fabric 2.png',
    origin: 'Biella, Italy',
    weight: '280 gsm',
    badge: 'Royal White Tuxedo',
    description: 'Pristine pearl white Super 150s pure wool for regal dinner suits, white-tie weddings, and milestone celebrations.'
  },
  {
    id: 'sf_dusty_lavender',
    name: 'Dusty Lavender Solid 100% Italian Merino Wool Fabric',
    shortName: 'Dusty Lavender Merino Wool',
    price: 21000,
    dressCode: 'Wedding / Festive',
    color: 'Dusty Lavender',
    colorHex: '#8f839c',
    fabric: '100% Italian Merino Wool',
    count: 'Super 140s',
    pattern: 'Solid',
    image: '/wool/dusty lavender wool fabric 1.png',
    hoverImage: '/wool/dusty lavender wool fabric 2.png',
    origin: 'France',
    weight: '260 gsm',
    badge: 'Pastel Gala',
    description: 'Subtle dusty lavender purple wool suiting. Refined pastel hue paired with smooth drape for modern wedding parties.'
  },
  {
    id: 'sf_sandstone',
    name: 'Sandstone Solid 100% Italian Merino Wool Fabric',
    shortName: 'Sandstone Merino Wool',
    price: 21000,
    dressCode: 'Smart Casual',
    color: 'Sandstone',
    colorHex: '#aba08e',
    fabric: '100% Italian Merino Wool',
    count: 'Super 130s',
    pattern: 'Solid',
    image: '/wool/sandstone wool fabric 1.png',
    hoverImage: '/wool/sandstone wool fabric 2.png',
    origin: 'Biella, Italy',
    weight: '265 gsm',
    badge: 'Summer Suiting',
    description: 'Warm sandstone neutral wool fabric with compact smooth weave, resilient structure, and relaxed tailored comfort.'
  },
  {
    id: 'sf_mocha_brown',
    name: 'Rich Mocha Solid 100% Italian Merino Wool Fabric',
    shortName: 'Rich Mocha Merino Wool',
    price: 21000,
    dressCode: 'Business Formal',
    color: 'Mocha Brown',
    colorHex: '#5e4336',
    fabric: '100% Italian Merino Wool',
    count: 'Super 130s',
    pattern: 'Solid',
    image: '/wool/Mocha wool fabric 1.png',
    hoverImage: '/wool/Mocha wool fabric 2.png',
    origin: 'Biella, Italy',
    weight: '275 gsm',
    badge: 'Heritage Wool',
    description: 'Dark mocha brown wool suiting with deep chocolate undertones and robust structural shape retention.'
  }
];

const SUIT_STYLES = [
  {
    id: 'two-piece',
    name: '2-Piece Suit',
    subtitle: 'Jacket + Trousers',
    priceMultiplier: 1.0,
    desc: 'Classic jacket and trouser tailored to your silhouette with 2 doorstep fitting trials.',
    badge: 'Most Popular'
  },
  {
    id: 'three-piece',
    name: '3-Piece Suit',
    subtitle: 'Jacket + Vest + Trousers',
    priceMultiplier: 1.25,
    desc: 'Includes matching hand-canvassed waistcoat vest with back cinch adjuster.',
    badge: 'Signature Style'
  },
  {
    id: 'tuxedo',
    name: 'Bespoke Tuxedo / Dinner Suit',
    subtitle: 'Satin Faced Lapels + Trousers',
    priceMultiplier: 1.35,
    desc: 'Silk satin peak/shawl lapels, satin buttons, satin trouser stripe for black-tie elegance.',
    badge: 'Black Tie Gala'
  },
  {
    id: 'blazer',
    name: 'Bespoke Blazer Only',
    subtitle: 'Tailored Sports Jacket',
    priceMultiplier: 0.7,
    desc: 'Structured sports blazer crafted in your chosen luxury fabric.',
    badge: 'Smart Casual'
  }
];

export default function SuitsPage() {
  const router = useRouter();
  const { openBooking } = useBooking();

  // Step state: 1 = Select Fabric, 2 = Customise Suit, 3 = Doorstep Fitting Confirmation
  const [currentStep, setCurrentStep] = useState(1);

  // Selected Fabric
  const [selectedFabric, setSelectedFabric] = useState(SUIT_FABRICS[0]);

  // Order Mode & Customer Type (From Reference Image 1)
  const [orderMode, setOrderMode] = useState('recommends'); // 'recommends' | 'customize' | 'previous'
  const [customerType, setCustomerType] = useState('new'); // 'new' | 'existing'
  const [previousOrderRef, setPreviousOrderRef] = useState('');

  // Selected Style options with visual illustrations
  const [selectedSuitStyle, setSelectedSuitStyle] = useState('two-piece');
  const [buttonStyle, setButtonStyle] = useState('single-2');
  const [lapelStyle, setLapelStyle] = useState('notch');
  const [ventStyle, setVentStyle] = useState('double');
  const [boutonniere, setBoutonniere] = useState('boutonniere');
  const [chestPocket, setChestPocket] = useState('welted');
  const [pocketStyle, setPocketStyle] = useState('flap');
  const [sleeveButtons, setSleeveButtons] = useState('classic-4');
  const [cuffStyle, setCuffStyle] = useState('standard');
  const [liningConstruction, setLiningConstruction] = useState('full');
  const [liningStyle, setLiningStyle] = useState('silk-jacquard');
  const [monogramText, setMonogramText] = useState('');

  // Apply atelier recommended preset when 'recommends' is clicked
  const handleSelectOrderMode = (mode) => {
    setOrderMode(mode);
    if (mode === 'recommends') {
      setButtonStyle('single-2');
      setLapelStyle('notch');
      setVentStyle('double');
      setBoutonniere('boutonniere');
      setChestPocket('welted');
      setPocketStyle('flap');
      setSleeveButtons('classic-4');
      setCuffStyle('standard');
      setLiningConstruction('full');
      setLiningStyle('silk-jacquard');
    }
  };

  // Filters state (matching Image 2)
  const [dressCodeFilter, setDressCodeFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [fabricFilter, setFabricFilter] = useState('');
  const [countFilter, setCountFilter] = useState('');
  const [patternFilter, setPatternFilter] = useState('');

  // Quick search
  const [searchQuery, setSearchQuery] = useState('');

  // Unique options for filter dropdowns
  const dressCodeOptions = useMemo(() => {
    return Array.from(new Set(SUIT_FABRICS.map(f => f.dressCode))).sort();
  }, []);

  const colorOptions = useMemo(() => {
    return Array.from(new Set(SUIT_FABRICS.map(f => f.color))).sort();
  }, []);

  const fabricOptions = useMemo(() => {
    return Array.from(new Set(SUIT_FABRICS.map(f => f.fabric))).sort();
  }, []);

  const countOptions = useMemo(() => {
    return Array.from(new Set(SUIT_FABRICS.map(f => f.count))).sort();
  }, []);

  const patternOptions = useMemo(() => {
    return Array.from(new Set(SUIT_FABRICS.map(f => f.pattern))).sort();
  }, []);

  // Filtered fabrics
  const filteredFabrics = useMemo(() => {
    return SUIT_FABRICS.filter(item => {
      if (dressCodeFilter && item.dressCode !== dressCodeFilter) return false;
      if (colorFilter && item.color !== colorFilter) return false;
      if (fabricFilter && item.fabric !== fabricFilter) return false;
      if (countFilter && item.count !== countFilter) return false;
      if (patternFilter && item.pattern !== patternFilter) return false;
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
  }, [dressCodeFilter, colorFilter, fabricFilter, countFilter, patternFilter, searchQuery]);

  const hasActiveFilters = Boolean(
    dressCodeFilter || colorFilter || fabricFilter || countFilter || patternFilter || searchQuery
  );

  const handleResetFilters = () => {
    setDressCodeFilter('');
    setColorFilter('');
    setFabricFilter('');
    setCountFilter('');
    setPatternFilter('');
    setSearchQuery('');
  };

  const handleSelectAndCustomise = (fabric) => {
    setSelectedFabric(fabric);
    setCurrentStep(2);
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentPackage = SUIT_STYLES.find(s => s.id === selectedSuitStyle) || SUIT_STYLES[0];
  const calculatedPrice = Math.round(selectedFabric.price * currentPackage.priceMultiplier);

  const handleProceedToBooking = () => {
    const customerInfo = customerType === 'existing' 
      ? `Existing Customer (Use measurements on file${previousOrderRef ? ` - Ref: ${previousOrderRef}` : ''})` 
      : 'New Customer (Doorstep fitting & measurements)';
    const modeInfo = orderMode === 'recommends' ? 'Tailors2U Recommended Cut' : (orderMode === 'previous' ? 'Repeat Fit Cut' : 'Custom Configured Cut');
    const bookingDetails = `Bespoke Suit: ${currentPackage.name} | [${customerInfo}] | [${modeInfo}] | Fabric: ${selectedFabric.name} (${selectedFabric.count}) | Lapel: ${lapelStyle} | Buttons: ${buttonStyle} | Vents: ${ventStyle} | Lining: ${liningStyle}${monogramText ? ` | Monogram: "${monogramText}"` : ''}`;
    openBooking(bookingDetails);
  };

  return (
    <div className="suits-page-container">
      {/* Top Breadcrumb & Step Navigation Bar */}
      <div className="suits-header-bar">
        <div className="suits-header-inner">
          <div className="suits-breadcrumb">
            <Link href="/" className="crumb-link">Home</Link>
            <span className="crumb-sep">/</span>
            <Link href="/tailoring" className="crumb-link">Stitching</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">Suits Fabric & Tailoring</span>
          </div>

          <div className="suits-step-tracker">
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
              <span className="step-label">2. Customise Suit</span>
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

      {/* STEP 1: FABRIC SELECTION VIEW (MATCHING IMAGE 2 EXACTLY) */}
      {currentStep === 1 && (
        <div className="suits-catalog-wrapper">
          {/* Main Content Layout: Filter Left Sidebar + Grid Right */}
          <div className="suits-layout-grid">
            
            {/* LEFT FILTER SIDEBAR (EXACT REPLICA OF IMAGE 2) */}
            <aside className="suits-filter-sidebar">
              <div className="filter-header-row">
                <h2 className="filter-heading">Filter</h2>
                {hasActiveFilters && (
                  <button 
                    onClick={handleResetFilters} 
                    className="clear-filter-btn"
                    title="Clear all filters"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Dress Code Dropdown */}
              <div className="filter-group-item">
                <label className="filter-label">Dress Code</label>
                <div className="select-wrapper">
                  <select
                    className="filter-select"
                    value={dressCodeFilter}
                    onChange={(e) => setDressCodeFilter(e.target.value)}
                  >
                    <option value="">Select Options</option>
                    {dressCodeOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <span className="select-caret">▼</span>
                </div>
              </div>

              {/* Color Dropdown */}
              <div className="filter-group-item">
                <label className="filter-label">Color</label>
                <div className="select-wrapper">
                  <select
                    className="filter-select"
                    value={colorFilter}
                    onChange={(e) => setColorFilter(e.target.value)}
                  >
                    <option value="">Select Options</option>
                    {colorOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <span className="select-caret">▼</span>
                </div>
              </div>

              {/* Fabric Dropdown */}
              <div className="filter-group-item">
                <label className="filter-label">Fabric</label>
                <div className="select-wrapper">
                  <select
                    className="filter-select"
                    value={fabricFilter}
                    onChange={(e) => setFabricFilter(e.target.value)}
                  >
                    <option value="">Select Options</option>
                    {fabricOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <span className="select-caret">▼</span>
                </div>
              </div>

              {/* Count Dropdown */}
              <div className="filter-group-item">
                <label className="filter-label">Count</label>
                <div className="select-wrapper">
                  <select
                    className="filter-select"
                    value={countFilter}
                    onChange={(e) => setCountFilter(e.target.value)}
                  >
                    <option value="">Select Options</option>
                    {countOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <span className="select-caret">▼</span>
                </div>
              </div>

              {/* Pattern Dropdown */}
              <div className="filter-group-item">
                <label className="filter-label">Pattern</label>
                <div className="select-wrapper">
                  <select
                    className="filter-select"
                    value={patternFilter}
                    onChange={(e) => setPatternFilter(e.target.value)}
                  >
                    <option value="">Select Options</option>
                    {patternOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <span className="select-caret">▼</span>
                </div>
              </div>

              {/* Search Box Helper */}
              <div className="filter-search-box">
                <input
                  type="text"
                  placeholder="Search fabric name or color..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="filter-search-input"
                />
              </div>

              {/* Filter Highlights / Badges */}
              <div className="filter-sidebar-guarantee">
                <div className="guarantee-item">
                  <span className="guarantee-icon">🛡️</span>
                  <div>
                    <strong>100% Pure Italian Wool</strong>
                    <p>Authentic selvage branding & certified mills</p>
                  </div>
                </div>
                <div className="guarantee-item">
                  <span className="guarantee-icon">📍</span>
                  <div>
                    <strong>Doorstep Swatch Presentation</strong>
                    <p>Mediator brings physical swatches to touch & feel</p>
                  </div>
                </div>
              </div>
            </aside>

            {/* RIGHT FABRIC GRID (EXACT REPLICA OF IMAGE 2) */}
            <main className="suits-products-main">
              <div className="suits-grid-header">
                <span className="suits-result-count">
                  Showing <strong>{filteredFabrics.length}</strong> Luxury Suit Fabrics
                </span>
                {selectedFabric && (
                  <div className="currently-active-pill">
                    <span>Selected: <strong>{selectedFabric.shortName}</strong></span>
                    <button 
                      className="btn-continue-step"
                      onClick={() => setCurrentStep(2)}
                    >
                      Continue with Selection →
                    </button>
                  </div>
                )}
              </div>

              {filteredFabrics.length === 0 ? (
                <div className="no-fabrics-found">
                  <h3>No matching fabrics found</h3>
                  <p>Try adjusting or clearing your filters to see our full bespoke collection.</p>
                  <button onClick={handleResetFilters} className="btn-primary" style={{ marginTop: '1rem' }}>
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="suits-fabric-grid">
                  {filteredFabrics.map((fabric) => {
                    const isSelected = selectedFabric?.id === fabric.id;
                    return (
                      <div 
                        key={fabric.id} 
                        className={`suit-fabric-card ${isSelected ? 'is-selected' : ''}`}
                        onClick={() => handleSelectAndCustomise(fabric)}
                      >
                        {/* Fabric Swatch Image */}
                        <div className="suit-fabric-image-box">
                          <Image
                            src={fabric.image}
                            alt={fabric.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            className="suit-fabric-img"
                          />
                          {fabric.badge && (
                            <span className="fabric-card-badge">{fabric.badge}</span>
                          )}
                          {isSelected && (
                            <div className="fabric-selected-check">
                              <span>✓ Selected</span>
                            </div>
                          )}
                        </div>

                        {/* Title & Info */}
                        <div className="suit-fabric-content">
                          <h3 className="suit-fabric-title" title={fabric.name}>
                            {fabric.name}
                          </h3>

                          <div className="suit-fabric-price-row">
                            <span className="suit-fabric-price">
                              ₹{fabric.price.toLocaleString('en-IN')}.00
                            </span>
                          </div>

                          {/* CUSTOMISE Button (Matching Image 2) */}
                          <button
                            type="button"
                            className="btn-customise"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectAndCustomise(fabric);
                            }}
                          >
                            CUSTOMISE
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </main>
          </div>
        </div>
      )}

      {/* STEP 2: INTERACTIVE CUSTOMISE SUIT STUDIO */}
      {currentStep === 2 && (
        <div className="suits-customise-container animate-fade-in">
          {/* Top selection bar */}
          <div className="customise-top-banner">
            <div className="banner-left">
              <div className="banner-fabric-thumb">
                <Image 
                  src={selectedFabric.image} 
                  alt={selectedFabric.name} 
                  width={64} 
                  height={64} 
                  className="banner-thumb-img" 
                />
              </div>
              <div className="banner-fabric-info">
                <span className="banner-tag">Selected Fabric</span>
                <h2>{selectedFabric.name}</h2>
                <div className="banner-meta">
                  <span>Origin: {selectedFabric.origin}</span> • 
                  <span>Weight: {selectedFabric.weight}</span> • 
                  <span>Count: {selectedFabric.count}</span>
                </div>
              </div>
            </div>

            <div className="banner-right">
              <button 
                className="btn-change-fabric"
                onClick={() => setCurrentStep(1)}
              >
                ← Change Fabric
              </button>
            </div>
          </div>

          {/* Customization Grid */}
          <div className="customise-layout-grid">
            {/* Left Configurator Options */}
            <div className="customise-options-panel">
              
              {/* BEGIN YOUR ORDER SECTION (MATCHING REFERENCE IMAGE 1) */}
              <div className="config-section-card begin-order-card">
                <div className="begin-order-header">
                  <h2 className="begin-order-title">Begin Your Order</h2>
                  <div className="atelier-recommendation-legend">
                    <span className="atelier-crest-icon">Ⓣ</span>
                    <span className="atelier-legend-text">
                      Options marked with this icon are the atelier recommendations
                    </span>
                  </div>
                </div>

                {/* 3 Order Mode Cards */}
                <div className="order-mode-cards-grid">
                  {/* Mode 1: Tailors2U Recommends */}
                  <div
                    className={`order-mode-card ${orderMode === 'recommends' ? 'selected' : ''}`}
                    onClick={() => handleSelectOrderMode('recommends')}
                  >
                    <div className="order-mode-icon-box mode-icon-recommends">
                      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="6" cy="6" r="3"/>
                        <circle cx="6" cy="18" r="3"/>
                        <line x1="20" y1="4" x2="8.12" y2="15.88"/>
                        <line x1="14.47" y1="14.47" x2="20" y2="20"/>
                        <line x1="8.12" y1="8.12" x2="12" y2="12"/>
                      </svg>
                      <span className="order-mode-inner-brand">TAILORS2U</span>
                    </div>
                    <span className="order-mode-label">Tailors2U Recommends</span>
                  </div>

                  {/* Mode 2: Customize Your Own */}
                  <div
                    className={`order-mode-card ${orderMode === 'customize' ? 'selected' : ''}`}
                    onClick={() => handleSelectOrderMode('customize')}
                  >
                    <div className="order-mode-icon-box mode-icon-customize">
                      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" y1="21" x2="4" y2="14"/>
                        <line x1="4" y1="10" x2="4" y2="3"/>
                        <line x1="12" y1="21" x2="12" y2="12"/>
                        <line x1="12" y1="8" x2="12" y2="3"/>
                        <line x1="20" y1="21" x2="20" y2="16"/>
                        <line x1="20" y1="12" x2="20" y2="3"/>
                        <circle cx="4" cy="12" r="2.5" fill="#111827"/>
                        <circle cx="12" cy="10" r="2.5" fill="#111827"/>
                        <circle cx="20" cy="14" r="2.5" fill="#111827"/>
                      </svg>
                    </div>
                    <span className="order-mode-label">Customize Your Own</span>
                  </div>

                  {/* Mode 3: Refer to Previous Order */}
                  <div
                    className={`order-mode-card ${orderMode === 'previous' ? 'selected' : ''}`}
                    onClick={() => handleSelectOrderMode('previous')}
                  >
                    <div className="order-mode-icon-box mode-icon-previous">
                      <div className="sync-circle-glyph">
                        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#526477" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-1.19"/>
                        </svg>
                      </div>
                    </div>
                    <span className="order-mode-label">Refer to Previous Order</span>
                  </div>
                </div>

                {/* New or Returning Customer Radios */}
                <div className="customer-type-section">
                  <h3 className="customer-type-title">New or Returning Customer?</h3>
                  <div className="customer-radios-list">
                    <label className={`customer-radio-option ${customerType === 'new' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="customerType"
                        value="new"
                        checked={customerType === 'new'}
                        onChange={() => setCustomerType('new')}
                        className="customer-radio-input"
                      />
                      <span className="radio-styled-circle"></span>
                      <span className="radio-text-label">
                        I&apos;m a New Customer (I will be submitting my measurements on the website)
                      </span>
                    </label>

                    <label className={`customer-radio-option ${customerType === 'existing' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="customerType"
                        value="existing"
                        checked={customerType === 'existing'}
                        onChange={() => setCustomerType('existing')}
                        className="customer-radio-input"
                      />
                      <span className="radio-styled-circle"></span>
                      <span className="radio-text-label">
                        I&apos;m an Existing Customer (Please use the measurements you have on file for me)
                      </span>
                    </label>
                  </div>

                  {/* Previous Order Input if Returning Customer or Refer Mode */}
                  {(customerType === 'existing' || orderMode === 'previous') && (
                    <div className="previous-order-field-row animate-fade-in">
                      <label htmlFor="prev-order-input">Previous Order ID or Registered Mobile Number:</label>
                      <input
                        id="prev-order-input"
                        type="text"
                        placeholder="e.g. T2U-84920 or +91 98765 43210"
                        value={previousOrderRef}
                        onChange={(e) => setPreviousOrderRef(e.target.value)}
                        className="previous-order-input"
                      />
                      <small>Our master cutter will pull your exact posture notes, shoulder drop, and sleeve contours.</small>
                    </div>
                  )}
                </div>
              </div>

              {/* 1. Choose Suit Package / Style */}
              <div className="config-section-card">
                <h3 className="config-section-title">
                  <span className="config-step-bullet">1</span>
                  Choose Suit Package
                </h3>
                <div className="suit-package-selector-grid">
                  {SUIT_STYLES.map((style) => {
                    const isStyleActive = selectedSuitStyle === style.id;
                    const itemPrice = Math.round(selectedFabric.price * style.priceMultiplier);
                    return (
                      <div
                        key={style.id}
                        className={`suit-package-card ${isStyleActive ? 'selected' : ''}`}
                        onClick={() => setSelectedSuitStyle(style.id)}
                      >
                        <div className="package-card-header">
                          <span className="package-name">{style.name}</span>
                          <span className="package-price">₹{itemPrice.toLocaleString('en-IN')}</span>
                        </div>
                        <span className="package-sub">{style.subtitle}</span>
                        <p className="package-desc">{style.desc}</p>
                        {style.badge && <span className="package-badge">{style.badge}</span>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Style (Button Stance & Closures - MATCHING REFERENCE IMAGE 2) */}
              {/* 2. Style (Front Closure & Buttons) */}
              <div className="config-section-card">
                <div className="config-section-header-row">
                  <h3 className="config-section-title">
                    <span className="config-step-bullet">2</span>
                    Style (Front Closure & Buttons)
                  </h3>
                </div>

                <div className="visual-options-track">
                  {/* Single Breasted | 2 Buttons */}
                  <div
                    className={`visual-option-card ${buttonStyle === 'single-2' || buttonStyle === '2-button-single' ? 'selected' : ''}`}
                    onClick={() => setButtonStyle('single-2')}
                  >
                    <div className="visual-card-graphic">
                      <Image
                        src="/suit_customizer/style_single_2.png"
                        alt="Single Breasted | 2 Buttons"
                        width={140}
                        height={120}
                        className="visual-option-img"
                      />
                      <span className="visual-card-crest-badge" title="Atelier Recommendation">Ⓣ</span>
                    </div>
                    <div className="visual-card-label">
                      <span>Single Breasted | 2 Buttons</span>
                    </div>
                  </div>

                  {/* Single Breasted | 1 Button */}
                  <div
                    className={`visual-option-card ${buttonStyle === 'single-1' || buttonStyle === '1-button-single' ? 'selected' : ''}`}
                    onClick={() => setButtonStyle('single-1')}
                  >
                    <div className="visual-card-graphic">
                      <Image
                        src="/suit_customizer/style_single_1.png"
                        alt="Single Breasted | 1 Button"
                        width={140}
                        height={120}
                        className="visual-option-img"
                      />
                    </div>
                    <div className="visual-card-label">
                      <span>Single Breasted | 1 Button</span>
                    </div>
                  </div>

                  {/* Single Breasted | 3 Buttons */}
                  <div
                    className={`visual-option-card ${buttonStyle === 'single-3' ? 'selected' : ''}`}
                    onClick={() => setButtonStyle('single-3')}
                  >
                    <div className="visual-card-graphic">
                      <Image
                        src="/suit_customizer/style_single_3.png"
                        alt="Single Breasted | 3 Buttons"
                        width={140}
                        height={120}
                        className="visual-option-img"
                      />
                    </div>
                    <div className="visual-card-label">
                      <span>Single Breasted | 3 Buttons</span>
                    </div>
                  </div>

                  {/* Double Breasted | 4 Buttons */}
                  <div
                    className={`visual-option-card ${buttonStyle === 'double-4' ? 'selected' : ''}`}
                    onClick={() => setButtonStyle('double-4')}
                  >
                    <div className="visual-card-graphic">
                      <Image
                        src="/suit_customizer/style_double_4.png"
                        alt="Double Breasted | 4 Buttons"
                        width={140}
                        height={120}
                        className="visual-option-img"
                      />
                    </div>
                    <div className="visual-card-label">
                      <span>Double Breasted | 4 Buttons</span>
                    </div>
                  </div>

                  {/* Double Breasted | 6 Buttons */}
                  <div
                    className={`visual-option-card ${buttonStyle === 'double-6' || buttonStyle === 'double-breasted' ? 'selected' : ''}`}
                    onClick={() => setButtonStyle('double-6')}
                  >
                    <div className="visual-card-graphic">
                      <Image
                        src="/suit_customizer/style_double_6.png"
                        alt="Double Breasted | 6 Buttons"
                        width={140}
                        height={120}
                        className="visual-option-img"
                      />
                    </div>
                    <div className="visual-card-label">
                      <span>Double Breasted | 6 Buttons</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Lapel */}
              <div className="config-section-card">
                <div className="config-section-header-row">
                  <h3 className="config-section-title">
                    <span className="config-step-bullet">3</span>
                    Lapel Style
                  </h3>
                </div>

                <div className="visual-options-track">
                  {/* Notch */}
                  <div
                    className={`visual-option-card ${lapelStyle === 'notch' ? 'selected' : ''}`}
                    onClick={() => setLapelStyle('notch')}
                  >
                    <div className="visual-card-graphic">
                      <Image
                        src="/suit_customizer/lapel_notch.png"
                        alt="Notch"
                        width={140}
                        height={120}
                        className="visual-option-img"
                      />
                      <span className="visual-card-crest-badge" title="Atelier Recommendation">Ⓣ</span>
                    </div>
                    <div className="visual-card-label">
                      <span>Notch</span>
                    </div>
                  </div>

                  {/* Notch Slim */}
                  <div
                    className={`visual-option-card ${lapelStyle === 'notch-slim' ? 'selected' : ''}`}
                    onClick={() => setLapelStyle('notch-slim')}
                  >
                    <div className="visual-card-graphic">
                      <Image
                        src="/suit_customizer/lapel_notch_slim.png"
                        alt="Notch Slim"
                        width={140}
                        height={120}
                        className="visual-option-img"
                      />
                    </div>
                    <div className="visual-card-label">
                      <span>Notch Slim</span>
                    </div>
                  </div>

                  {/* Notch Wide */}
                  <div
                    className={`visual-option-card ${lapelStyle === 'notch-wide' ? 'selected' : ''}`}
                    onClick={() => setLapelStyle('notch-wide')}
                  >
                    <div className="visual-card-graphic">
                      <Image
                        src="/suit_customizer/lapel_notch_wide.png"
                        alt="Notch Wide"
                        width={140}
                        height={120}
                        className="visual-option-img"
                      />
                    </div>
                    <div className="visual-card-label">
                      <span>Notch Wide</span>
                    </div>
                  </div>

                  {/* Peak */}
                  <div
                    className={`visual-option-card ${lapelStyle === 'peak' ? 'selected' : ''}`}
                    onClick={() => setLapelStyle('peak')}
                  >
                    <div className="visual-card-graphic">
                      <Image
                        src="/suit_customizer/lapel_peak.png"
                        alt="Peak"
                        width={140}
                        height={120}
                        className="visual-option-img"
                      />
                    </div>
                    <div className="visual-card-label">
                      <span>Peak</span>
                    </div>
                  </div>

                  {/* Peak Wide */}
                  <div
                    className={`visual-option-card ${lapelStyle === 'peak-wide' ? 'selected' : ''}`}
                    onClick={() => setLapelStyle('peak-wide')}
                  >
                    <div className="visual-card-graphic">
                      <Image
                        src="/suit_customizer/lapel_peak_wide.png"
                        alt="Peak Wide"
                        width={140}
                        height={120}
                        className="visual-option-img"
                      />
                    </div>
                    <div className="visual-card-label">
                      <span>Peak Wide</span>
                    </div>
                  </div>

                  {/* Shawl */}
                  <div
                    className={`visual-option-card ${lapelStyle === 'shawl' ? 'selected' : ''}`}
                    onClick={() => setLapelStyle('shawl')}
                  >
                    <div className="visual-card-graphic">
                      <Image
                        src="/suit_customizer/lapel_shawl.png"
                        alt="Shawl"
                        width={140}
                        height={120}
                        className="visual-option-img"
                      />
                    </div>
                    <div className="visual-card-label">
                      <span>Shawl</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Vent */}
              <div className="config-section-card">
                <div className="config-section-header-row">
                  <h3 className="config-section-title">
                    <span className="config-step-bullet">4</span>
                    Vent (Back Silhouette)
                  </h3>
                </div>

                <div className="visual-options-track">
                  {/* Double Vent */}
                  <div
                    className={`visual-option-card ${ventStyle === 'double' ? 'selected' : ''}`}
                    onClick={() => setVentStyle('double')}
                  >
                    <div className="visual-card-graphic">
                      <Image
                        src="/suit_customizer/vent_double.png"
                        alt="Double Vent"
                        width={140}
                        height={120}
                        className="visual-option-img"
                      />
                      <span className="visual-card-crest-badge" title="Atelier Recommendation">Ⓣ</span>
                    </div>
                    <div className="visual-card-label">
                      <span>Double Vent</span>
                    </div>
                  </div>

                  {/* Single Vent */}
                  <div
                    className={`visual-option-card ${ventStyle === 'single' ? 'selected' : ''}`}
                    onClick={() => setVentStyle('single')}
                  >
                    <div className="visual-card-graphic">
                      <Image
                        src="/suit_customizer/vent_single.png"
                        alt="Single Vent"
                        width={140}
                        height={120}
                        className="visual-option-img"
                      />
                    </div>
                    <div className="visual-card-label">
                      <span>Single Vent</span>
                    </div>
                  </div>

                  {/* No Vent */}
                  <div
                    className={`visual-option-card ${ventStyle === 'ventless' ? 'selected' : ''}`}
                    onClick={() => setVentStyle('ventless')}
                  >
                    <div className="visual-card-graphic">
                      <Image
                        src="/suit_customizer/vent_none.png"
                        alt="No Vent"
                        width={140}
                        height={120}
                        className="visual-option-img"
                      />
                    </div>
                    <div className="visual-card-label">
                      <span>No Vent</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Boutonniere */}
              <div className="config-section-card">
                <div className="config-section-header-row">
                  <h3 className="config-section-title">
                    <span className="config-step-bullet">5</span>
                    Boutonniere
                  </h3>
                </div>

                <div className="visual-options-track">
                  {/* Boutonniere */}
                  <div
                    className={`visual-option-card ${boutonniere === 'boutonniere' ? 'selected' : ''}`}
                    onClick={() => setBoutonniere('boutonniere')}
                  >
                    <div className="visual-card-graphic">
                      <Image
                        src="/suit_customizer/boutonniere_yes.png"
                        alt="Boutonniere"
                        width={140}
                        height={120}
                        className="visual-option-img"
                      />
                      <span className="visual-card-crest-badge" title="Atelier Recommendation">Ⓣ</span>
                    </div>
                    <div className="visual-card-label">
                      <span>Boutonniere</span>
                    </div>
                  </div>

                  {/* No Boutonniere */}
                  <div
                    className={`visual-option-card ${boutonniere === 'no-boutonniere' ? 'selected' : ''}`}
                    onClick={() => setBoutonniere('no-boutonniere')}
                  >
                    <div className="visual-card-graphic">
                      <Image
                        src="/suit_customizer/boutonniere_no.png"
                        alt="No Boutonniere"
                        width={140}
                        height={120}
                        className="visual-option-img"
                      />
                    </div>
                    <div className="visual-card-label">
                      <span>No Boutonniere</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 6. Chest Pocket */}
              <div className="config-section-card">
                <div className="config-section-header-row">
                  <h3 className="config-section-title">
                    <span className="config-step-bullet">6</span>
                    Chest Pocket
                  </h3>
                </div>

                <div className="visual-options-track">
                  {/* Chest Pocket Welted */}
                  <div
                    className={`visual-option-card ${chestPocket === 'welted' ? 'selected' : ''}`}
                    onClick={() => setChestPocket('welted')}
                  >
                    <div className="visual-card-graphic">
                      <Image
                        src="/suit_customizer/chest_welted.png"
                        alt="Chest Pocket Welted"
                        width={140}
                        height={120}
                        className="visual-option-img"
                      />
                      <span className="visual-card-crest-badge" title="Atelier Recommendation">Ⓣ</span>
                    </div>
                    <div className="visual-card-label">
                      <span>Chest Pocket Welted</span>
                    </div>
                  </div>

                  {/* Barchetta (boat) Pocket */}
                  <div
                    className={`visual-option-card ${chestPocket === 'barchetta' ? 'selected' : ''}`}
                    onClick={() => setChestPocket('barchetta')}
                  >
                    <div className="visual-card-graphic">
                      <Image
                        src="/suit_customizer/chest_barchetta.png"
                        alt="Barchetta (boat) Pocket"
                        width={140}
                        height={120}
                        className="visual-option-img"
                      />
                    </div>
                    <div className="visual-card-label">
                      <span>Barchetta (boat) Pocket</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 7. Waist Pockets */}
              <div className="config-section-card">
                <div className="config-section-header-row">
                  <h3 className="config-section-title">
                    <span className="config-step-bullet">7</span>
                    Pockets (Waist Pockets)
                  </h3>
                </div>

                <div className="visual-options-track">
                  {/* Flap Pockets */}
                  <div
                    className={`visual-option-card ${pocketStyle === 'flap' ? 'selected' : ''}`}
                    onClick={() => setPocketStyle('flap')}
                  >
                    <div className="visual-card-graphic">
                      <Image
                        src="/suit_customizer/pocket_flap.png"
                        alt="Flap Pockets"
                        width={140}
                        height={120}
                        className="visual-option-img"
                      />
                      <span className="visual-card-crest-badge" title="Atelier Recommendation">Ⓣ</span>
                    </div>
                    <div className="visual-card-label">
                      <span>Flap Pockets</span>
                    </div>
                  </div>

                  {/* Jetted Pockets */}
                  <div
                    className={`visual-option-card ${pocketStyle === 'jetted' ? 'selected' : ''}`}
                    onClick={() => setPocketStyle('jetted')}
                  >
                    <div className="visual-card-graphic">
                      <Image
                        src="/suit_customizer/pocket_jetted.png"
                        alt="Jetted Pockets"
                        width={140}
                        height={120}
                        className="visual-option-img"
                      />
                    </div>
                    <div className="visual-card-label">
                      <span>Jetted Pockets</span>
                    </div>
                  </div>

                  {/* Slanted Pockets */}
                  <div
                    className={`visual-option-card ${pocketStyle === 'slanted' ? 'selected' : ''}`}
                    onClick={() => setPocketStyle('slanted')}
                  >
                    <div className="visual-card-graphic">
                      <Image
                        src="/suit_customizer/pocket_slanted.png"
                        alt="Slanted Pockets"
                        width={140}
                        height={120}
                        className="visual-option-img"
                      />
                    </div>
                    <div className="visual-card-label">
                      <span>Slanted Pockets</span>
                    </div>
                  </div>

                  {/* Slanted Flap Pockets */}
                  <div
                    className={`visual-option-card ${pocketStyle === 'slanted-flap' || pocketStyle === 'slanted-ticket' ? 'selected' : ''}`}
                    onClick={() => setPocketStyle('slanted-flap')}
                  >
                    <div className="visual-card-graphic">
                      <Image
                        src="/suit_customizer/pocket_slanted_flap.png"
                        alt="Slanted Flap Pockets"
                        width={140}
                        height={120}
                        className="visual-option-img"
                      />
                    </div>
                    <div className="visual-card-label">
                      <span>Slanted Flap Pockets</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 8. Sleeves */}
              <div className="config-section-card">
                <div className="config-section-header-row">
                  <h3 className="config-section-title">
                    <span className="config-step-bullet">8</span>
                    Sleeves
                  </h3>
                </div>

                <div className="visual-options-track">
                  {/* Classic 4 Button Sleeve */}
                  <div
                    className={`visual-option-card ${sleeveButtons === 'classic-4' ? 'selected' : ''}`}
                    onClick={() => setSleeveButtons('classic-4')}
                  >
                    <div className="visual-card-graphic">
                      <Image
                        src="/suit_customizer/sleeve_classic_4.png"
                        alt="Classic 4 Button Sleeve"
                        width={140}
                        height={120}
                        className="visual-option-img"
                      />
                      <span className="visual-card-crest-badge" title="Atelier Recommendation">Ⓣ</span>
                    </div>
                    <div className="visual-card-label">
                      <span>Classic 4 Button Sleeve</span>
                    </div>
                  </div>

                  {/* Stacked 4 Button Sleeve */}
                  <div
                    className={`visual-option-card ${sleeveButtons === 'stacked-4' ? 'selected' : ''}`}
                    onClick={() => setSleeveButtons('stacked-4')}
                  >
                    <div className="visual-card-graphic">
                      <Image
                        src="/suit_customizer/sleeve_stacked_4.png"
                        alt="Stacked 4 Button Sleeve"
                        width={140}
                        height={120}
                        className="visual-option-img"
                      />
                    </div>
                    <div className="visual-card-label">
                      <span>Stacked 4 Button Sleeve</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 9. Cuffs */}
              <div className="config-section-card">
                <div className="config-section-header-row">
                  <h3 className="config-section-title">
                    <span className="config-step-bullet">9</span>
                    Cuffs
                  </h3>
                </div>

                <div className="visual-options-track">
                  {/* Standard Cuffs */}
                  <div
                    className={`visual-option-card ${cuffStyle === 'standard' ? 'selected' : ''}`}
                    onClick={() => setCuffStyle('standard')}
                  >
                    <div className="visual-card-graphic">
                      <Image
                        src="/suit_customizer/cuff_standard.png"
                        alt="Standard Cuffs"
                        width={140}
                        height={120}
                        className="visual-option-img"
                      />
                      <span className="visual-card-crest-badge" title="Atelier Recommendation">Ⓣ</span>
                    </div>
                    <div className="visual-card-label">
                      <span>Standard Cuffs</span>
                    </div>
                  </div>

                  {/* Surgeon Cuffs */}
                  <div
                    className={`visual-option-card ${cuffStyle === 'surgeon' ? 'selected' : ''}`}
                    onClick={() => setCuffStyle('surgeon')}
                  >
                    <div className="visual-card-graphic">
                      <Image
                        src="/suit_customizer/cuff_surgeon.png"
                        alt="Surgeon Cuffs"
                        width={140}
                        height={120}
                        className="visual-option-img"
                      />
                    </div>
                    <div className="visual-card-label">
                      <span>Surgeon Cuffs</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 10. Lining */}
              <div className="config-section-card">
                <div className="config-section-header-row">
                  <h3 className="config-section-title">
                    <span className="config-step-bullet">10</span>
                    Lining (Construction & Fabrics)
                  </h3>
                </div>

                <div className="visual-options-track" style={{ marginBottom: '1.5rem' }}>
                  {/* Fully Lined */}
                  <div
                    className={`visual-option-card ${liningConstruction === 'full' ? 'selected' : ''}`}
                    onClick={() => setLiningConstruction('full')}
                  >
                    <div className="visual-card-graphic">
                      <Image
                        src="/suit_customizer/lining_full.png"
                        alt="Fully Lined"
                        width={140}
                        height={120}
                        className="visual-option-img"
                      />
                      <span className="visual-card-crest-badge" title="Atelier Recommendation">Ⓣ</span>
                    </div>
                    <div className="visual-card-label">
                      <span>Fully Lined</span>
                    </div>
                  </div>

                  {/* Half Lined */}
                  <div
                    className={`visual-option-card ${liningConstruction === 'half' ? 'selected' : ''}`}
                    onClick={() => setLiningConstruction('half')}
                  >
                    <div className="visual-card-graphic">
                      <Image
                        src="/suit_customizer/lining_half.png"
                        alt="Half Lined (+1,500THB)"
                        width={140}
                        height={120}
                        className="visual-option-img"
                      />
                    </div>
                    <div className="visual-card-label">
                      <span>Half Lined (+1,500THB)</span>
                    </div>
                  </div>
                </div>

                <div className="chips-options-row">
                  <button
                    type="button"
                    className={`customise-chip ${liningStyle === 'silk-jacquard' ? 'selected' : ''}`}
                    onClick={() => setLiningStyle('silk-jacquard')}
                  >
                    <div className="chip-title-with-badge">
                      <strong>Royal Silk Jacquard</strong>
                      <span className="atelier-recommend-pill" title="Atelier Recommendation">
                        <span className="atelier-pill-crest">Ⓣ</span> Atelier Pick
                      </span>
                    </div>
                    <span>Opulent matching self-pattern weave</span>
                  </button>
                  <button
                    type="button"
                    className={`customise-chip ${liningStyle === 'contrast-bemberg' ? 'selected' : ''}`}
                    onClick={() => setLiningStyle('contrast-bemberg')}
                  >
                    <strong>Contrast Bemberg Cupro</strong>
                    <span>Breathable ruby/gold interior glide</span>
                  </button>
                  <button
                    type="button"
                    className={`customise-chip ${liningStyle === 'monogram-satin' ? 'selected' : ''}`}
                    onClick={() => setLiningStyle('monogram-satin')}
                  >
                    <strong>Signature Satin Lining</strong>
                    <span>Ultra-smooth glide over dress shirts</span>
                  </button>
                </div>

                <div className="monogram-input-group">
                  <label htmlFor="monogram-text">
                    Custom Monogram Initials (Inside Pocket):
                  </label>
                  <input
                    id="monogram-text"
                    type="text"
                    maxLength={10}
                    placeholder="e.g. A.K. or JOHN DOE"
                    value={monogramText}
                    onChange={(e) => setMonogramText(e.target.value.toUpperCase())}
                    className="monogram-field"
                  />
                  <small>Complimentary gold or tone-on-tone embroidery.</small>
                </div>
              </div>

            </div>

            {/* Right Summary & Booking Sidebar */}
            <div className="customise-summary-panel">
              <div className="summary-sticky-card">
                <div className="summary-fabric-preview">
                  <div className="summary-swatch-box">
                    <Image
                      src={selectedFabric.image}
                      alt={selectedFabric.name}
                      fill
                      className="summary-swatch-img"
                    />
                    <div className="summary-swatch-badge">
                      <span>{selectedFabric.count}</span>
                    </div>
                  </div>
                  <div className="summary-fabric-text">
                    <h4>{selectedFabric.shortName}</h4>
                    <p>{selectedFabric.fabric}</p>
                    <span className="summary-origin">{selectedFabric.origin}</span>
                  </div>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-spec-list">
                  <div className="spec-row">
                    <span>Package:</span>
                    <strong>{currentPackage.name}</strong>
                  </div>
                  <div className="spec-row">
                    <span>Style:</span>
                    <strong>
                      {buttonStyle === 'single-2' || buttonStyle === '2-button-single' ? 'Single Breasted (2 Buttons)' :
                       buttonStyle === 'single-1' || buttonStyle === '1-button-single' ? 'Single Breasted (1 Button)' :
                       buttonStyle === 'single-3' ? 'Single Breasted (3 Buttons)' :
                       buttonStyle === 'double-4' ? 'Double Breasted (4 Buttons)' :
                       buttonStyle === 'double-6' || buttonStyle === 'double-breasted' ? 'Double Breasted (6 Buttons)' : buttonStyle}
                    </strong>
                  </div>
                  <div className="spec-row">
                    <span>Lapel:</span>
                    <strong>
                      {lapelStyle === 'notch' ? 'Notch Lapel' :
                       lapelStyle === 'notch-slim' ? 'Notch Slim Lapel' :
                       lapelStyle === 'notch-wide' ? 'Notch Wide Lapel' :
                       lapelStyle === 'peak' ? 'Peak Lapel' :
                       lapelStyle === 'peak-wide' ? 'Peak Wide Lapel' :
                       lapelStyle === 'shawl' ? 'Shawl Lapel' : lapelStyle}
                    </strong>
                  </div>
                  <div className="spec-row">
                    <span>Vent:</span>
                    <strong>
                      {ventStyle === 'double' ? 'Double Vent' :
                       ventStyle === 'single' ? 'Single Vent' :
                       ventStyle === 'ventless' ? 'No Vent' : ventStyle}
                    </strong>
                  </div>
                  <div className="spec-row">
                    <span>Boutonniere:</span>
                    <strong style={{ textTransform: 'capitalize' }}>
                      {boutonniere === 'boutonniere' ? 'Boutonniere' : 'No Boutonniere'}
                    </strong>
                  </div>
                  <div className="spec-row">
                    <span>Chest Pocket:</span>
                    <strong>
                      {chestPocket === 'welted' ? 'Welted Chest Pocket' : 'Barchetta Boat Pocket'}
                    </strong>
                  </div>
                  <div className="spec-row">
                    <span>Waist Pockets:</span>
                    <strong>
                      {pocketStyle === 'flap' ? 'Flap Pockets' :
                       pocketStyle === 'jetted' ? 'Jetted Pockets' :
                       pocketStyle === 'slanted' ? 'Slanted Pockets' :
                       pocketStyle === 'slanted-flap' || pocketStyle === 'slanted-ticket' ? 'Slanted Flap Pockets' : pocketStyle}
                    </strong>
                  </div>
                  <div className="spec-row">
                    <span>Sleeves:</span>
                    <strong>
                      {sleeveButtons === 'classic-4' ? 'Classic 4 Buttons' : 'Stacked 4 Buttons'}
                    </strong>
                  </div>
                  <div className="spec-row">
                    <span>Cuffs:</span>
                    <strong>
                      {cuffStyle === 'standard' ? 'Standard Cuffs' : 'Surgeon Cuffs (Functional)'}
                    </strong>
                  </div>
                  <div className="spec-row">
                    <span>Lining:</span>
                    <strong>
                      {liningConstruction === 'full' ? 'Fully Lined' : 'Half Lined'} ({liningStyle.replace(/-/g, ' ')})
                    </strong>
                  </div>
                  {monogramText && (
                    <div className="spec-row">
                      <span>Monogram:</span>
                      <strong className="monogram-highlight">{monogramText}</strong>
                    </div>
                  )}
                </div>

                <div className="summary-divider"></div>

                <div className="summary-price-box">
                  <span className="price-label">Total Bespoke Price:</span>
                  <div className="price-value-row">
                    <span className="currency-symbol">₹</span>
                    <span className="total-amount">{calculatedPrice.toLocaleString('en-IN')}.00</span>
                  </div>
                  <small className="price-inclusions">Includes fabric, custom tailoring & 2 doorstep fitting trials.</small>
                </div>

                <button 
                  className="btn-book-doorstep-fitting"
                  onClick={handleProceedToBooking}
                >
                  Book Doorstep Fitting →
                </button>

                <div className="summary-perks">
                  <div className="perk-item">
                    <span>✓</span> 35+ anatomical measurements taken at home
                  </div>
                  <div className="perk-item">
                    <span>✓</span> 100% Doorstep basted trial before final stitch
                  </div>
                  <div className="perk-item">
                    <span>✓</span> 30-Day Perfect Fit Guarantee
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Floating Chat / Consultation Widget */}
      <div className="suits-chat-widget">
        <button 
          className="chat-floating-btn"
          onClick={() => openBooking('Suit Styling Consultation')}
          title="Talk to Master Stylist"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </button>
      </div>

    </div>
  );
}
