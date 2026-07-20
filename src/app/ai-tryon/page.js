'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useBooking } from '../../components/ClientLayoutWrapper';

// ─── Fabric Definitions ────────────────────────────────────────────────────────
const FABRICS = [
  { id: 'f1', name: 'Giza Egyptian Cotton', color: '#FAF8F5', secondColor: '#E0DBD3', patternType: 'cotton', origin: 'Egypt',    weight: '110 gsm', badge: 'Best Seller',       desc: 'Ultra-soft, high thread count, light natural sheen' },
  { id: 'f2', name: 'Supima Luxury Cotton', color: '#3B6BA5', secondColor: '#2F5A8C', patternType: 'cotton', origin: 'USA',      weight: '125 gsm', badge: 'Premium Fit',        desc: 'Extra-long staple fibers with crisp finish' },
  { id: 'f3', name: 'Pure Irish Linen',     color: '#C49A6C', secondColor: '#A87E52', patternType: 'linen',  origin: 'Ireland',  weight: '145 gsm', badge: 'Summer Essential',   desc: 'Loose weave with classic natural linen slubs' },
  { id: 'f4', name: 'Cotton-Linen Blend',   color: '#5A8A5A', secondColor: '#46724A', patternType: 'linen',  origin: 'Italy',    weight: '135 gsm', badge: 'Casual Chic',        desc: 'Durable structured drape, wrinkle-resistant' },
  { id: 'f5', name: 'Mulberry Royal Silk',  color: '#B5782A', secondColor: '#9A6020', patternType: 'silk',   origin: 'India',    weight: '90 gsm',  badge: 'Wedding Grade',      desc: 'Rich satin finish, fluid and elegant drape' },
  { id: 'f6', name: 'Fine Merino Wool',     color: '#5E6E78', secondColor: '#4A5A64', patternType: 'wool',   origin: 'Australia', weight: '260 gsm', badge: 'Tailoring Grade',   desc: 'Fine thermoregulating wool, deep structure' },
  { id: 'f7', name: 'Cashmere-Silk Blend',  color: '#A05050', secondColor: '#8A3C3C', patternType: 'wool',   origin: 'Mongolia', weight: '290 gsm', badge: 'Signature Luxury',   desc: 'Ultimate insulation combined with silk strength' },
  {
    id: 'f8', name: 'Armani Suiting Wool',  color: '#737a7a', secondColor: '#5e6464', patternType: 'wool',   origin: 'Italy',    weight: '275 gsm', badge: 'Armani Suiting',    desc: 'Exclusive high-end suiting from the house of Armani',
    variants: [
      { id: 'v1', name: 'Cream / Beige',  color: '#C8B070', secondColor: '#B09A5A' },
      { id: 'v2', name: 'Slate Grey',     color: '#5A6464', secondColor: '#484F4F' },
      { id: 'v3', name: 'Chocolate',      color: '#5C2E16', secondColor: '#46200C' },
      { id: 'v4', name: 'Dark Espresso',  color: '#2A1A10', secondColor: '#1C0E08' },
      { id: 'v5', name: 'Royal Purple',   color: '#4A2870', secondColor: '#361A58' },
      { id: 'v6', name: 'Burgundy Wine',  color: '#6A1428', secondColor: '#540E1E' },
    ],
  },
];

const PROGRESS = [
  { icon: '📤', text: 'Uploading image...' },
  { icon: '🖼️', text: 'Preparing image...' },
  { icon: '🤝', text: 'Connecting to AI...' },
  { icon: '⚡', text: 'Generating virtual try-on...' },
  { icon: '✨', text: 'Almost done...' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Canvas Compositing Engine
// Technique:
//   1. Draw original photo
//   2. Clip to shirt bounding box → apply fabric colour with 'color' blend
//      ('color' mode = change hue/saturation, keep original luminosity = wrinkles preserved)
//   3. Clip to face bounding box → redraw original image pixels (100% face restore)
//   4. Clip to hands bounding box → redraw original image pixels (hands restore)
//   5. Add subtle fabric texture pattern on top
// ─────────────────────────────────────────────────────────────────────────────

function pct(val, total) { return Math.round((val / 100) * total); }

async function applyFabricComposite({ imageDataUrl, shirtBox, faceBox, handsBox, fabric }) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const W = img.naturalWidth;
      const H = img.naturalHeight;

      const canvas = document.createElement('canvas');
      canvas.width  = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');

      // ── 1. Draw original photo ──────────────────────────────────────────
      ctx.drawImage(img, 0, 0, W, H);

      // ── 2. Convert bounding boxes from percentages to pixels ────────────
      const shirt = {
        x: pct(shirtBox.left,   W), y: pct(shirtBox.top,    H),
        w: pct(shirtBox.right - shirtBox.left, W),
        h: pct(shirtBox.bottom - shirtBox.top, H),
      };

      // ── 3. Apply fabric colour to shirt region ──────────────────────────
      ctx.save();
      // Rounded rect clipping for shirt — looks more natural than hard edges
      roundedRect(ctx, shirt.x, shirt.y, shirt.w, shirt.h, 8);
      ctx.clip();

      // 'color' blend: replaces hue/saturation but preserves lightness
      // This means original shadows, highlights and wrinkles show through
      ctx.globalCompositeOperation = 'color';
      ctx.globalAlpha = 0.92;
      ctx.fillStyle = fabric.color;
      ctx.fillRect(shirt.x, shirt.y, shirt.w, shirt.h);

      // Slight additional saturation boost
      ctx.globalCompositeOperation = 'saturation';
      ctx.globalAlpha = 0.25;
      ctx.fillStyle = fabric.color;
      ctx.fillRect(shirt.x, shirt.y, shirt.w, shirt.h);

      ctx.restore();

      // ── 4. Add fabric texture overlay ───────────────────────────────────
      ctx.save();
      roundedRect(ctx, shirt.x, shirt.y, shirt.w, shirt.h, 8);
      ctx.clip();
      const texPat = buildFabricTexture(ctx, fabric);
      if (texPat) {
        ctx.globalCompositeOperation = 'multiply';
        ctx.globalAlpha = 0.12;
        ctx.fillStyle = texPat;
        ctx.fillRect(shirt.x, shirt.y, shirt.w, shirt.h);
      }
      ctx.restore();

      // ── 5. RESTORE FACE — redraw original pixels over face region ───────
      if (faceBox) {
        const face = {
          x: pct(faceBox.left,  W), y: pct(faceBox.top,   H),
          w: pct(faceBox.right - faceBox.left, W),
          h: pct(faceBox.bottom - faceBox.top, H),
        };
        // Expand face box slightly for clean edges (10px padding)
        const pad = 12;
        const fx = Math.max(0, face.x - pad);
        const fy = Math.max(0, face.y - pad);
        const fw = Math.min(W - fx, face.w + pad * 2);
        const fh = Math.min(H - fy, face.h + pad * 2);

        ctx.save();
        // Use elliptical clip for face — matches head shape better
        ctx.beginPath();
        ctx.ellipse(fx + fw / 2, fy + fh / 2, fw / 2, fh / 2, 0, 0, Math.PI * 2);
        ctx.clip();
        // Restore ORIGINAL image pixels — this overwrites any fabric overlay
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;
        ctx.drawImage(img, 0, 0, W, H);
        ctx.restore();
      }

      // ── 6. RESTORE HANDS — redraw original pixels over hands region ──────
      if (handsBox) {
        const hands = {
          x: pct(handsBox.left,  W), y: pct(handsBox.top,   H),
          w: pct(handsBox.right - handsBox.left, W),
          h: pct(handsBox.bottom - handsBox.top, H),
        };
        ctx.save();
        roundedRect(ctx, hands.x, hands.y, hands.w, hands.h, 4);
        ctx.clip();
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;
        ctx.drawImage(img, 0, 0, W, H);
        ctx.restore();
      }

      resolve(canvas.toDataURL('image/jpeg', 0.95));
    };
    img.onerror = reject;
    img.src = imageDataUrl;
  });
}

function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function buildFabricTexture(ctx, fabric) {
  const size = 10;
  const off  = document.createElement('canvas');
  off.width  = size; off.height = size;
  const c    = off.getContext('2d');

  if (fabric.patternType === 'cotton') {
    c.fillStyle = 'rgba(0,0,0,0.3)';
    for (let i = 0; i < size; i += 3) { c.fillRect(i, 0, 1, size); c.fillRect(0, i, size, 1); }
  } else if (fabric.patternType === 'linen') {
    c.fillStyle = 'rgba(0,0,0,0.3)';
    [0, 3, 7].forEach(x => c.fillRect(x, 0, 1, size));
    c.fillStyle = 'rgba(255,255,255,0.15)';
    [0, 4, 8].forEach(y => c.fillRect(0, y, size, 1));
  } else if (fabric.patternType === 'silk') {
    c.strokeStyle = 'rgba(255,255,255,0.2)'; c.lineWidth = 1.5;
    for (let i = -size; i < size * 2; i += 4) {
      c.beginPath(); c.moveTo(i, 0); c.lineTo(i + size, size); c.stroke();
    }
  } else {
    // wool
    c.fillStyle = 'rgba(0,0,0,0.25)';
    for (let i = 0; i < size; i += 2) { c.fillRect(i % size, i, 1, 1); c.fillRect((i+1)%size, (i+2)%size, 1, 1); }
  }

  return ctx.createPattern(off, 'repeat');
}

// ─── Image resize ──────────────────────────────────────────────────────────────
const resizeImage = (dataUrl, maxW = 1280, maxH = 1600) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxW / img.width, maxH / img.height);
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      resolve({ dataUrl: canvas.toDataURL('image/jpeg', 0.93), width: w, height: h });
    };
    img.src = dataUrl;
  });

// ─────────────────────────────────────────────────────────────────────────────
export default function AITryOn() {
  const { openBooking } = useBooking();

  const [uploaded,   setUploaded]   = useState(null);
  const [selFabric,  setSelFabric]  = useState(FABRICS[0]);
  const [selVariant, setSelVariant] = useState(null);

  const [processing, setProcessing] = useState(false);
  const [stepIdx,    setStepIdx]    = useState(0);
  const [method,     setMethod]     = useState('');

  const [resultImg,   setResultImg]   = useState(null);
  const [fitAnalysis, setFitAnalysis] = useState('');
  const [styleAdvice, setStyleAdvice] = useState('');
  const [modelUsed,   setModelUsed]   = useState('');
  const [error,       setError]       = useState('');
  const [showOrig,    setShowOrig]    = useState(false);

  const fileRef   = useRef(null);
  const timerRef  = useRef(null);

  const fabric = selVariant
    ? { ...selFabric, color: selVariant.color, secondColor: selVariant.secondColor, name: `${selFabric.name} — ${selVariant.name}`, id: selVariant.id }
    : selFabric;

  // ── File upload ───────────────────────────────────────────────────────────────
  const handleFile = useCallback(async (file) => {
    if (!file?.type?.startsWith('image/')) { setError('Please upload a JPG, PNG, or WEBP image.'); return; }
    if (file.size > 10 * 1024 * 1024) { setError('Image too large — please use a file under 10 MB.'); return; }
    setError(''); setResultImg(null); setFitAnalysis(''); setStyleAdvice(''); setMethod('');
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const { dataUrl, width, height } = await resizeImage(ev.target.result);
      setUploaded({ dataUrl, width, height, name: file.name });
    };
    reader.readAsDataURL(file);
  }, []);

  const onFileChange = (e) => handleFile(e.target.files?.[0]);
  const onDrop = (e) => { e.preventDefault(); handleFile(e.dataTransfer.files?.[0]); };
  const onClear = (e) => {
    e.stopPropagation();
    setUploaded(null); setResultImg(null); setFitAnalysis(''); setStyleAdvice(''); setError(''); setMethod('');
    if (fileRef.current) fileRef.current.value = '';
  };

  // ── Generate ──────────────────────────────────────────────────────────────────
  const handleSynthesize = async () => {
    if (!uploaded) { setError('Please upload your photo first.'); return; }
    setProcessing(true); setStepIdx(0);
    setResultImg(null); setError(''); setFitAnalysis(''); setStyleAdvice(''); setMethod('');

    let s = 0;
    timerRef.current = setInterval(() => { s = Math.min(PROGRESS.length - 1, s + 1); setStepIdx(s); }, 4000);

    try {
      const res = await fetch('/api/tryon', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image:      uploaded.dataUrl,
          imageWidth: uploaded.width,
          imageHeight: uploaded.height,
          fabric: { id: fabric.id, name: fabric.name, color: fabric.color, secondColor: fabric.secondColor || fabric.color, patternType: fabric.patternType, origin: fabric.origin, weight: fabric.weight },
        }),
      });
      const data = await res.json();

      if (!data.success) { setError(data.message || 'AI generation failed. Please try again.'); return; }

      setFitAnalysis(data.fitAnalysis || '');
      setStyleAdvice(data.styleAdvice || '');
      setModelUsed(data.modelUsed || '');

      if (data.method === 'ai-image' && data.resultImage) {
        setResultImg(data.resultImage);
        setMethod('ai-image');

      } else if (data.method === 'canvas-composite' && data.shirtBox) {
        setStepIdx(2);
        const composited = await applyFabricComposite({
          imageDataUrl: uploaded.dataUrl,
          shirtBox:  data.shirtBox,
          faceBox:   data.faceBox,
          handsBox:  data.handsBox,
          fabric,
        });
        setResultImg(composited);
        setMethod('canvas-composite');
      } else {
        setError('Unexpected server response. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Network error. Please check your connection and try again.');
    } finally {
      clearInterval(timerRef.current);
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultImg) return;
    const a = document.createElement('a');
    a.href = resultImg; a.download = `tailors2u-tryon-${Date.now()}.jpg`; a.click();
  };

  const displayImg = showOrig ? uploaded?.dataUrl : (resultImg || uploaded?.dataUrl);

  // ─── Styles ───────────────────────────────────────────────────────────────────
  const css = `
    .tro{padding:2.8rem 1.4rem 5rem;max-width:1300px;margin:0 auto}
    .tro h1{font-size:clamp(1.9rem,4vw,3.1rem);font-weight:800;color:#1E2D27;letter-spacing:-.025em}
    .tro-sub{color:#4A5B55;font-size:1.05rem;line-height:1.65;max-width:610px;margin-top:.5rem}
    .tro-grid{display:grid;grid-template-columns:1fr 1.08fr;gap:2.2rem;margin-top:2.2rem;align-items:start}
    @media(max-width:880px){.tro-grid{grid-template-columns:1fr}}

    /* Preview */
    .tro-pv{background:#fff;border-radius:22px;box-shadow:0 4px 30px rgba(6,78,59,.09);overflow:hidden;position:sticky;top:88px}
    .tro-pvh{padding:1.1rem 1.4rem;border-bottom:1px solid #edeae4;display:flex;align-items:center;justify-content:space-between}
    .tro-pvt{font-weight:700;color:#1E2D27;font-size:.97rem}
    .tro-pill{font-size:.68rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;border-radius:999px;padding:3px 11px}
    .tro-pill-live{background:#e8f5ee;color:#064e3b}
    .tro-pill-ai{background:#064e3b;color:#a7f3d0}
    .tro-pill-cv{background:#e0e7ff;color:#3730a3}
    .tro-vp{position:relative;width:100%;aspect-ratio:3/4;background:#f7f3ed;display:flex;align-items:center;justify-content:center;overflow:hidden}
    .tro-vp img{width:100%;height:100%;object-fit:cover;transition:opacity .3s}
    .tro-empty{display:flex;flex-direction:column;align-items:center;gap:.7rem;text-align:center;padding:2rem}
    .tro-empty-icon{font-size:3.2rem;opacity:.3}
    .tro-empty-text{font-size:.92rem;color:#8a9a94;font-weight:500}

    /* Processing overlay */
    .tro-ov{position:absolute;inset:0;background:rgba(20,40,30,.84);backdrop-filter:blur(5px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.1rem;z-index:10}
    .tro-spin{width:50px;height:50px;border-radius:50%;border:3px solid rgba(255,255,255,.15);border-top-color:#6ee7b7;animation:spin .75s linear infinite}
    @keyframes spin{to{transform:rotate(360deg)}}
    .tro-si{font-size:1.7rem;animation:pulse 1.1s ease-in-out infinite}
    @keyframes pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.12);opacity:.75}}
    .tro-st{color:rgba(255,255,255,.88);font-size:.88rem;font-weight:500;text-align:center;max-width:210px}
    .tro-sl{color:#6ee7b7;font-size:.75rem;letter-spacing:.08em}
    .tro-hold{position:absolute;bottom:13px;right:13px;background:rgba(255,255,255,.9);backdrop-filter:blur(6px);border-radius:999px;padding:5px 13px;font-size:.73rem;font-weight:600;color:#1E2D27;box-shadow:0 2px 8px rgba(0,0,0,.12)}

    /* Compare bar */
    .tro-cbar{display:flex;align-items:center;gap:.8rem;padding:.75rem 1.2rem;background:#f9f7f2;border-top:1px solid #edeae4}
    .tro-cb{flex:1;padding:.5rem 0;border-radius:9px;font-size:.8rem;font-weight:700;cursor:pointer;border:none;transition:all .2s}
    .tro-cb-dl{background:#064e3b;color:#fff}.tro-cb-dl:hover{background:#053d2f}
    .tro-cb-bfr{background:transparent;color:#4A5B55;border:1.5px solid #c8c0b4}.tro-cb-bfr:hover{border-color:#064e3b;color:#064e3b}
    .tro-cb:disabled{opacity:.4;cursor:not-allowed}
    .tro-cbar-hint{font-size:.78rem;color:#8a9a94;width:100%;text-align:center}

    /* Error */
    .tro-err{margin:.7rem 1.1rem;padding:.7rem 1rem;background:#fff1f0;border:1px solid #fecaca;border-radius:10px;color:#991b1b;font-size:.83rem;font-weight:500;display:flex;gap:.5rem;align-items:flex-start}

    /* Controls */
    .tro-cols{display:flex;flex-direction:column;gap:1.6rem}
    .tro-card{background:#fff;border-radius:18px;box-shadow:0 2px 14px rgba(6,78,59,.06);overflow:hidden}
    .tro-ch{padding:1rem 1.3rem;border-bottom:1px solid #f0ece6;display:flex;align-items:center;gap:.8rem}
    .tro-num{width:28px;height:28px;border-radius:50%;background:#064e3b;color:#fff;font-size:.75rem;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .tro-num-ok{background:#10b981}
    .tro-ct{font-weight:700;font-size:.95rem;color:#1E2D27}
    .tro-cs{font-size:.77rem;color:#8a9a94;margin-top:1px}
    .tro-cb2{padding:1.1rem 1.3rem}

    /* Upload */
    .tro-up{border:2px dashed #c8c0b4;border-radius:13px;cursor:pointer;transition:all .22s;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.55rem;min-height:95px;padding:1.2rem;text-align:center}
    .tro-up:hover{border-color:#064e3b;background:#f2faf6}
    .tro-up-ok{display:flex;align-items:center;gap:.55rem}
    .tro-up-check{color:#10b981;font-size:1.1rem}
    .tro-up-name{font-size:.84rem;font-weight:600;color:#1E2D27}
    .tro-up-rm{font-size:.73rem;color:#dc2626;cursor:pointer;text-decoration:underline;margin-left:.3rem}
    .tro-up-icon{font-size:1.7rem}
    .tro-up-lbl{font-size:.86rem;font-weight:600;color:#064e3b}
    .tro-up-hint{font-size:.73rem;color:#8a9a94}

    /* Fabric grid */
    .tro-fg{display:grid;grid-template-columns:1fr 1fr;gap:.65rem}
    .tro-fb{border:2px solid #edeae4;border-radius:12px;padding:.75rem .85rem;cursor:pointer;background:#fff;text-align:left;transition:all .2s;position:relative;overflow:hidden}
    .tro-fb:hover{border-color:#064e3b;transform:translateY(-1px);box-shadow:0 4px 12px rgba(6,78,59,.11)}
    .tro-fb.active{border-color:#064e3b;background:#f0faf5;box-shadow:0 0 0 3px rgba(6,78,59,.1)}
    .tro-fs{width:100%;height:26px;border-radius:6px;margin-bottom:.5rem;border:1px solid rgba(0,0,0,.08)}
    .tro-fn{font-size:.78rem;font-weight:700;color:#1E2D27;line-height:1.2}
    .tro-fm{font-size:.7rem;color:#8a9a94;margin-top:2px}
    .tro-fbadge{position:absolute;top:5px;right:5px;font-size:.58rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;padding:2px 6px;border-radius:999px;background:#064e3b;color:#fff}

    /* Variants */
    .tro-vars{display:flex;flex-wrap:wrap;gap:.35rem;margin-top:.8rem}
    .tro-var-lbl{width:100%;font-size:.7rem;font-weight:700;color:#8a9a94;margin-bottom:.15rem;letter-spacing:.06em;text-transform:uppercase}
    .tro-vr{display:flex;align-items:center;gap:.3rem;padding:.26rem .65rem;border-radius:999px;border:1.5px solid #c8c0b4;cursor:pointer;font-size:.7rem;font-weight:600;background:#fff;transition:all .18s}
    .tro-vr:hover{border-color:#064e3b}
    .tro-vr.active{border-color:#064e3b;background:#064e3b;color:#fff}
    .tro-vr-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0;border:1px solid rgba(0,0,0,.12)}

    /* Buttons */
    .tro-bprim{width:100%;padding:.92rem;border:none;border-radius:13px;cursor:pointer;background:linear-gradient(135deg,#064e3b,#0b7a5a);color:#fff;font-size:.94rem;font-weight:700;transition:all .22s;display:flex;align-items:center;justify-content:center;gap:.45rem}
    .tro-bprim:hover:not(:disabled){background:linear-gradient(135deg,#053d2f,#09694c);transform:translateY(-1px);box-shadow:0 6px 18px rgba(6,78,59,.28)}
    .tro-bprim:disabled{opacity:.5;cursor:not-allowed;transform:none}
    .tro-bout{width:100%;padding:.8rem;border:2px solid #064e3b;border-radius:13px;cursor:pointer;background:transparent;color:#064e3b;font-size:.88rem;font-weight:600;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:.45rem}
    .tro-bout:hover{background:#f0faf5}
    .tro-bghost{width:100%;padding:.75rem;border:1.5px solid #c8c0b4;border-radius:13px;cursor:pointer;background:transparent;color:#4A5B55;font-size:.86rem;font-weight:600;transition:all .18s;display:flex;align-items:center;justify-content:center;gap:.45rem}
    .tro-bghost:hover{border-color:#064e3b;color:#064e3b}
    .tro-acts{display:flex;flex-direction:column;gap:.65rem}
    .tro-hint{font-size:.75rem;color:#8a9a94;text-align:center;margin-top:.5rem}

    /* Analysis */
    .tro-an{background:#fff;border-radius:18px;box-shadow:0 2px 14px rgba(6,78,59,.06);padding:1.3rem}
    .tro-ant{font-weight:700;font-size:.93rem;color:#1E2D27;margin-bottom:.9rem;display:flex;align-items:center;gap:.4rem}
    .tro-anl{font-size:.7rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#064e3b;margin-bottom:.35rem}
    .tro-anx{font-size:.83rem;color:#4A5B55;line-height:1.62;margin-bottom:.9rem}
    .tro-mod{display:inline-flex;align-items:center;gap:.3rem;font-size:.68rem;color:#8a9a94;background:#f5f0ea;border-radius:6px;padding:2px 7px}
    .tro-meth{display:inline-flex;align-items:center;gap:.3rem;font-size:.68rem;border-radius:6px;padding:2px 8px;margin-left:6px}
    .tro-meth-ai{background:#d1fae5;color:#065f46}
    .tro-meth-cv{background:#e0e7ff;color:#3730a3}
  `;

  return (
    <div className="porcelain-theme">
      <style>{css}</style>
      <div className="tro">
        <h1>Sartorial AI Try-On</h1>
        <p className="tro-sub">
          Upload your photo, select a fabric — Gemini AI maps the new fabric to your shirt while keeping your face, hands, and background completely untouched.
        </p>

        <div className="tro-grid">

          {/* ── Preview ─────────────────────────────────────────────────── */}
          <div>
            <div className="tro-pv">
              <div className="tro-pvh">
                <span className="tro-pvt">Virtual Fitting Room</span>
                {!resultImg && <span className="tro-pill tro-pill-live">Live Preview</span>}
                {resultImg && method === 'ai-image'         && <span className="tro-pill tro-pill-ai">✨ Full AI</span>}
                {resultImg && method === 'canvas-composite' && <span className="tro-pill tro-pill-cv">🎨 Composited</span>}
              </div>

              <div className="tro-vp">
                {!uploaded && (
                  <div className="tro-empty">
                    <div className="tro-empty-icon">👔</div>
                    <div className="tro-empty-text">Upload your photo<br/>to begin the virtual try-on</div>
                  </div>
                )}
                {uploaded && <img src={displayImg} alt="Try-on preview" style={{ opacity: processing ? 0.2 : 1 }} />}

                {processing && (
                  <div className="tro-ov">
                    <div className="tro-spin" />
                    <div className="tro-si">{PROGRESS[stepIdx].icon}</div>
                    <div className="tro-st">{PROGRESS[stepIdx].text}</div>
                    <div className="tro-sl">Gemini AI · Canvas Engine</div>
                  </div>
                )}
                {resultImg && !processing && <div className="tro-hold">👁 Hold to compare</div>}
              </div>

              {uploaded && (
                <div className="tro-cbar">
                  {resultImg ? (
                    <>
                      <button className="tro-cb tro-cb-bfr" disabled={processing}
                        onMouseDown={() => setShowOrig(true)} onMouseUp={() => setShowOrig(false)}
                        onMouseLeave={() => setShowOrig(false)} onTouchStart={() => setShowOrig(true)} onTouchEnd={() => setShowOrig(false)}>
                        Before
                      </button>
                      <button className="tro-cb tro-cb-dl" onClick={handleDownload} disabled={processing}>
                        ⬇ Download
                      </button>
                    </>
                  ) : (
                    <span className="tro-cbar-hint">Click "Generate" to see your result →</span>
                  )}
                </div>
              )}

              {error && <div className="tro-err"><span>⚠️</span><span>{error}</span></div>}
            </div>
          </div>

          {/* ── Controls ─────────────────────────────────────────────────── */}
          <div className="tro-cols">

            {/* Step 1 */}
            <div className="tro-card">
              <div className="tro-ch">
                <span className={`tro-num ${uploaded ? 'tro-num-ok' : ''}`}>{uploaded ? '✓' : '1'}</span>
                <div><div className="tro-ct">Upload Your Photo</div><div className="tro-cs">Clear, front-facing portrait or full-body photo works best.</div></div>
              </div>
              <div className="tro-cb2">
                <input ref={fileRef} type="file" accept="image/*" onChange={onFileChange} style={{ display: 'none' }} />
                <div className="tro-up" onClick={() => fileRef.current?.click()} onDrop={onDrop} onDragOver={e => e.preventDefault()}>
                  {uploaded ? (
                    <div className="tro-up-ok">
                      <span className="tro-up-check">✓</span>
                      <span className="tro-up-name">{uploaded.name}</span>
                      <span className="tro-up-rm" onClick={onClear}>Remove</span>
                    </div>
                  ) : (
                    <><div className="tro-up-icon">📸</div><div className="tro-up-lbl">Click to upload or drag & drop</div><div className="tro-up-hint">JPG, PNG, WEBP — up to 20 MB</div></>
                  )}
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="tro-card">
              <div className="tro-ch">
                <span className="tro-num" style={{ background: '#10b981' }}>2</span>
                <div><div className="tro-ct">Select Fabric</div><div className="tro-cs">Premium mill-imported fabrics with accurate colour rendering.</div></div>
              </div>
              <div className="tro-cb2">
                <div className="tro-fg">
                  {FABRICS.map(f => (
                    <button key={f.id} className={`tro-fb ${selFabric.id === f.id ? 'active' : ''}`}
                      onClick={() => { setSelFabric(f); setSelVariant(null); setResultImg(null); setError(''); }}>
                      {f.badge && <span className="tro-fbadge">{f.badge}</span>}
                      <div className="tro-fs" style={{ backgroundColor: f.color }} />
                      <div className="tro-fn">{f.name}</div>
                      <div className="tro-fm">{f.origin} · {f.weight}</div>
                    </button>
                  ))}
                </div>
                {selFabric.variants && (
                  <div className="tro-vars">
                    <div className="tro-var-lbl">Colour Variant</div>
                    {selFabric.variants.map(v => (
                      <button key={v.id} className={`tro-vr ${selVariant?.id === v.id ? 'active' : ''}`}
                        onClick={() => { setSelVariant(selVariant?.id === v.id ? null : v); setResultImg(null); }}>
                        <span className="tro-vr-dot" style={{ background: v.color }} />{v.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Step 3 */}
            <div className="tro-card">
              <div className="tro-ch">
                <span className="tro-num">3</span>
                <div><div className="tro-ct">Generate AI Try-On</div><div className="tro-cs">Gemini maps the fabric to your garment silhouette precisely.</div></div>
              </div>
              <div className="tro-cb2">
                <div className="tro-acts">
                  <button className="tro-bprim" onClick={handleSynthesize} disabled={processing || !uploaded}>
                    {processing ? <><span>⏳</span>Processing…</> : resultImg ? <><span>🔄</span>Regenerate</> : <><span>✨</span>Generate AI Try-On</>}
                  </button>
                  {resultImg && <>
                    <button className="tro-bout" onClick={handleDownload}><span>⬇️</span>Download Result</button>
                    <button className="tro-bghost" onClick={() => openBooking(`Custom Tailoring — ${fabric.name}`)}>📅 Book Fitting for This Look</button>
                  </>}
                </div>
                {!uploaded && <p className="tro-hint">Upload your photo in Step 1 to enable generation.</p>}
              </div>
            </div>

            {/* Analysis */}
            {(fitAnalysis || styleAdvice) && (
              <div className="tro-an">
                <div className="tro-ant">✦ Gemini Sartorial Analysis</div>
                {fitAnalysis && <><div className="tro-anl">Fit & Posture</div><div className="tro-anx">{fitAnalysis}</div></>}
                {styleAdvice && <><div className="tro-anl">Styling Advice</div><div className="tro-anx">{styleAdvice}</div></>}
                <div>
                  {modelUsed && <span className="tro-mod">🤖 {modelUsed}</span>}
                  {method === 'ai-image'         && <span className="tro-meth tro-meth-ai">✨ Full AI Image</span>}
                  {method === 'canvas-composite' && <span className="tro-meth tro-meth-cv">🎨 AI + Canvas</span>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
