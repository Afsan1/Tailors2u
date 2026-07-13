'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useBooking } from '../../components/ClientLayoutWrapper';

// Define the precise fabric options based on website fabrics
const FABRICS = [
  {
    id: 'f1',
    name: 'Giza Egyptian Cotton',
    color: '#FAF8F5',
    patternType: 'cotton',
    origin: 'Egypt',
    weight: '110 gsm',
    badge: 'Best Seller',
    desc: 'Ultra-soft, high thread count, light natural sheen',
    previewClass: 'fabric-pattern-preview-f1'
  },
  {
    id: 'f2',
    name: 'Supima Luxury Cotton',
    color: '#DCE7F3', // Soft steel blue shirting tone
    patternType: 'cotton',
    origin: 'USA',
    weight: '125 gsm',
    badge: 'Premium Fit',
    desc: 'Extra-long staple fibers with crisp finish',
    previewClass: 'fabric-pattern-preview-f2'
  },
  {
    id: 'f3',
    name: 'Pure Irish Linen',
    color: '#ECE1D0', // Natural flax oatmeal
    patternType: 'linen',
    origin: 'Ireland',
    weight: '145 gsm',
    badge: 'Summer Essential',
    desc: 'Loose weave with classic natural linen slubs',
    previewClass: 'fabric-pattern-preview-f3'
  },
  {
    id: 'f4',
    name: 'Cotton-Linen Blend',
    color: '#D6DFD3', // Sage green tint
    patternType: 'linen',
    origin: 'Italy',
    weight: '135 gsm',
    badge: 'Casual Chic',
    desc: 'Durable structured drape, wrinkle-resistant',
    previewClass: 'fabric-pattern-preview-f4'
  },
  {
    id: 'f5',
    name: 'Mulberry Royal Silk',
    color: '#EED9C2', // Delicate royal cream gold
    patternType: 'silk',
    origin: 'India',
    weight: '90 gsm',
    badge: 'Wedding Grade',
    desc: 'Rich satin finish, fluid and elegant drape',
    previewClass: 'fabric-pattern-preview-f5'
  },
  {
    id: 'f6',
    name: 'Fine Merino Wool (Super 140s)',
    color: '#CBD2D6', // Tailored light grey suit fabric
    patternType: 'wool',
    origin: 'Australia',
    weight: '260 gsm',
    badge: 'Tailoring Grade',
    desc: 'Fine thermoregulating wool, deep structure',
    previewClass: 'fabric-pattern-preview-f6'
  },
  {
    id: 'f7',
    name: 'Cashmere-Silk Blend',
    color: '#E2C7C7', // Soft cashmere pink-beige
    patternType: 'wool',
    origin: 'Mongolia',
    weight: '290 gsm',
    badge: 'Signature Luxury',
    desc: 'Ultimate insulation combined with silk strength',
    previewClass: 'fabric-pattern-preview-f7'
  },
  {
    id: 'f8',
    name: 'Armani Suiting Wool',
    color: '#e8e4d3', // Premium Armani cream/beige
    patternType: 'wool',
    origin: 'Italy',
    weight: '275 gsm',
    badge: 'Armani Suiting',
    desc: 'Exclusive high-end suiting fabric from the house of Armani',
    previewClass: 'fabric-pattern-preview-f8',
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

// Garment definitions
const GARMENTS = [
  { id: 'shirt', name: 'Bespoke Shirt', icon: '👔', desc: 'Classic structured dress shirt' },
  { id: 'blazer', name: 'Italian Blazer', icon: '🧥', desc: 'Sartorial slim blazer with lapels' },
  { id: 'kurta', name: 'Traditional Kurta', icon: '👘', desc: 'Ethnic tunic length with band collar' },
  { id: 'pants', name: 'Slim Trousers', icon: '👖', desc: 'Custom tailored formal pants' }
];

// Custom Collar Details for Step 4
const COLLARS = [
  { id: 'c1', name: 'Spread Collar (Modern)' },
  { id: 'c2', name: 'Button-Down Collar (Classic)' },
  { id: 'c3', name: 'Band/Nehru Collar (Minimal)' }
];

// Custom Sleeves Details for Step 4
const SLEEVES = [
  { id: 's1', name: 'Double Cuff (French)' },
  { id: 's2', name: 'Single Button Cuff (Casual)' },
  { id: 's3', name: 'Short Sleeves' }
];

// Preset model silhouettes
const PRESETS = [
  { id: 'male', name: 'Mannequin (Male)', gender: 'male' },
  { id: 'female', name: 'Mannequin (Female)', gender: 'female' },
  { id: 'neutral', name: 'Classic Dress Form', gender: 'neutral' }
];

// Component for rendering custom garments in SVG with dynamic patterns
function GarmentSVG({ type, fabric, collar, sleeve, scale = 1, rotation = 0, translation = { x: 0, y: 0 }, opacity = 1 }) {
  const patternId = `tryon-pattern-${fabric.id}`;
  const color = fabric.color;

  // Render texture overlay paths inside patterns to simulate folds/weaving
  return (
    <svg 
      width="400" 
      height="500" 
      viewBox="0 0 400 500" 
      style={{
        transform: `translate(${translation.x}px, ${translation.y}px) rotate(${rotation}deg) scale(${scale})`,
        opacity: opacity,
        transformOrigin: 'center center',
        transition: 'transform 0.1s ease-out'
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Dynamic Texture Patterns depending on selected fabric */}
        {fabric.patternType === 'cotton' && (
          <pattern id={patternId} width="16" height="16" patternUnits="userSpaceOnUse">
            <rect width="16" height="16" fill={color} />
            <circle cx="4" cy="4" r="1.5" fill="rgba(255, 255, 255, 0.45)" />
            <circle cx="12" cy="12" r="1.5" fill="rgba(255, 255, 255, 0.45)" />
            <circle cx="4" cy="4" r="0.8" fill="rgba(6, 78, 59, 0.08)" />
            <circle cx="12" cy="12" r="0.8" fill="rgba(6, 78, 59, 0.08)" />
          </pattern>
        )}
        
        {fabric.patternType === 'linen' && (
          <pattern id={patternId} width="8" height="8" patternUnits="userSpaceOnUse">
            <rect width="8" height="8" fill={color} />
            <line x1="0" y1="2" x2="8" y2="2" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.8" />
            <line x1="2" y1="0" x2="2" y2="8" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.8" />
            <line x1="0" y1="6" x2="8" y2="6" stroke="rgba(6, 78, 59, 0.08)" strokeWidth="0.8" />
            <line x1="6" y1="0" x2="6" y2="8" stroke="rgba(6, 78, 59, 0.08)" strokeWidth="0.8" />
          </pattern>
        )}

        {fabric.patternType === 'silk' && (
          <pattern id={patternId} width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill={color} />
            <path d="M0,40 L40,0 M-10,10 L10,-10 M30,50 L50,30" stroke="rgba(255, 255, 255, 0.22)" strokeWidth="8" />
            <path d="M0,40 L40,0 M-10,10 L10,-10 M30,50 L50,30" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" />
            <path d="M10,40 L40,10" stroke="rgba(6, 78, 59, 0.04)" strokeWidth="4" />
          </pattern>
        )}

        {fabric.patternType === 'wool' && (
          <pattern id={patternId} width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill={color} />
            <path d="M0,0 L10,10 L20,0 M0,20 L10,10 L20,20" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" fill="none" />
            <path d="M0,10 L10,0 L20,10 M0,10 L10,20 L20,10" stroke="rgba(6, 78, 59, 0.07)" strokeWidth="0.8" fill="none" />
          </pattern>
        )}

        {/* Realistic drop shadow and filter systems */}
        <filter id="fabric-depth" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="0" dy="4" />
          <feComponentTransfer><feFuncA type="linear" slope="0.15" /></feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* RENDER GARMENT: SHIRT */}
      {type === 'shirt' && (
        <g id="svg-shirt" filter="url(#fabric-depth)">
          {/* Main Body Torso */}
          <path 
            d="M 140 100 Q 130 180 145 320 L 255 320 Q 270 180 260 100 Z" 
            fill={`url(#${patternId})`}
            stroke="rgba(6, 78, 59, 0.25)"
            strokeWidth="1.5"
          />
          {/* Left Sleeve */}
          {sleeve !== 'Short Sleeves' ? (
            <path 
              d="M 140 100 L 95 240 Q 90 260 92 275 L 115 280 L 140 135 Z" 
              fill={`url(#${patternId})`}
              stroke="rgba(6, 78, 59, 0.2)"
              strokeWidth="1.2"
            />
          ) : (
            <path 
              d="M 140 100 L 110 170 L 132 180 L 140 135 Z" 
              fill={`url(#${patternId})`}
              stroke="rgba(6, 78, 59, 0.2)"
              strokeWidth="1.2"
            />
          )}
          {/* Right Sleeve */}
          {sleeve !== 'Short Sleeves' ? (
            <path 
              d="M 260 100 L 305 240 Q 310 260 308 275 L 285 280 L 260 135 Z" 
              fill={`url(#${patternId})`}
              stroke="rgba(6, 78, 59, 0.2)"
              strokeWidth="1.2"
            />
          ) : (
            <path 
              d="M 260 100 L 290 170 L 268 180 L 260 135 Z" 
              fill={`url(#${patternId})`}
              stroke="rgba(6, 78, 59, 0.2)"
              strokeWidth="1.2"
            />
          )}

          {/* Left Cuff (French or Casual) */}
          {sleeve !== 'Short Sleeves' && (
            <path 
              d="M 92 275 L 88 290 L 116 295 L 115 280 Z" 
              fill={color} 
              stroke="rgba(6, 78, 59, 0.3)" 
              strokeWidth="1"
            />
          )}
          {/* Right Cuff (French or Casual) */}
          {sleeve !== 'Short Sleeves' && (
            <path 
              d="M 308 275 L 312 290 L 284 295 L 285 280 Z" 
              fill={color} 
              stroke="rgba(6, 78, 59, 0.3)" 
              strokeWidth="1"
            />
          )}

          {/* Center Placket */}
          <path 
            d="M 194 100 L 206 100 L 206 320 L 194 320 Z" 
            fill={`url(#${patternId})`} 
            stroke="rgba(6, 78, 59, 0.15)"
            strokeWidth="1"
          />
          {/* Placket Buttons */}
          <circle cx="200" cy="140" r="3" fill="#fafafa" stroke="#ccc" strokeWidth="0.5" />
          <circle cx="200" cy="180" r="3" fill="#fafafa" stroke="#ccc" strokeWidth="0.5" />
          <circle cx="200" cy="220" r="3" fill="#fafafa" stroke="#ccc" strokeWidth="0.5" />
          <circle cx="200" cy="260" r="3" fill="#fafafa" stroke="#ccc" strokeWidth="0.5" />
          <circle cx="200" cy="300" r="3" fill="#fafafa" stroke="#ccc" strokeWidth="0.5" />

          {/* Chest Pocket */}
          <path 
            d="M 152 140 L 175 140 L 175 168 L 163.5 176 L 152 168 Z" 
            fill={`url(#${patternId})`} 
            stroke="rgba(6, 78, 59, 0.25)" 
            strokeWidth="1"
          />

          {/* Left Collar Point */}
          {collar === 'Spread Collar (Modern)' ? (
            <path d="M 200 100 L 145 110 L 170 82 Z" fill={color} stroke="rgba(6, 78, 59, 0.3)" strokeWidth="1.2" />
          ) : collar === 'Button-Down Collar (Classic)' ? (
            <path d="M 200 100 L 155 120 L 175 82 Z" fill={color} stroke="rgba(6, 78, 59, 0.3)" strokeWidth="1.2" />
          ) : (
            <path d="M 200 100 L 170 95 L 180 82 Z" fill={color} stroke="rgba(6, 78, 59, 0.3)" strokeWidth="1.2" /> // Band Collar
          )}

          {/* Right Collar Point */}
          {collar === 'Spread Collar (Modern)' ? (
            <path d="M 200 100 L 255 110 L 230 82 Z" fill={color} stroke="rgba(6, 78, 59, 0.3)" strokeWidth="1.2" />
          ) : collar === 'Button-Down Collar (Classic)' ? (
            <path d="M 200 100 L 245 120 L 225 82 Z" fill={color} stroke="rgba(6, 78, 59, 0.3)" strokeWidth="1.2" />
          ) : (
            <path d="M 200 100 L 230 95 L 220 82 Z" fill={color} stroke="rgba(6, 78, 59, 0.3)" strokeWidth="1.2" /> // Band Collar
          )}

          {/* Collar Buttons for Button-Down style */}
          {collar === 'Button-Down Collar (Classic)' && (
            <>
              <circle cx="160" cy="116" r="1.2" fill="#333" />
              <circle cx="240" cy="116" r="1.2" fill="#333" />
            </>
          )}

          {/* Shading, Creases & Depth Overlays (3D Effect) */}
          {/* Armpit left shadow */}
          <path d="M 140 120 Q 150 160 148 200" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="3" />
          {/* Armpit right shadow */}
          <path d="M 260 120 Q 250 160 252 200" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="3" />
          {/* Sleeve creases left */}
          <path d="M 125 150 Q 115 190 105 220" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
          <path d="M 120 165 Q 110 205 102 235" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="2" />
          {/* Sleeve creases right */}
          <path d="M 275 150 Q 285 190 295 220" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
          <path d="M 280 165 Q 290 205 298 235" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="2" />
          {/* Waist fold highlight */}
          <path d="M 155 240 Q 200 250 245 240" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="3" />
          <path d="M 155 243 Q 200 253 245 243" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="2" />
        </g>
      )}

      {/* RENDER GARMENT: BLAZER */}
      {type === 'blazer' && (
        <g id="svg-blazer" filter="url(#fabric-depth)">
          {/* Under-shirt Triangle */}
          <path d="M 175 90 L 225 90 L 200 170 Z" fill="#fafafa" stroke="#eee" />
          {/* Under-shirt Tie */}
          <path d="M 197 90 L 203 90 L 208 150 L 200 165 L 192 150 Z" fill="var(--emerald-deep)" />

          {/* Main Torso */}
          <path 
            d="M 132 85 Q 120 180 135 340 L 265 340 Q 280 180 268 85 Z" 
            fill={`url(#${patternId})`}
            stroke="rgba(6, 78, 59, 0.3)"
            strokeWidth="1.5"
          />

          {/* Left Sleeve */}
          <path 
            d="M 132 85 L 80 250 Q 75 270 78 285 L 108 290 L 138 125 Z" 
            fill={`url(#${patternId})`}
            stroke="rgba(6, 78, 59, 0.25)"
            strokeWidth="1.2"
          />
          {/* Right Sleeve */}
          <path 
            d="M 268 85 L 320 250 Q 325 270 322 285 L 292 290 L 262 125 Z" 
            fill={`url(#${patternId})`}
            stroke="rgba(6, 78, 59, 0.25)"
            strokeWidth="1.2"
          />

          {/* Center overlap cut (blazer opening) */}
          <path d="M 200 170 L 175 340 L 225 340 L 200 170" fill="rgba(0, 0, 0, 0.08)" />

          {/* Left Lapel */}
          <path 
            d="M 200 90 L 140 180 L 135 155 L 175 85 Z" 
            fill={`url(#${patternId})`}
            stroke="rgba(6, 78, 59, 0.35)"
            strokeWidth="1.5"
          />
          {/* Right Lapel */}
          <path 
            d="M 200 90 L 260 180 L 265 155 L 225 85 Z" 
            fill={`url(#${patternId})`}
            stroke="rgba(6, 78, 59, 0.35)"
            strokeWidth="1.5"
          />

          {/* Left Pocket Flap */}
          <path d="M 142 270 L 175 270 L 175 285 L 142 285 Z" fill={`url(#${patternId})`} stroke="rgba(6, 78, 59, 0.3)" strokeWidth="1" />
          {/* Right Pocket Flap */}
          <path d="M 225 270 L 258 270 L 258 285 L 225 285 Z" fill={`url(#${patternId})`} stroke="rgba(6, 78, 59, 0.3)" strokeWidth="1" />

          {/* Breast Pocket */}
          <path d="M 148 150 L 172 147 L 170 162 L 146 165 Z" fill={`url(#${patternId})`} stroke="rgba(6, 78, 59, 0.35)" strokeWidth="1" />
          {/* White pocket square tip */}
          <path d="M 152 149 L 160 140 L 166 148 Z" fill="#ffffff" />

          {/* Golden blazer buttons */}
          <circle cx="194" cy="225" r="4.5" fill="url(#metallicGold)" stroke="#b5945b" strokeWidth="0.8" />
          <circle cx="194" cy="255" r="4.5" fill="url(#metallicGold)" stroke="#b5945b" strokeWidth="0.8" />
          
          <linearGradient id="metallicGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff2cc" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#996515" />
          </linearGradient>

          {/* Shading/Depth overlays */}
          {/* Lapel shadows */}
          <path d="M 140 180 L 200 240" stroke="rgba(0,0,0,0.15)" strokeWidth="2.5" fill="none" />
          <path d="M 260 180 L 200 240" stroke="rgba(0,0,0,0.15)" strokeWidth="2.5" fill="none" />
          {/* Left sleeve crease */}
          <path d="M 115 130 Q 95 200 88 245" stroke="rgba(0,0,0,0.06)" strokeWidth="3.5" fill="none" />
          {/* Right sleeve crease */}
          <path d="M 285 130 Q 305 200 312 245" stroke="rgba(0,0,0,0.06)" strokeWidth="3.5" fill="none" />
          {/* Shoulder structured pads highlight */}
          <path d="M 130 85 L 175 88" stroke="rgba(255,255,255,0.22)" strokeWidth="3.5" fill="none" />
          <path d="M 270 85 L 225 88" stroke="rgba(255,255,255,0.22)" strokeWidth="3.5" fill="none" />
        </g>
      )}

      {/* RENDER GARMENT: KURTA */}
      {type === 'kurta' && (
        <g id="svg-kurta" filter="url(#fabric-depth)">
          {/* Main Body (Longer side slit garment) */}
          <path 
            d="M 142 90 Q 130 180 135 320 L 132 400 L 268 400 L 265 320 Q 270 180 258 90 Z" 
            fill={`url(#${patternId})`}
            stroke="rgba(6, 78, 59, 0.25)"
            strokeWidth="1.5"
          />

          {/* Relaxed Sleeves */}
          <path 
            d="M 142 90 L 98 250 Q 94 270 95 285 L 122 290 L 144 135 Z" 
            fill={`url(#${patternId})`}
            stroke="rgba(6, 78, 59, 0.2)"
            strokeWidth="1.2"
          />
          <path 
            d="M 258 90 L 302 250 Q 306 270 305 285 L 278 290 L 256 135 Z" 
            fill={`url(#${patternId})`}
            stroke="rgba(6, 78, 59, 0.2)"
            strokeWidth="1.2"
          />

          {/* Side Slit cut highlights */}
          <line x1="135" y1="320" x2="132" y2="400" stroke="rgba(6, 78, 59, 0.4)" strokeWidth="1" />
          <line x1="265" y1="320" x2="268" y2="400" stroke="rgba(6, 78, 59, 0.4)" strokeWidth="1" />

          {/* Nehru/Mandarin Band Collar */}
          <path 
            d="M 172 90 C 172 75, 228 75, 228 90 L 220 95 C 220 85, 180 85, 180 95 Z" 
            fill={color} 
            stroke="rgba(6, 78, 59, 0.35)" 
            strokeWidth="1.2"
          />

          {/* Short Opening Placket (Ethnic slit) */}
          <path 
            d="M 197 95 L 203 95 L 203 190 L 197 190 Z" 
            fill={`url(#${patternId})`} 
            stroke="rgba(6, 78, 59, 0.18)" 
            strokeWidth="1.2"
          />
          {/* Small loops/studs on placket */}
          <circle cx="200" cy="120" r="2.2" fill="#fafafa" stroke="#ccc" strokeWidth="0.5" />
          <circle cx="200" cy="145" r="2.2" fill="#fafafa" stroke="#ccc" strokeWidth="0.5" />
          <circle cx="200" cy="170" r="2.2" fill="#fafafa" stroke="#ccc" strokeWidth="0.5" />

          {/* Shading/Creases */}
          {/* Draping folds at body center */}
          <path d="M 195 210 Q 200 300 170 380" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="3" />
          <path d="M 205 210 Q 200 300 230 380" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="3" />
          <path d="M 140 240 Q 200 250 260 230" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="2.5" />
          <path d="M 140 243 Q 200 253 260 233" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="2.0" />
          
          {/* Sleeves loose drapery */}
          <path d="M 125 180 C 115 220 110 250 102 280" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="2" />
          <path d="M 275 180 C 285 220 290 250 298 280" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="2" />
        </g>
      )}

      {/* RENDER GARMENT: PANTS */}
      {type === 'pants' && (
        <g id="svg-pants" filter="url(#fabric-depth)">
          {/* Hips waistband area */}
          <path 
            d="M 142 160 L 258 160 L 265 220 L 135 220 Z" 
            fill={`url(#${patternId})`}
            stroke="rgba(6, 78, 59, 0.25)"
            strokeWidth="1.5"
          />
          {/* Left Leg */}
          <path 
            d="M 135 220 L 120 460 L 180 460 L 200 250 Z" 
            fill={`url(#${patternId})`}
            stroke="rgba(6, 78, 59, 0.25)"
            strokeWidth="1.2"
          />
          {/* Right Leg */}
          <path 
            d="M 265 220 L 280 460 L 220 460 L 200 250 Z" 
            fill={`url(#${patternId})`}
            stroke="rgba(6, 78, 59, 0.25)"
            strokeWidth="1.2"
          />

          {/* Trouser waist closure detail */}
          <path d="M 195 160 L 205 160 L 205 210 L 195 210 Z" fill={color} stroke="rgba(6, 78, 59, 0.2)" strokeWidth="1" />
          <line x1="200" y1="160" x2="200" y2="210" stroke="rgba(6, 78, 59, 0.3)" strokeWidth="1" />
          <circle cx="200" cy="172" r="2.5" fill="#fafafa" stroke="#999" strokeWidth="0.5" />

          {/* Slash pockets details */}
          <line x1="148" y1="175" x2="138" y2="210" stroke="rgba(6, 78, 59, 0.4)" strokeWidth="1.2" />
          <line x1="252" y1="175" x2="262" y2="210" stroke="rgba(6, 78, 59, 0.4)" strokeWidth="1.2" />

          {/* Leg Crease (Sartorial trouser fold line) */}
          <line x1="150" y1="230" x2="150" y2="455" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
          <line x1="151" y1="230" x2="151" y2="455" stroke="rgba(0,0,0,0.06)" strokeWidth="1.0" />
          <line x1="250" y1="230" x2="250" y2="455" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
          <line x1="251" y1="230" x2="251" y2="455" stroke="rgba(0,0,0,0.06)" strokeWidth="1.0" />

          {/* Shading/Creases */}
          {/* Inner crotch shadow */}
          <path d="M 198 220 L 202 220 L 200 260 Z" fill="rgba(0, 0, 0, 0.15)" />
          {/* Bottom leg hems */}
          <path d="M 120 460 L 180 460" stroke="rgba(6, 78, 59, 0.5)" strokeWidth="2.5" />
          <path d="M 220 460 L 280 460" stroke="rgba(6, 78, 59, 0.5)" strokeWidth="2.5" />
          {/* Soft folds at hips */}
          <path d="M 152 210 Q 170 220 190 215" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="2" />
          <path d="M 248 210 Q 230 220 210 215" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="2" />
        </g>
      )}
    </svg>
  );
}

// Stylized background silhouette drawing
function MannequinSilhouette({ gender }) {
  return (
    <svg width="400" height="500" viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" className="tryon-model-silhouette">
      {/* Mannequin stand */}
      <line x1="200" y1="360" x2="200" y2="490" stroke="#FFD9BE" strokeWidth="6" strokeLinecap="round" />
      <path d="M 160 490 L 240 490 L 220 475 L 180 475 Z" fill="#FFD9BE" />
      <ellipse cx="200" cy="475" rx="30" ry="8" fill="#536360" opacity="0.3" />

      {/* Neck Cap */}
      <path d="M 190 85 Q 200 70, 210 85 Z" fill="#FFD9BE" />

      {/* Main Form Torso */}
      {gender === 'female' ? (
        <path 
          d="M 185 85 L 215 85 
             Q 220 95, 235 110 
             Q 255 130, 250 160 
             Q 245 190, 215 220 
             Q 225 280, 230 350 
             L 170 350 
             Q 175 280, 185 220 
             Q 155 190, 150 160 
             Q 145 130, 165 110 
             Q 180 95, 185 85 Z" 
          fill="vertical-gradient" 
          stroke="#FFD9BE" 
          strokeWidth="2.5"
          style={{ fill: 'url(#mannequinGrad)' }}
        />
      ) : gender === 'male' ? (
        <path 
          d="M 180 85 L 220 85 
             Q 230 95, 255 112 
             Q 265 140, 255 180 
             Q 240 215, 222 230 
             Q 228 290, 232 355 
             L 168 355 
             Q 172 290, 178 230 
             Q 160 215, 145 180 
             Q 135 140, 145 112 
             Q 170 95, 180 85 Z" 
          fill="vertical-gradient" 
          stroke="#FFD9BE" 
          strokeWidth="2.5"
          style={{ fill: 'url(#mannequinGrad)' }}
        />
      ) : (
        // Standard Neutral Dress Form
        <path 
          d="M 182 85 L 218 85 
             Q 225 95, 245 110 
             Q 258 135, 250 170 
             Q 240 205, 218 225 
             Q 225 285, 228 350 
             L 172 350 
             Q 175 285, 182 225 
             Q 160 205, 150 170 
             Q 142 135, 155 110 
             Q 175 95, 182 85 Z" 
          fill="vertical-gradient" 
          stroke="#FFD9BE" 
          strokeWidth="2.5"
          style={{ fill: 'url(#mannequinGrad)' }}
        />
      )}

      {/* Soft gradient fill for high-end look */}
      <defs>
        <linearGradient id="mannequinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFD9BE" />
          <stop offset="60%" stopColor="#FFD9BE" />
          <stop offset="100%" stopColor="#FFD9BE" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function AITryOn() {
  const { openBooking } = useBooking();

  // Workbench State
  const [selectedModel, setSelectedModel] = useState('neutral');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImageName, setUploadedImageName] = useState('');
  const [selectedGarment, setSelectedGarment] = useState('shirt');
  const [selectedFabric, setSelectedFabric] = useState(FABRICS[0]);
  
  // Custom Detail Selectors
  const [selectedCollar, setSelectedCollar] = useState(COLLARS[0].name);
  const [selectedSleeve, setSelectedSleeve] = useState(SLEEVES[0].name);

  // Manual garment adjustment sliders
  const [translationX, setTranslationX] = useState(0);
  const [translationY, setTranslationY] = useState(0);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [opacity, setOpacity] = useState(1);

  // Processing state simulation
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [simulationApplied, setSimulationApplied] = useState(false);
  const [beforeMode, setBeforeMode] = useState(false);

  // Gemini API states
  const [fitAnalysis, setFitAnalysis] = useState('');
  const [styleAdvice, setStyleAdvice] = useState('');
  const [geminiSvgContent, setGeminiSvgContent] = useState('');
  const [apiKeyWarning, setApiKeyWarning] = useState('');

  const fileInputRef = useRef(null);

  // Automatically adjust default scales depending on the garment
  useEffect(() => {
    handleResetAdjustments();
  }, [selectedGarment, selectedModel, uploadedImage]);

  const handleResetAdjustments = () => {
    // Trousers are naturally placed lower on mannequins
    if (selectedGarment === 'pants') {
      setTranslationX(0);
      setTranslationY(40);
      setScale(0.95);
    } else {
      setTranslationX(0);
      setTranslationY(0);
      setScale(1.0);
    }
    setRotation(0);
    setOpacity(1);
  };

  // Process the Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImageName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        setSelectedModel(''); // Clear presets
        setSimulationApplied(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleClearUpload = (e) => {
    e.stopPropagation();
    setUploadedImage(null);
    setUploadedImageName('');
    setSelectedModel('neutral');
    setSimulationApplied(false);
  };

  // Run the premium AI simulation scan using Gemini API
  const handleRunSimulation = async () => {
    setIsProcessing(true);
    setProgressStep(0);
    setSimulationApplied(false);
    setApiKeyWarning('');

    const pInterval = setInterval(() => {
      setProgressStep(prev => Math.min(3, prev + 1));
    }, 900);

    try {
      const response = await fetch('/api/tryon/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: uploadedImage || null,
          fabric: {
            id: selectedFabric.id,
            name: selectedFabric.name,
            color: selectedFabric.color,
            patternType: selectedFabric.patternType,
            origin: selectedFabric.origin,
            weight: selectedFabric.weight
          },
          garment: selectedGarment,
          collar: selectedCollar,
          sleeve: selectedSleeve
        })
      });

      const data = await response.json();
      clearInterval(pInterval);

      if (data.success) {
        setFitAnalysis(data.fitAnalysis);
        setStyleAdvice(data.styleAdvice);
        if (uploadedImage) {
          setGeminiSvgContent(data.svgContent);
        } else {
          setGeminiSvgContent('');
        }
        if (data.message) {
          setApiKeyWarning(data.message);
        }
        setSimulationApplied(true);
        setBeforeMode(false);
      } else {
        alert("AI Try-On failed: " + data.message);
      }
    } catch (err) {
      clearInterval(pInterval);
      console.error(err);
      alert("Unable to connect to AI styling engine.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Pre-fill booking details and trigger the booking modal
  const handleBookWithLook = () => {
    const customNotes = `AI Try-On custom request:
- Garment: ${GARMENTS.find(g => g.id === selectedGarment)?.name}
- Fabric: ${selectedFabric.name} (Origin: ${selectedFabric.origin}, Weight: ${selectedFabric.weight})
- Style Details: ${selectedCollar} / ${selectedSleeve}
- Custom Alignments Used: Scale ${scale.toFixed(2)}, Position (X:${translationX}, Y:${translationY})
- Simulated image has been checked by user.`;

    localStorage.setItem('tailors2u_booking_notes', customNotes);
    openBooking('Custom Tailoring Appointment');
  };

  // Status message mappings for the spinner overlay
  const progressMessages = [
    'AI Engine: Initializing silhouette analysis...',
    'Pose Detection: Mapping joint anchor markers...',
    'Texture Synthesizer: Fitting fabric drape to folds...',
    'Finalizing: Balancing light shadows & seams...'
  ];

  return (
    <div className="porcelain-theme">
      {/* INTERACTIVE WORKBENCH */}
      <section className="section" style={{ paddingTop: '3rem' }}>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto 3rem auto' }}>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '0.8rem', color: '#1E2D27' }}>Sartorial AI Try-On</h1>
          <p style={{ color: '#4A5B55', fontSize: '1.1rem', maxWidth: '750px', lineHeight: '1.6' }}>
            Upload your personal photo or select a studio mannequin to instantly preview luxury fabrics, premium suit cuts, shirting outlines, and traditional kurtas on yourself.
          </p>
        </div>
        <div className="tryon-container">
          
          {/* LEFT COLUMN: VIEWPORT PREVIEW */}
          <div className="tryon-preview-card">
            <h3 style={{ marginBottom: '1.2rem', fontSize: '1.4rem', borderBottom: '1px solid var(--beige-border)', paddingBottom: '0.8rem' }}>
              Virtual Fitting Room
            </h3>
            
            <div className="tryon-viewport">
              {/* Animated scanline during AI generation */}
              {isProcessing && <div className="tryon-scanline"></div>}
              {isProcessing && <div className="tryon-scan-overlay"></div>}

              {/* Dynamic Loading Overlay */}
              {isProcessing && (
                <div className="tryon-ai-status-overlay">
                  <div className="tryon-ai-spinner"></div>
                  <h4 style={{ color: 'var(--beige-gold)', fontSize: '1.2rem', fontWeight: 'bold' }}>Mapping Custom Outfit...</h4>
                  <div className="tryon-status-step">{progressMessages[progressStep]}</div>
                </div>
              )}

              {/* Viewport Canvas Layer */}
              <div className="tryon-canvas-container">
                {/* 1. Background image (Uploaded User image OR preset mannequin silhouette) */}
                {uploadedImage ? (
                  <img 
                    src={uploadedImage} 
                    alt="User photo" 
                    className="tryon-model-image"
                    style={{ opacity: beforeMode ? 1 : 0.85 }}
                  />
                ) : (
                  <MannequinSilhouette gender={selectedModel ? PRESETS.find(p => p.id === selectedModel)?.gender : 'neutral'} />
                )}

                {/* 2. Garment texture mapping overlay */}
                {(!beforeMode && (simulationApplied || !uploadedImage)) && (
                  <div className="tryon-garment-overlay">
                    {geminiSvgContent ? (
                      <svg 
                        width="400" 
                        height="500" 
                        viewBox="0 0 400 500" 
                        style={{
                          transform: `translate(${translationX}px, ${translationY}px) rotate(${rotation}deg) scale(${scale})`,
                          opacity: opacity,
                          transformOrigin: 'center center',
                          transition: 'transform 0.1s ease-out'
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          {/* Dynamic Texture Patterns depending on selected fabric */}
                          <pattern id="tryon-pattern-active" width="16" height="16" patternUnits="userSpaceOnUse">
                            <rect width="16" height="16" fill={selectedFabric.color} />
                            {selectedFabric.patternType === 'cotton' && (
                              <>
                                <circle cx="4" cy="4" r="1.5" fill="rgba(255, 255, 255, 0.45)" />
                                <circle cx="12" cy="12" r="1.5" fill="rgba(255, 255, 255, 0.45)" />
                              </>
                            )}
                            {selectedFabric.patternType === 'linen' && (
                              <>
                                <line x1="0" y1="2" x2="8" y2="2" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.8" />
                                <line x1="2" y1="0" x2="2" y2="8" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.8" />
                              </>
                            )}
                            {selectedFabric.patternType === 'silk' && (
                              <>
                                <path d="M0,16 L16,0 M-4,4 L4,-4 M12,20 L20,12" stroke="rgba(255, 255, 255, 0.22)" strokeWidth="3" />
                              </>
                            )}
                            {selectedFabric.patternType === 'wool' && (
                              <>
                                <path d="M0,0 L8,8 L16,0 M0,16 L8,8 L16,16" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="0.8" fill="none" />
                              </>
                            )}
                          </pattern>
                        </defs>
                        <g dangerouslySetInnerHTML={{ __html: geminiSvgContent }} />
                      </svg>
                    ) : (
                      <GarmentSVG
                        type={selectedGarment}
                        fabric={selectedFabric}
                        collar={selectedCollar}
                        sleeve={selectedSleeve}
                        scale={scale}
                        rotation={rotation}
                        translation={{ x: translationX, y: translationY }}
                        opacity={opacity}
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Before/After Toggle Hook (only when simulation has run once or upload image is used) */}
              {simulationApplied && (
                <button 
                  className="tryon-toggle-btn"
                  onMouseDown={() => setBeforeMode(true)}
                  onMouseUp={() => setBeforeMode(false)}
                  onTouchStart={() => setBeforeMode(true)}
                  onTouchEnd={() => setBeforeMode(false)}
                  title="Click and hold to see your original photo without fabrics"
                >
                  <span>👁</span> Hold to View Original
                </button>
              )}
            </div>

            {/* Hint text */}
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '1rem', fontStyle: 'italic' }}>
              {uploadedImage 
                ? "💡 Use the 'Adjust Fit' sliders in Step 2 to scale, shift, or rotate the garment perfectly over your photo."
                : "💡 Preset mannequins align automatically. Select garments and fabrics in the panels to customize your look."}
            </p>

            {/* Gemini AI Sartorial Analysis Panel */}
            {simulationApplied && (fitAnalysis || styleAdvice) && (
              <div 
                style={{ 
                  marginTop: '1.5rem', 
                  padding: '1.2rem', 
                  backgroundColor: 'rgba(6, 78, 59, 0.05)', 
                  border: '1px solid rgba(255, 217, 190, 0.2)', 
                  borderRadius: 'var(--radius-md)' 
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>✨</span>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--emerald-deep)', fontWeight: '600' }}>
                    Gemini AI Sartorial Analysis
                  </h4>
                </div>
                
                {apiKeyWarning && (
                  <p style={{ fontSize: '0.8rem', color: '#b45309', margin: '0 0 0.8rem 0', fontWeight: '500' }}>
                    ⚠️ {apiKeyWarning}
                  </p>
                )}

                <div style={{ marginBottom: '1rem' }}>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--emerald-deep)', display: 'block', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Fit & Posture Estimation
                  </strong>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#4A5B55', lineHeight: '1.5' }}>
                    {fitAnalysis}
                  </p>
                </div>

                <div>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--emerald-deep)', display: 'block', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Bespoke Styling Advice
                  </strong>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#4A5B55', lineHeight: '1.5' }}>
                    {styleAdvice}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: CONTROLS */}
          <div className="tryon-controls-card animate-fade-in">
            
            {/* STEP 1: MODEL & UPLOAD */}
            <div className="tryon-step-section">
              <div className="tryon-step-header">
                <span className="tryon-step-num">1</span>
                <div>
                  <h4 className="tryon-step-title">Choose Studio Model or Upload Photo</h4>
                  <div className="tryon-step-desc">Select a mannequined dress-form or drag & drop your portrait photo.</div>
                </div>
              </div>

              {/* Mannequin presets */}
              <div className="tryon-presets-grid">
                {PRESETS.map(preset => (
                  <button
                    key={preset.id}
                    className={`tryon-preset-btn ${selectedModel === preset.id ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedModel(preset.id);
                      setUploadedImage(null);
                      setUploadedImageName('');
                      setSimulationApplied(false);
                    }}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>

              {/* Image Uploader zone */}
              <div className="tryon-upload-zone" onClick={triggerFileSelect}>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                />
                
                {uploadedImageName ? (
                  <div>
                    <span className="tryon-upload-icon">✓</span>
                    <div className="tryon-upload-filename">{uploadedImageName}</div>
                    <span className="tryon-upload-clear" onClick={handleClearUpload}>
                      Remove image
                    </span>
                  </div>
                ) : (
                  <div>
                    <div className="tryon-upload-icon">📸</div>
                    <p style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--emerald-deep)' }}>
                      Upload Your Front-Facing Image
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                      PNG, JPG up to 10MB (Portrait works best)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* STEP 2: CHOOSE GARMENT TYPE */}
            <div className="tryon-step-section">
              <div className="tryon-step-header">
                <span className="tryon-step-num">2</span>
                <div>
                  <h4 className="tryon-step-title">Select Garment Silhouette</h4>
                  <div className="tryon-step-desc">Pick the clothing structure to drape fabric textures onto.</div>
                </div>
              </div>

              <div className="tryon-garments-grid">
                {GARMENTS.map(garment => (
                  <button
                    key={garment.id}
                    className={`tryon-garment-btn ${selectedGarment === garment.id ? 'active' : ''}`}
                    onClick={() => setSelectedGarment(garment.id)}
                  >
                    <span className="tryon-garment-icon">{garment.icon}</span>
                    <span className="tryon-garment-name">{garment.name}</span>
                  </button>
                ))}
              </div>

              {/* Manual Fit Alignment Controls (displays when user uploads image) */}
              {(uploadedImage || selectedModel) && (
                <div className="tryon-adjustment-panel">
                  <div className="tryon-adjustment-title">
                    <span>Adjust Fit & Alignment</span>
                    <button className="tryon-reset-btn" onClick={handleResetAdjustments}>
                      Reset
                    </button>
                  </div>
                  
                  {/* Position X slider */}
                  <div className="tryon-slider-group">
                    <span>Horizontal</span>
                    <input 
                      type="range" 
                      min="-120" 
                      max="120" 
                      value={translationX} 
                      className="tryon-slider" 
                      onChange={(e) => setTranslationX(parseInt(e.target.value))} 
                    />
                    <span className="tryon-slider-val">{translationX}px</span>
                  </div>

                  {/* Position Y slider */}
                  <div className="tryon-slider-group">
                    <span>Vertical</span>
                    <input 
                      type="range" 
                      min="-120" 
                      max="150" 
                      value={translationY} 
                      className="tryon-slider" 
                      onChange={(e) => setTranslationY(parseInt(e.target.value))} 
                    />
                    <span className="tryon-slider-val">{translationY}px</span>
                  </div>

                  {/* Scale slider */}
                  <div className="tryon-slider-group">
                    <span>Garment Size</span>
                    <input 
                      type="range" 
                      min="0.5" 
                      max="2.0" 
                      step="0.05"
                      value={scale} 
                      className="tryon-slider" 
                      onChange={(e) => setScale(parseFloat(e.target.value))} 
                    />
                    <span className="tryon-slider-val">{(scale * 100).toFixed(0)}%</span>
                  </div>

                  {/* Rotation slider */}
                  <div className="tryon-slider-group">
                    <span>Tilt Angle</span>
                    <input 
                      type="range" 
                      min="-30" 
                      max="30" 
                      value={rotation} 
                      className="tryon-slider" 
                      onChange={(e) => setRotation(parseInt(e.target.value))} 
                    />
                    <span className="tryon-slider-val">{rotation}°</span>
                  </div>

                  {/* Opacity slider */}
                  <div className="tryon-slider-group">
                    <span>Blend Factor</span>
                    <input 
                      type="range" 
                      min="0.3" 
                      max="1.0" 
                      step="0.05"
                      value={opacity} 
                      className="tryon-slider" 
                      onChange={(e) => setOpacity(parseFloat(e.target.value))} 
                    />
                    <span className="tryon-slider-val">{(opacity * 100).toFixed(0)}%</span>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 3: SELECT FABRICS */}
            <div className="tryon-step-section">
              <div className="tryon-step-header">
                <span className="tryon-step-num">3</span>
                <div>
                  <h4 className="tryon-step-title">Select Mill Fabric Weave</h4>
                  <div className="tryon-step-desc">Preview premium textures directly imported from global mills.</div>
                </div>
              </div>

              <div className="tryon-fabrics-grid">
                {FABRICS.map(fabric => (
                  <div
                    key={fabric.id}
                    className={`tryon-fabric-card ${selectedFabric.id === fabric.id ? 'active' : ''}`}
                    onClick={() => setSelectedFabric(fabric.variants ? { ...fabric, color: fabric.variants[0].colorHex, activeVariant: fabric.variants[0] } : fabric)}
                  >
                    <div>
                      <div className="tryon-fabric-header">
                        <div className="tryon-fabric-circle">
                          <div 
                            className={fabric.previewClass}
                            style={fabric.variants && selectedFabric.id === fabric.id && selectedFabric.activeVariant ? {
                              backgroundImage: `url(${selectedFabric.activeVariant.image})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center'
                            } : {}}
                          ></div>
                        </div>
                        <span className="tryon-fabric-name">{fabric.name}</span>
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.3' }}>
                        {fabric.desc}
                      </p>

                      {fabric.variants && selectedFabric.id === fabric.id && (
                        <div 
                          style={{ 
                            marginTop: '0.8rem', 
                            paddingTop: '0.8rem', 
                            borderTop: '1px solid rgba(255,255,255,0.08)'
                          }}
                          onClick={(e) => e.stopPropagation()} // Prevent parent card click event
                        >
                          <span style={{ fontSize: '0.75rem', color: 'var(--beige-light)', display: 'block', marginBottom: '0.4rem' }}>
                            Color: {selectedFabric.activeVariant?.name || fabric.variants[0].name}
                          </span>
                          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                            {fabric.variants.map((v) => {
                              const isSelected = (selectedFabric.activeVariant?.id || fabric.variants[0].id) === v.id;
                              return (
                                <button
                                  key={v.id}
                                  type="button"
                                  style={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    backgroundColor: v.colorHex,
                                    border: isSelected ? '1.5px solid var(--beige-gold)' : '1px solid rgba(255,255,255,0.2)',
                                    cursor: 'pointer',
                                    padding: 0,
                                    boxShadow: isSelected ? '0 0 5px var(--beige-gold)' : 'none',
                                    transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                                    transition: 'all 0.15s ease',
                                    outline: 'none'
                                  }}
                                  onClick={() => {
                                    setSelectedFabric({
                                      ...fabric,
                                      color: v.colorHex,
                                      activeVariant: v
                                    });
                                  }}
                                  title={v.name}
                                />
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="tryon-fabric-meta">
                      <span>{fabric.origin}</span>
                      <span style={{ fontWeight: '600', color: 'var(--beige-dark)' }}>{fabric.weight}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* STEP 4: CUSTOM SEWING DETAILS & BOOKING */}
            <div className="tryon-step-section">
              <div className="tryon-step-header">
                <span className="tryon-step-num">4</span>
                <div>
                  <h4 className="tryon-step-title">Tailor Custom Details</h4>
                  <div className="tryon-step-desc">Incorporate standard custom cuts into the custom simulator.</div>
                </div>
              </div>

              <div className="tryon-details-grid">
                {/* Collar selection */}
                <div className="tryon-detail-select-group">
                  <span className="tryon-detail-label">Collar Style</span>
                  <select 
                    value={selectedCollar} 
                    className="tryon-detail-select"
                    onChange={(e) => setSelectedCollar(e.target.value)}
                  >
                    {COLLARS.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>

                {/* Sleeve selection */}
                <div className="tryon-detail-select-group">
                  <span className="tryon-detail-label">Cuff / Sleeves</span>
                  <select 
                    value={selectedSleeve} 
                    className="tryon-detail-select"
                    onChange={(e) => setSelectedSleeve(e.target.value)}
                  >
                    {SLEEVES.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                  </select>
                </div>
              </div>

              {/* Action buttons block */}
              <div className="tryon-actions-block">
                {/* Simulated AI Trigger button */}
                <button 
                  className="tryon-btn-scan" 
                  disabled={isProcessing}
                  onClick={handleRunSimulation}
                  suppressHydrationWarning
                >
                  <span>✨</span> {simulationApplied ? 'Re-Run AI Generation' : 'Synthesize AI Fit'}
                </button>

                {/* Booking link pre-filler */}
                <button 
                  className="tryon-btn-book" 
                  onClick={handleBookWithLook}
                  suppressHydrationWarning
                >
                  Book Doorstep Fitting for this Look
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
