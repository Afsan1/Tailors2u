'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useBooking } from '../../components/ClientLayoutWrapper';

const FABRICS_DATA = [
  {
    id: 'f1',
    name: 'Giza Egyptian Cotton',
    category: 'cotton',
    subCategory: 'pure-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_cotton/natural_1.png',
    desc: 'The gold standard of shirting. Long-staple Egyptian cotton fibers yield an incredibly soft hand-feel and beautiful natural luster.',
    origin: 'Egypt',
    weight: '110 gsm',
    threadCount: '120s Double Ply',
    breathability: 'Excellent',
    badge: 'Best Seller',
    variants: [
      { id: 'f1_v1', name: 'Texture View 1', colorHex: '#dfd7c6', image: '/pure_cotton/natural_1.png' },
      { id: 'f1_v2', name: 'Texture View 2', colorHex: '#cfc4b0', image: '/pure_cotton/natural_2.png' }
    ]
  },
  {
    id: 'egc_blue',
    name: 'Blue Pure Egyptian Giza Cotton',
    category: 'cotton',
    subCategory: 'pure-egyptian-giza-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_egyptian_giza_cotton/Blue giza cotton fabric 1.png',
    desc: 'Luminous sky-blue Pure Egyptian Giza Cotton woven from extra-long staple Giza fibers. Delivers ultra-soft hand-feel, rich color depth, and crisp formal drape.',
    origin: 'Egypt (Giza Valley)',
    weight: '120 gsm',
    threadCount: '160s Double Ply Giza',
    breathability: 'Outstanding',
    badge: 'Pure Giza Luxury',
    variants: [
      { id: 'egc_blue_v1', name: 'Texture View 1', colorHex: '#4b7bb0', image: '/pure_egyptian_giza_cotton/Blue giza cotton fabric 1.png' },
      { id: 'egc_blue_v2', name: 'Texture View 2', colorHex: '#3a6696', image: '/pure_egyptian_giza_cotton/Blue giza cotton fabric 2.png' }
    ]
  },
  {
    id: 'egc_cream',
    name: 'Cream Pure Egyptian Giza Cotton',
    category: 'cotton',
    subCategory: 'pure-egyptian-giza-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_egyptian_giza_cotton/Cream giza cotton 1.png',
    desc: 'Warm buttery cream Pure Egyptian Giza Cotton with a subtle silky luster. Unrivalled smoothness and breathable luxury for bespoke executive shirting.',
    origin: 'Egypt (Giza Valley)',
    weight: '115 gsm',
    threadCount: '160s Extra-Long Staple Giza',
    breathability: 'Outstanding',
    badge: 'Pure Giza Luxury',
    variants: [
      { id: 'egc_cream_v1', name: 'Texture View 1', colorHex: '#ece3d2', image: '/pure_egyptian_giza_cotton/Cream giza cotton 1.png' },
      { id: 'egc_cream_v2', name: 'Texture View 2', colorHex: '#dfd4bf', image: '/pure_egyptian_giza_cotton/Cream giza cotton 2.png' }
    ]
  },
  {
    id: 'egc_forest_green',
    name: 'Forest Green Pure Egyptian Giza Cotton',
    category: 'cotton',
    subCategory: 'pure-egyptian-giza-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_egyptian_giza_cotton/forest green giza cotton 1.png',
    desc: 'Deep regal forest green Giza cotton featuring opulent botanical depth, silky soft texture, and durable color vibrancy for statement shirts & kurtas.',
    origin: 'Egypt (Giza Valley)',
    weight: '125 gsm',
    threadCount: '140s Double Ply Giza',
    breathability: 'Excellent',
    badge: 'Pure Giza Luxury',
    variants: [
      { id: 'egc_fg_v1', name: 'Texture View 1', colorHex: '#264230', image: '/pure_egyptian_giza_cotton/forest green giza cotton 1.png' },
      { id: 'egc_fg_v2', name: 'Texture View 2', colorHex: '#1b3323', image: '/pure_egyptian_giza_cotton/forest green giza cotton 2.png' }
    ]
  },
  {
    id: 'egc_mauve',
    name: 'Mauve Pure Egyptian Giza Cotton',
    category: 'cotton',
    subCategory: 'pure-egyptian-giza-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_egyptian_giza_cotton/Mauve giza cotton 1.png',
    desc: 'Sophisticated dusty mauve pink Pure Egyptian Giza Cotton. Offers a refined pastel undertone with silky smoothness and airy year-round comfort.',
    origin: 'Egypt (Giza Valley)',
    weight: '120 gsm',
    threadCount: '160s Double Ply Giza',
    breathability: 'Outstanding',
    badge: 'Pure Giza Luxury',
    variants: [
      { id: 'egc_mauve_v1', name: 'Texture View 1', colorHex: '#9b7685', image: '/pure_egyptian_giza_cotton/Mauve giza cotton 1.png' },
      { id: 'egc_mauve_v2', name: 'Texture View 2', colorHex: '#886372', image: '/pure_egyptian_giza_cotton/Mauve giza cotton 2.png' }
    ]
  },
  {
    id: 'egc_olive_green',
    name: 'Olive Green Pure Egyptian Giza Cotton',
    category: 'cotton',
    subCategory: 'pure-egyptian-giza-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_egyptian_giza_cotton/olive green giza cotton 1.png',
    desc: 'Distinguished earthy olive green Giza cotton. Fine compact weave delivering a soft hand-feel, subtle sheen, and effortless smart-casual charm.',
    origin: 'Egypt (Giza Valley)',
    weight: '125 gsm',
    threadCount: '140s Double Ply Giza',
    breathability: 'Excellent',
    badge: 'Pure Giza Luxury',
    variants: [
      { id: 'egc_og_v1', name: 'Texture View 1', colorHex: '#525d3f', image: '/pure_egyptian_giza_cotton/olive green giza cotton 1.png' },
      { id: 'egc_og_v2', name: 'Texture View 2', colorHex: '#414b30', image: '/pure_egyptian_giza_cotton/olive green giza cotton 2.png' }
    ]
  },
  {
    id: 'egc_stone_beige',
    name: 'Stone Beige Pure Egyptian Giza Cotton',
    category: 'cotton',
    subCategory: 'pure-egyptian-giza-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_egyptian_giza_cotton/stone beige giza fabric 1.png',
    desc: 'Neutral stone beige Pure Egyptian Giza Cotton woven with ultra-fine yarns for a clean, understated luxury look and smooth tailored silhouette.',
    origin: 'Egypt (Giza Valley)',
    weight: '120 gsm',
    threadCount: '160s Double Ply Giza',
    breathability: 'Outstanding',
    badge: 'Pure Giza Luxury',
    variants: [
      { id: 'egc_sb_v1', name: 'Texture View 1', colorHex: '#c2b39e', image: '/pure_egyptian_giza_cotton/stone beige giza fabric 1.png' },
      { id: 'egc_sb_v2', name: 'Texture View 2', colorHex: '#afa08b', image: '/pure_egyptian_giza_cotton/stone beige giza fabric 2.png' }
    ]
  },
  {
    id: 'egc_terracotta',
    name: 'Terracotta Pure Egyptian Giza Cotton',
    category: 'cotton',
    subCategory: 'pure-egyptian-giza-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_egyptian_giza_cotton/Terracotta giza cotton 1.png',
    desc: 'Vibrant Mediterranean terracotta rust Giza cotton. Features long-staple Egyptian cotton strength, rich warmth, and plush breathability.',
    origin: 'Egypt (Giza Valley)',
    weight: '125 gsm',
    threadCount: '140s Double Ply Giza',
    breathability: 'Excellent',
    badge: 'Pure Giza Luxury',
    variants: [
      { id: 'egc_tc_v1', name: 'Texture View 1', colorHex: '#b85c44', image: '/pure_egyptian_giza_cotton/Terracotta giza cotton 1.png' },
      { id: 'egc_tc_v2', name: 'Texture View 2', colorHex: '#a34a33', image: '/pure_egyptian_giza_cotton/Terracotta giza cotton 2.png' }
    ]
  },
  {
    id: 'egc_warm_taupe',
    name: 'Warm Taupe Pure Egyptian Giza Cotton',
    category: 'cotton',
    subCategory: 'pure-egyptian-giza-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_egyptian_giza_cotton/warm taupe giza cotton 1.png',
    desc: 'Sophisticated warm taupe grey-brown Giza cotton with a smooth silky finish. Perfect for versatile bespoke shirting and modern formal wear.',
    origin: 'Egypt (Giza Valley)',
    weight: '120 gsm',
    threadCount: '160s Double Ply Giza',
    breathability: 'Outstanding',
    badge: 'Pure Giza Luxury',
    variants: [
      { id: 'egc_wt_v1', name: 'Texture View 1', colorHex: '#8e7f74', image: '/pure_egyptian_giza_cotton/warm taupe giza cotton 1.png' },
      { id: 'egc_wt_v2', name: 'Texture View 2', colorHex: '#796c62', image: '/pure_egyptian_giza_cotton/Warm taupe giza cotton 2.png' }
    ]
  },
  {
    id: 'egc_white',
    name: 'Pristine White Pure Egyptian Giza Cotton',
    category: 'cotton',
    subCategory: 'pure-egyptian-giza-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_egyptian_giza_cotton/White giza cotton 1.png',
    desc: 'Quintessential pristine white Pure Egyptian Giza Cotton. The pinnacle of luxury shirting with exceptional softness, natural sheen, and crisp elegance.',
    origin: 'Egypt (Giza Valley)',
    weight: '115 gsm',
    threadCount: '180s Ultra-Fine Giza',
    breathability: 'Outstanding',
    badge: 'Pure Giza Flagship',
    variants: [
      { id: 'egc_w_v1', name: 'Texture View 1', colorHex: '#fcfcfc', image: '/pure_egyptian_giza_cotton/White giza cotton 1.png' },
      { id: 'egc_w_v2', name: 'Texture View 2', colorHex: '#f2f2f2', image: '/pure_egyptian_giza_cotton/White giza cotton 2.png' }
    ]
  },
  {
    id: 'egc_mustard',
    name: 'Mustard Pure Egyptian Giza Cotton',
    category: 'cotton',
    subCategory: 'pure-egyptian-giza-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_egyptian_giza_cotton/Mustard giza cotton fabric 1.png',
    desc: 'Vibrant warm mustard golden Pure Egyptian Giza Cotton. Features extra-long staple yarns with rich seasonal warmth, silky soft hand-feel, and breathable comfort.',
    origin: 'Egypt (Giza Valley)',
    weight: '120 gsm',
    threadCount: '160s Double Ply Giza',
    breathability: 'Outstanding',
    badge: 'Pure Giza Luxury',
    variants: [
      { id: 'egc_mus_v1', name: 'Texture View 1', colorHex: '#d49b29', image: '/pure_egyptian_giza_cotton/Mustard giza cotton fabric 1.png' },
      { id: 'egc_mus_v2', name: 'Texture View 2', colorHex: '#bd871f', image: '/pure_egyptian_giza_cotton/Mustard giza cotton fabric 2.png' }
    ]
  },
  {
    id: 'egc_slate_blue',
    name: 'Slate Blue Pure Egyptian Giza Cotton',
    category: 'cotton',
    subCategory: 'pure-egyptian-giza-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_egyptian_giza_cotton/Slate blue giza cotton 1.png',
    desc: 'Sophisticated cool slate blue Pure Egyptian Giza Cotton. Delivers smooth executive luster, crisp drape, and exceptional year-round comfort for bespoke shirting.',
    origin: 'Egypt (Giza Valley)',
    weight: '120 gsm',
    threadCount: '160s Double Ply Giza',
    breathability: 'Outstanding',
    badge: 'Pure Giza Luxury',
    variants: [
      { id: 'egc_sbl_v1', name: 'Texture View 1', colorHex: '#506b7d', image: '/pure_egyptian_giza_cotton/Slate blue giza cotton 1.png' },
      { id: 'egc_sbl_v2', name: 'Texture View 2', colorHex: '#405666', image: '/pure_egyptian_giza_cotton/Slate blue giza cotton 2.png' }
    ]
  },
  {
    id: 'egc_beige',
    name: 'Beige Pure Egyptian Giza Cotton',
    category: 'cotton',
    subCategory: 'pure-egyptian-giza-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_egyptian_giza_cotton/Beige giza cotton 1.png',
    desc: 'Light warm beige Pure Egyptian Giza Cotton with a subtle silky sheen. Silky smooth texture and superior breathability for bespoke shirting.',
    origin: 'Egypt (Giza Valley)',
    weight: '120 gsm',
    threadCount: '160s Double Ply Giza',
    breathability: 'Outstanding',
    badge: 'Pure Giza Luxury',
    variants: [
      { id: 'egc_bge_v1', name: 'Texture View 1', colorHex: '#d4c4b0', image: '/pure_egyptian_giza_cotton/Beige giza cotton 1.png' },
      { id: 'egc_bge_v2', name: 'Texture View 2', colorHex: '#c2b09a', image: '/pure_egyptian_giza_cotton/Beige giza cotton 2.png' }
    ]
  },
  {
    id: 'egc_camel',
    name: 'Camel Pure Egyptian Giza Cotton',
    category: 'cotton',
    subCategory: 'pure-egyptian-giza-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_egyptian_giza_cotton/Camel giza cotton fabric 1.png',
    desc: 'Rich golden camel tan Pure Egyptian Giza Cotton. Offers luxurious warmth, long-staple durability, and soft tailored drape.',
    origin: 'Egypt (Giza Valley)',
    weight: '125 gsm',
    threadCount: '160s Double Ply Giza',
    breathability: 'Outstanding',
    badge: 'Pure Giza Luxury',
    variants: [
      { id: 'egc_cam_v1', name: 'Texture View 1', colorHex: '#b89768', image: '/pure_egyptian_giza_cotton/Camel giza cotton fabric 1.png' },
      { id: 'egc_cam_v2', name: 'Texture View 2', colorHex: '#a48455', image: '/pure_egyptian_giza_cotton/Camel giza cotton fabric 2.png' }
    ]
  },
  {
    id: 'egc_dusty_mauve',
    name: 'Dusty Mauve Pure Egyptian Giza Cotton',
    category: 'cotton',
    subCategory: 'pure-egyptian-giza-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_egyptian_giza_cotton/Dusty Mauve giza cotton 1.png',
    desc: 'Elegant dusty mauve pink Pure Egyptian Giza Cotton woven from fine Giza yarns for a clean vintage pastel aesthetic.',
    origin: 'Egypt (Giza Valley)',
    weight: '120 gsm',
    threadCount: '160s Double Ply Giza',
    breathability: 'Outstanding',
    badge: 'Pure Giza Luxury',
    variants: [
      { id: 'egc_dmv_v1', name: 'Texture View 1', colorHex: '#9e7b86', image: '/pure_egyptian_giza_cotton/Dusty Mauve giza cotton 1.png' },
      { id: 'egc_dmv_v2', name: 'Texture View 2', colorHex: '#8b6974', image: '/pure_egyptian_giza_cotton/Dusty Mauve giza cotton 2.png' }
    ]
  },
  {
    id: 'egc_lavender',
    name: 'Soft Lavender Pure Egyptian Giza Cotton',
    category: 'cotton',
    subCategory: 'pure-egyptian-giza-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_egyptian_giza_cotton/Lavender giza cotton 1.png',
    desc: 'Delicate soft lavender purple Pure Egyptian Giza Cotton with a light-catching luster and plush hand-feel for smart-casual wear.',
    origin: 'Egypt (Giza Valley)',
    weight: '115 gsm',
    threadCount: '160s Double Ply Giza',
    breathability: 'Outstanding',
    badge: 'Pure Giza Luxury',
    variants: [
      { id: 'egc_lvd_v1', name: 'Texture View 1', colorHex: '#a295b8', image: '/pure_egyptian_giza_cotton/Lavender giza cotton 1.png' },
      { id: 'egc_lvd_v2', name: 'Texture View 2', colorHex: '#8e81a3', image: '/pure_egyptian_giza_cotton/Lavender giza cotton 2.png' }
    ]
  },
  {
    id: 'egc_mushroom',
    name: 'Mushroom Brown Pure Egyptian Giza Cotton',
    category: 'cotton',
    subCategory: 'pure-egyptian-giza-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_egyptian_giza_cotton/Mushroom brown giza cotton 1.png',
    desc: 'Earthy mushroom taupe brown Giza cotton woven with ultra-fine double ply threads for sophisticated modern tailoring.',
    origin: 'Egypt (Giza Valley)',
    weight: '125 gsm',
    threadCount: '160s Double Ply Giza',
    breathability: 'Outstanding',
    badge: 'Pure Giza Luxury',
    variants: [
      { id: 'egc_msh_v1', name: 'Texture View 1', colorHex: '#7a685b', image: '/pure_egyptian_giza_cotton/Mushroom brown giza cotton 1.png' },
      { id: 'egc_msh_v2', name: 'Texture View 2', colorHex: '#68574b', image: '/pure_egyptian_giza_cotton/Mushroom brown giza cotton 2.png' }
    ]
  },
  {
    id: 'egc_rust',
    name: 'Rust Pure Egyptian Giza Cotton',
    category: 'cotton',
    subCategory: 'pure-egyptian-giza-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_egyptian_giza_cotton/Rust giza cotton 1.png',
    desc: 'Rich burnt rust orange Pure Egyptian Giza Cotton. Features intense yarn-dyed color depth, silky soft touch, and crisp structure.',
    origin: 'Egypt (Giza Valley)',
    weight: '125 gsm',
    threadCount: '140s Double Ply Giza',
    breathability: 'Excellent',
    badge: 'Pure Giza Luxury',
    variants: [
      { id: 'egc_rst_v1', name: 'Texture View 1', colorHex: '#b04e38', image: '/pure_egyptian_giza_cotton/Rust giza cotton 1.png' },
      { id: 'egc_rst_v2', name: 'Texture View 2', colorHex: '#993f2c', image: '/pure_egyptian_giza_cotton/Rust giza cotton 2.png' }
    ]
  },
  {
    id: 'egc_steel_blue',
    name: 'Steel Blue Pure Egyptian Giza Cotton',
    category: 'cotton',
    subCategory: 'pure-egyptian-giza-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_egyptian_giza_cotton/Steel blue giza cotton 1.png',
    desc: 'Slate steel blue Pure Egyptian Giza Cotton combining subtle metallic sheen with breathable long-staple cotton luxury.',
    origin: 'Egypt (Giza Valley)',
    weight: '120 gsm',
    threadCount: '160s Double Ply Giza',
    breathability: 'Outstanding',
    badge: 'Pure Giza Luxury',
    variants: [
      { id: 'egc_stb_v1', name: 'Texture View 1', colorHex: '#506b7d', image: '/pure_egyptian_giza_cotton/Steel blue giza cotton 1.png' },
      { id: 'egc_stb_v2', name: 'Texture View 2', colorHex: '#405666', image: '/pure_egyptian_giza_cotton/Steel blue giza cotton 2.png' }
    ]
  },
  {
    id: 'egc_teal',
    name: 'Teal Pure Egyptian Giza Cotton',
    category: 'cotton',
    subCategory: 'pure-egyptian-giza-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_egyptian_giza_cotton/Teal giza cotton fabric 1.png',
    desc: 'Striking deep teal blue-green Giza cotton with a radiant luster, smooth hand-feel, and exceptional color retention.',
    origin: 'Egypt (Giza Valley)',
    weight: '120 gsm',
    threadCount: '160s Double Ply Giza',
    breathability: 'Outstanding',
    badge: 'Pure Giza Luxury',
    variants: [
      { id: 'egc_tel_v1', name: 'Texture View 1', colorHex: '#25636b', image: '/pure_egyptian_giza_cotton/Teal giza cotton fabric 1.png' },
      { id: 'egc_tel_v2', name: 'Texture View 2', colorHex: '#1b4d54', image: '/pure_egyptian_giza_cotton/Teal giza cotton fabric 2.png' }
    ]
  },
  {
    id: 'egc_soft_sage',
    name: 'Soft Sage Green Pure Egyptian Giza Cotton',
    category: 'cotton',
    subCategory: 'pure-egyptian-giza-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_egyptian_giza_cotton/soft sage giza cotton fabric 1.png',
    desc: 'Refreshing soft sage mint green Pure Egyptian Giza Cotton offering a cooling hand-feel and elegant pastel tone.',
    origin: 'Egypt (Giza Valley)',
    weight: '115 gsm',
    threadCount: '160s Double Ply Giza',
    breathability: 'Outstanding',
    badge: 'Pure Giza Luxury',
    variants: [
      { id: 'egc_ssg_v1', name: 'Texture View 1', colorHex: '#84a991', image: '/pure_egyptian_giza_cotton/soft sage giza cotton fabric 1.png' },
      { id: 'egc_ssg_v2', name: 'Texture View 2', colorHex: '#71967e', image: '/pure_egyptian_giza_cotton/soft sage giza cotton fabric 2.png' }
    ]
  },
  {
    id: 'f2',
    name: 'Supima Luxury Cotton',
    category: 'cotton',
    subCategory: 'pure-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_cotton/blue_1.png',
    desc: 'Twice as strong as regular cotton, Supima is resilient, retains color exceptionally well, and becomes softer with each wash.',
    origin: 'USA',
    weight: '125 gsm',
    threadCount: '100s Double Ply',
    breathability: 'High',
    badge: 'Premium Fit',
    variants: [
      { id: 'f2_v1', name: 'Texture View 1', colorHex: '#3b719f', image: '/pure_cotton/blue_1.png' },
      { id: 'f2_v2', name: 'Texture View 2', colorHex: '#2d5b83', image: '/pure_cotton/blue_2.png' }
    ]
  },
  {
    id: 'pc_burgundy',
    name: 'Burgundy Pure Cotton',
    category: 'cotton',
    subCategory: 'pure-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_cotton/burgundy_1.png',
    desc: 'Deep burgundy wine pure cotton with a velvety-soft touch, high color retention, and rich warmth for formal shirting and festive kurtas.',
    origin: 'Italy',
    weight: '125 gsm',
    threadCount: '100s Double Ply Pure Cotton',
    breathability: 'High',
    badge: 'Signature Grade',
    variants: [
      { id: 'pc_bg_v1', name: 'Texture View 1', colorHex: '#6b2128', image: '/pure_cotton/burgundy_1.png' },
      { id: 'pc_bg_v2', name: 'Texture View 2', colorHex: '#54191f', image: '/pure_cotton/burgundy_2.png' }
    ]
  },
  {
    id: 'pc_dusty_cornflower',
    name: 'Dusty Cornflower Blue Pure Cotton',
    category: 'cotton',
    subCategory: 'pure-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_cotton/dusty_cornflower_blue_1.png',
    desc: 'Soft pastel dusty cornflower blue fine cotton weave delivering cool summer comfort, ultra-smooth drape, and effortless smart-casual charm.',
    origin: 'USA',
    weight: '115 gsm',
    threadCount: '120s Compact Supima Cotton',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'pc_cb_v1', name: 'Texture View 1', colorHex: '#6082a6', image: '/pure_cotton/dusty_cornflower_blue_1.png' },
      { id: 'pc_cb_v2', name: 'Texture View 2', colorHex: '#4d6c8e', image: '/pure_cotton/dusty_cornflower_blue_2.png' }
    ]
  },
  {
    id: 'pc_khaki',
    name: 'Khaki Pure Cotton',
    category: 'cotton',
    subCategory: 'pure-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_cotton/khaki_1.png',
    desc: 'Warm earthy khaki tan pure cotton featuring resilient long-staple fibers, timeless versatile appeal, and structured soft comfort.',
    origin: 'Italy',
    weight: '130 gsm',
    threadCount: '100s Double Ply Pure Cotton',
    breathability: 'High',
    badge: 'Versatile Wear',
    variants: [
      { id: 'pc_kh_v1', name: 'Texture View 1', colorHex: '#bfa588', image: '/pure_cotton/khaki_1.png' },
      { id: 'pc_kh_v2', name: 'Texture View 2', colorHex: '#a88f73', image: '/pure_cotton/khaki_2.png' }
    ]
  },
  {
    id: 'pc_mocha',
    name: 'Mocha Brown Pure Cotton',
    category: 'cotton',
    subCategory: 'pure-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_cotton/mocha_brown_1.png',
    desc: 'Rich dark mocha brown pure cotton fabric crafted from premium long-staple yarns for superior luster, strength, and smooth tailored drape.',
    origin: 'Egypt',
    weight: '125 gsm',
    threadCount: '120s Egyptian Cotton',
    breathability: 'High',
    badge: 'New Arrival',
    variants: [
      { id: 'pc_mb_v1', name: 'Texture View 1', colorHex: '#5c4738', image: '/pure_cotton/mocha_brown_1.png' },
      { id: 'pc_mb_v2', name: 'Texture View 2', colorHex: '#47362a', image: '/pure_cotton/mocha_brown_2.png' }
    ]
  },
  {
    id: 'pc_navy',
    name: 'Navy Blue Pure Cotton',
    category: 'cotton',
    subCategory: 'pure-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_cotton/navy_blue_1.png',
    desc: 'Deep midnight navy blue pure cotton woven with ultra-fine double ply threads for crisp formal shirting and dark tailored elegance.',
    origin: 'Italy',
    weight: '125 gsm',
    threadCount: '140s Double Ply Giza',
    breathability: 'Excellent',
    badge: 'Best Seller',
    variants: [
      { id: 'pc_nb_v1', name: 'Texture View 1', colorHex: '#1c2838', image: '/pure_cotton/navy_blue_1.png' },
      { id: 'pc_nb_v2', name: 'Texture View 2', colorHex: '#141d2a', image: '/pure_cotton/navy_blue_2.png' }
    ]
  },
  {
    id: 'pc_olive',
    name: 'Olive Green Pure Cotton',
    category: 'cotton',
    subCategory: 'pure-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_cotton/olive_green_1.png',
    desc: 'Refined olive green pure cotton fabric combining muted military elegance with airy breathability and silky hand-feel.',
    origin: 'USA',
    weight: '125 gsm',
    threadCount: '100s Supima Cotton',
    breathability: 'High',
    badge: 'New Arrival',
    variants: [
      { id: 'pc_og_v1', name: 'Texture View 1', colorHex: '#596343', image: '/pure_cotton/olive_green_1.png' },
      { id: 'pc_og_v2', name: 'Texture View 2', colorHex: '#475035', image: '/pure_cotton/olive_green_2.png' }
    ]
  },
  {
    id: 'pc_sage',
    name: 'Sage Green Pure Cotton',
    category: 'cotton',
    subCategory: 'pure-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_cotton/sage_green_1.png',
    desc: 'Calming soft sage green pure cotton offering a lightweight, cooling sensation and refined pastel look for modern bespoke wear.',
    origin: 'Italy',
    weight: '115 gsm',
    threadCount: '120s Egyptian Cotton',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'pc_sg_v1', name: 'Texture View 1', colorHex: '#849b89', image: '/pure_cotton/sage_green_1.png' },
      { id: 'pc_sg_v2', name: 'Texture View 2', colorHex: '#6f8574', image: '/pure_cotton/sage_green_2.png' }
    ]
  },
  {
    id: 'pc_lavender',
    name: 'Soft Lavender Pure Cotton',
    category: 'cotton',
    subCategory: 'pure-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_cotton/soft_lavender_1.png',
    desc: 'Delicate soft lavender purple pure cotton woven with fine luxury yarns for a subtle statement shade and plush smoothness.',
    origin: 'France',
    weight: '115 gsm',
    threadCount: '120s Double Ply',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'pc_sl_v1', name: 'Texture View 1', colorHex: '#b2a7bd', image: '/pure_cotton/soft_lavender_1.png' },
      { id: 'pc_sl_v2', name: 'Texture View 2', colorHex: '#9b8ea7', image: '/pure_cotton/soft_lavender_2.png' }
    ]
  },
  {
    id: 'pc_pink',
    name: 'Soft Pink Pure Cotton',
    category: 'cotton',
    subCategory: 'pure-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_cotton/soft_pink_1.png',
    desc: 'Gentle soft pastel pink pure cotton featuring silky smooth long-staple fibers, light-catching luster, and premium comfort.',
    origin: 'Egypt',
    weight: '115 gsm',
    threadCount: '140s Fine Giza Cotton',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'pc_sp_v1', name: 'Texture View 1', colorHex: '#e5b8c2', image: '/pure_cotton/soft_pink_1.png' },
      { id: 'pc_sp_v2', name: 'Texture View 2', colorHex: '#d4a3ad', image: '/pure_cotton/soft_pink_2.png' }
    ]
  },
  {
    id: 'pc_terracotta',
    name: 'Terracotta Pure Cotton',
    category: 'cotton',
    subCategory: 'pure-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_cotton/terracotta_1.png',
    desc: 'Vibrant earthy terracotta rust-orange pure cotton fabric offering rich Mediterranean warmth, supple softness, and long-lasting durability.',
    origin: 'Italy',
    weight: '125 gsm',
    threadCount: '100s Compact Cotton',
    breathability: 'High',
    badge: 'New Arrival',
    variants: [
      { id: 'pc_tc_v1', name: 'Texture View 1', colorHex: '#bc654f', image: '/pure_cotton/terracotta_1.png' },
      { id: 'pc_tc_v2', name: 'Texture View 2', colorHex: '#a84a30', image: '/pure_cotton/terracotta_2.png' }
    ]
  },
  {
    id: 'pc_steel_blue',
    name: 'Steel Blue Pure Cotton',
    category: 'cotton',
    subCategory: 'pure-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_cotton/steel_blue_1.png',
    desc: 'Sophisticated cool steel blue pure cotton with a subtle slate sheen, crisp drape, and breathable structure for day-to-night tailoring.',
    origin: 'USA',
    weight: '120 gsm',
    threadCount: '120s Supima Cotton',
    breathability: 'Excellent',
    badge: 'New Arrival',
    variants: [
      { id: 'pc_sb_v1', name: 'Texture View 1', colorHex: '#506b7d', image: '/pure_cotton/steel_blue_1.png' },
      { id: 'pc_sb_v2', name: 'Texture View 2', colorHex: '#405666', image: '/pure_cotton/steel_blue_2.png' }
    ]
  },
  {
    id: 'pc_black',
    name: 'Jet Black Pure Cotton',
    category: 'cotton',
    subCategory: 'pure-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_cotton/black_1.png',
    desc: 'Ultra-deep jet black pure cotton woven with fine double ply yarns for sleek formal shirting, black-tie attire, and sharp tailored silhouettes.',
    origin: 'Italy',
    weight: '125 gsm',
    threadCount: '120s Double Ply Cotton',
    breathability: 'High',
    badge: 'New Arrival',
    variants: [
      { id: 'pc_blk_v1', name: 'Texture View 1', colorHex: '#1c1c1c', image: '/pure_cotton/black_1.png' },
      { id: 'pc_blk_v2', name: 'Texture View 2', colorHex: '#121212', image: '/pure_cotton/black_2.png' }
    ]
  },
  {
    id: 'pc_charcoal_grey',
    name: 'Charcoal Grey Pure Cotton',
    category: 'cotton',
    subCategory: 'pure-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_cotton/charcoal_grey_1.png',
    desc: 'Refined dark charcoal grey pure cotton delivering understated executive sophistication, silky drape, and versatile smart-casual wear.',
    origin: 'Egypt',
    weight: '125 gsm',
    threadCount: '120s Giza Cotton',
    breathability: 'High',
    badge: 'New Arrival',
    variants: [
      { id: 'pc_cg_v1', name: 'Texture View 1', colorHex: '#383b40', image: '/pure_cotton/charcoal_grey_1.png' },
      { id: 'pc_cg_v2', name: 'Texture View 2', colorHex: '#2a2d32', image: '/pure_cotton/charcoal_grey_2.png' }
    ]
  },
  {
    id: 'pc_coral',
    name: 'Coral Pure Cotton',
    category: 'cotton',
    subCategory: 'pure-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_cotton/coral_1.png',
    desc: 'Vibrant sunny coral pure cotton featuring long-staple yarns with a radiant tropical glow, light breathability, and soft festive feel.',
    origin: 'Italy',
    weight: '115 gsm',
    threadCount: '100s Compact Supima',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'pc_cr_v1', name: 'Texture View 1', colorHex: '#e06b5b', image: '/pure_cotton/coral_1.png' },
      { id: 'pc_cr_v2', name: 'Texture View 2', colorHex: '#cc594a', image: '/pure_cotton/coral_2.png' }
    ]
  },
  {
    id: 'pc_dusty_rose',
    name: 'Dusty Rose Pure Cotton',
    category: 'cotton',
    subCategory: 'pure-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_cotton/dusty_rose_1.png',
    desc: 'Elegant muted dusty rose pink fine pure cotton weave bringing subtle vintage allure, smooth hand-feel, and effortless summer charm.',
    origin: 'France',
    weight: '115 gsm',
    threadCount: '120s Double Ply',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'pc_dr_v1', name: 'Texture View 1', colorHex: '#c48b8b', image: '/pure_cotton/dusty_rose_1.png' },
      { id: 'pc_dr_v2', name: 'Texture View 2', colorHex: '#b27878', image: '/pure_cotton/dusty_rose_2.png' }
    ]
  },
  {
    id: 'pc_forest_green',
    name: 'Forest Green Pure Cotton',
    category: 'cotton',
    subCategory: 'pure-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_cotton/forest_green_1.png',
    desc: 'Deep rich forest green pure cotton combining luxurious botanical depth with structured softness and long-lasting color intensity.',
    origin: 'USA',
    weight: '130 gsm',
    threadCount: '100s Supima Cotton',
    breathability: 'High',
    badge: 'New Arrival',
    variants: [
      { id: 'pc_fg_v1', name: 'Texture View 1', colorHex: '#2b4736', image: '/pure_cotton/forest_green_1.png' },
      { id: 'pc_fg_v2', name: 'Texture View 2', colorHex: '#1f3829', image: '/pure_cotton/forest_green_2.png' }
    ]
  },
  {
    id: 'pc_light_beige',
    name: 'Light Beige Pure Cotton',
    category: 'cotton',
    subCategory: 'pure-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_cotton/light_beige_1.png',
    desc: 'Warm oatmeal light beige pure cotton woven from fine long-staple fibers, offering airy comfort, natural texture, and versatile neutral styling.',
    origin: 'Italy',
    weight: '120 gsm',
    threadCount: '120s Egyptian Cotton',
    breathability: 'Excellent',
    badge: 'New Arrival',
    variants: [
      { id: 'pc_lbe_v1', name: 'Texture View 1', colorHex: '#d8cbb7', image: '/pure_cotton/light_beige_1.png' },
      { id: 'pc_lbe_v2', name: 'Texture View 2', colorHex: '#c7b8a2', image: '/pure_cotton/light_beige_2.png' }
    ]
  },
  {
    id: 'pc_red_wine',
    name: 'Red Wine Pure Cotton',
    category: 'cotton',
    subCategory: 'pure-cotton',
    patternClass: 'fabric-pattern-cotton',
    image: '/pure_cotton/red_wine_1.png',
    desc: 'Rich deep red wine crimson pure cotton crafted for bold evening shirting, festive celebrations, and opulent bespoke tailoring.',
    origin: 'Italy',
    weight: '125 gsm',
    threadCount: '120s Double Ply Cotton',
    breathability: 'High',
    badge: 'New Arrival',
    variants: [
      { id: 'pc_rw_v1', name: 'Texture View 1', colorHex: '#7a1f28', image: '/pure_cotton/red_wine_1.png' },
      { id: 'pc_rw_v2', name: 'Texture View 2', colorHex: '#63161e', image: '/pure_cotton/red_wine_2.png' }
    ]
  },

  {
    id: 'bc_alexandrite',
    name: 'Alexandrite Bamboo Cotton',
    category: 'cotton',
    subCategory: 'bamboo-cotton',
    patternClass: 'fabric-pattern-bamboo-cotton',
    image: '/bamboo_cotton/Alexandrite bamboo fabric 1.png',
    desc: 'Radiant alexandrite teal bamboo cotton blend. Features unique gemstone color depth, thermal breathability, and luxurious silky soft drape for bespoke shirting & kurtas.',
    origin: 'Japan',
    weight: '130 gsm',
    threadCount: '60/40 Bamboo Cotton',
    breathability: 'Ultra High',
    badge: 'Eco-Luxury',
    variants: [
      { id: 'bc_alex_v1', name: 'Texture View 1', colorHex: '#2e5b60', image: '/bamboo_cotton/Alexandrite bamboo fabric 1.png' },
      { id: 'bc_alex_v2', name: 'Texture View 2', colorHex: '#22474b', image: '/bamboo_cotton/Alexandrite bamboo fabric 2.png' }
    ]
  },
  {
    id: 'bc_burnished_lilac',
    name: 'Burnished Lilac Bamboo Cotton',
    category: 'cotton',
    subCategory: 'bamboo-cotton',
    patternClass: 'fabric-pattern-bamboo-cotton',
    image: '/bamboo_cotton/Burnished liac bamboo fabric 1.png',
    desc: 'Sophisticated burnished lilac bamboo cotton. Superbly soft against sensitive skin with superior moisture-wicking and fluid natural drape.',
    origin: 'Taiwan',
    weight: '125 gsm',
    threadCount: '65/35 Bamboo Cotton',
    breathability: 'Ultra High',
    badge: 'Organic Blend',
    variants: [
      { id: 'bc_bl_v1', name: 'Texture View 1', colorHex: '#937b8d', image: '/bamboo_cotton/Burnished liac bamboo fabric 1.png' },
      { id: 'bc_bl_v2', name: 'Texture View 2', colorHex: '#7d6777', image: '/bamboo_cotton/Burnished liac bamboo fabric 2.png' }
    ]
  },
  {
    id: 'bc_khaki',
    name: 'Khaki Bamboo Cotton',
    category: 'cotton',
    subCategory: 'bamboo-cotton',
    patternClass: 'fabric-pattern-bamboo-cotton',
    image: '/bamboo_cotton/Khaki bamboo fabric 1.png',
    desc: 'Versatile warm khaki bamboo cotton blend. Perfect balance of natural structure and bamboo softness for executive and leisure tailoring.',
    origin: 'Japan',
    weight: '130 gsm',
    threadCount: '60/40 Bamboo Fine Cotton',
    breathability: 'Ultra High',
    badge: 'Best Seller',
    variants: [
      { id: 'bc_kh_v1', name: 'Texture View 1', colorHex: '#8a7b66', image: '/bamboo_cotton/Khaki bamboo fabric 1.png' },
      { id: 'bc_kh_v2', name: 'Texture View 2', colorHex: '#756854', image: '/bamboo_cotton/Khaki bamboo fabric 2.png' }
    ]
  },
  {
    id: 'bc_magenta',
    name: 'Magenta Bamboo Cotton',
    category: 'cotton',
    subCategory: 'bamboo-cotton',
    patternClass: 'fabric-pattern-bamboo-cotton',
    image: '/bamboo_cotton/Magneta bamboo fabric 1.png',
    desc: 'Vibrant deep magenta bamboo cotton. High-performance natural thermo-regulation keeps you comfortable all day while maintaining a bold bespoke aesthetic.',
    origin: 'Taiwan',
    weight: '130 gsm',
    threadCount: '60/40 Bamboo Cotton',
    breathability: 'Ultra High',
    badge: 'New Arrival',
    variants: [
      { id: 'bc_mg_v1', name: 'Texture View 1', colorHex: '#8b2649', image: '/bamboo_cotton/Magneta bamboo fabric 1.png' },
      { id: 'bc_mg_v2', name: 'Texture View 2', colorHex: '#731d3b', image: '/bamboo_cotton/Magneta bamboo fabric 2.png' }
    ]
  },
  {
    id: 'bc_moss_green',
    name: 'Moss Green Bamboo Cotton',
    category: 'cotton',
    subCategory: 'bamboo-cotton',
    patternClass: 'fabric-pattern-bamboo-cotton',
    image: '/bamboo_cotton/Moss green bamboo fabric 1.png',
    desc: 'Earthy moss green bamboo cotton fabric. Hypoallergenic, eco-friendly, and naturally thermoregulating for elegant green tailored garments.',
    origin: 'Japan',
    weight: '135 gsm',
    threadCount: '60/40 Bamboo Fine Cotton',
    breathability: 'Ultra High',
    badge: 'Eco-Luxury',
    variants: [
      { id: 'bc_mg_green_v1', name: 'Texture View 1', colorHex: '#4a5d43', image: '/bamboo_cotton/Moss green bamboo fabric 1.png' },
      { id: 'bc_mg_green_v2', name: 'Texture View 2', colorHex: '#3a4b34', image: '/bamboo_cotton/Moss green bamboo fabric 2.png' }
    ]
  },
  {
    id: 'bc_muted_sage',
    name: 'Muted Sage Green Bamboo Cotton',
    category: 'cotton',
    subCategory: 'bamboo-cotton',
    patternClass: 'fabric-pattern-bamboo-cotton',
    image: '/bamboo_cotton/Muted sage green bamboo fabric 1.png',
    desc: 'Subtle muted sage green bamboo cotton weave. Gentle pastel finish offering exceptional breathability and fluid natural drape.',
    origin: 'Taiwan',
    weight: '125 gsm',
    threadCount: '65/35 Bamboo Cotton',
    breathability: 'Ultra High',
    badge: 'Organic Blend',
    variants: [
      { id: 'bc_ms_v1', name: 'Texture View 1', colorHex: '#788a75', image: '/bamboo_cotton/Muted sage green bamboo fabric 1.png' },
      { id: 'bc_ms_v2', name: 'Texture View 2', colorHex: '#647562', image: '/bamboo_cotton/Muted sage green bamboo fabric 2.png' }
    ]
  },
  {
    id: 'bc_purple',
    name: 'Royal Purple Bamboo Cotton',
    category: 'cotton',
    subCategory: 'bamboo-cotton',
    patternClass: 'fabric-pattern-bamboo-cotton',
    image: '/bamboo_cotton/Purple bamboo fabric 1.png',
    desc: 'Opulent deep purple bamboo cotton. Soft natural sheen with antibacterial benefits and exceptional luxury hand feel.',
    origin: 'Japan',
    weight: '130 gsm',
    threadCount: '60/40 Bamboo Cotton',
    breathability: 'Ultra High',
    badge: 'Eco-Luxury',
    variants: [
      { id: 'bc_pr_v1', name: 'Texture View 1', colorHex: '#5a335c', image: '/bamboo_cotton/Purple bamboo fabric 1.png' },
      { id: 'bc_pr_v2', name: 'Texture View 2', colorHex: '#472649', image: '/bamboo_cotton/Purple bamboo fabric 2.png' }
    ]
  },
  {
    id: 'bc_cocoa_plum',
    name: 'Cocoa Plum Bamboo Cotton',
    category: 'cotton',
    subCategory: 'bamboo-cotton',
    patternClass: 'fabric-pattern-bamboo-cotton',
    image: '/bamboo_cotton/cocoa plum bamboo fabric 1.png',
    desc: 'Warm cocoa plum bamboo cotton blend. Unique deep earthy-purple hue with a buttery smooth hand and superior breathability.',
    origin: 'Taiwan',
    weight: '130 gsm',
    threadCount: '60/40 Bamboo Cotton',
    breathability: 'Ultra High',
    badge: 'New Arrival',
    variants: [
      { id: 'bc_cp_v1', name: 'Texture View 1', colorHex: '#5c3d48', image: '/bamboo_cotton/cocoa plum bamboo fabric 1.png' },
      { id: 'bc_cp_v2', name: 'Texture View 2', colorHex: '#492f39', image: '/bamboo_cotton/cocoa plum bamboo fabric 2.png' }
    ]
  },
  {
    id: 'bc_dusty_teal',
    name: 'Dusty Teal Blue Bamboo Cotton',
    category: 'cotton',
    subCategory: 'bamboo-cotton',
    patternClass: 'fabric-pattern-bamboo-cotton',
    image: '/bamboo_cotton/dusty teal blue bamboo fabric 1.png',
    desc: 'Cool dusty teal blue bamboo cotton. Natural moisture management, gentle luster, and refined ocean shade for contemporary shirting.',
    origin: 'Japan',
    weight: '125 gsm',
    threadCount: '65/35 Bamboo Fine Cotton',
    breathability: 'Ultra High',
    badge: 'Best Seller',
    variants: [
      { id: 'bc_dt_v1', name: 'Texture View 1', colorHex: '#38687a', image: '/bamboo_cotton/dusty teal blue bamboo fabric 1.png' },
      { id: 'bc_dt_v2', name: 'Texture View 2', colorHex: '#2b5463', image: '/bamboo_cotton/dusty teal blue bamboo fabric 2.png' }
    ]
  },
  {
    id: 'bc_light_blue',
    name: 'Light Blue Bamboo Cotton',
    category: 'cotton',
    subCategory: 'bamboo-cotton',
    patternClass: 'fabric-pattern-bamboo-cotton',
    image: '/bamboo_cotton/light blue bamboo fabric 1.png',
    desc: 'Classic light blue bamboo cotton fabric. Light, breathable, and silky soft for executive business and smart casual shirting.',
    origin: 'Taiwan',
    weight: '125 gsm',
    threadCount: '60/40 Bamboo Cotton',
    breathability: 'Ultra High',
    badge: 'Eco-Luxury',
    variants: [
      { id: 'bc_lb_v1', name: 'Texture View 1', colorHex: '#7da7ca', image: '/bamboo_cotton/light blue bamboo fabric 1.png' },
      { id: 'bc_lb_v2', name: 'Texture View 2', colorHex: '#6790b3', image: '/bamboo_cotton/light blue bamboo fabric 2.png' }
    ]
  },
  {
    id: 'bc_light_brown',
    name: 'Light Brown Bamboo Cotton',
    category: 'cotton',
    subCategory: 'bamboo-cotton',
    patternClass: 'fabric-pattern-bamboo-cotton',
    image: '/bamboo_cotton/light brown bamboo fabric 1.png',
    desc: 'Warm light brown bamboo cotton weave. Subtle textured appearance, hypoallergenic comfort, and rich organic neutral appeal.',
    origin: 'Japan',
    weight: '130 gsm',
    threadCount: '60/40 Bamboo Fine Cotton',
    breathability: 'Ultra High',
    badge: 'Organic Blend',
    variants: [
      { id: 'bc_lbr_v1', name: 'Texture View 1', colorHex: '#967b66', image: '/bamboo_cotton/light brown bamboo fabric 1.png' },
      { id: 'bc_lbr_v2', name: 'Texture View 2', colorHex: '#816653', image: '/bamboo_cotton/light brown bamboo fabric 2.png' }
    ]
  },
  {
    id: 'bc_off_white',
    name: 'Off-White Bamboo Cotton',
    category: 'cotton',
    subCategory: 'bamboo-cotton',
    patternClass: 'fabric-pattern-bamboo-cotton',
    image: '/bamboo_cotton/off-white bamboo fabric 1.png',
    desc: 'Pristine off-white bamboo cotton fabric. Elegant silky sheen, natural softness, and airy breathability for sharp formalwear.',
    origin: 'Taiwan',
    weight: '125 gsm',
    threadCount: '65/35 Bamboo Fine Cotton',
    breathability: 'Ultra High',
    badge: 'Eco-Luxury',
    variants: [
      { id: 'bc_ow_v1', name: 'Texture View 1', colorHex: '#f4f0ea', image: '/bamboo_cotton/off-white bamboo fabric 1.png' },
      { id: 'bc_ow_v2', name: 'Texture View 2', colorHex: '#e5dfd7', image: '/bamboo_cotton/off-white bamboo fabric 2.png' }
    ]
  },
  {
    id: 'bc_pale_yellow',
    name: 'Pale Yellow Bamboo Cotton',
    category: 'cotton',
    subCategory: 'bamboo-cotton',
    patternClass: 'fabric-pattern-bamboo-cotton',
    image: '/bamboo_cotton/pale yellow bamboo fabric 1.png',
    desc: 'Warm pale yellow bamboo cotton blend. Gentle pastel tone with silky touch and natural thermal control for summer tailor-made wear.',
    origin: 'Japan',
    weight: '125 gsm',
    threadCount: '60/40 Bamboo Cotton',
    breathability: 'Ultra High',
    badge: 'New Arrival',
    variants: [
      { id: 'bc_py_v1', name: 'Texture View 1', colorHex: '#edd99b', image: '/bamboo_cotton/pale yellow bamboo fabric 1.png' },
      { id: 'bc_py_v2', name: 'Texture View 2', colorHex: '#dbb384', image: '/bamboo_cotton/pale yellow bamboo fabric 2.png' }
    ]
  },
  {
    id: 'bc_red',
    name: 'Crimson Red Bamboo Cotton',
    category: 'cotton',
    subCategory: 'bamboo-cotton',
    patternClass: 'fabric-pattern-bamboo-cotton',
    image: '/bamboo_cotton/red bamboo fabric 1.png',
    desc: 'Striking crimson red bamboo cotton blend. Rich color saturation, ultra-soft hand feel, and natural moisture wicking.',
    origin: 'Taiwan',
    weight: '130 gsm',
    threadCount: '60/40 Bamboo Cotton',
    breathability: 'Ultra High',
    badge: 'Best Seller',
    variants: [
      { id: 'bc_red_v1', name: 'Texture View 1', colorHex: '#99222a', image: '/bamboo_cotton/red bamboo fabric 1.png' },
      { id: 'bc_red_v2', name: 'Texture View 2', colorHex: '#801a21', image: '/bamboo_cotton/red bamboo fabric 2.png' }
    ]
  },
  {
    id: 'bc_teaberry',
    name: 'Teaberry Bamboo Cotton',
    category: 'cotton',
    subCategory: 'bamboo-cotton',
    patternClass: 'fabric-pattern-bamboo-cotton',
    image: '/bamboo_cotton/teaberry bamboo fabric 1.png',
    desc: 'Delicate teaberry pink bamboo cotton. Refined dusty rose undertone with smooth drape and hypoallergenic eco-luxury feel.',
    origin: 'Japan',
    weight: '125 gsm',
    threadCount: '65/35 Bamboo Cotton',
    breathability: 'Ultra High',
    badge: 'Organic Blend',
    variants: [
      { id: 'bc_tb_v1', name: 'Texture View 1', colorHex: '#ab4b5d', image: '/bamboo_cotton/teaberry bamboo fabric 1.png' },
      { id: 'bc_tb_v2', name: 'Texture View 2', colorHex: '#943c4d', image: '/bamboo_cotton/teaberry bamboo fabric 2.png' }
    ]
  },
  {
    id: 'bc_natural_ivory',
    name: 'Natural Cream Bamboo Cotton',
    category: 'cotton',
    subCategory: 'bamboo-cotton',
    patternClass: 'fabric-pattern-bamboo-cotton',
    image: '/bamboo_cotton/Screenshot 2026-08-10 161935.png',
    desc: 'Premium organic natural cream bamboo cotton. Highlighted by tactile swirl fold texture, maximum breathability, and fluid bespoke drape.',
    origin: 'Japan',
    weight: '135 gsm',
    threadCount: '60/40 Bamboo Fine Cotton',
    breathability: 'Ultra High',
    badge: 'Eco-Luxury',
    variants: [
      { id: 'bc_ni_v1', name: 'Texture View 1', colorHex: '#eae4d8', image: '/bamboo_cotton/Screenshot 2026-08-10 161935.png' },
      { id: 'bc_ni_v2', name: 'Texture View 2', colorHex: '#dad3c5', image: '/bamboo_cotton/Screenshot 2026-08-10 161952.png' }
    ]
  },
  {
    id: 'bc_berry_purple',
    name: 'Berry Purple Bamboo Cotton',
    category: 'cotton',
    subCategory: 'bamboo-cotton',
    patternClass: 'fabric-pattern-bamboo-cotton',
    image: '/bamboo_cotton/Berry purple bamboo fabric 1.png',
    desc: 'Lush berry purple bamboo cotton blend. Rich, vibrant jewel tone with natural thermal regulation, moisture-wicking comfort, and a silky smooth drape.',
    origin: 'Taiwan',
    weight: '130 gsm',
    threadCount: '60/40 Bamboo Cotton',
    breathability: 'Ultra High',
    badge: 'New Arrival',
    variants: [
      { id: 'bc_bp_v1', name: 'Texture View 1', colorHex: '#6b2d5c', image: '/bamboo_cotton/Berry purple bamboo fabric 1.png' },
      { id: 'bc_bp_v2', name: 'Texture View 2', colorHex: '#58234b', image: '/bamboo_cotton/Berry purple bamboo fabric 2.png' }
    ]
  },
  {
    id: 'bc_chartreuse',
    name: 'Chartreuse Bamboo Cotton',
    category: 'cotton',
    subCategory: 'bamboo-cotton',
    patternClass: 'fabric-pattern-bamboo-cotton',
    image: '/bamboo_cotton/Chartreuse bamboo fabric 1.png',
    desc: 'Electrifying chartreuse yellow-green bamboo cotton. Striking modern colorway offering silky soft texture, antibacterial freshness, and airy summer breathability.',
    origin: 'Japan',
    weight: '125 gsm',
    threadCount: '65/35 Bamboo Fine Cotton',
    breathability: 'Ultra High',
    badge: 'New Arrival',
    variants: [
      { id: 'bc_ch_v1', name: 'Texture View 1', colorHex: '#a3b83b', image: '/bamboo_cotton/Chartreuse bamboo fabric 1.png' },
      { id: 'bc_ch_v2', name: 'Texture View 2', colorHex: '#8da02e', image: '/bamboo_cotton/Chartreuse bamboo fabric 2.png' }
    ]
  },
  {
    id: 'bc_dark_brown',
    name: 'Dark Brown Bamboo Cotton',
    category: 'cotton',
    subCategory: 'bamboo-cotton',
    patternClass: 'fabric-pattern-bamboo-cotton',
    image: '/bamboo_cotton/dark brown bamboo fabric 1.png',
    desc: 'Deep espresso dark brown bamboo cotton blend. Rich organic hue with hypoallergenic softness and a structured yet supple bespoke finish.',
    origin: 'Taiwan',
    weight: '135 gsm',
    threadCount: '60/40 Bamboo Cotton',
    breathability: 'Ultra High',
    badge: 'Organic Blend',
    variants: [
      { id: 'bc_dbr_v1', name: 'Texture View 1', colorHex: '#4a3728', image: '/bamboo_cotton/dark brown bamboo fabric 1.png' },
      { id: 'bc_dbr_v2', name: 'Texture View 2', colorHex: '#3a2a1d', image: '/bamboo_cotton/dark brown bamboo fabric 2.png' }
    ]
  },
  {
    id: 'bc_fuchsia_pink',
    name: 'Fuchsia Pink Bamboo Cotton',
    category: 'cotton',
    subCategory: 'bamboo-cotton',
    patternClass: 'fabric-pattern-bamboo-cotton',
    image: '/bamboo_cotton/Fuschia pink bamboo fabric 1.png',
    desc: 'Vivid fuchsia pink bamboo cotton fabric. Eye-catching statement color featuring bamboo natural sheen, ultra-soft feel, and moisture-wicking comfort.',
    origin: 'Japan',
    weight: '130 gsm',
    threadCount: '60/40 Bamboo Cotton',
    breathability: 'Ultra High',
    badge: 'New Arrival',
    variants: [
      { id: 'bc_fp_v1', name: 'Texture View 1', colorHex: '#c72b74', image: '/bamboo_cotton/Fuschia pink bamboo fabric 1.png' },
      { id: 'bc_fp_v2', name: 'Texture View 2', colorHex: '#a81f5e', image: '/bamboo_cotton/Fuschia pink bamboo fabric 2.png' }
    ]
  },
  {
    id: 'lc1',
    name: 'Light Beige Cotton Linen',
    category: 'cotton',
    subCategory: 'linen-cotton',
    patternClass: 'fabric-pattern-linen-cotton',
    image: '/cotton_linen/light_beige_1.png',
    desc: 'Premium organic light beige cotton linen blend featuring tactile slub fibers, maximum airflow, and a structured soft drape for bespoke shirting, trousers & kurtas.',
    origin: 'Italy',
    weight: '140 gsm',
    threadCount: '55/45 Linen Cotton',
    breathability: 'Outstanding',
    badge: 'Signature Linen Cotton',
    variants: [
      { id: 'lc_v1', name: 'Texture View 1', colorHex: '#e4d5bc', image: '/cotton_linen/light_beige_1.png' },
      { id: 'lc_v2', name: 'Texture View 2', colorHex: '#d8c5a8', image: '/cotton_linen/light_beige_2.png' }
    ]
  },
  {
    id: 'lc2',
    name: 'Soft Sage Green Cotton Linen',
    category: 'cotton',
    subCategory: 'linen-cotton',
    patternClass: 'fabric-pattern-linen-cotton',
    image: '/cotton_linen/soft_sage_green_1.png',
    desc: 'Refreshing soft sage green cotton linen blend woven with fine flax slub yarns. Exceptionally lightweight and breathable for modern summer shirts, kurtas & trousers.',
    origin: 'France',
    weight: '140 gsm',
    threadCount: '55/45 Linen Cotton',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'sg_v1', name: 'Texture View 1', colorHex: '#8cb5a3', image: '/cotton_linen/soft_sage_green_1.png' },
      { id: 'sg_v2', name: 'Texture View 2', colorHex: '#7fa391', image: '/cotton_linen/soft_sage_green_2.png' }
    ]
  },
  {
    id: 'lc3',
    name: 'Ocean Blue Cotton Linen',
    category: 'cotton',
    subCategory: 'linen-cotton',
    patternClass: 'fabric-pattern-linen-cotton',
    image: '/cotton_linen/blue_1.png',
    desc: 'Vibrant ocean blue cotton linen blend featuring rich tactile slub weave, cooling breathability, and refined casual drape for bespoke shirts, kurtas & trousers.',
    origin: 'Italy',
    weight: '140 gsm',
    threadCount: '55/45 Linen Cotton',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'bl_v1', name: 'Texture View 1', colorHex: '#4a82b8', image: '/cotton_linen/blue_1.png' },
      { id: 'bl_v2', name: 'Texture View 2', colorHex: '#3a72a8', image: '/cotton_linen/blue_2.png' }
    ]
  },
  {
    id: 'lc4',
    name: 'Slate Gray Cotton Linen',
    category: 'cotton',
    subCategory: 'linen-cotton',
    patternClass: 'fabric-pattern-linen-cotton',
    image: '/cotton_linen/gray_1.png',
    desc: 'Sophisticated slate gray tone cotton linen blend featuring subtle cross-hatched slub weave, breathable structure, and versatile neutral elegance for shirts, jackets & kurtas.',
    origin: 'Belgium',
    weight: '145 gsm',
    threadCount: '55/45 Linen Cotton',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'gr_v1', name: 'Texture View 1', colorHex: '#737a7a', image: '/cotton_linen/gray_1.png' },
      { id: 'gr_v2', name: 'Texture View 2', colorHex: '#5e6565', image: '/cotton_linen/gray_2.png' }
    ]
  },
  {
    id: 'lc5',
    name: 'Natural Unbleached Cotton Linen',
    category: 'cotton',
    subCategory: 'linen-cotton',
    patternClass: 'fabric-pattern-linen-cotton',
    image: '/cotton_linen/natural_1.png',
    desc: 'Earthy unbleached natural cotton linen blend with raw flax slub texture, maximum breathability, and relaxed organic drape for resort wear, kurtas & bespoke shirts.',
    origin: 'Italy',
    weight: '140 gsm',
    threadCount: '55/45 Linen Cotton',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'nat_v1', name: 'Texture View 1', colorHex: '#d8c7b0', image: '/cotton_linen/natural_1.png' },
      { id: 'nat_v2', name: 'Texture View 2', colorHex: '#cabb9e', image: '/cotton_linen/natural_2.png' }
    ]
  },
  {
    id: 'lc6',
    name: 'Blue-Gray Cotton Linen',
    category: 'cotton',
    subCategory: 'linen-cotton',
    patternClass: 'fabric-pattern-linen-cotton',
    image: '/cotton_linen/blue_gray_1.png',
    desc: 'Refined slate blue-gray cotton linen blend featuring subtle cross-slub texture, breathable structure, and versatile cool neutrality for bespoke shirting & kurtas.',
    origin: 'Italy',
    weight: '140 gsm',
    threadCount: '55/45 Linen Cotton',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'bg_v1', name: 'Texture View 1', colorHex: '#5b7083', image: '/cotton_linen/blue_gray_1.png' },
      { id: 'bg_v2', name: 'Texture View 2', colorHex: '#4a5d6e', image: '/cotton_linen/blue_gray_2.png' }
    ]
  },
  {
    id: 'lc7',
    name: 'Cocoa Brown Cotton Linen',
    category: 'cotton',
    subCategory: 'linen-cotton',
    patternClass: 'fabric-pattern-linen-cotton',
    image: '/cotton_linen/cocoa_brown_1.png',
    desc: 'Deep warm cocoa brown luxury cotton linen with rich espresso tones, airy breathability, and structured drape for jackets, kurtas & trousers.',
    origin: 'France',
    weight: '145 gsm',
    threadCount: '55/45 Linen Cotton',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'cb_v1', name: 'Texture View 1', colorHex: '#52382e', image: '/cotton_linen/cocoa_brown_1.png' },
      { id: 'cb_v2', name: 'Texture View 2', colorHex: '#422c24', image: '/cotton_linen/cocoa_brown_2.png' }
    ]
  },
  {
    id: 'lc8',
    name: 'Dusty Mauve Cotton Linen',
    category: 'cotton',
    subCategory: 'linen-cotton',
    patternClass: 'fabric-pattern-linen-cotton',
    image: '/cotton_linen/dusty_mauve_1.png',
    desc: 'Subtle dusty mauve pink cotton linen woven with delicate flax slub threads. Offers a clean, modern pastel aesthetic for summer shirts & kurtas.',
    origin: 'Italy',
    weight: '140 gsm',
    threadCount: '55/45 Linen Cotton',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'dm_v1', name: 'Texture View 1', colorHex: '#9e7b86', image: '/cotton_linen/dusty_mauve_1.png' },
      { id: 'dm_v2', name: 'Texture View 2', colorHex: '#8b6974', image: '/cotton_linen/dusty_mauve_2.png' }
    ]
  },
  {
    id: 'lc9',
    name: 'Mushroom Brown Cotton Linen',
    category: 'cotton',
    subCategory: 'linen-cotton',
    patternClass: 'fabric-pattern-linen-cotton',
    image: '/cotton_linen/mushroom_brown_1.png',
    desc: 'Earthy taupe mushroom brown cotton linen with rich organic slub texture. A versatile warm neutral for modern casual resort wear & trousers.',
    origin: 'Belgium',
    weight: '145 gsm',
    threadCount: '55/45 Linen Cotton',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'mb_v1', name: 'Texture View 1', colorHex: '#7a685b', image: '/cotton_linen/mushroom_brown_1.png' },
      { id: 'mb_v2', name: 'Texture View 2', colorHex: '#68574b', image: '/cotton_linen/mushroom_brown_2.png' }
    ]
  },
  {
    id: 'lc10',
    name: 'Navy Blue Cotton Linen',
    category: 'cotton',
    subCategory: 'linen-cotton',
    patternClass: 'fabric-pattern-linen-cotton',
    image: '/cotton_linen/navy_blue_1.png',
    desc: 'Deep midnight navy blue cotton linen featuring a smooth refined slub weave, blending dark evening sophistication with cool linen comfort.',
    origin: 'Italy',
    weight: '145 gsm',
    threadCount: '55/45 Linen Cotton',
    breathability: 'Outstanding',
    badge: 'Evening Grade',
    variants: [
      { id: 'nb_v1', name: 'Texture View 1', colorHex: '#1e2d42', image: '/cotton_linen/navy_blue_1.png' },
      { id: 'nb_v2', name: 'Texture View 2', colorHex: '#152132', image: '/cotton_linen/navy_blue_2.png' }
    ]
  },
  {
    id: 'lc11',
    name: 'Teal Blue Cotton Linen',
    category: 'cotton',
    subCategory: 'linen-cotton',
    patternClass: 'fabric-pattern-linen-cotton',
    image: '/cotton_linen/teal_1.png',
    desc: 'Striking rich teal blue-green cotton linen yarn-dyed for intense color depth and vibrant Mediterranean summer tailoring.',
    origin: 'France',
    weight: '140 gsm',
    threadCount: '55/45 Linen Cotton',
    breathability: 'Outstanding',
    badge: 'Signature Color',
    variants: [
      { id: 't_v1', name: 'Texture View 1', colorHex: '#25636b', image: '/cotton_linen/teal_1.png' },
      { id: 't_v2', name: 'Texture View 2', colorHex: '#1b4d54', image: '/cotton_linen/teal_2.png' }
    ]
  },
  {
    id: 'lc12',
    name: 'Soft Green Cotton Linen',
    category: 'cotton',
    subCategory: 'linen-cotton',
    patternClass: 'fabric-pattern-linen-cotton',
    image: '/cotton_linen/soft_green_1.png',
    desc: 'Refreshing pastel soft mint green cotton linen woven from fine flax threads. Brings a cool, understated luxury to summer shirts & kurtas.',
    origin: 'Ireland',
    weight: '140 gsm',
    threadCount: '55/45 Linen Cotton',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'sg2_v1', name: 'Texture View 1', colorHex: '#84a991', image: '/cotton_linen/soft_green_1.png' },
      { id: 'sg2_v2', name: 'Texture View 2', colorHex: '#71967e', image: '/cotton_linen/soft_green_2.png' }
    ]
  },
  {
    id: 'lc13',
    name: 'Black Cotton Linen',
    category: 'cotton',
    subCategory: 'linen-cotton',
    patternClass: 'fabric-pattern-linen-cotton',
    image: '/cotton_linen/black_1.png',
    desc: 'Sleek black cotton linen blend featuring rich tactile slub texture, maximum breathability, and sophisticated dark tailoring for shirts, kurtas & trousers.',
    origin: 'Italy',
    weight: '145 gsm',
    threadCount: '55/45 Linen Cotton',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'blk_v1', name: 'Texture View 1', colorHex: '#1e1e1e', image: '/cotton_linen/black_1.png' },
      { id: 'blk_v2', name: 'Texture View 2', colorHex: '#121212', image: '/cotton_linen/black_2.png' }
    ]
  },
  {
    id: 'lc14',
    name: 'Burgundy Cotton Linen',
    category: 'cotton',
    subCategory: 'linen-cotton',
    patternClass: 'fabric-pattern-linen-cotton',
    image: '/cotton_linen/burgundy_1.png',
    desc: 'Deep burgundy wine cotton linen with rich red undertones and textured flax slub weave. Perfect for distinctive statement shirting and formal kurtas.',
    origin: 'France',
    weight: '145 gsm',
    threadCount: '55/45 Linen Cotton',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'bur_v1', name: 'Texture View 1', colorHex: '#5c1d24', image: '/cotton_linen/burgundy_1.png' },
      { id: 'bur_v2', name: 'Texture View 2', colorHex: '#4a161c', image: '/cotton_linen/burgundy_2.png' }
    ]
  },
  {
    id: 'lc15',
    name: 'Ecru Cotton Linen',
    category: 'cotton',
    subCategory: 'linen-cotton',
    patternClass: 'fabric-pattern-linen-cotton',
    image: '/cotton_linen/ecru_1.png',
    desc: 'Soft warm ecru off-white cotton linen with organic texture and breezy drape. Ideal for timeless resort wear and summer tailoring.',
    origin: 'Belgium',
    weight: '140 gsm',
    threadCount: '55/45 Linen Cotton',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'ec_v1', name: 'Texture View 1', colorHex: '#e8dfd1', image: '/cotton_linen/ecru_1.png' },
      { id: 'ec_v2', name: 'Texture View 2', colorHex: '#dbd0c0', image: '/cotton_linen/ecru_2.png' }
    ]
  },
  {
    id: 'lc16',
    name: 'Honey Brown Cotton Linen',
    category: 'cotton',
    subCategory: 'linen-cotton',
    patternClass: 'fabric-pattern-linen-cotton',
    image: '/cotton_linen/honey_brown_1.png',
    desc: 'Warm honey brown cotton linen woven with fine slub yarns. Delivers a rich golden-amber tone and breathable comfort for smart-casual wear.',
    origin: 'Italy',
    weight: '145 gsm',
    threadCount: '55/45 Linen Cotton',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'hb_v1', name: 'Texture View 1', colorHex: '#b88242', image: '/cotton_linen/honey_brown_1.png' },
      { id: 'hb_v2', name: 'Texture View 2', colorHex: '#a06f36', image: '/cotton_linen/honey_brown_2.png' }
    ]
  },
  {
    id: 'lc17',
    name: 'Mustard Cotton Linen',
    category: 'cotton',
    subCategory: 'linen-cotton',
    patternClass: 'fabric-pattern-linen-cotton',
    image: '/cotton_linen/mustard_1.png',
    desc: 'Vibrant mustard yellow cotton linen with rich warm tones and natural flax slub texture. A bold seasonal choice for casual shirts & kurtas.',
    origin: 'Ireland',
    weight: '140 gsm',
    threadCount: '55/45 Linen Cotton',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'mus_v1', name: 'Texture View 1', colorHex: '#d49b29', image: '/cotton_linen/mustard_1.png' },
      { id: 'mus_v2', name: 'Texture View 2', colorHex: '#bd871f', image: '/cotton_linen/mustard_2.png' }
    ]
  },
  {
    id: 'lc18',
    name: 'Olive Green Cotton Linen',
    category: 'cotton',
    subCategory: 'linen-cotton',
    patternClass: 'fabric-pattern-linen-cotton',
    image: '/cotton_linen/olive_green_1.png',
    desc: 'Earthy olive green cotton linen with natural slub weave and subtle luster. Perfect for military-inspired casual tailoring and relaxed shirts.',
    origin: 'Italy',
    weight: '145 gsm',
    threadCount: '55/45 Linen Cotton',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'og_v1', name: 'Texture View 1', colorHex: '#556b2f', image: '/cotton_linen/olive_green_1.png' },
      { id: 'og_v2', name: 'Texture View 2', colorHex: '#475a26', image: '/cotton_linen/olive_green_2.png' }
    ]
  },
  {
    id: 'lc19',
    name: 'Textured Gray Cotton Linen',
    category: 'cotton',
    subCategory: 'linen-cotton',
    patternClass: 'fabric-pattern-linen-cotton',
    image: '/cotton_linen/textured_gray_1.png',
    desc: 'Rich heather textured gray cotton linen featuring pronounced cross-hatched slub weave and versatile neutral elegance.',
    origin: 'Belgium',
    weight: '145 gsm',
    threadCount: '55/45 Linen Cotton',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'tg_v1', name: 'Texture View 1', colorHex: '#8a8e91', image: '/cotton_linen/textured_gray_1.png' },
      { id: 'tg_v2', name: 'Texture View 2', colorHex: '#777b7e', image: '/cotton_linen/textured_gray_2.png' }
    ]
  },
  {
    id: 'lc20',
    name: 'Terracotta Cotton Linen',
    category: 'cotton',
    subCategory: 'linen-cotton',
    patternClass: 'fabric-pattern-linen-cotton',
    image: '/cotton_linen/terracotta_1.png',
    desc: 'Earthy warm terracotta rust-orange cotton linen featuring rich tactile slub fibers, maximum breathability, and rustic Mediterranean charm for bespoke shirts, kurtas & trousers.',
    origin: 'Italy',
    weight: '145 gsm',
    threadCount: '55/45 Linen Cotton',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'tc_v1', name: 'Texture View 1', colorHex: '#c05a3e', image: '/cotton_linen/terracotta_1.png' },
      { id: 'tc_v2', name: 'Texture View 2', colorHex: '#a84a30', image: '/cotton_linen/terracotta_2.png' }
    ]
  },
  {
    id: 'f3',
    name: 'Pure White Linen',
    category: 'linen',
    patternClass: 'fabric-pattern-linen',
    desc: 'Pure crisp white Irish flax featuring a rich tactile slub weave. Ideal for summer shirts and bespoke kurtas.',
    origin: 'Ireland',
    weight: '145 gsm',
    threadCount: '100% Pure Flax',
    breathability: 'Outstanding',
    badge: 'Best Seller',
    variants: [
      { id: 'pw1', name: 'Texture View 1', colorHex: '#ffffff', image: '/linen/pure_white_1.png' },
      { id: 'pw2', name: 'Texture View 2', colorHex: '#f4f4f4', image: '/linen/pure_white_2.png' }
    ]
  },
  {
    id: 'f4',
    name: 'Off-White Linen',
    category: 'linen',
    patternClass: 'fabric-pattern-linen',
    desc: 'Soft ivory off-white shade with natural flax undertones for relaxed elegance and breezy resort wear.',
    origin: 'Italy',
    weight: '145 gsm',
    threadCount: '100% Pure Flax',
    breathability: 'Outstanding',
    badge: 'Resort Essential',
    variants: [
      { id: 'ow1', name: 'Texture View 1', colorHex: '#f5efe6', image: '/linen/off_white_1.png' },
      { id: 'ow2', name: 'Texture View 2', colorHex: '#ece4d8', image: '/linen/off_white_2.png' }
    ]
  },
  {
    id: 'f9',
    name: 'Emerald Green Linen',
    category: 'linen',
    patternClass: 'fabric-pattern-linen',
    desc: 'Striking rich emerald green linen yarn-dyed for intense color depth and vibrant summer tailoring.',
    origin: 'France',
    weight: '155 gsm',
    threadCount: 'Yarn-Dyed Flax',
    breathability: 'Outstanding',
    badge: 'Signature Color',
    variants: [
      { id: 'eg1', name: 'Texture View 1', colorHex: '#0c614b', image: '/linen/emerald_green_1.png' },
      { id: 'eg2', name: 'Texture View 2', colorHex: '#064e3b', image: '/linen/emerald_green_2.png' }
    ]
  },
  {
    id: 'f10',
    name: 'Carbon Black Linen',
    category: 'linen',
    patternClass: 'fabric-pattern-linen',
    desc: 'Jet black linen with a smooth refined weave, blending structured sophistication with cool linen comfort.',
    origin: 'Belgium',
    weight: '150 gsm',
    threadCount: '100% Pure Linen',
    breathability: 'High',
    badge: 'Evening Grade',
    variants: [
      { id: 'cb1', name: 'Texture View 1', colorHex: '#1c1c1c', image: '/linen/carbon_black_1.png' },
      { id: 'cb2', name: 'Texture View 2', colorHex: '#2b2b2b', image: '/linen/carbon_black_2.png' }
    ]
  },
  {
    id: 'f11',
    name: 'Slate Grey Linen',
    category: 'linen',
    patternClass: 'fabric-pattern-linen',
    desc: 'Refined light slate grey linen weave offering timeless neutrality and effortless styling versatility.',
    origin: 'Belgium',
    weight: '140 gsm',
    threadCount: '100% Fine Flax',
    breathability: 'Outstanding',
    badge: 'Versatile Wear',
    variants: [
      { id: 'sg1', name: 'Texture View 1', colorHex: '#6b7280', image: '/linen/slate_grey_1.png' },
      { id: 'sg2', name: 'Texture View 2', colorHex: '#4b5563', image: '/linen/slate_grey_2.png' }
    ]
  },
  {
    id: 'f12',
    name: 'Stone Grey Linen',
    category: 'linen',
    patternClass: 'fabric-pattern-linen',
    desc: 'Earth-toned stone grey linen crafted with cross-hatched slub threads for subtle organic texture.',
    origin: 'Ireland',
    weight: '145 gsm',
    threadCount: 'Cross-Hatch Flax',
    breathability: 'Outstanding',
    badge: 'Organic Natural',
    variants: [
      { id: 'st1', name: 'Texture View 1', colorHex: '#9ca3af', image: '/linen/stone_grey_1.png' },
      { id: 'st2', name: 'Texture View 2', colorHex: '#d1d5db', image: '/linen/stone_grey_2.png' }
    ]
  },
  {
    id: 'f13',
    name: 'Dusty Rose Linen',
    category: 'linen',
    patternClass: 'fabric-pattern-linen',
    desc: 'Romantic soft blush pink dusty rose linen featuring an exquisite slub weave. Ideal for elegant summer kurtas, shirts, and bespoke suits.',
    origin: 'Italy',
    weight: '145 gsm',
    threadCount: '100% Pure Linen Slub',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'dr1', name: 'Texture View 1', colorHex: '#dcae96', image: '/linen/dusty_rose_1.png' },
      { id: 'dr2', name: 'Texture View 2', colorHex: '#c79880', image: '/linen/dusty_rose_2.png' }
    ]
  },
  {
    id: 'f14',
    name: 'Dusty Mint Green Linen',
    category: 'linen',
    patternClass: 'fabric-pattern-linen',
    desc: 'Refreshing soft sage-mint green linen woven from fine flax threads. Brings a cool, understated luxury to summer tailoring and casual elegance.',
    origin: 'France',
    weight: '145 gsm',
    threadCount: '100% Pure Linen Slub',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'dmg1', name: 'Texture View 1', colorHex: '#a3c4b5', image: '/linen/dusty_mint_green_1.png' },
      { id: 'dmg2', name: 'Texture View 2', colorHex: '#8cb5a3', image: '/linen/dusty_mint_green_2.png' }
    ]
  },
  {
    id: 'f15',
    name: 'Chocolate Brown Linen',
    category: 'linen',
    patternClass: 'fabric-pattern-linen',
    desc: 'Deep warm chocolate brown luxury linen with rich espresso tones. Excellent structure for bespoke jackets, kurtas, and pants.',
    origin: 'Italy',
    weight: '155 gsm',
    threadCount: '100% Pure Linen Slub',
    breathability: 'High',
    badge: 'New Arrival',
    variants: [
      { id: 'cb1', name: 'Texture View 1', colorHex: '#4d2d22', image: '/linen/chocolate_brown_1.png' },
      { id: 'cb2', name: 'Texture View 2', colorHex: '#3b2219', image: '/linen/chocolate_brown_2.png' }
    ]
  },
  {
    id: 'f16',
    name: 'Mud Brown Linen',
    category: 'linen',
    patternClass: 'fabric-pattern-linen',
    desc: 'Earthy taupe mud brown linen woven with organic flax slubs. A versatile warm neutral for modern casual resort wear.',
    origin: 'Belgium',
    weight: '150 gsm',
    threadCount: 'Artisan Slub Flax',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'mb1', name: 'Texture View 1', colorHex: '#6e5647', image: '/linen/mud_brown_1.png' },
      { id: 'mb2', name: 'Texture View 2', colorHex: '#574336', image: '/linen/mud_brown_2.png' }
    ]
  },
  {
    id: 'f17',
    name: 'Wine Linen',
    category: 'linen',
    patternClass: 'fabric-pattern-linen',
    desc: 'Opulent deep burgundy wine red linen with rich berry undertones. Statement fabric for evening wear, kurtas, and luxury shirts.',
    origin: 'France',
    weight: '155 gsm',
    threadCount: 'Royal Dyed Flax',
    breathability: 'High',
    badge: 'New Arrival',
    variants: [
      { id: 'w1', name: 'Texture View 1', colorHex: '#581825', image: '/linen/wine_1.png' },
      { id: 'w2', name: 'Texture View 2', colorHex: '#42121c', image: '/linen/wine_2.png' }
    ]
  },
  {
    id: 'f18',
    name: 'Placid Blue Linen',
    category: 'linen',
    patternClass: 'fabric-pattern-linen',
    desc: 'Calm and serene ocean-tinted placid blue linen with fine open slub weave. A refreshing Mediterranean aesthetic for summer tailoring.',
    origin: 'Italy',
    weight: '145 gsm',
    threadCount: '100% Pure Linen Slub',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'pb1', name: 'Texture View 1', colorHex: '#7fa4c4', image: '/linen/placid_blue_1.png' },
      { id: 'pb2', name: 'Texture View 2', colorHex: '#698fb0', image: '/linen/placid_blue_2.png' }
    ]
  },
  {
    id: 'f19',
    name: 'Plum Linen',
    category: 'linen',
    patternClass: 'fabric-pattern-linen',
    desc: 'Deep jewel-toned plum purple linen with luxurious dark violet undertones. Perfect for statement kurtas, blazers, and evening shirts.',
    origin: 'France',
    weight: '155 gsm',
    threadCount: 'Royal Dyed Flax',
    breathability: 'High',
    badge: 'New Arrival',
    variants: [
      { id: 'pl1', name: 'Texture View 1', colorHex: '#522b42', image: '/linen/plum_1.png' },
      { id: 'pl2', name: 'Texture View 2', colorHex: '#3d1f31', image: '/linen/plum_2.png' }
    ]
  },
  {
    id: 'f20',
    name: 'Sky Blue Linen',
    category: 'linen',
    patternClass: 'fabric-pattern-linen',
    desc: 'Crisp bright sky blue linen featuring a light, airy weave. A classic summer essential for sharp casual and formal shirting.',
    origin: 'Ireland',
    weight: '140 gsm',
    threadCount: '100% Fine Flax',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'sb1', name: 'Texture View 1', colorHex: '#87ceeb', image: '/linen/sky_blue_1.png' },
      { id: 'sb2', name: 'Texture View 2', colorHex: '#70bada', image: '/linen/sky_blue_2.png' }
    ]
  },
  {
    id: 'f21',
    name: 'Tuscan Beige Linen',
    category: 'linen',
    patternClass: 'fabric-pattern-linen',
    desc: 'Warm sun-kissed Tuscan sand beige linen woven from natural unbleached flax slubs. Effortless elegance for summer safari jackets and trousers.',
    origin: 'Italy',
    weight: '150 gsm',
    threadCount: 'Artisan Slub Flax',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'tb1', name: 'Texture View 1', colorHex: '#d8c29d', image: '/linen/tuscan_beige_1.png' },
      { id: 'tb2', name: 'Texture View 2', colorHex: '#c2ab85', image: '/linen/tuscan_beige_2.png' }
    ]
  },
  {
    id: 'f22',
    name: 'Bright Red Linen',
    category: 'linen',
    patternClass: 'fabric-pattern-linen',
    desc: 'Vibrant crimson bright red linen with rich yarn-dyed flax slubs. A bold statement color for celebration shirts and kurtas.',
    origin: 'France',
    weight: '155 gsm',
    threadCount: 'Yarn-Dyed Flax',
    breathability: 'High',
    badge: 'New Arrival',
    variants: [
      { id: 'br1', name: 'Texture View 1', colorHex: '#d92b2b', image: '/linen/bright_red_1.png' },
      { id: 'br2', name: 'Texture View 2', colorHex: '#b81d1d', image: '/linen/bright_red_2.png' }
    ]
  },
  {
    id: 'f23',
    name: 'Dusty Olive Green Linen',
    category: 'linen',
    patternClass: 'fabric-pattern-linen',
    desc: 'Sophisticated earthy dusty olive green linen with natural sage undertones. Ideal for casual safari jackets, shirts, and trousers.',
    origin: 'Italy',
    weight: '150 gsm',
    threadCount: '100% Pure Linen Slub',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'dog1', name: 'Texture View 1', colorHex: '#6b705c', image: '/linen/dusty_olive_green_1.png' },
      { id: 'dog2', name: 'Texture View 2', colorHex: '#555b49', image: '/linen/dusty_olive_green_2.png' }
    ]
  },
  {
    id: 'f24',
    name: 'Mango Yellow Linen',
    category: 'linen',
    patternClass: 'fabric-pattern-linen',
    desc: 'Warm sun-ripened mango mustard yellow linen featuring rich flax slub weave. Perfect for vibrant festive attire and resort wear.',
    origin: 'India',
    weight: '145 gsm',
    threadCount: '100% Pure Flax',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'my1', name: 'Texture View 1', colorHex: '#e5a93b', image: '/linen/mango_yellow_1.png' },
      { id: 'my2', name: 'Texture View 2', colorHex: '#cf9227', image: '/linen/mango_yellow_2.png' }
    ]
  },
  {
    id: 'f25',
    name: 'Cotton Candy Linen',
    category: 'linen',
    patternClass: 'fabric-pattern-linen',
    desc: 'Whimsical sweet pastel pink cotton candy linen featuring soft airy slub fibers. Perfect for light summer shirts, resort wear, and festive kurtas.',
    origin: 'France',
    weight: '140 gsm',
    threadCount: '100% Fine Flax',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'cc1', name: 'Texture View 1', colorHex: '#ffb7c5', image: '/linen/cotton_candy_1.png' },
      { id: 'cc2', name: 'Texture View 2', colorHex: '#f4a0b0', image: '/linen/cotton_candy_2.png' }
    ]
  },
  {
    id: 'f26',
    name: 'Soft Pink Linen',
    category: 'linen',
    patternClass: 'fabric-pattern-linen',
    desc: 'Elegant subtle blush soft pink linen with delicate natural flax texture. Offers a clean, sophisticated modern pastel aesthetic.',
    origin: 'Italy',
    weight: '145 gsm',
    threadCount: '100% Pure Linen Slub',
    breathability: 'Outstanding',
    badge: 'New Arrival',
    variants: [
      { id: 'sp1', name: 'Texture View 1', colorHex: '#e8b4b8', image: '/linen/soft_pink_1.png' },
      { id: 'sp2', name: 'Texture View 2', colorHex: '#d69fa4', image: '/linen/soft_pink_2.png' }
    ]
  },
  {
    id: 'stn_black',
    name: 'Jet Black Mulberry Satin',
    category: 'satin',
    patternClass: 'fabric-pattern-silk',
    image: '/satin/Black satin fabric 1.png',
    desc: 'Ultra-luxurious jet black Mulberry silk satin with high-gloss liquid shine, featherlight softness, and sleek formal drape for tuxedos & gowns.',
    origin: 'Italy',
    weight: '115 gsm',
    threadCount: '100% Pure Mulberry Satin',
    breathability: 'High',
    badge: 'Tuxedo Grade',
    variants: [
      { id: 'stn_blk_v1', name: 'Texture View 1', colorHex: '#141416', image: '/satin/Black satin fabric 1.png' },
      { id: 'stn_blk_v2', name: 'Texture View 2', colorHex: '#0c0c0e', image: '/satin/Black satin fabric 2.png' }
    ]
  },
  {
    id: 'stn_champagne_gold',
    name: 'Champagne Gold Liquid Satin',
    category: 'satin',
    patternClass: 'fabric-pattern-silk',
    image: '/satin/Champagne Gold satin fabric 1.png',
    desc: 'Luminous champagne gold satin with subtle metallic radiance and fluid drape. Perfect for bespoke evening wear, kurtas, and luxury linings.',
    origin: 'France',
    weight: '110 gsm',
    threadCount: '100% Pure Silk Satin',
    breathability: 'High',
    badge: 'Royal Glamour',
    variants: [
      { id: 'stn_cg_v1', name: 'Texture View 1', colorHex: '#e6d0a4', image: '/satin/Champagne Gold satin fabric 1.png' },
      { id: 'stn_cg_v2', name: 'Texture View 2', colorHex: '#d8be8f', image: '/satin/Champagne Gold satin fabric 2.png' }
    ]
  },
  {
    id: 'stn_cocoa_brown',
    name: 'Cocoa Brown Duchess Satin',
    category: 'satin',
    patternClass: 'fabric-pattern-silk',
    image: '/satin/Cocoa brown satin fabric 1.png',
    desc: 'Rich chocolate cocoa brown satin boasting opulent depth of color, heavyweight fluid drape, and silky smooth hand feel.',
    origin: 'Italy',
    weight: '125 gsm',
    threadCount: 'Duchess Satin Weave',
    breathability: 'High',
    badge: 'Bespoke Luxury',
    variants: [
      { id: 'stn_cb_v1', name: 'Texture View 1', colorHex: '#4d3326', image: '/satin/Cocoa brown satin fabric 1.png' },
      { id: 'stn_cb_v2', name: 'Texture View 2', colorHex: '#3d261b', image: '/satin/Cocoa brown satin fabric 2.png' }
    ]
  },
  {
    id: 'stn_coral_peach',
    name: 'Coral Peach Mulberry Satin',
    category: 'satin',
    patternClass: 'fabric-pattern-silk',
    image: '/satin/Coral peach satin fabric 1.png',
    desc: 'Radiant warm coral peach silk satin with soft golden undertones, silky touch, and vibrant light reflection for festive couture.',
    origin: 'Italy',
    weight: '110 gsm',
    threadCount: 'Fine Mulberry Satin',
    breathability: 'High',
    badge: 'Festive Special',
    variants: [
      { id: 'stn_cp_v1', name: 'Texture View 1', colorHex: '#e88d7d', image: '/satin/Coral peach satin fabric 1.png' },
      { id: 'stn_cp_v2', name: 'Texture View 2', colorHex: '#d67969', image: '/satin/Coral peach satin fabric 2.png' }
    ]
  },
  {
    id: 'stn_dark_blue',
    name: 'Imperial Navy Dark Blue Satin',
    category: 'satin',
    patternClass: 'fabric-pattern-silk',
    image: '/satin/Dark blue satin fabric 1.png',
    desc: 'Deep regal dark navy blue silk satin featuring intense jewel-toned radiance, elegant weight, and classic formal presence.',
    origin: 'France',
    weight: '120 gsm',
    threadCount: 'High-Density Silk Satin',
    breathability: 'High',
    badge: 'Royal Grade',
    variants: [
      { id: 'stn_db_v1', name: 'Texture View 1', colorHex: '#1b2a4a', image: '/satin/Dark blue satin fabric 1.png' },
      { id: 'stn_db_v2', name: 'Texture View 2', colorHex: '#121d36', image: '/satin/Dark blue satin fabric 2.png' }
    ]
  },
  {
    id: 'stn_dark_turquoise',
    name: 'Dark Turquoise Silk Satin',
    category: 'satin',
    patternClass: 'fabric-pattern-silk',
    image: '/satin/Dark turquoise satin fabric 1.png',
    desc: 'Vibrant oceanic dark turquoise teal satin offering mesmerising color shifting glow, ultra-smooth feel, and statement elegance.',
    origin: 'Italy',
    weight: '115 gsm',
    threadCount: 'Micro-Silk Satin Weave',
    breathability: 'High',
    badge: 'Statement Wear',
    variants: [
      { id: 'stn_dt_v1', name: 'Texture View 1', colorHex: '#1d6e75', image: '/satin/Dark turquoise satin fabric 1.png' },
      { id: 'stn_dt_v2', name: 'Texture View 2', colorHex: '#14565c', image: '/satin/Dark turquoise satin fabric 2.png' }
    ]
  },
  {
    id: 'stn_deep_olive_green',
    name: 'Deep Olive Green Satin',
    category: 'satin',
    patternClass: 'fabric-pattern-silk',
    image: '/satin/Deep Olive Green satin fabric 1.png',
    desc: 'Sophisticated botanical deep olive green satin with soft metallic undertones, silky drape, and understated luxury character.',
    origin: 'Italy',
    weight: '120 gsm',
    threadCount: 'Fine Silk Satin Weave',
    breathability: 'High',
    badge: 'Signature Satin',
    variants: [
      { id: 'stn_dog_v1', name: 'Texture View 1', colorHex: '#3b4a32', image: '/satin/Deep Olive Green satin fabric 1.png' },
      { id: 'stn_dog_v2', name: 'Texture View 2', colorHex: '#2d3b25', image: '/satin/Deep Olive Green satin fabric 2.png' }
    ]
  },
  {
    id: 'stn_dusty_rose',
    name: 'Dusty Rose Liquid Satin',
    category: 'satin',
    patternClass: 'fabric-pattern-silk',
    image: '/satin/Dusty rose satin fabric 1.png',
    desc: 'Romantic muted dusty rose blush silk satin. Unmatched softness with a delicate vintage luster for evening wear & bridal attire.',
    origin: 'France',
    weight: '110 gsm',
    threadCount: 'Pure Mulberry Satin',
    breathability: 'High',
    badge: 'Bridal & Evening',
    variants: [
      { id: 'stn_dr_v1', name: 'Texture View 1', colorHex: '#c78d9b', image: '/satin/Dusty rose satin fabric 1.png' },
      { id: 'stn_dr_v2', name: 'Texture View 2', colorHex: '#b57a88', image: '/satin/Dusty rose satin fabric 2.png' }
    ]
  },
  {
    id: 'stn_ivory',
    name: 'Pristine Ivory Silk Satin',
    category: 'satin',
    patternClass: 'fabric-pattern-silk',
    image: '/satin/Ivory satin fabric 1.png',
    desc: 'Pure pristine ivory white silk satin boasting pearl-like shimmer, fluid grace, and immaculate hand feel for wedding attire.',
    origin: 'Italy',
    weight: '115 gsm',
    threadCount: 'Ultra-Fine Silk Satin',
    breathability: 'High',
    badge: 'Bridal Grade',
    variants: [
      { id: 'stn_ivr_v1', name: 'Texture View 1', colorHex: '#f5f0e6', image: '/satin/Ivory satin fabric 1.png' },
      { id: 'stn_ivr_v2', name: 'Texture View 2', colorHex: '#e8e1d5', image: '/satin/Ivory satin fabric 2.png' }
    ]
  },
  {
    id: 'stn_mauve',
    name: 'Vintage Mauve Silk Satin',
    category: 'satin',
    patternClass: 'fabric-pattern-silk',
    image: '/satin/Mauve satin fabric 1.png',
    desc: 'Sophisticated dusty plum mauve satin woven from fine mulberry silk yarns, providing subtle warmth and fluid grace.',
    origin: 'France',
    weight: '115 gsm',
    threadCount: 'Mulberry Satin Weave',
    breathability: 'High',
    badge: 'New Arrival',
    variants: [
      { id: 'stn_mv_v1', name: 'Texture View 1', colorHex: '#9c6f82', image: '/satin/Mauve satin fabric 1.png' },
      { id: 'stn_mv_v2', name: 'Texture View 2', colorHex: '#885c6f', image: '/satin/Mauve satin fabric 2.png' }
    ]
  },
  {
    id: 'stn_pistachio',
    name: 'Pistachio Mint Silk Satin',
    category: 'satin',
    patternClass: 'fabric-pattern-silk',
    image: '/satin/Pistachio satin fabric 1.png',
    desc: 'Refreshing soft pistachio sage-mint silk satin with a luminous soft-focus sheen, cooling touch, and elegant pastel drape.',
    origin: 'Italy',
    weight: '110 gsm',
    threadCount: 'Fine Mulberry Satin',
    breathability: 'High',
    badge: 'Summer Luxe',
    variants: [
      { id: 'stn_pst_v1', name: 'Texture View 1', colorHex: '#9bb89c', image: '/satin/Pistachio satin fabric 1.png' },
      { id: 'stn_pst_v2', name: 'Texture View 2', colorHex: '#87a488', image: '/satin/Pistachio satin fabric 2.png' }
    ]
  },
  {
    id: 'stn_platinum_silver',
    name: 'Platinum Silver Duchess Satin',
    category: 'satin',
    patternClass: 'fabric-pattern-silk',
    image: '/satin/Platinum silver satin fabric 1.png',
    desc: 'Sleek metallic platinum silver duchess satin boasting crisp formal structure, liquid mirror shine, and high-end elegance.',
    origin: 'Italy',
    weight: '125 gsm',
    threadCount: 'Heavyweight Duchess Satin',
    breathability: 'High',
    badge: 'Formal Flagship',
    variants: [
      { id: 'stn_ps_v1', name: 'Texture View 1', colorHex: '#b0b8c2', image: '/satin/Platinum silver satin fabric 1.png' },
      { id: 'stn_ps_v2', name: 'Texture View 2', colorHex: '#9ca4ae', image: '/satin/Platinum silver satin fabric 2.png' }
    ]
  },
  {
    id: 'stn_ruby_red',
    name: 'Imperial Ruby Red Satin',
    category: 'satin',
    patternClass: 'fabric-pattern-silk',
    image: '/satin/Ruby red satin fabric 1.png',
    desc: 'Opulent deep crimson ruby red silk satin featuring vibrant jewel-tone radiance, rich weight, and regal festive charm.',
    origin: 'India',
    weight: '120 gsm',
    threadCount: 'Pure Mulberry Satin',
    breathability: 'High',
    badge: 'Wedding & Gala',
    variants: [
      { id: 'stn_rr_v1', name: 'Texture View 1', colorHex: '#a31c2b', image: '/satin/Ruby red satin fabric 1.png' },
      { id: 'stn_rr_v2', name: 'Texture View 2', colorHex: '#8c1320', image: '/satin/Ruby red satin fabric 2.png' }
    ]
  },
  {
    id: 'stn_rust_orange',
    name: 'Rust Orange Liquid Satin',
    category: 'satin',
    patternClass: 'fabric-pattern-silk',
    image: '/satin/Rust orange satin fabric 1.png',
    desc: 'Warm sunlit terracotta rust orange satin with rich golden reflection, supple smoothness, and bold autumn warmth.',
    origin: 'Italy',
    weight: '115 gsm',
    threadCount: 'Fine Silk Satin',
    breathability: 'High',
    badge: 'Signature Satin',
    variants: [
      { id: 'stn_ro_v1', name: 'Texture View 1', colorHex: '#c45a33', image: '/satin/Rust orange satin fabric 1.png' },
      { id: 'stn_ro_v2', name: 'Texture View 2', colorHex: '#b04924', image: '/satin/Rust orange satin fabric 2.png' }
    ]
  },
  {
    id: 'stn_sage',
    name: 'Sage Green Mulberry Satin',
    category: 'satin',
    patternClass: 'fabric-pattern-silk',
    image: '/satin/Sage satin fabric 1.png',
    desc: 'Tranquil soft sage green silk satin combining delicate botanical tones with liquid-smooth luster and graceful drape.',
    origin: 'France',
    weight: '110 gsm',
    threadCount: 'Pure Mulberry Satin',
    breathability: 'High',
    badge: 'New Arrival',
    variants: [
      { id: 'stn_sg_v1', name: 'Texture View 1', colorHex: '#7fa38a', image: '/satin/Sage satin fabric 1.png' },
      { id: 'stn_sg_v2', name: 'Texture View 2', colorHex: '#6c8e76', image: '/satin/Sage satin fabric 2.png' }
    ]
  },
  {
    id: 'stn_smokey_lavender',
    name: 'Smokey Lavender Silk Satin',
    category: 'satin',
    patternClass: 'fabric-pattern-silk',
    image: '/satin/Smokey lavender satin fabric 1.png',
    desc: 'Mystical dusky smokey lavender purple satin with silvery highlights, featherlight touch, and refined evening allure.',
    origin: 'Italy',
    weight: '110 gsm',
    threadCount: 'Fine Mulberry Satin',
    breathability: 'High',
    badge: 'New Arrival',
    variants: [
      { id: 'stn_sl_v1', name: 'Texture View 1', colorHex: '#9082a6', image: '/satin/Smokey lavender satin fabric 1.png' },
      { id: 'stn_sl_v2', name: 'Texture View 2', colorHex: '#7c6e92', image: '/satin/Smokey lavender satin fabric 2.png' }
    ]
  },
  {
    id: 'stn_smokey_lilac',
    name: 'Smokey Lilac Silk Satin',
    category: 'satin',
    patternClass: 'fabric-pattern-silk',
    image: '/satin/Smokey liac satin fabric 1.png',
    desc: 'Soft muted smokey lilac pink-violet silk satin offering delicate iridescent glow and fluid drape for couture garments.',
    origin: 'France',
    weight: '110 gsm',
    threadCount: 'Mulberry Satin Weave',
    breathability: 'High',
    badge: 'New Arrival',
    variants: [
      { id: 'stn_slc_v1', name: 'Texture View 1', colorHex: '#a489a6', image: '/satin/Smokey liac satin fabric 1.png' },
      { id: 'stn_slc_v2', name: 'Texture View 2', colorHex: '#907592', image: '/satin/Smokey liac satin fabric 2.png' }
    ]
  },
  {
    id: 'stn_steel_blue',
    name: 'Steel Blue Duchess Satin',
    category: 'satin',
    patternClass: 'fabric-pattern-silk',
    image: '/satin/Steel blue satin fabric 1.png',
    desc: 'Sleek slate steel blue satin with metallic oceanic shimmer, high structural body, and executive evening sophistication.',
    origin: 'Italy',
    weight: '125 gsm',
    threadCount: 'Duchess Satin Weave',
    breathability: 'High',
    badge: 'Executive Formal',
    variants: [
      { id: 'stn_stb_v1', name: 'Texture View 1', colorHex: '#48637a', image: '/satin/Steel blue satin fabric 1.png' },
      { id: 'stn_stb_v2', name: 'Texture View 2', colorHex: '#385066', image: '/satin/Steel blue satin fabric 2.png' }
    ]
  },
  {
    id: 'stn_terracotta',
    name: 'Terracotta Rust Silk Satin',
    category: 'satin',
    patternClass: 'fabric-pattern-silk',
    image: '/satin/Terracotta satin fabric 1.png',
    desc: 'Earthy Mediterranean terracotta rust silk satin featuring warm copper highlights and supple fluid drape.',
    origin: 'Italy',
    weight: '115 gsm',
    threadCount: 'Pure Mulberry Satin',
    breathability: 'High',
    badge: 'New Arrival',
    variants: [
      { id: 'stn_tc_v1', name: 'Texture View 1', colorHex: '#b8583a', image: '/satin/Terracotta satin fabric 1.png' },
      { id: 'stn_tc_v2', name: 'Texture View 2', colorHex: '#a4472a', image: '/satin/Terracotta satin fabric 2.png' }
    ]
  },
  {
    id: 'stn_camel',
    name: 'Camel Gold Silk Satin',
    category: 'satin',
    patternClass: 'fabric-pattern-silk',
    image: '/satin/camel satin fabric 1.png',
    desc: 'Warm rich golden camel tan silk satin with high-luster finish, supple soft hand feel, and timeless luxury aesthetic.',
    origin: 'Italy',
    weight: '115 gsm',
    threadCount: 'Fine Mulberry Satin',
    breathability: 'High',
    badge: 'Signature Satin',
    variants: [
      { id: 'stn_cml_v1', name: 'Texture View 1', colorHex: '#b89466', image: '/satin/camel satin fabric 1.png' },
      { id: 'stn_cml_v2', name: 'Texture View 2', colorHex: '#a48255', image: '/satin/camel satin fabric 2.png' }
    ]
  },
  {
    id: 'slk_amethyst_purple',
    name: 'Amethyst Purple Fine Silk',
    category: 'silk',
    image: '/silk/Amethyst Purple silk fabric 1.png',
    patternClass: 'fabric-pattern-silk',
    desc: 'Regal Amethyst Purple fine Mulberry silk featuring intense jewel-toned radiance, fluid drape, and lightweight soft touch for statement festive wear.',
    origin: 'Italy',
    weight: '105 gsm',
    threadCount: '100% Fine Pure Silk',
    breathability: 'High',
    badge: 'Pure Silk',
    variants: [
      { id: 'slk_ap_v1', name: 'Texture View 1', colorHex: '#6a3b7b', image: '/silk/Amethyst Purple silk fabric 1.png' },
      { id: 'slk_ap_v2', name: 'Texture View 2', colorHex: '#582d68', image: '/silk/Amethyst Purple silk fabric 2.png' }
    ]
  },
  {
    id: 'slk_bronze',
    name: 'Bronze Metallic Fine Silk',
    category: 'silk',
    image: '/silk/Bronze silk fabric 1.png',
    patternClass: 'fabric-pattern-silk',
    desc: 'Sophisticated warm bronze silk with subtle metallic sheen and supple fluid drape. Ideal for bespoke formal kurtas, shirts, and jacket linings.',
    origin: 'India',
    weight: '110 gsm',
    threadCount: '100% Fine Pure Silk',
    breathability: 'High',
    badge: 'Pure Silk',
    variants: [
      { id: 'slk_brz_v1', name: 'Texture View 1', colorHex: '#8c6747', image: '/silk/Bronze silk fabric 1.png' },
      { id: 'slk_brz_v2', name: 'Texture View 2', colorHex: '#785437', image: '/silk/Bronze silk fabric 2.png' }
    ]
  },
  {
    id: 'slk_burgundy',
    name: 'Burgundy Wine Fine Silk',
    category: 'silk',
    image: '/silk/Burgundy silk fabric 1.png',
    patternClass: 'fabric-pattern-silk',
    desc: 'Deep opulent burgundy wine pure silk woven with fine long-staple mulberry threads, offering rich color depth and immaculate drape.',
    origin: 'France',
    weight: '108 gsm',
    threadCount: '100% Fine Pure Silk',
    breathability: 'High',
    badge: 'Pure Silk',
    variants: [
      { id: 'slk_bur_v1', name: 'Texture View 1', colorHex: '#6b1d2f', image: '/silk/Burgundy silk fabric 1.png' },
      { id: 'slk_bur_v2', name: 'Texture View 2', colorHex: '#571524', image: '/silk/Burgundy silk fabric 2.png' }
    ]
  },
  {
    id: 'slk_butter_yellow',
    name: 'Butter Yellow Fine Silk',
    category: 'silk',
    image: '/silk/Butter yellow silk fabric 1.png',
    patternClass: 'fabric-pattern-silk',
    desc: 'Radiant warm butter yellow fine silk boasting light-reflecting luster, ultra-smooth touch, and delicate seasonal elegance.',
    origin: 'Italy',
    weight: '100 gsm',
    threadCount: '100% Fine Pure Silk',
    breathability: 'High',
    badge: 'Pure Silk',
    variants: [
      { id: 'slk_by_v1', name: 'Texture View 1', colorHex: '#f3e496', image: '/silk/Butter yellow silk fabric 1.png' },
      { id: 'slk_by_v2', name: 'Texture View 2', colorHex: '#e8d682', image: '/silk/Butter yellow silk fabric 2.png' }
    ]
  },
  {
    id: 'slk_chocolate_brown',
    name: 'Chocolate Brown Fine Silk',
    category: 'silk',
    image: '/silk/Choclate brown silk fabric 1.png',
    patternClass: 'fabric-pattern-silk',
    desc: 'Rich espresso chocolate brown pure silk with opulent warm undertones, heavyweight fluid drape, and silky smooth hand feel.',
    origin: 'Italy',
    weight: '112 gsm',
    threadCount: '100% Fine Pure Silk',
    breathability: 'High',
    badge: 'Pure Silk',
    variants: [
      { id: 'slk_cb_v1', name: 'Texture View 1', colorHex: '#4a3528', image: '/silk/Choclate brown silk fabric 1.png' },
      { id: 'slk_cb_v2', name: 'Texture View 2', colorHex: '#3b291d', image: '/silk/Choclate brown silk fabric 2.png' }
    ]
  },
  {
    id: 'slk_coral_peach',
    name: 'Coral Peach Fine Silk',
    category: 'silk',
    image: '/silk/Coral peach silk fabric 1.png',
    patternClass: 'fabric-pattern-silk',
    desc: 'Delicate coral peach fine silk with soft golden undertones, silky feel, and elegant light reflection for festive & formal tailoring.',
    origin: 'India',
    weight: '105 gsm',
    threadCount: '100% Fine Pure Silk',
    breathability: 'High',
    badge: 'Pure Silk',
    variants: [
      { id: 'slk_cp_v1', name: 'Texture View 1', colorHex: '#e4bfab', image: '/silk/Coral peach silk fabric 1.png' },
      { id: 'slk_cp_v2', name: 'Texture View 2', colorHex: '#d5ac97', image: '/silk/Coral peach silk fabric 2.png' }
    ]
  },
  {
    id: 'slk_deep_plum',
    name: 'Deep Plum Fine Silk',
    category: 'silk',
    image: '/silk/Deep plum silk fabric 1.png',
    patternClass: 'fabric-pattern-silk',
    desc: 'Sophisticated dark plum mauve fine silk boasting deep jewel tones, refined luster, and effortless drape for evening wear.',
    origin: 'France',
    weight: '110 gsm',
    threadCount: '100% Fine Pure Silk',
    breathability: 'High',
    badge: 'Pure Silk',
    variants: [
      { id: 'slk_dp_v1', name: 'Texture View 1', colorHex: '#522b47', image: '/silk/Deep plum silk fabric 1.png' },
      { id: 'slk_dp_v2', name: 'Texture View 2', colorHex: '#422039', image: '/silk/Deep plum silk fabric 2.png' }
    ]
  },
  {
    id: 'slk_deep_teal',
    name: 'Deep Teal Fine Silk',
    category: 'silk',
    image: '/silk/deep teal silk fabric 1.png',
    patternClass: 'fabric-pattern-silk',
    desc: 'Enchanting deep teal blue-green pure silk combining dramatic color saturation with liquid-smooth softness and formal presence.',
    origin: 'Italy',
    weight: '108 gsm',
    threadCount: '100% Fine Pure Silk',
    breathability: 'High',
    badge: 'Pure Silk',
    variants: [
      { id: 'slk_dt_v1', name: 'Texture View 1', colorHex: '#1c5253', image: '/silk/deep teal silk fabric 1.png' },
      { id: 'slk_dt_v2', name: 'Texture View 2', colorHex: '#133f40', image: '/silk/deep teal silk fabric 2.png' }
    ]
  },
  {
    id: 'slk_dusty_blue',
    name: 'Dusty Blue Fine Silk',
    category: 'silk',
    image: '/silk/Dusty blue silk fabric 1.png',
    patternClass: 'fabric-pattern-silk',
    desc: 'Serene dusty slate blue fine silk featuring a soft pastel shimmer, cooling hand-feel, and versatile executive drape.',
    origin: 'Italy',
    weight: '105 gsm',
    threadCount: '100% Fine Pure Silk',
    breathability: 'High',
    badge: 'Pure Silk',
    variants: [
      { id: 'slk_dbl_v1', name: 'Texture View 1', colorHex: '#5e7a92', image: '/silk/Dusty blue silk fabric 1.png' },
      { id: 'slk_dbl_v2', name: 'Texture View 2', colorHex: '#4b6478', image: '/silk/Dusty blue silk fabric 2.png' }
    ]
  },
  {
    id: 'slk_emerald_green',
    name: 'Emerald Green Fine Silk',
    category: 'silk',
    image: '/silk/Emerald green silk fabric 1.png',
    patternClass: 'fabric-pattern-silk',
    desc: 'Vibrant imperial emerald green pure silk with high-gloss sheen, rich tactile depth, and royal distinction for couture garments.',
    origin: 'India',
    weight: '110 gsm',
    threadCount: '100% Fine Pure Silk',
    breathability: 'High',
    badge: 'Pure Silk',
    variants: [
      { id: 'slk_eg_v1', name: 'Texture View 1', colorHex: '#144e39', image: '/silk/Emerald green silk fabric 1.png' },
      { id: 'slk_eg_v2', name: 'Texture View 2', colorHex: '#0e3d2c', image: '/silk/Emerald green silk fabric 2.png' }
    ]
  },
  {
    id: 'slk_graphite',
    name: 'Graphite Charcoal Fine Silk',
    category: 'silk',
    image: '/silk/Graphite silk fabric 1.png',
    patternClass: 'fabric-pattern-silk',
    desc: 'Modern graphite charcoal grey fine silk delivering sleek minimalist sophistication, subtle silver undertones, and smooth drape.',
    origin: 'Italy',
    weight: '110 gsm',
    threadCount: '100% Fine Pure Silk',
    breathability: 'High',
    badge: 'Pure Silk',
    variants: [
      { id: 'slk_grp_v1', name: 'Texture View 1', colorHex: '#383b42', image: '/silk/Graphite silk fabric 1.png' },
      { id: 'slk_grp_v2', name: 'Texture View 2', colorHex: '#2d3036', image: '/silk/Graphite silk fabric 2.png' }
    ]
  },
  {
    id: 'slk_jet_black',
    name: 'Jet Black Fine Silk',
    category: 'silk',
    image: '/silk/jet black silk fabric 1.png',
    patternClass: 'fabric-pattern-silk',
    desc: 'Ultra-luxurious jet black Mulberry fine silk featuring fluid drape, midnight radiance, and timeless tuxedo & gown luxury.',
    origin: 'Italy',
    weight: '115 gsm',
    threadCount: '100% Fine Pure Silk',
    breathability: 'High',
    badge: 'Pure Silk',
    variants: [
      { id: 'slk_jb_v1', name: 'Texture View 1', colorHex: '#1c1c1e', image: '/silk/jet black silk fabric 1.png' },
      { id: 'slk_jb_v2', name: 'Texture View 2', colorHex: '#121214', image: '/silk/jet black silk fabric 2.png' }
    ]
  },
  {
    id: 'slk_midnight_navy',
    name: 'Midnight Navy Fine Silk',
    category: 'silk',
    image: '/silk/Midnight navy silk fabric 1.png',
    patternClass: 'fabric-pattern-silk',
    desc: 'Classic deep midnight navy blue fine silk with subtle lustrous highlights and superior formal drape for luxury evening attire.',
    origin: 'Italy',
    weight: '110 gsm',
    threadCount: '100% Fine Pure Silk',
    breathability: 'High',
    badge: 'Pure Silk',
    variants: [
      { id: 'slk_mn_v1', name: 'Texture View 1', colorHex: '#1b2936', image: '/silk/Midnight navy silk fabric 1.png' },
      { id: 'slk_mn_v2', name: 'Texture View 2', colorHex: '#121c26', image: '/silk/Midnight navy silk fabric 2.png' }
    ]
  },
  {
    id: 'slk_rust_orange',
    name: 'Rust Orange Fine Silk',
    category: 'silk',
    image: '/silk/rust orange silk fabric 1.png',
    patternClass: 'fabric-pattern-silk',
    desc: 'Warm burnt rust orange pure silk with rich metallic undertones and fluid drape for statement kurtas and festive attire.',
    origin: 'India',
    weight: '108 gsm',
    threadCount: '100% Fine Pure Silk',
    breathability: 'High',
    badge: 'Pure Silk',
    variants: [
      { id: 'slk_ro_v1', name: 'Texture View 1', colorHex: '#b85935', image: '/silk/rust orange silk fabric 1.png' },
      { id: 'slk_ro_v2', name: 'Texture View 2', colorHex: '#a04a29', image: '/silk/rust orange silk fabric 2.png' }
    ]
  },
  {
    id: 'slk_sage',
    name: 'Sage Green Fine Silk',
    category: 'silk',
    image: '/silk/Sage silk fabric 1.png',
    patternClass: 'fabric-pattern-silk',
    desc: 'Tranquil soft sage green fine silk combining delicate botanical tones with soft sheen and light cooling touch.',
    origin: 'France',
    weight: '105 gsm',
    threadCount: '100% Fine Pure Silk',
    breathability: 'High',
    badge: 'Pure Silk',
    variants: [
      { id: 'slk_sg_v1', name: 'Texture View 1', colorHex: '#84a991', image: '/silk/Sage silk fabric 1.png' },
      { id: 'slk_sg_v2', name: 'Texture View 2', colorHex: '#71967e', image: '/silk/Sage silk fabric 2.png' }
    ]
  },
  {
    id: 'slk_silver',
    name: 'Silver Metallic Fine Silk',
    category: 'silk',
    image: '/silk/Silver silk fabric 1.png',
    patternClass: 'fabric-pattern-silk',
    desc: 'Luminous platinum silver fine silk boasting high-reflective sheen, crisp fluid drape, and immaculate formal glamour.',
    origin: 'Italy',
    weight: '108 gsm',
    threadCount: '100% Fine Pure Silk',
    breathability: 'High',
    badge: 'Pure Silk',
    variants: [
      { id: 'slk_slv_v1', name: 'Texture View 1', colorHex: '#c4c8cc', image: '/silk/Silver silk fabric 1.png' },
      { id: 'slk_slv_v2', name: 'Texture View 2', colorHex: '#b2b6bb', image: '/silk/Silver silk fabric 2.png' }
    ]
  },
  {
    id: 'slk_silvery_blue',
    name: 'Silvery Blue Fine Silk',
    category: 'silk',
    image: '/silk/Silvery blue silk fabric 1.png',
    patternClass: 'fabric-pattern-silk',
    desc: 'Ethereal silvery sky blue fine silk offering iridescent shimmer, delicate cool touch, and refined luxury appeal.',
    origin: 'Italy',
    weight: '105 gsm',
    threadCount: '100% Fine Pure Silk',
    breathability: 'High',
    badge: 'Pure Silk',
    variants: [
      { id: 'slk_sb_v1', name: 'Texture View 1', colorHex: '#88a2b8', image: '/silk/Silvery blue silk fabric 1.png' },
      { id: 'slk_sb_v2', name: 'Texture View 2', colorHex: '#7690a6', image: '/silk/Silvery blue silk fabric 2.png' }
    ]
  },
  {
    id: 'slk_taupe',
    name: 'Warm Taupe Fine Silk',
    category: 'silk',
    image: '/silk/Taupe silk fabric 1.png',
    patternClass: 'fabric-pattern-silk',
    desc: 'Sophisticated warm taupe grey-brown pure silk with smooth luster, versatile elegance, and fluid drape.',
    origin: 'France',
    weight: '108 gsm',
    threadCount: '100% Fine Pure Silk',
    breathability: 'High',
    badge: 'Pure Silk',
    variants: [
      { id: 'slk_tp_v1', name: 'Texture View 1', colorHex: '#8c7d72', image: '/silk/Taupe silk fabric 1.png' },
      { id: 'slk_tp_v2', name: 'Texture View 2', colorHex: '#78695f', image: '/silk/Taupe silk fabric 2.png' }
    ]
  },
  {
    id: 'slk_warm_ivory',
    name: 'Warm Ivory Fine Silk',
    category: 'silk',
    image: '/silk/Warm ivory slik fabric 1.png',
    patternClass: 'fabric-pattern-silk',
    desc: 'Pristine warm ivory white fine silk with soft pearl shimmer, featherlight feel, and immaculate bridal and festive grace.',
    origin: 'Italy',
    weight: '105 gsm',
    threadCount: '100% Fine Pure Silk',
    breathability: 'High',
    badge: 'Pure Silk',
    variants: [
      { id: 'slk_wi_v1', name: 'Texture View 1', colorHex: '#f4eee0', image: '/silk/Warm ivory slik fabric 1.png' },
      { id: 'slk_wi_v2', name: 'Texture View 2', colorHex: '#e8dfcd', image: '/silk/Warm ivory slik fabric 2.png' }
    ]
  },
  {
    id: 'wl_blue',
    name: 'Royal Blue Suiting Wool',
    category: 'wool',
    patternClass: 'fabric-pattern-wool',
    image: '/wool/Blue wool fabric 1.png',
    desc: 'Luminous royal blue fine suiting wool woven from Super 140s Australian Merino fibers. Features immaculate drape, natural elasticity, and year-round breathability for luxury tailored suits.',
    origin: 'Australia (Biella Mill)',
    weight: '265 gsm',
    threadCount: 'Super 140s Merino Wool',
    breathability: 'High',
    badge: 'Pure Wool',
    variants: [
      { id: 'wl_bl_v1', name: 'Texture View 1', colorHex: '#315582', image: '/wool/Blue wool fabric 1.png' },
      { id: 'wl_bl_v2', name: 'Texture View 2', colorHex: '#27446b', image: '/wool/Blue wool fabric 2.png' }
    ]
  },
  {
    id: 'wl_brown',
    name: 'Espresso Brown Suiting Wool',
    category: 'wool',
    patternClass: 'fabric-pattern-wool',
    image: '/wool/Brown wool fabric 1.png',
    desc: 'Rich espresso brown suiting wool featuring a velvety smooth hand feel, high wrinkle recovery, and warm executive sophistication for bespoke suiting.',
    origin: 'Italy',
    weight: '270 gsm',
    threadCount: 'Super 130s Pure Wool',
    breathability: 'High',
    badge: 'Pure Wool',
    variants: [
      { id: 'wl_br_v1', name: 'Texture View 1', colorHex: '#5e4133', image: '/wool/Brown wool fabric 1.png' },
      { id: 'wl_br_v2', name: 'Texture View 2', colorHex: '#4d3428', image: '/wool/Brown wool fabric 2.png' }
    ]
  },
  {
    id: 'wl_charcoal_black',
    name: 'Charcoal Black Suiting Wool',
    category: 'wool',
    patternClass: 'fabric-pattern-wool',
    image: '/wool/Charcol black wool fabric 1.png',
    desc: 'Regal charcoal black fine suiting wool. Offers supreme formal elegance, deep matte luster, and flawless tailoring drape for black-tie suits and tuxedos.',
    origin: 'England',
    weight: '280 gsm',
    threadCount: 'Super 150s Merino Wool',
    breathability: 'High',
    badge: 'Executive Black',
    variants: [
      { id: 'wl_cb_v1', name: 'Texture View 1', colorHex: '#2c2e33', image: '/wool/Charcol black wool fabric 1.png' },
      { id: 'wl_cb_v2', name: 'Texture View 2', colorHex: '#1e2024', image: '/wool/Charcol black wool fabric 2.png' }
    ]
  },
  {
    id: 'wl_grey',
    name: 'Classic Slate Grey Suiting Wool',
    category: 'wool',
    patternClass: 'fabric-pattern-wool',
    image: '/wool/Grey wool fabric 1.png',
    desc: 'Timeless slate grey suiting wool. Offers exceptional structural resilience, wrinkle-free performance, and subtle sheen for corporate & formal tailoring.',
    origin: 'England',
    weight: '275 gsm',
    threadCount: 'Super 140s Fine Merino',
    breathability: 'High',
    badge: 'Pure Wool',
    variants: [
      { id: 'wl_gr_v1', name: 'Texture View 1', colorHex: '#6d757d', image: '/wool/Grey wool fabric 1.png' },
      { id: 'wl_gr_v2', name: 'Texture View 2', colorHex: '#585e65', image: '/wool/Grey wool fabric 2.png' }
    ]
  },
  {
    id: 'wl_honey_gold',
    name: 'Honey Gold Suiting Wool',
    category: 'wool',
    patternClass: 'fabric-pattern-wool',
    image: '/wool/Honey gold wool fabric 1.png',
    desc: 'Opulent honey gold wool featuring warm golden tones, silky tactile smoothness, and distinctive Italian flair for statement blazers and kurtas.',
    origin: 'Italy',
    weight: '260 gsm',
    threadCount: 'Super 130s Pure Wool',
    breathability: 'High',
    badge: 'Signature Luster',
    variants: [
      { id: 'wl_hg_v1', name: 'Texture View 1', colorHex: '#d8a04f', image: '/wool/Honey gold wool fabric 1.png' },
      { id: 'wl_hg_v2', name: 'Texture View 2', colorHex: '#c48e3d', image: '/wool/Honey gold wool fabric 2.png' }
    ]
  },
  {
    id: 'wl_khaki',
    name: 'Sandy Khaki Suiting Wool',
    category: 'wool',
    patternClass: 'fabric-pattern-wool',
    image: '/wool/Khaki wool fabric 1.png',
    desc: 'Sophisticated sandy khaki fine suiting wool. Crafted for lightweight, breathable summer tailoring and versatile smart-casual blazers.',
    origin: 'Italy',
    weight: '250 gsm',
    threadCount: 'Super 130s Pure Wool',
    breathability: 'High',
    badge: 'Pure Wool',
    variants: [
      { id: 'wl_kh_v1', name: 'Texture View 1', colorHex: '#a99879', image: '/wool/Khaki wool fabric 1.png' },
      { id: 'wl_kh_v2', name: 'Texture View 2', colorHex: '#948366', image: '/wool/Khaki wool fabric 2.png' }
    ]
  },
  {
    id: 'wl_latte',
    name: 'Warm Latte Suiting Wool',
    category: 'wool',
    patternClass: 'fabric-pattern-wool',
    image: '/wool/Latte wool fabric 1.png',
    desc: 'Creamy warm latte beige fine suiting wool. Delivers soft neutral aesthetic, compact weave structure, and luxurious fluid drape.',
    origin: 'Italy',
    weight: '255 gsm',
    threadCount: 'Super 140s Fine Merino',
    breathability: 'High',
    badge: 'Pure Wool',
    variants: [
      { id: 'wl_lt_v1', name: 'Texture View 1', colorHex: '#c2ab91', image: '/wool/Latte wool fabric 1.png' },
      { id: 'wl_lt_v2', name: 'Texture View 2', colorHex: '#b0997f', image: '/wool/Latte wool fabric 2.png' }
    ]
  },
  {
    id: 'wl_mauve',
    name: 'Dusty Mauve Suiting Wool',
    category: 'wool',
    patternClass: 'fabric-pattern-wool',
    image: '/wool/Mauve wool fabric 1.png',
    desc: 'Elegant dusty mauve pink wool suiting. Soft pastel undertones paired with breathable extra-fine Merino fibers for modern bespoke tailoring.',
    origin: 'France',
    weight: '260 gsm',
    threadCount: 'Super 140s Wool',
    breathability: 'High',
    badge: 'Pure Wool',
    variants: [
      { id: 'wl_mv_v1', name: 'Texture View 1', colorHex: '#9e7c87', image: '/wool/Mauve wool fabric 1.png' },
      { id: 'wl_mv_v2', name: 'Texture View 2', colorHex: '#8b6974', image: '/wool/Mauve wool fabric 2.png' }
    ]
  },
  {
    id: 'wl_mocha',
    name: 'Rich Mocha Suiting Wool',
    category: 'wool',
    patternClass: 'fabric-pattern-wool',
    image: '/wool/Mocha wool fabric 1.png',
    desc: 'Deep rich mocha brown wool suiting with chocolate undertones, warm tactile finish, and robust structural resilience.',
    origin: 'Italy',
    weight: '275 gsm',
    threadCount: 'Super 130s Merino',
    breathability: 'High',
    badge: 'Pure Wool',
    variants: [
      { id: 'wl_mc_v1', name: 'Texture View 1', colorHex: '#705345', image: '/wool/Mocha wool fabric 1.png' },
      { id: 'wl_mc_v2', name: 'Texture View 2', colorHex: '#5d4134', image: '/wool/Mocha wool fabric 2.png' }
    ]
  },
  {
    id: 'wl_olive',
    name: 'Earthy Olive Green Suiting Wool',
    category: 'wool',
    patternClass: 'fabric-pattern-wool',
    image: '/wool/Olive wool fabric 1.png',
    desc: 'Distinguished olive green wool suiting with rich organic earth tones, luxurious softness, and flawless drape for modern bespoke tailoring.',
    origin: 'Italy',
    weight: '270 gsm',
    threadCount: 'Super 140s Wool',
    breathability: 'High',
    badge: 'Pure Wool',
    variants: [
      { id: 'wl_ol_v1', name: 'Texture View 1', colorHex: '#525d43', image: '/wool/Olive wool fabric 1.png' },
      { id: 'wl_ol_v2', name: 'Texture View 2', colorHex: '#424c35', image: '/wool/Olive wool fabric 2.png' }
    ]
  },
  {
    id: 'wl_pearl_white',
    name: 'Pearl White Suiting Wool',
    category: 'wool',
    patternClass: 'fabric-pattern-wool',
    image: '/wool/Pearl white wool fabric 1.png',
    desc: 'Luminous ivory pearl white suiting wool. Immaculate purity and silk-like soft hand feel for ceremonial tuxedos and wedding blazers.',
    origin: 'Italy',
    weight: '260 gsm',
    threadCount: 'Super 150s Pure Wool',
    breathability: 'High',
    badge: 'Ceremonial White',
    variants: [
      { id: 'wl_pw_v1', name: 'Texture View 1', colorHex: '#edebe6', image: '/wool/Pearl white wool fabric 1.png' },
      { id: 'wl_pw_v2', name: 'Texture View 2', colorHex: '#dcdad5', image: '/wool/Pearl white wool fabric 2.png' }
    ]
  },
  {
    id: 'wl_petrol_blue',
    name: 'Petrol Blue Suiting Wool',
    category: 'wool',
    patternClass: 'fabric-pattern-wool',
    image: '/wool/Petrol blue wool fabric 1.png',
    desc: 'Deep oceanic petrol blue suiting wool. Captivating teal-blue undertones with crisp shape retention and refined formal drape.',
    origin: 'England',
    weight: '270 gsm',
    threadCount: 'Super 140s Merino',
    breathability: 'High',
    badge: 'Pure Wool',
    variants: [
      { id: 'wl_pb_v1', name: 'Texture View 1', colorHex: '#1f4f5b', image: '/wool/Petrol blue wool fabric 1.png' },
      { id: 'wl_pb_v2', name: 'Texture View 2', colorHex: '#153e49', image: '/wool/Petrol blue wool fabric 2.png' }
    ]
  },
  {
    id: 'wl_burgundy',
    name: 'Burgundy Wine Suiting Wool',
    category: 'wool',
    patternClass: 'fabric-pattern-wool',
    image: '/wool/burgundy wool fabric 1.png',
    desc: 'Opulent deep burgundy wine fine suiting wool. Rich jewel-toned luster perfect for dinner jackets, tuxedos, and statement evening suits.',
    origin: 'Italy',
    weight: '275 gsm',
    threadCount: 'Super 150s Merino Wool',
    breathability: 'High',
    badge: 'Pure Wool',
    variants: [
      { id: 'wl_bg_v1', name: 'Texture View 1', colorHex: '#6c2533', image: '/wool/burgundy wool fabric 1.png' },
      { id: 'wl_bg_v2', name: 'Texture View 2', colorHex: '#591c27', image: '/wool/burgundy wool fabric 2.png' }
    ]
  },
  {
    id: 'wl_camel',
    name: 'Camel Tan Suiting Wool',
    category: 'wool',
    patternClass: 'fabric-pattern-wool',
    image: '/wool/camel wool fabric 1.png',
    desc: 'Classic warm camel tan suiting wool featuring a silky smooth finish, supreme thermal comfort, and iconic Italian elegance.',
    origin: 'Italy',
    weight: '280 gsm',
    threadCount: 'Super 140s Wool',
    breathability: 'High',
    badge: 'Pure Wool',
    variants: [
      { id: 'wl_cm_v1', name: 'Texture View 1', colorHex: '#be8c5c', image: '/wool/camel wool fabric 1.png' },
      { id: 'wl_cm_v2', name: 'Texture View 2', colorHex: '#a97a4d', image: '/wool/camel wool fabric  2.png' }
    ]
  },
  {
    id: 'wl_dusty_lavender',
    name: 'Dusty Lavender Suiting Wool',
    category: 'wool',
    patternClass: 'fabric-pattern-wool',
    image: '/wool/dusty lavender wool fabric 1.png',
    desc: 'Refined dusty lavender pastel wool suiting with an ultra-fine compact weave, soft fluid drape, and contemporary aesthetic.',
    origin: 'France',
    weight: '260 gsm',
    threadCount: 'Super 140s Fine Wool',
    breathability: 'High',
    badge: 'Pure Wool',
    variants: [
      { id: 'wl_dl_v1', name: 'Texture View 1', colorHex: '#8b7e94', image: '/wool/dusty lavender wool fabric 1.png' },
      { id: 'wl_dl_v2', name: 'Texture View 2', colorHex: '#776b80', image: '/wool/dusty lavender wool fabric 2.png' }
    ]
  },
  {
    id: 'wl_forest_pine',
    name: 'Forest Pine Suiting Wool',
    category: 'wool',
    patternClass: 'fabric-pattern-wool',
    image: '/wool/forest pine wool fabric 1.png',
    desc: 'Deep emerald forest pine green suiting wool with rich botanical depth, natural wrinkle resistance, and executive prestige.',
    origin: 'England',
    weight: '275 gsm',
    threadCount: 'Super 140s Merino',
    breathability: 'High',
    badge: 'Pure Wool',
    variants: [
      { id: 'wl_fp_v1', name: 'Texture View 1', colorHex: '#254736', image: '/wool/forest pine wool fabric 1.png' },
      { id: 'wl_fp_v2', name: 'Texture View 2', colorHex: '#183627', image: '/wool/forest pine wool fabric 2.png' }
    ]
  },
  {
    id: 'wl_plum_purple',
    name: 'Plum Purple Suiting Wool',
    category: 'wool',
    patternClass: 'fabric-pattern-wool',
    image: '/wool/plum purple wool fabric 1.png',
    desc: 'Opulent deep plum purple suiting wool featuring jewel-toned luster, velvety tactile softness, and regal tailored presence.',
    origin: 'Italy',
    weight: '270 gsm',
    threadCount: 'Super 150s Merino',
    breathability: 'High',
    badge: 'Pure Wool',
    variants: [
      { id: 'wl_pp_v1', name: 'Texture View 1', colorHex: '#592743', image: '/wool/plum purple wool fabric 1.png' },
      { id: 'wl_pp_v2', name: 'Texture View 2', colorHex: '#471c34', image: '/wool/plum purple wool fabric 2.png' }
    ]
  },
  {
    id: 'wl_rust_boucle',
    name: 'Rust Bouclé Textured Wool',
    category: 'wool',
    patternClass: 'fabric-pattern-wool',
    image: '/wool/rust Bouclé wool fabric 1.png',
    desc: 'Distinctive rust orange bouclé textured wool. Features looped yarn micro-texture, rich warmth, and eye-catching tactile depth for bespoke blazers and coats.',
    origin: 'Italy',
    weight: '290 gsm',
    threadCount: 'Bouclé Wool Weave',
    breathability: 'Medium-High',
    badge: 'Textured Wool',
    variants: [
      { id: 'wl_rb_v1', name: 'Texture View 1', colorHex: '#ac4d33', image: '/wool/rust Bouclé wool fabric 1.png' },
      { id: 'wl_rb_v2', name: 'Texture View 2', colorHex: '#964028', image: '/wool/rust Bouclé wool fabric 2.png' }
    ]
  },
  {
    id: 'wl_sandstone',
    name: 'Sandstone Beige Suiting Wool',
    category: 'wool',
    patternClass: 'fabric-pattern-wool',
    image: '/wool/sandstone wool fabric 1.png',
    desc: 'Warm sandstone tan wool suiting offering light neutral elegance, smooth breathable weave, and timeless versatility.',
    origin: 'Italy',
    weight: '255 gsm',
    threadCount: 'Super 130s Merino',
    breathability: 'High',
    badge: 'Pure Wool',
    variants: [
      { id: 'wl_ss_v1', name: 'Texture View 1', colorHex: '#d4c2a5', image: '/wool/sandstone wool fabric 1.png' },
      { id: 'wl_ss_v2', name: 'Texture View 2', colorHex: '#c2b093', image: '/wool/sandstone wool fabric 2.png' }
    ]
  },
  {
    id: 'wl_sapphire_blue',
    name: 'Sapphire Blue Suiting Wool',
    category: 'wool',
    patternClass: 'fabric-pattern-wool',
    image: '/wool/sapphire blue wool fabric 1.png',
    desc: 'Deep vibrant sapphire blue suiting wool crafted from extra-fine Australian Merino yarn with rich sheen and flawless structural drape.',
    origin: 'Australia',
    weight: '270 gsm',
    threadCount: 'Super 140s Wool',
    breathability: 'High',
    badge: 'Pure Wool',
    variants: [
      { id: 'wl_sb_v1', name: 'Texture View 1', colorHex: '#1d3b66', image: '/wool/sapphire blue wool fabric 1.png' },
      { id: 'wl_sb_v2', name: 'Texture View 2', colorHex: '#142c4f', image: '/wool/sapphire blue wool fabric 2.png' }
    ]
  },
  {
    id: 'arm_black',
    name: 'Armani Black Suiting Wool',
    category: 'armani',
    image: '/armani/Armani fabric black 1.png',
    patternClass: 'fabric-pattern-armani',
    desc: 'Deep jet black luxury suiting wool from the house of Giorgio Armani. Superior fluid drape, high structural resilience, and iconic formal elegance.',
    origin: 'Italy',
    weight: '275 gsm',
    threadCount: 'Super 150s Wool-Silk',
    breathability: 'High',
    badge: 'Armani Suiting',
    variants: [
      { id: 'arm_blk_v1', name: 'Texture View 1', colorHex: '#1c1d21', image: '/armani/Armani fabric black 1.png' },
      { id: 'arm_blk_v2', name: 'Texture View 2', colorHex: '#111215', image: '/armani/Armani fabric black 2.png' }
    ]
  },
  {
    id: 'arm_grey',
    name: 'Armani Slate Grey Suiting Wool',
    category: 'armani',
    image: '/armani/armani fabric grey 1.png',
    patternClass: 'fabric-pattern-armani',
    desc: 'Refined Slate Grey fine wool suiting by Giorgio Armani. Timeless corporate and formal elegance with structured drape and subtle luster.',
    origin: 'Italy',
    weight: '275 gsm',
    threadCount: 'Super 150s Wool-Silk',
    breathability: 'High',
    badge: 'Armani Suiting',
    variants: [
      { id: 'arm_gry_v1', name: 'Texture View 1', colorHex: '#687178', image: '/armani/armani fabric grey 1.png' },
      { id: 'arm_gry_v2', name: 'Texture View 2', colorHex: '#535a60', image: '/armani/armani fabric grey 2.png' }
    ]
  },
  {
    id: 'arm_charcoal_grey',
    name: 'Armani Charcoal Grey Suiting Wool',
    category: 'armani',
    image: '/armani/armani fabric charchol grey 1.png',
    patternClass: 'fabric-pattern-armani',
    desc: 'Deep Charcoal Grey fine Italian wool suiting. Premium dark shade providing modern executive sophistication.',
    origin: 'Italy',
    weight: '275 gsm',
    threadCount: 'Super 150s Wool-Silk',
    breathability: 'High',
    badge: 'Armani Suiting',
    variants: [
      { id: 'arm_chg_v1', name: 'Texture View 1', colorHex: '#3c4146', image: '/armani/armani fabric charchol grey 1.png' },
      { id: 'arm_chg_v2', name: 'Texture View 2', colorHex: '#2d3135', image: '/armani/armani fabric charchol grey 2.png' }
    ]
  },
  {
    id: 'arm_slate_blue',
    name: 'Armani Slate Blue Suiting Wool',
    category: 'armani',
    image: '/armani/armani fabric slate blue 1.png',
    patternClass: 'fabric-pattern-armani',
    desc: 'Distinguished Slate Blue fine suiting wool from Armani. Deep oceanic tones crafted for modern executive suits.',
    origin: 'Italy',
    weight: '275 gsm',
    threadCount: 'Super 150s Wool-Silk',
    breathability: 'High',
    badge: 'Armani Suiting',
    variants: [
      { id: 'arm_sbl_v1', name: 'Texture View 1', colorHex: '#4a5b6d', image: '/armani/armani fabric slate blue 1.png' },
      { id: 'arm_sbl_v2', name: 'Texture View 2', colorHex: '#394757', image: '/armani/armani fabric slate blue 2.png' }
    ]
  },
  {
    id: 'arm_soft_blue_gray',
    name: 'Armani Soft Blue Gray Suiting Wool',
    category: 'armani',
    image: '/armani/armani fabric soft blue gray 1.png',
    patternClass: 'fabric-pattern-armani',
    desc: 'Luminous Soft Blue Gray suiting wool. Subtle powdery blue-grey finish offering refined summer tailoring.',
    origin: 'Italy',
    weight: '275 gsm',
    threadCount: 'Super 150s Wool-Silk',
    breathability: 'High',
    badge: 'Armani Suiting',
    variants: [
      { id: 'arm_sbg_v1', name: 'Texture View 1', colorHex: '#607282', image: '/armani/armani fabric soft blue gray 1.png' },
      { id: 'arm_sbg_v2', name: 'Texture View 2', colorHex: '#4d5d6c', image: '/armani/armani fabric soft blue gray 2.png' }
    ]
  },
  {
    id: 'arm_mocha_brown',
    name: 'Armani Rich Mocha Brown Suiting Wool',
    category: 'armani',
    image: '/armani/Armani fabric rich mocha brown 1.png',
    patternClass: 'fabric-pattern-armani',
    desc: 'Warm Rich Mocha Brown suiting wool by Armani. Premium Italian weave boasting a subtle luster and luxurious hand feel.',
    origin: 'Italy',
    weight: '275 gsm',
    threadCount: 'Super 150s Wool-Silk',
    breathability: 'High',
    badge: 'Armani Suiting',
    variants: [
      { id: 'arm_mch_v1', name: 'Texture View 1', colorHex: '#594236', image: '/armani/Armani fabric rich mocha brown 1.png' },
      { id: 'arm_mch_v2', name: 'Texture View 2', colorHex: '#453228', image: '/armani/Armani fabric rich mocha brown 2.png' }
    ]
  },
  {
    id: 'arm_mushroom_taupe',
    name: 'Armani Muted Mushroom Taupe Suiting Wool',
    category: 'armani',
    image: '/armani/armani fabric muted mushroom taupe 1.png',
    patternClass: 'fabric-pattern-armani',
    desc: 'Sophisticated Muted Mushroom Taupe Italian suiting wool. Subtle earth tone offering contemporary tailored distinction.',
    origin: 'Italy',
    weight: '275 gsm',
    threadCount: 'Super 150s Wool-Silk',
    breathability: 'High',
    badge: 'Armani Suiting',
    variants: [
      { id: 'arm_tau_v1', name: 'Texture View 1', colorHex: '#786b62', image: '/armani/armani fabric muted mushroom taupe 1.png' },
      { id: 'arm_tau_v2', name: 'Texture View 2', colorHex: '#63574e', image: '/armani/armani fabric muted mushroom taupe 2.png' }
    ]
  },
  {
    id: 'arm_camel_beige',
    name: 'Armani Camel Beige Suiting Wool',
    category: 'armani',
    image: '/armani/Armani fabric camel beige 1.png',
    patternClass: 'fabric-pattern-armani',
    desc: 'Warm Camel Beige luxury wool suiting. Elegant tan shade delivering timeless Italian sophistication.',
    origin: 'Italy',
    weight: '275 gsm',
    threadCount: 'Super 150s Wool-Silk',
    breathability: 'High',
    badge: 'Armani Suiting',
    variants: [
      { id: 'arm_cam_v1', name: 'Texture View 1', colorHex: '#b59e84', image: '/armani/Armani fabric camel beige 1.png' },
      { id: 'arm_cam_v2', name: 'Texture View 2', colorHex: '#9f8a72', image: '/armani/Armani fabric camel beige 2.png' }
    ]
  },
  {
    id: 'arm_sand_beige',
    name: 'Armani Sand Beige Suiting Wool',
    category: 'armani',
    image: '/armani/armani fabric sand beige 1.png',
    patternClass: 'fabric-pattern-armani',
    desc: 'Luminous Sand Beige fine Italian suiting wool. Ultra-smooth weave delivering lightweight elegance for luxury spring/summer suiting.',
    origin: 'Italy',
    weight: '275 gsm',
    threadCount: 'Super 150s Wool-Silk',
    breathability: 'High',
    badge: 'Armani Suiting',
    variants: [
      { id: 'arm_snd_v1', name: 'Texture View 1', colorHex: '#c4b49e', image: '/armani/armani fabric sand beige 1.png' },
      { id: 'arm_snd_v2', name: 'Texture View 2', colorHex: '#b09f88', image: '/armani/armani fabric sand beige 2.png' }
    ]
  },
  {
    id: 'arm_plum',
    name: 'Armani Plum Suiting Wool',
    category: 'armani',
    image: '/armani/Armani fabric plum 1.png',
    patternClass: 'fabric-pattern-armani',
    desc: 'Opulent deep Plum suiting wool from Giorgio Armani. Luxurious jewel-toned shade ideal for tuxedo jackets and evening suits.',
    origin: 'Italy',
    weight: '275 gsm',
    threadCount: 'Super 150s Wool-Silk',
    breathability: 'High',
    badge: 'Armani Suiting',
    variants: [
      { id: 'arm_plm_v1', name: 'Texture View 1', colorHex: '#5c3a4d', image: '/armani/Armani fabric plum 1.png' },
      { id: 'arm_plm_v2', name: 'Texture View 2', colorHex: '#482c3c', image: '/armani/Armani fabric plum 2.png' }
    ]
  },
  {
    id: 'arm_sage_green',
    name: 'Armani Sage Green Suiting Wool',
    category: 'armani',
    image: '/armani/Armani fabric sage green 1.png',
    patternClass: 'fabric-pattern-armani',
    desc: 'Refined Sage Green suiting wool. Elegant muted green hue with a smooth, breathable finish.',
    origin: 'Italy',
    weight: '275 gsm',
    threadCount: 'Super 150s Wool-Silk',
    breathability: 'High',
    badge: 'Armani Suiting',
    variants: [
      { id: 'arm_sge_v1', name: 'Texture View 1', colorHex: '#72826e', image: '/armani/Armani fabric sage green 1.png' },
      { id: 'arm_sge_v2', name: 'Texture View 2', colorHex: '#5c6a59', image: '/armani/Armani fabric sage green 2.png' }
    ]
  },
  {
    id: 'arm_olive_green',
    name: 'Armani Olive Green Suiting Wool',
    category: 'armani',
    image: '/armani/armani fabric olive green 1.png',
    patternClass: 'fabric-pattern-armani',
    desc: 'Distinguished Olive Green fine wool suiting from Armani. Warm organic tone with silky hand-feel and immaculate drape.',
    origin: 'Italy',
    weight: '275 gsm',
    threadCount: 'Super 150s Wool-Silk',
    breathability: 'High',
    badge: 'Armani Suiting',
    variants: [
      { id: 'arm_olv_v1', name: 'Texture View 1', colorHex: '#4e5843', image: '/armani/armani fabric olive green 1.png' },
      { id: 'arm_olv_v2', name: 'Texture View 2', colorHex: '#3d4633', image: '/armani/armani fabric olive green 2.png' }
    ]
  },
  {
    id: 'arm_olive_gray',
    name: 'Armani Olive Gray Suiting Wool',
    category: 'armani',
    image: '/armani/armani fabric olive gray 1.png',
    patternClass: 'fabric-pattern-armani',
    desc: 'Contemporary Olive Gray suiting wool. Blended earthy grey-green tone offering versatile tailored style.',
    origin: 'Italy',
    weight: '275 gsm',
    threadCount: 'Super 150s Wool-Silk',
    breathability: 'High',
    badge: 'Armani Suiting',
    variants: [
      { id: 'arm_ogry_v1', name: 'Texture View 1', colorHex: '#5d6256', image: '/armani/armani fabric olive gray 1.png' },
      { id: 'arm_ogry_v2', name: 'Texture View 2', colorHex: '#4b5045', image: '/armani/armani fabric olive gray 2.png' }
    ]
  },
  {
    id: 'arm_ivory',
    name: 'Armani Ivory Suiting Wool',
    category: 'armani',
    image: '/armani/Armani fabric ivory 1.png',
    patternClass: 'fabric-pattern-armani',
    desc: 'Luminous Ivory white luxury suiting wool from the house of Giorgio Armani. Pristine formal elegance, silky drape, and immaculate finish for wedding tuxedos and summer suiting.',
    origin: 'Italy',
    weight: '270 gsm',
    threadCount: 'Super 150s Wool-Silk',
    breathability: 'High',
    badge: 'Armani Suiting',
    variants: [
      { id: 'arm_ivr_v1', name: 'Texture View 1', colorHex: '#f3efea', image: '/armani/Armani fabric ivory 1.png' },
      { id: 'arm_ivr_v2', name: 'Texture View 2', colorHex: '#e5ded5', image: '/armani/Armani fabric ivory 2.png' }
    ]
  },
  {
    id: 'arm_mushroom_beige',
    name: 'Armani Mushroom Beige Suiting Wool',
    category: 'armani',
    image: '/armani/Armani fabric mushroom beige 1.png',
    patternClass: 'fabric-pattern-armani',
    desc: 'Understated Mushroom Beige fine Italian wool suiting by Giorgio Armani. Subtle greige tone delivering modern executive distinction and versatile drape.',
    origin: 'Italy',
    weight: '275 gsm',
    threadCount: 'Super 150s Wool-Silk',
    breathability: 'High',
    badge: 'Armani Suiting',
    variants: [
      { id: 'arm_msh_v1', name: 'Texture View 1', colorHex: '#b2a496', image: '/armani/Armani fabric mushroom beige 1.png' },
      { id: 'arm_msh_v2', name: 'Texture View 2', colorHex: '#9c8e80', image: '/armani/Armani fabric mushroom beige 2.png' }
    ]
  },
  {
    id: 'arm_olive_khaki',
    name: 'Armani Olive Khaki Suiting Wool',
    category: 'armani',
    image: '/armani/Armani fabric olive khaki 1.png',
    patternClass: 'fabric-pattern-armani',
    desc: 'Rich Olive Khaki luxury suiting wool from Armani. Distinctive safari-inspired organic hue with soft touch and structured tailorability.',
    origin: 'Italy',
    weight: '275 gsm',
    threadCount: 'Super 150s Wool-Silk',
    breathability: 'High',
    badge: 'Armani Suiting',
    variants: [
      { id: 'arm_okh_v1', name: 'Texture View 1', colorHex: '#6b6b55', image: '/armani/Armani fabric olive khaki 1.png' },
      { id: 'arm_okh_v2', name: 'Texture View 2', colorHex: '#575743', image: '/armani/Armani fabric olive khaki 2.png' }
    ]
  },
  {
    id: 'arm_taupe',
    name: 'Armani Warm Taupe Suiting Wool',
    category: 'armani',
    image: '/armani/Armani fabric taupe 1.png',
    patternClass: 'fabric-pattern-armani',
    desc: 'Sophisticated Warm Taupe fine suiting wool by Giorgio Armani. Balanced grey-brown shade with a luxurious subtle sheen for year-round bespoke suits.',
    origin: 'Italy',
    weight: '275 gsm',
    threadCount: 'Super 150s Wool-Silk',
    breathability: 'High',
    badge: 'Armani Suiting',
    variants: [
      { id: 'arm_tpe_v1', name: 'Texture View 1', colorHex: '#8c7d72', image: '/armani/Armani fabric taupe 1.png' },
      { id: 'arm_tpe_v2', name: 'Texture View 2', colorHex: '#78695f', image: '/armani/Armani fabric taupe 2.png' }
    ]
  },
  {
    id: 'arm_navy_blue',
    name: 'Armani Midnight Navy Blue Suiting Wool',
    category: 'armani',
    image: '/armani/Armani fabric Navy blue 1.png',
    patternClass: 'fabric-pattern-armani',
    desc: 'Classic Midnight Navy Blue luxury wool-silk suiting from Giorgio Armani. Imperial deep navy luster, high resilience, and quintessential executive authority.',
    origin: 'Italy',
    weight: '275 gsm',
    threadCount: 'Super 150s Wool-Silk',
    breathability: 'High',
    badge: 'Armani Suiting',
    variants: [
      { id: 'arm_nbl_v1', name: 'Texture View 1', colorHex: '#1e2d42', image: '/armani/Armani fabric Navy blue 1.png' },
      { id: 'arm_nbl_v2', name: 'Texture View 2', colorHex: '#142033', image: '/armani/Armani fabric Navy blue 2.png' }
    ]
  },
  {
    id: 'arm_dusty_rose',
    name: 'Armani Dusty Rose Suiting Wool',
    category: 'armani',
    image: '/armani/Armani fabric dusty rose 1.png',
    patternClass: 'fabric-pattern-armani',
    desc: 'Enchanting Dusty Rose pink fine Italian wool suiting by Giorgio Armani. Subtle muted blush tone delivering modern runway elegance and fluid drape.',
    origin: 'Italy',
    weight: '270 gsm',
    threadCount: 'Super 150s Wool-Silk',
    breathability: 'High',
    badge: 'Armani Suiting',
    variants: [
      { id: 'arm_drs_v1', name: 'Texture View 1', colorHex: '#a87979', image: '/armani/Armani fabric dusty rose 1.png' },
      { id: 'arm_drs_v2', name: 'Texture View 2', colorHex: '#946666', image: '/armani/Armani fabric dusty rose 2.png' }
    ]
  },
  {
    id: 'arm_lavender',
    name: 'Armani Soft Lavender Suiting Wool',
    category: 'armani',
    image: '/armani/Armani fabric lavender 1.png',
    patternClass: 'fabric-pattern-armani',
    desc: 'Luminous Soft Lavender purple luxury suiting wool from Armani. Delicate pastel violet sheen crafted for statement tuxedos and summer suiting.',
    origin: 'Italy',
    weight: '270 gsm',
    threadCount: 'Super 150s Wool-Silk',
    breathability: 'High',
    badge: 'Armani Suiting',
    variants: [
      { id: 'arm_lvd_v1', name: 'Texture View 1', colorHex: '#a295b8', image: '/armani/Armani fabric lavender 1.png' },
      { id: 'arm_lvd_v2', name: 'Texture View 2', colorHex: '#8e81a3', image: '/armani/Armani fabric lavender 2.png' }
    ]
  },
  {
    id: 'spn_sage',
    name: 'Sage Spun / Spoon Fabric',
    category: 'spoon',
    patternClass: 'fabric-pattern-cotton',
    image: '/spoon_fabric/Sage spoon fabric 1.png',
    desc: 'Refined soft sage green spun fabric featuring a rich tactile micro-weave, wrinkle-resistant drape, and exceptional comfort for versatile bespoke tailoring.',
    origin: 'Italy',
    weight: '135 gsm',
    threadCount: 'Micro-Spun Fine Weave',
    breathability: 'High',
    badge: 'Signature Spun',
    variants: [
      { id: 'spn_sg_v1', name: 'Texture View 1', colorHex: '#84a991', image: '/spoon_fabric/Sage spoon fabric 1.png' },
      { id: 'spn_sg_v2', name: 'Texture View 2', colorHex: '#71967e', image: '/spoon_fabric/Sage spoon fabric 2.png' }
    ]
  },
  {
    id: 'spn_taupe',
    name: 'Warm Taupe Spun / Spoon Fabric',
    category: 'spoon',
    patternClass: 'fabric-pattern-cotton',
    image: '/spoon_fabric/Taupe spoon fabric 1.png',
    desc: 'Warm earthy taupe brown spun fabric. Offers ultra-smooth feel, durable shape retention, and breathable versatility.',
    origin: 'France',
    weight: '140 gsm',
    threadCount: 'Micro-Spun Fine Weave',
    breathability: 'High',
    badge: 'Signature Spun',
    variants: [
      { id: 'spn_tp_v1', name: 'Texture View 1', colorHex: '#8c7d72', image: '/spoon_fabric/Taupe spoon fabric 1.png' },
      { id: 'spn_tp_v2', name: 'Texture View 2', colorHex: '#78695f', image: '/spoon_fabric/Taupe spoon fabric 2.png' }
    ]
  },
  {
    id: 'spn_buttery_yellow',
    name: 'Buttery Yellow Spun / Spoon Fabric',
    category: 'spoon',
    patternClass: 'fabric-pattern-cotton',
    image: '/spoon_fabric/Buttery yellow spoon fabric 1.png',
    desc: 'Radiant buttery soft yellow spun fabric featuring a delicate micro-texture, airy breathability, and vibrant sunny tone for casual and formal bespoke tailoring.',
    origin: 'Italy',
    weight: '135 gsm',
    threadCount: 'Micro-Spun Fine Weave',
    breathability: 'High',
    badge: 'Signature Spun',
    variants: [
      { id: 'spn_by_v1', name: 'Texture View 1', colorHex: '#f3e496', image: '/spoon_fabric/Buttery yellow spoon fabric 1.png' },
      { id: 'spn_by_v2', name: 'Texture View 2', colorHex: '#e8d682', image: '/spoon_fabric/Buttery yellow spoon fabric 2.png' }
    ]
  },
  {
    id: 'spn_charcoal',
    name: 'Charcoal Spun / Spoon Fabric',
    category: 'spoon',
    patternClass: 'fabric-pattern-cotton',
    image: '/spoon_fabric/Charcol spoon fabric 1.png',
    desc: 'Deep moody charcoal grey spun fabric offering structured elegance, wrinkle-resistant resilience, and smooth sophisticated drape for modern attire.',
    origin: 'Italy',
    weight: '140 gsm',
    threadCount: 'Micro-Spun Fine Weave',
    breathability: 'High',
    badge: 'Signature Spun',
    variants: [
      { id: 'spn_ch_v1', name: 'Texture View 1', colorHex: '#383b42', image: '/spoon_fabric/Charcol spoon fabric 1.png' },
      { id: 'spn_ch_v2', name: 'Texture View 2', colorHex: '#2d3036', image: '/spoon_fabric/Charcol spoon fabric 2.png' }
    ]
  },
  {
    id: 'spn_chocolate_brown',
    name: 'Chocolate Brown Spun / Spoon Fabric',
    category: 'spoon',
    patternClass: 'fabric-pattern-cotton',
    image: '/spoon_fabric/Choclate brown spoon fabric 1.png',
    desc: 'Rich espresso chocolate brown spun fabric featuring warm earthy undertones and ultra-smooth hand-feel for luxury bespoke attire.',
    origin: 'France',
    weight: '140 gsm',
    threadCount: 'Micro-Spun Fine Weave',
    breathability: 'High',
    badge: 'Signature Spun',
    variants: [
      { id: 'spn_cb_v1', name: 'Texture View 1', colorHex: '#4a3528', image: '/spoon_fabric/Choclate brown spoon fabric 1.png' },
      { id: 'spn_cb_v2', name: 'Texture View 2', colorHex: '#3b291d', image: '/spoon_fabric/Choclate brown spoon fabric 2.png' }
    ]
  },
  {
    id: 'spn_cream',
    name: 'Cream Spun / Spoon Fabric',
    category: 'spoon',
    patternClass: 'fabric-pattern-cotton',
    image: '/spoon_fabric/cream spoon fabric 1.png',
    desc: 'Elegant ivory cream spun fabric with a clean subtle lustre, lightweight breathability, and pristine natural drape.',
    origin: 'Italy',
    weight: '135 gsm',
    threadCount: 'Micro-Spun Fine Weave',
    breathability: 'High',
    badge: 'Signature Spun',
    variants: [
      { id: 'spn_cr_v1', name: 'Texture View 1', colorHex: '#f4eee0', image: '/spoon_fabric/cream spoon fabric 1.png' },
      { id: 'spn_cr_v2', name: 'Texture View 2', colorHex: '#e8dfcd', image: '/spoon_fabric/cream spoon fabric 2.png' }
    ]
  },
  {
    id: 'spn_emerald_green',
    name: 'Emerald Green Spun / Spoon Fabric',
    category: 'spoon',
    patternClass: 'fabric-pattern-cotton',
    image: '/spoon_fabric/emerald green spoon fabric 1.png',
    desc: 'Deep luxurious emerald green spun fabric crafted from fine spun yarns for a rich tactile finish and vibrant jewel-tone elegance.',
    origin: 'Italy',
    weight: '140 gsm',
    threadCount: 'Micro-Spun Fine Weave',
    breathability: 'High',
    badge: 'Signature Spun',
    variants: [
      { id: 'spn_eg_v1', name: 'Texture View 1', colorHex: '#144e39', image: '/spoon_fabric/emerald green spoon fabric 1.png' },
      { id: 'spn_eg_v2', name: 'Texture View 2', colorHex: '#0e3d2c', image: '/spoon_fabric/emerald green spoon fabric 2.png' }
    ]
  },
  {
    id: 'spn_moss_green',
    name: 'Moss Green Spun / Spoon Fabric',
    category: 'spoon',
    patternClass: 'fabric-pattern-cotton',
    image: '/spoon_fabric/green spoon fabric 1.png',
    desc: 'Earthy soft moss green spun fabric featuring fine long-staple spun yarns for an organic, relaxed look and breathable comfort.',
    origin: 'Italy',
    weight: '135 gsm',
    threadCount: 'Micro-Spun Fine Weave',
    breathability: 'High',
    badge: 'Signature Spun',
    variants: [
      { id: 'spn_mg_v1', name: 'Texture View 1', colorHex: '#86916c', image: '/spoon_fabric/green spoon fabric 1.png' },
      { id: 'spn_mg_v2', name: 'Texture View 2', colorHex: '#747e5b', image: '/spoon_fabric/green spoon fabric 2.png' }
    ]
  },
  {
    id: 'spn_jet_black',
    name: 'Jet Black Spun / Spoon Fabric',
    category: 'spoon',
    patternClass: 'fabric-pattern-cotton',
    image: '/spoon_fabric/Jet black spoon fabric 1.png',
    desc: 'Intensely dark jet black spun fabric with immaculate color depth, crisp tailoring drape, and timeless formal appeal.',
    origin: 'Italy',
    weight: '140 gsm',
    threadCount: 'Micro-Spun Fine Weave',
    breathability: 'High',
    badge: 'Signature Spun',
    variants: [
      { id: 'spn_jb_v1', name: 'Texture View 1', colorHex: '#1c1c1e', image: '/spoon_fabric/Jet black spoon fabric 1.png' },
      { id: 'spn_jb_v2', name: 'Texture View 2', colorHex: '#121214', image: '/spoon_fabric/Jet black spoon fabric 2.png' }
    ]
  },
  {
    id: 'spn_lavender',
    name: 'Lavender Spun / Spoon Fabric',
    category: 'spoon',
    patternClass: 'fabric-pattern-cotton',
    image: '/spoon_fabric/Lavender spoon fabric 1.png',
    desc: 'Delicate lilac lavender spun fabric with soft purple undertones, offering a refined modern palette and silky comfortable touch.',
    origin: 'France',
    weight: '135 gsm',
    threadCount: 'Micro-Spun Fine Weave',
    breathability: 'High',
    badge: 'Signature Spun',
    variants: [
      { id: 'spn_lv_v1', name: 'Texture View 1', colorHex: '#a89cb8', image: '/spoon_fabric/Lavender spoon fabric 1.png' },
      { id: 'spn_lv_v2', name: 'Texture View 2', colorHex: '#9688a6', image: '/spoon_fabric/Lavender spoon fabric 2.png' }
    ]
  },
  {
    id: 'spn_mocha_muse',
    name: 'Mocha Muse Spun / Spoon Fabric',
    category: 'spoon',
    patternClass: 'fabric-pattern-cotton',
    image: '/spoon_fabric/Mocha muse spoon fabric 1.png',
    desc: 'Warm toasted mocha brown spun fabric with subtle heather variations, ideal for contemporary tailored shirts and jacket linings.',
    origin: 'Italy',
    weight: '140 gsm',
    threadCount: 'Micro-Spun Fine Weave',
    breathability: 'High',
    badge: 'Signature Spun',
    variants: [
      { id: 'spn_mm_v1', name: 'Texture View 1', colorHex: '#6e594d', image: '/spoon_fabric/Mocha muse spoon fabric 1.png' },
      { id: 'spn_mm_v2', name: 'Texture View 2', colorHex: '#5d4b3f', image: '/spoon_fabric/Mocha muse spoon fabric 2.png' }
    ]
  },
  {
    id: 'spn_olive_khaki',
    name: 'Olive Khaki Spun / Spoon Fabric',
    category: 'spoon',
    patternClass: 'fabric-pattern-cotton',
    image: '/spoon_fabric/Olive khaki spoon fabric 1.png',
    desc: 'Earthy olive khaki spun fabric with a rugged yet smooth texture, incredible durability, and versatile year-round style.',
    origin: 'Italy',
    weight: '140 gsm',
    threadCount: 'Micro-Spun Fine Weave',
    breathability: 'High',
    badge: 'Signature Spun',
    variants: [
      { id: 'spn_ok_v1', name: 'Texture View 1', colorHex: '#5e6146', image: '/spoon_fabric/Olive khaki spoon fabric 1.png' },
      { id: 'spn_ok_v2', name: 'Texture View 2', colorHex: '#4d5038', image: '/spoon_fabric/Olive khaki spoon fabric 2.png' }
    ]
  },
  {
    id: 'spn_rust',
    name: 'Rust Spun / Spoon Fabric',
    category: 'spoon',
    patternClass: 'fabric-pattern-cotton',
    image: '/spoon_fabric/rust spoon fabric 1.png',
    desc: 'Warm terracotta rust red spun fabric featuring rich autumnal warmth and supple micro-spun texture.',
    origin: 'France',
    weight: '135 gsm',
    threadCount: 'Micro-Spun Fine Weave',
    breathability: 'High',
    badge: 'Signature Spun',
    variants: [
      { id: 'spn_rs_v1', name: 'Texture View 1', colorHex: '#9e4e37', image: '/spoon_fabric/rust spoon fabric 1.png' },
      { id: 'spn_rs_v2', name: 'Texture View 2', colorHex: '#8a412c', image: '/spoon_fabric/rust spoon fabric 2.png' }
    ]
  },
  {
    id: 'spn_slate',
    name: 'Slate Spun / Spoon Fabric',
    category: 'spoon',
    patternClass: 'fabric-pattern-cotton',
    image: '/spoon_fabric/Slate spoon fabric 1.png',
    desc: 'Sleek neutral slate grey spun fabric boasting a crisp texture and refined modern finish.',
    origin: 'Italy',
    weight: '135 gsm',
    threadCount: 'Micro-Spun Fine Weave',
    breathability: 'High',
    badge: 'Signature Spun',
    variants: [
      { id: 'spn_st_v1', name: 'Texture View 1', colorHex: '#5c646b', image: '/spoon_fabric/Slate spoon fabric 1.png' },
      { id: 'spn_st_v2', name: 'Texture View 2', colorHex: '#4a5158', image: '/spoon_fabric/Slate spoon fabric 2.png' }
    ]
  },
  {
    id: 'spn_aubergine',
    name: 'Aubergine Spun / Spoon Fabric',
    category: 'spoon',
    patternClass: 'fabric-pattern-cotton',
    image: '/spoon_fabric/Aubergine spoon fabric 1.png',
    desc: 'Deep luxurious aubergine plum spun fabric featuring fine micro-spun weave, rich color saturation, and elegant drape for distinguished tailoring.',
    origin: 'Italy',
    weight: '140 gsm',
    threadCount: 'Micro-Spun Fine Weave',
    breathability: 'High',
    badge: 'Signature Spun',
    variants: [
      { id: 'spn_ab_v1', name: 'Texture View 1', colorHex: '#4d2e43', image: '/spoon_fabric/Aubergine spoon fabric 1.png' },
      { id: 'spn_ab_v2', name: 'Texture View 2', colorHex: '#3b2133', image: '/spoon_fabric/Aubergine spoon fabric 2.png' }
    ]
  },
  {
    id: 'spn_blush_pink',
    name: 'Blush Pink Spun / Spoon Fabric',
    category: 'spoon',
    patternClass: 'fabric-pattern-cotton',
    image: '/spoon_fabric/blush pink spoon fabric 1.png',
    desc: 'Soft romantic blush pink spun fabric with a silky-smooth hand feel, subtle sheen, and effortless year-round breathability.',
    origin: 'France',
    weight: '135 gsm',
    threadCount: 'Micro-Spun Fine Weave',
    breathability: 'High',
    badge: 'Signature Spun',
    variants: [
      { id: 'spn_bp_v1', name: 'Texture View 1', colorHex: '#e8b8c2', image: '/spoon_fabric/blush pink spoon fabric 1.png' },
      { id: 'spn_bp_v2', name: 'Texture View 2', colorHex: '#d9a5b0', image: '/spoon_fabric/blush pink spoon fabric 2.png' }
    ]
  },
  {
    id: 'spn_camel',
    name: 'Camel Spun / Spoon Fabric',
    category: 'spoon',
    patternClass: 'fabric-pattern-cotton',
    image: '/spoon_fabric/camel spoon fabric 1.png',
    desc: 'Classic warm camel spun fabric offering a timeless golden-tan hue, soft tactile finish, and refined drape for modern bespoke wardrobe essentials.',
    origin: 'Italy',
    weight: '140 gsm',
    threadCount: 'Micro-Spun Fine Weave',
    breathability: 'High',
    badge: 'Signature Spun',
    variants: [
      { id: 'spn_cm_v1', name: 'Texture View 1', colorHex: '#c19a6b', image: '/spoon_fabric/camel spoon fabric 1.png' },
      { id: 'spn_cm_v2', name: 'Texture View 2', colorHex: '#b0885a', image: '/spoon_fabric/camel spoon fabric 2.png' }
    ]
  },
  {
    id: 'spn_maroon',
    name: 'Maroon Spun / Spoon Fabric',
    category: 'spoon',
    patternClass: 'fabric-pattern-cotton',
    image: '/spoon_fabric/maroon spoon fabric 1.png',
    desc: 'Regal deep maroon wine spun fabric with rich depth of tone, exceptional wrinkle resistance, and sophisticated tailored drape.',
    origin: 'Italy',
    weight: '140 gsm',
    threadCount: 'Micro-Spun Fine Weave',
    breathability: 'High',
    badge: 'Signature Spun',
    variants: [
      { id: 'spn_mr_v1', name: 'Texture View 1', colorHex: '#6b1d2f', image: '/spoon_fabric/maroon spoon fabric 1.png' },
      { id: 'spn_mr_v2', name: 'Texture View 2', colorHex: '#571524', image: '/spoon_fabric/maroon spoon fabric 2.png' }
    ]
  },
  {
    id: 'spn_peach_beige',
    name: 'Peach Beige Spun / Spoon Fabric',
    category: 'spoon',
    patternClass: 'fabric-pattern-cotton',
    image: '/spoon_fabric/peach beige spoon fabric 1.png',
    desc: 'Warm comforting peach beige spun fabric featuring a delicate sun-kissed tone, airy weave, and ultra-soft comfort.',
    origin: 'France',
    weight: '135 gsm',
    threadCount: 'Micro-Spun Fine Weave',
    breathability: 'High',
    badge: 'Signature Spun',
    variants: [
      { id: 'spn_pb_v1', name: 'Texture View 1', colorHex: '#e4bfab', image: '/spoon_fabric/peach beige spoon fabric 1.png' },
      { id: 'spn_pb_v2', name: 'Texture View 2', colorHex: '#d5ac97', image: '/spoon_fabric/peach beige spoon fabric 2.png' }
    ]
  },
  {
    id: 'spn_purple',
    name: 'Purple Spun / Spoon Fabric',
    category: 'spoon',
    patternClass: 'fabric-pattern-cotton',
    image: '/spoon_fabric/purple spoon fabric 1.png',
    desc: 'Vibrant royal purple spun fabric crafted with high-density spun yarns for a striking color statement and smooth fluid drape.',
    origin: 'Italy',
    weight: '140 gsm',
    threadCount: 'Micro-Spun Fine Weave',
    breathability: 'High',
    badge: 'Signature Spun',
    variants: [
      { id: 'spn_pr_v1', name: 'Texture View 1', colorHex: '#6a3b7b', image: '/spoon_fabric/purple spoon fabric 1.png' },
      { id: 'spn_pr_v2', name: 'Texture View 2', colorHex: '#582d68', image: '/spoon_fabric/purple spoon fabric 2.png' }
    ]
  },
  {
    id: 'khadi_white',
    name: 'Pure White Khadi Fabric',
    category: 'khaadi',
    subCategory: 'handspun-khaadi',
    patternClass: 'fabric-pattern-linen',
    image: '/khadi_fabrics/white khadi fabric 1.png',
    desc: 'Pristine pure white handspun Khadi fabric woven from 100% organic cotton yarns. Exceptionally breathable and soft, ideal for classic kurtas, formal shirts, and summer tailoring.',
    origin: 'India (Wardha / Bengal)',
    weight: '135 gsm',
    threadCount: 'Handspun Organic Single Ply',
    breathability: 'Maximum',
    badge: 'Organic Classic',
    variants: [
      { id: 'kh_wh_v1', name: 'Texture View 1', colorHex: '#efece6', image: '/khadi_fabrics/white khadi fabric 1.png' },
      { id: 'kh_wh_v2', name: 'Texture View 2', colorHex: '#e5e1d8', image: '/khadi_fabrics/white khadi fabric 2.png' }
    ]
  },
  {
    id: 'khadi_navy_blue',
    name: 'Navy Blue Khadi Fabric',
    category: 'khaadi',
    subCategory: 'handspun-khaadi',
    patternClass: 'fabric-pattern-linen',
    image: '/khadi_fabrics/Navy blue khadi fabric 1.png',
    desc: 'Deep royal navy blue handspun Khadi with rich micro-texture. Perfect for regal waistcoats, formal kurtas, and structured casual blazers.',
    origin: 'India',
    weight: '140 gsm',
    threadCount: 'Handspun Fine Double Ply',
    breathability: 'High',
    badge: 'Formal Luxury',
    variants: [
      { id: 'kh_nb_v1', name: 'Texture View 1', colorHex: '#1b2a4a', image: '/khadi_fabrics/Navy blue khadi fabric 1.png' },
      { id: 'kh_nb_v2', name: 'Texture View 2', colorHex: '#14213d', image: '/khadi_fabrics/Navy blue khadi fabric 2.png' }
    ]
  },
  {
    id: 'khadi_blue',
    name: 'Royal Blue Khadi Fabric',
    category: 'khaadi',
    subCategory: 'handspun-khaadi',
    patternClass: 'fabric-pattern-linen',
    image: '/khadi_fabrics/blue khadi fabric 1.png',
    desc: 'Vibrant indigo royal blue handwoven Khadi with organic slub depth. Exceptional drape for modern kurtas and smart casual shirts.',
    origin: 'India',
    weight: '135 gsm',
    threadCount: 'Handspun Organic',
    breathability: 'High',
    badge: 'Best Seller',
    variants: [
      { id: 'kh_bl_v1', name: 'Texture View 1', colorHex: '#3b6ba5', image: '/khadi_fabrics/blue khadi fabric 1.png' },
      { id: 'kh_bl_v2', name: 'Texture View 2', colorHex: '#2f5a8c', image: '/khadi_fabrics/blue khadi fabric 2.png' }
    ]
  },
  {
    id: 'khadi_cobalt_blue',
    name: 'Cobalt Blue Khadi Fabric',
    category: 'khaadi',
    subCategory: 'handspun-khaadi',
    patternClass: 'fabric-pattern-linen',
    image: '/khadi_fabrics/cobalt blue khadi fabric 1.png',
    desc: 'Striking cobalt blue handspun Khadi yarn featuring rich texture weave and vibrant dye absorption for bold summer attire.',
    origin: 'India',
    weight: '145 gsm',
    threadCount: 'Handloom Slub Weave',
    breathability: 'Excellent',
    badge: 'Vibrant Heritage',
    variants: [
      { id: 'kh_cb_v1', name: 'Texture View 1', colorHex: '#1e4b88', image: '/khadi_fabrics/cobalt blue khadi fabric 1.png' },
      { id: 'kh_cb_v2', name: 'Texture View 2', colorHex: '#153e74', image: '/khadi_fabrics/cobalt blue khadi fabric 2.png' }
    ]
  },
  {
    id: 'khadi_sage_green',
    name: 'Sage Green Khadi Fabric',
    category: 'khaadi',
    subCategory: 'handspun-khaadi',
    patternClass: 'fabric-pattern-linen',
    image: '/khadi_fabrics/sage green khadi fabric 1.png',
    desc: 'Soothing organic sage green handspun Khadi with soft botanical tones and comfortable, cool breathability.',
    origin: 'India',
    weight: '130 gsm',
    threadCount: 'Handspun Soft Weave',
    breathability: 'Maximum',
    badge: 'Eco Essential',
    variants: [
      { id: 'kh_sg_v1', name: 'Texture View 1', colorHex: '#5a7263', image: '/khadi_fabrics/sage green khadi fabric 1.png' },
      { id: 'kh_sg_v2', name: 'Texture View 2', colorHex: '#4a6052', image: '/khadi_fabrics/sage green khadi fabric 2.png' }
    ]
  },
  {
    id: 'khadi_green_pine',
    name: 'Pine Green Khadi Fabric',
    category: 'khaadi',
    subCategory: 'handspun-khaadi',
    patternClass: 'fabric-pattern-linen',
    image: '/khadi_fabrics/green pine khadi fabric 1.png',
    desc: 'Rich forest pine green handwoven Khadi fabric with subtle luster and durable handspun yarn density.',
    origin: 'India',
    weight: '140 gsm',
    threadCount: 'Handloom Dense Weave',
    breathability: 'High',
    badge: 'Rich Earth Tones',
    variants: [
      { id: 'kh_gp_v1', name: 'Texture View 1', colorHex: '#284838', image: '/khadi_fabrics/green pine khadi fabric 1.png' },
      { id: 'kh_gp_v2', name: 'Texture View 2', colorHex: '#1e382b', image: '/khadi_fabrics/green pine khadi fabric 2.png' }
    ]
  },
  {
    id: 'khadi_terracotta',
    name: 'Terracotta Khadi Fabric',
    category: 'khaadi',
    subCategory: 'handspun-khaadi',
    patternClass: 'fabric-pattern-linen',
    image: '/khadi_fabrics/terractta khadi fabric 1.png',
    desc: 'Warm earthy terracotta handspun Khadi featuring natural clay hues and rustic textured weave for casual jackets and kurtas.',
    origin: 'India',
    weight: '140 gsm',
    threadCount: 'Handspun Clay Weave',
    breathability: 'High',
    badge: 'Earthy Chic',
    variants: [
      { id: 'kh_tc_v1', name: 'Texture View 1', colorHex: '#b85a3a', image: '/khadi_fabrics/terractta khadi fabric 1.png' },
      { id: 'kh_tc_v2', name: 'Texture View 2', colorHex: '#a44c2e', image: '/khadi_fabrics/terractta khadi fabric 2.png' }
    ]
  },
  {
    id: 'khadi_burnt_sienna',
    name: 'Burnt Sienna Khadi Fabric',
    category: 'khaadi',
    subCategory: 'handspun-khaadi',
    patternClass: 'fabric-pattern-linen',
    image: '/khadi_fabrics/burnt sierra khadi fabric 1.png',
    desc: 'Deep warm burnt sienna handspun Khadi fabric with artisanal texture definition and breathable drape.',
    origin: 'India',
    weight: '135 gsm',
    threadCount: 'Handwoven Natural Cotton',
    breathability: 'High',
    badge: 'Artisanal Shade',
    variants: [
      { id: 'kh_bs_v1', name: 'Texture View 1', colorHex: '#99442c', image: '/khadi_fabrics/burnt sierra khadi fabric 1.png' },
      { id: 'kh_bs_v2', name: 'Texture View 2', colorHex: '#853822', image: '/khadi_fabrics/burnt sierra khadi fabric 2.png' }
    ]
  },
  {
    id: 'khadi_arabian_spice',
    name: 'Arabian Spice Khadi Fabric',
    category: 'khaadi',
    subCategory: 'handspun-khaadi',
    patternClass: 'fabric-pattern-linen',
    image: '/khadi_fabrics/Arabian spice khadi fabric 1.png',
    desc: 'Exotic cinnamon spice handspun Khadi with rich warm undertones, ideal for statement ethnic kurtas and waistcoats.',
    origin: 'India',
    weight: '145 gsm',
    threadCount: 'Handloom Spice Weave',
    breathability: 'Excellent',
    badge: 'Signature Tone',
    variants: [
      { id: 'kh_as_v1', name: 'Texture View 1', colorHex: '#a05030', image: '/khadi_fabrics/Arabian spice khadi fabric 1.png' },
      { id: 'kh_as_v2', name: 'Texture View 2', colorHex: '#8c4224', image: '/khadi_fabrics/Arabian spice khadi fabric 2.png' }
    ]
  },
  {
    id: 'khadi_mustard_yellow',
    name: 'Mustard Yellow Khadi Fabric',
    category: 'khaadi',
    subCategory: 'handspun-khaadi',
    patternClass: 'fabric-pattern-linen',
    image: '/khadi_fabrics/mustard yellow khadi fabric 1.png',
    desc: 'Bright festive mustard yellow handspun Khadi fabric with warm golden undertones for celebratory occasion wear.',
    origin: 'India',
    weight: '135 gsm',
    threadCount: 'Handspun Organic Cotton',
    breathability: 'Maximum',
    badge: 'Festive Favorite',
    variants: [
      { id: 'kh_my_v1', name: 'Texture View 1', colorHex: '#c89a38', image: '/khadi_fabrics/mustard yellow khadi fabric 1.png' },
      { id: 'kh_my_v2', name: 'Texture View 2', colorHex: '#b4882c', image: '/khadi_fabrics/mustard yellow khadi fabric 2.png' }
    ]
  },
  {
    id: 'khadi_lavender',
    name: 'Lavender Khadi Fabric',
    category: 'khaadi',
    subCategory: 'handspun-khaadi',
    patternClass: 'fabric-pattern-linen',
    image: '/khadi_fabrics/Lavender khadi fabric 1.png',
    desc: 'Subtle pastel lavender handspun Khadi fabric offering a soft, contemporary hue with airy comfort.',
    origin: 'India',
    weight: '130 gsm',
    threadCount: 'Handloom Fine Slub',
    breathability: 'Maximum',
    badge: 'Pastel Luxe',
    variants: [
      { id: 'kh_lv_v1', name: 'Texture View 1', colorHex: '#8e7c93', image: '/khadi_fabrics/Lavender khadi fabric 1.png' },
      { id: 'kh_lv_v2', name: 'Texture View 2', colorHex: '#7b6b80', image: '/khadi_fabrics/Lavender khadi fabric 2.png' }
    ]
  },
  {
    id: 'khadi_mauve_pink',
    name: 'Mauve Pink Khadi Fabric',
    category: 'khaadi',
    subCategory: 'handspun-khaadi',
    patternClass: 'fabric-pattern-linen',
    image: '/khadi_fabrics/Mauve pink khadi fabric 1.png',
    desc: 'Elegant muted mauve pink handspun Khadi fabric with delicate natural slubs and light breathable drape.',
    origin: 'India',
    weight: '130 gsm',
    threadCount: 'Handspun Soft Cotton',
    breathability: 'Maximum',
    badge: 'Soft Elegance',
    variants: [
      { id: 'kh_mp_v1', name: 'Texture View 1', colorHex: '#a87082', image: '/khadi_fabrics/Mauve pink khadi fabric 1.png' },
      { id: 'kh_mp_v2', name: 'Texture View 2', colorHex: '#955e70', image: '/khadi_fabrics/Mauve pink khadi fabric 2.png' }
    ]
  },
  {
    id: 'khadi_charcoal_grey',
    name: 'Charcoal Grey Khadi Fabric',
    category: 'khaadi',
    subCategory: 'handspun-khaadi',
    patternClass: 'fabric-pattern-linen',
    image: '/khadi_fabrics/charcol grey khadi fabric 1.png',
    desc: 'Sophisticated dark charcoal grey handspun Khadi with subtle salt-and-pepper slub character for executive ethnic tailoring.',
    origin: 'India',
    weight: '145 gsm',
    threadCount: 'Handspun Double Ply',
    breathability: 'High',
    badge: 'Executive Slate',
    variants: [
      { id: 'kh_cg_v1', name: 'Texture View 1', colorHex: '#383d42', image: '/khadi_fabrics/charcol grey khadi fabric 1.png' },
      { id: 'kh_cg_v2', name: 'Texture View 2', colorHex: '#2c3135', image: '/khadi_fabrics/charcol grey khadi fabric 2.png' }
    ]
  },
  {
    id: 'khadi_brownish_grey',
    name: 'Brownish Grey Khadi Fabric',
    category: 'khaadi',
    subCategory: 'handspun-khaadi',
    patternClass: 'fabric-pattern-linen',
    image: '/khadi_fabrics/Brownish grey khadi fabric 1.png',
    desc: 'Neutral brownish grey handspun Khadi yarn featuring a balanced earth tone and textured slub finish.',
    origin: 'India',
    weight: '140 gsm',
    threadCount: 'Handloom Organic Weave',
    breathability: 'High',
    badge: 'Neutral Earth',
    variants: [
      { id: 'kh_bg_v1', name: 'Texture View 1', colorHex: '#5c544e', image: '/khadi_fabrics/Brownish grey khadi fabric 1.png' },
      { id: 'kh_bg_v2', name: 'Texture View 2', colorHex: '#4d4641', image: '/khadi_fabrics/Brownish grey khadi fabric 2.png' }
    ]
  },
  {
    id: 'khadi_brown',
    name: 'Warm Brown Khadi Fabric',
    category: 'khaadi',
    subCategory: 'handspun-khaadi',
    patternClass: 'fabric-pattern-linen',
    image: '/khadi_fabrics/brown khadi fabric 1.png',
    desc: 'Classic warm chestnut brown handspun Khadi fabric offering durable structure and natural organic hand-feel.',
    origin: 'India',
    weight: '140 gsm',
    threadCount: 'Handspun Organic Cotton',
    breathability: 'High',
    badge: 'Classic Brown',
    variants: [
      { id: 'kh_br_v1', name: 'Texture View 1', colorHex: '#5c3d2e', image: '/khadi_fabrics/brown khadi fabric 1.png' },
      { id: 'kh_br_v2', name: 'Texture View 2', colorHex: '#4a3023', image: '/khadi_fabrics/brown khadi fabric 2.png' }
    ]
  },
  {
    id: 'khadi_khaki',
    name: 'Earthy Khaki Khadi Fabric',
    category: 'khaadi',
    subCategory: 'handspun-khaadi',
    patternClass: 'fabric-pattern-linen',
    image: '/khadi_fabrics/khaki fabric 1.png',
    desc: 'Timeless earthy khaki handspun Khadi fabric with rich texture, ideal for casual trousers, safari shirts, and waistcoats.',
    origin: 'India',
    weight: '140 gsm',
    threadCount: 'Handspun Fine Cotton',
    breathability: 'High',
    badge: 'Safari Classic',
    variants: [
      { id: 'kh_kk_v1', name: 'Texture View 1', colorHex: '#9a8b70', image: '/khadi_fabrics/khaki fabric 1.png' },
      { id: 'kh_kk_v2', name: 'Texture View 2', colorHex: '#877960', image: '/khadi_fabrics/khaki fabric 2.png' }
    ]
  },
  {
    id: 'khadi_choclate_brown',
    name: 'Chocolate Brown Khadi Blend',
    category: 'khaadi',
    subCategory: 'handspun-khaadi',
    patternClass: 'fabric-pattern-linen',
    image: '/khadi_fabrics/choclate brown bamboo fabric 1.png',
    desc: 'Deep chocolate brown handspun Khadi blend fabric offering a luxurious dark coffee shade and soft fluid drape.',
    origin: 'India',
    weight: '145 gsm',
    threadCount: 'Handloom Dense Cotton Blend',
    breathability: 'High',
    badge: 'Deep Espresso',
    variants: [
      { id: 'kh_cb2_v1', name: 'Texture View 1', colorHex: '#4a2c1d', image: '/khadi_fabrics/choclate brown bamboo fabric 1.png' },
      { id: 'kh_cb2_v2', name: 'Texture View 2', colorHex: '#3a2114', image: '/khadi_fabrics/choclate brown bamboo fabric 2.png' }
    ]
  },
  {
    id: 'khadi_burgundy',
    name: 'Burgundy Khadi Fabric',
    category: 'khaadi',
    subCategory: 'handspun-khaadi',
    patternClass: 'fabric-pattern-linen',
    image: '/khadi_fabrics/Burgundy khadi fabric 1.png',
    desc: 'Rich deep burgundy handspun Khadi fabric with subtle textured slub structure, ideal for regal evening waistcoats, kurtas, and tailored shirts.',
    origin: 'India',
    weight: '145 gsm',
    threadCount: 'Handspun Fine Double Ply',
    breathability: 'High',
    badge: 'Regal Burgundy',
    variants: [
      { id: 'kh_bgd_v1', name: 'Texture View 1', colorHex: '#6b1d2f', image: '/khadi_fabrics/Burgundy khadi fabric 1.png' },
      { id: 'kh_bgd_v2', name: 'Texture View 2', colorHex: '#541424', image: '/khadi_fabrics/Burgundy khadi fabric 2.png' }
    ]
  },
  {
    id: 'khadi_green_emerald',
    name: 'Emerald Green Khadi Fabric',
    category: 'khaadi',
    subCategory: 'handspun-khaadi',
    patternClass: 'fabric-pattern-linen',
    image: '/khadi_fabrics/Green emerald khadi fabric 1.png',
    desc: 'Lush emerald green handspun Khadi fabric featuring vibrant botanical tones and breathable organic cotton weave for festive and celebratory wear.',
    origin: 'India',
    weight: '140 gsm',
    threadCount: 'Handloom Dense Weave',
    breathability: 'High',
    badge: 'Vibrant Emerald',
    variants: [
      { id: 'kh_ge_v1', name: 'Texture View 1', colorHex: '#1b5e3f', image: '/khadi_fabrics/Green emerald khadi fabric 1.png' },
      { id: 'kh_ge_v2', name: 'Texture View 2', colorHex: '#12442d', image: '/khadi_fabrics/Green emerald khadi fabric 2.png' }
    ]
  },
  {
    id: 'khadi_cherry_red',
    name: 'Cherry Red Khadi Fabric',
    category: 'khaadi',
    subCategory: 'handspun-khaadi',
    patternClass: 'fabric-pattern-linen',
    image: '/khadi_fabrics/cherry red khadi fabric 1.png',
    desc: 'Bold cherry red handspun Khadi fabric crafted from fine organic cotton yarns with striking color depth and breezy comfort.',
    origin: 'India',
    weight: '135 gsm',
    threadCount: 'Handspun Soft Weave',
    breathability: 'Maximum',
    badge: 'Festive Red',
    variants: [
      { id: 'kh_cr_v1', name: 'Texture View 1', colorHex: '#a81c24', image: '/khadi_fabrics/cherry red khadi fabric 1.png' },
      { id: 'kh_cr_v2', name: 'Texture View 2', colorHex: '#8c1319', image: '/khadi_fabrics/cherry red khadi fabric 2.png' }
    ]
  },
  {
    id: 'pv_alexandrite_teal',
    name: 'Alexandrite Teal Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/Alexandrite teal fabric 1.png',
    desc: 'Lustrous Alexandrite teal poly-viscose blend fabric featuring rich gem-toned depth, fluid drape, and wrinkle-resistant structure for statement blazers and suits.',
    origin: 'India / Italy Mill',
    weight: '240 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Jewel Tone',
    variants: [
      { id: 'pv_at_v1', name: 'Texture View 1', colorHex: '#2a6f78', image: '/polyviscose/Alexandrite teal fabric 1.png' },
      { id: 'pv_at_v2', name: 'Texture View 2', colorHex: '#205860', image: '/polyviscose/Alexandrite teal fabric 2.png' }
    ]
  },
  {
    id: 'pv_beige',
    name: 'Classic Beige Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/beige fabric 1.png',
    desc: 'Refined warm neutral beige poly-viscose fabric. Perfect for versatile summer suits, trousers, waistcoats, and casual bespoke tailoring.',
    origin: 'India / Italy Mill',
    weight: '235 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Neutral Classic',
    variants: [
      { id: 'pv_bg_v1', name: 'Texture View 1', colorHex: '#d2c4b0', image: '/polyviscose/beige fabric 1.png' },
      { id: 'pv_bg_v2', name: 'Texture View 2', colorHex: '#c2b39f', image: '/polyviscose/beige fabric 2.png' }
    ]
  },
  {
    id: 'pv_berry_purple',
    name: 'Berry Purple Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/berry purple fabric 1.png',
    desc: 'Opulent deep berry purple poly-viscose fabric with a luxurious tactile finish and smooth drape for bespoke evening wear and party blazers.',
    origin: 'India / Italy Mill',
    weight: '245 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Evening Luxury',
    variants: [
      { id: 'pv_bp_v1', name: 'Texture View 1', colorHex: '#5c2849', image: '/polyviscose/berry purple fabric 1.png' },
      { id: 'pv_bp_v2', name: 'Texture View 2', colorHex: '#481f3a', image: '/polyviscose/berry purple fabric 2.png' }
    ]
  },
  {
    id: 'pv_blue_gray',
    name: 'Blue Gray Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/blue gray poly viscos fabric 1.png',
    desc: 'Sophisticated slate blue-gray poly-viscose cloth. Offers exceptional crease recovery and sharp silhouette retention for daily executive wear.',
    origin: 'India / Italy Mill',
    weight: '240 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Executive Choice',
    variants: [
      { id: 'pv_bgy_v1', name: 'Texture View 1', colorHex: '#54687a', image: '/polyviscose/blue gray poly viscos fabric 1.png' },
      { id: 'pv_bgy_v2', name: 'Texture View 2', colorHex: '#435463', image: '/polyviscose/blue gray poly viscos fabric 2.png' }
    ]
  },
  {
    id: 'pv_charcoal_grey',
    name: 'Charcoal Grey Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/charcol grey fabric 1.png',
    desc: 'Timeless charcoal grey poly-viscose blend. Crisp, professional, and durable for two-piece business suits and tailored formal trousers.',
    origin: 'India / Italy Mill',
    weight: '245 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Corporate Essential',
    variants: [
      { id: 'pv_cg_v1', name: 'Texture View 1', colorHex: '#383b40', image: '/polyviscose/charcol grey fabric 1.png' },
      { id: 'pv_cg_v2', name: 'Texture View 2', colorHex: '#2a2c30', image: '/polyviscose/charcol grey fabric 2.png' }
    ]
  },
  {
    id: 'pv_chartreuse',
    name: 'Chartreuse Lime Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/chartreuse fabric 1.png',
    desc: 'Bold and vibrant chartreuse yellow-green poly-viscose fabric. Crafted for distinctive statement pieces, kurtas, and designer jackets.',
    origin: 'India / Italy Mill',
    weight: '235 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Designer Vibrant',
    variants: [
      { id: 'pv_ch_v1', name: 'Texture View 1', colorHex: '#a6b547', image: '/polyviscose/chartreuse fabric 1.png' },
      { id: 'pv_ch_v2', name: 'Texture View 2', colorHex: '#94a23d', image: '/polyviscose/chartreuse fabric 2.png' }
    ]
  },
  {
    id: 'pv_cloud_cream',
    name: 'Cloud Cream Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/cloud cream fabric 1.png',
    desc: 'Soft buttery cloud cream poly-viscose blend with an ultra-smooth finish and clean matte look for summer bandhgalas and tuxedos.',
    origin: 'India / Italy Mill',
    weight: '230 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Summer Luxe',
    variants: [
      { id: 'pv_cc_v1', name: 'Texture View 1', colorHex: '#f0ece1', image: '/polyviscose/cloud cream fabric 1.png' },
      { id: 'pv_cc_v2', name: 'Texture View 2', colorHex: '#e0dacf', image: '/polyviscose/cloud cream fabric 2.png' }
    ]
  },
  {
    id: 'pv_cobalt_blue',
    name: 'Cobalt Blue Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/cobalt blue fabric 1.png',
    desc: 'Striking electric cobalt blue poly-viscose suiting fabric. High color brilliance and sharp drape designed for standout formal attire.',
    origin: 'India / Italy Mill',
    weight: '245 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Bold Suiting',
    variants: [
      { id: 'pv_cb_v1', name: 'Texture View 1', colorHex: '#1f4b8e', image: '/polyviscose/cobalt blue fabric 1.png' },
      { id: 'pv_cb_v2', name: 'Texture View 2', colorHex: '#173b70', image: '/polyviscose/cobalt blue fabric 2.png' }
    ]
  },
  {
    id: 'pv_cocoa_brown',
    name: 'Cocoa Brown Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/cocoa brown fabric 1.png',
    desc: 'Deep rich cocoa chocolate brown poly-viscose blend with warm undertones, soft viscose hand-feel, and robust shape retention.',
    origin: 'India / Italy Mill',
    weight: '240 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Earth Tone',
    variants: [
      { id: 'pv_coc_v1', name: 'Texture View 1', colorHex: '#4a332a', image: '/polyviscose/cocoa brown fabric 1.png' },
      { id: 'pv_coc_v2', name: 'Texture View 2', colorHex: '#3a2720', image: '/polyviscose/cocoa brown fabric 2.png' }
    ]
  },
  {
    id: 'pv_deep_plum',
    name: 'Deep Plum Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/Deep plum fabric 1.png',
    desc: 'Intense deep plum wine poly-viscose tailored cloth featuring a subtle sheen and wrinkle-free composition for evening jackets.',
    origin: 'India / Italy Mill',
    weight: '245 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Evening Plum',
    variants: [
      { id: 'pv_dp_v1', name: 'Texture View 1', colorHex: '#4a203b', image: '/polyviscose/Deep plum fabric 1.png' },
      { id: 'pv_dp_v2', name: 'Texture View 2', colorHex: '#38162c', image: '/polyviscose/Deep plum fabric 2.png' }
    ]
  },
  {
    id: 'pv_dusty_rose',
    name: 'Dusty Rose Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/Dusty rose fabric 1.png',
    desc: 'Delicate pastel dusty rose poly-viscose fabric. Subtle vintage undertones and smooth drape suitable for festive attire and contemporary suits.',
    origin: 'India / Italy Mill',
    weight: '235 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Pastel Elegance',
    variants: [
      { id: 'pv_dr_v1', name: 'Texture View 1', colorHex: '#aa7382', image: '/polyviscose/Dusty rose fabric 1.png' },
      { id: 'pv_dr_v2', name: 'Texture View 2', colorHex: '#94616f', image: '/polyviscose/Dusty rose fabric 2.png' }
    ]
  },
  {
    id: 'pv_fuchsia_pink',
    name: 'Fuchsia Pink Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/fushia pink fabric 1.png',
    desc: 'Lively fuchsia pink poly-viscose fabric engineered with high color saturation and fluid drape for eye-catching statement garments.',
    origin: 'India / Italy Mill',
    weight: '235 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Festive Pop',
    variants: [
      { id: 'pv_fp_v1', name: 'Texture View 1', colorHex: '#a82963', image: '/polyviscose/fushia pink fabric 1.png' },
      { id: 'pv_fp_v2', name: 'Texture View 2', colorHex: '#8e2053', image: '/polyviscose/fushia pink fabric 2.png' }
    ]
  },
  {
    id: 'pv_ice_blue',
    name: 'Ice Blue Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/ice blue fabric 1.png',
    desc: 'Cool, refreshing ice blue poly-viscose blend. Crisp hand feel and wrinkle resistance tailored for airy spring-summer suiting.',
    origin: 'India / Italy Mill',
    weight: '235 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Cool Pastel',
    variants: [
      { id: 'pv_ib_v1', name: 'Texture View 1', colorHex: '#9bb7c9', image: '/polyviscose/ice blue fabric 1.png' },
      { id: 'pv_ib_v2', name: 'Texture View 2', colorHex: '#88a4b5', image: '/polyviscose/ice blue fabric 2.png' }
    ]
  },
  {
    id: 'pv_ivory',
    name: 'Ivory Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/ivory fabric 1.png',
    desc: 'Pristine warm ivory poly-viscose fabric. Offers structured elegance, soft breathability, and ease of care for dinner jackets and ceremonial wear.',
    origin: 'India / Italy Mill',
    weight: '230 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Ceremonial Classic',
    variants: [
      { id: 'pv_iv_v1', name: 'Texture View 1', colorHex: '#f4f0e6', image: '/polyviscose/ivory fabric 1.png' },
      { id: 'pv_iv_v2', name: 'Texture View 2', colorHex: '#e5e1d7', image: '/polyviscose/ivory fabric 2.png' }
    ]
  },
  {
    id: 'pv_jade_green',
    name: 'Jade Green Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/jade green fabric 1.png',
    desc: 'Regal emerald jade green poly-viscose fabric featuring rich jewel tone depth, high color fastness, and tailored structural elegance.',
    origin: 'India / Italy Mill',
    weight: '245 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Jewel Suiting',
    variants: [
      { id: 'pv_jg_v1', name: 'Texture View 1', colorHex: '#2d7357', image: '/polyviscose/jade green fabric 1.png' },
      { id: 'pv_jg_v2', name: 'Texture View 2', colorHex: '#235c45', image: '/polyviscose/jade green fabric 2.png' }
    ]
  },
  {
    id: 'pv_mauve_pink',
    name: 'Mauve Pink Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/Mauve pink fabric 1.png',
    desc: 'Sophisticated dusty mauve pink poly-viscose blend. Subtle tone and soft hand-feel suited for modern contemporary jackets and suits.',
    origin: 'India / Italy Mill',
    weight: '235 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Modern Pastel',
    variants: [
      { id: 'pv_mp_v1', name: 'Texture View 1', colorHex: '#966d7c', image: '/polyviscose/Mauve pink fabric 1.png' },
      { id: 'pv_mp_v2', name: 'Texture View 2', colorHex: '#805b6a', image: '/polyviscose/Mauve pink fabric 2.png' }
    ]
  },
  {
    id: 'pv_merlot',
    name: 'Merlot Wine Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/merlot fabric 1.png',
    desc: 'Deep velvety merlot wine poly-viscose cloth. Rich wine-red tones with superior crease recovery for bespoke evening wear.',
    origin: 'India / Italy Mill',
    weight: '245 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Wine Collection',
    variants: [
      { id: 'pv_mr_v1', name: 'Texture View 1', colorHex: '#5c1a26', image: '/polyviscose/merlot fabric 1.png' },
      { id: 'pv_mr_v2', name: 'Texture View 2', colorHex: '#4a131e', image: '/polyviscose/merlot fabric 2.png' }
    ]
  },
  {
    id: 'pv_midnight_navy',
    name: 'Midnight Navy Blue Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/Midnight navy blue fabric 1.png',
    desc: 'Quintessential midnight navy blue poly-viscose fabric. Deep dark navy shade engineered for versatile formal and corporate suits.',
    origin: 'India / Italy Mill',
    weight: '245 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Best Seller',
    variants: [
      { id: 'pv_mn_v1', name: 'Texture View 1', colorHex: '#1b273b', image: '/polyviscose/Midnight navy blue fabric 1.png' },
      { id: 'pv_mn_v2', name: 'Texture View 2', colorHex: '#131c2b', image: '/polyviscose/Midnight navy blue fabric 2.png' }
    ]
  },
  {
    id: 'pv_petrol_blue',
    name: 'Petrol Blue Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/Petrol blue fabric 1.png',
    desc: 'Modern deep oceanic petrol blue poly-viscose blend. Rich chromatic depth and smooth wrinkle-free drape for executive attire.',
    origin: 'India / Italy Mill',
    weight: '240 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Oceanic Suiting',
    variants: [
      { id: 'pv_pb_v1', name: 'Texture View 1', colorHex: '#1f4e5b', image: '/polyviscose/Petrol blue fabric 1.png' },
      { id: 'pv_pb_v2', name: 'Texture View 2', colorHex: '#173c47', image: '/polyviscose/Petrol blue fabric 2.png' }
    ]
  },
  {
    id: 'pv_pine_green',
    name: 'Pine Green Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/pine green viscos fabric 1.png',
    desc: 'Earthy deep pine green poly-viscose blend cloth. Robust structural body and natural drape crafted for safari jackets and formal suits.',
    origin: 'India / Italy Mill',
    weight: '240 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Forest Deep',
    variants: [
      { id: 'pv_pg_v1', name: 'Texture View 1', colorHex: '#224733', image: '/polyviscose/pine green viscos fabric 1.png' },
      { id: 'pv_pg_v2', name: 'Texture View 2', colorHex: '#193626', image: '/polyviscose/pine green viscos fabric 2.png' }
    ]
  },
  {
    id: 'pv_pistachio',
    name: 'Pistachio Green Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/pistachio fabric 1.png',
    desc: 'Light calming pistachio green poly-viscose blend. Airy look and easy care performance for spring, summer, and daytime events.',
    origin: 'India / Italy Mill',
    weight: '235 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Light Pastel',
    variants: [
      { id: 'pv_pst_v1', name: 'Texture View 1', colorHex: '#9cb58b', image: '/polyviscose/pistachio fabric 1.png' },
      { id: 'pv_pst_v2', name: 'Texture View 2', colorHex: '#89a278', image: '/polyviscose/pistachio fabric 2.png' }
    ]
  },
  {
    id: 'pv_sapphire_blue',
    name: 'Sapphire Blue Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/sapphire blue viscos fabric 1.png',
    desc: 'Brilliant royal sapphire blue poly-viscose fabric with deep luster, high thread density, and crisp wrinkle recovery.',
    origin: 'India / Italy Mill',
    weight: '245 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Royal Suiting',
    variants: [
      { id: 'pv_sb_v1', name: 'Texture View 1', colorHex: '#1d3d6b', image: '/polyviscose/sapphire blue viscos fabric 1.png' },
      { id: 'pv_sb_v2', name: 'Texture View 2', colorHex: '#152e52', image: '/polyviscose/sapphire blue viscos fabric 2.png' }
    ]
  },
  {
    id: 'pv_taupe_grey',
    name: 'Taupe Grey Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/taupe grey fabric 1.png',
    desc: 'Refined earthy taupe grey poly-viscose blend. Versatile neutral tone with durable shape retention for bespoke trousers and suits.',
    origin: 'India / Italy Mill',
    weight: '240 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'All-Season Suiting',
    variants: [
      { id: 'pv_tg_v1', name: 'Texture View 1', colorHex: '#6c6760', image: '/polyviscose/taupe grey fabric 1.png' },
      { id: 'pv_tg_v2', name: 'Texture View 2', colorHex: '#58534d', image: '/polyviscose/taupe grey fabric 2.png' }
    ]
  },
  {
    id: 'pv_neptune_green',
    name: 'Neptune Green Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/Neptune green fabric 1.png',
    desc: 'Distinctive oceanic Neptune green poly-viscose blend fabric featuring refreshing depth, fluid drape, and wrinkle-resistant structure for modern bespoke suits.',
    origin: 'India / Italy Mill',
    weight: '240 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Oceanic Tone',
    variants: [
      { id: 'pv_ng_v1', name: 'Texture View 1', colorHex: '#1d5e56', image: '/polyviscose/Neptune green fabric 1.png' },
      { id: 'pv_ng_v2', name: 'Texture View 2', colorHex: '#144640', image: '/polyviscose/Neptune green fabric 2.png' }
    ]
  },
  {
    id: 'pv_dark_chocolate',
    name: 'Dark Chocolate Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/dark chocolate fabric 1.png',
    desc: 'Indulgent deep dark chocolate brown poly-viscose cloth. Offers rich earthy warmth, lustrous finish, and exceptional crease resistance for tailored blazers and suits.',
    origin: 'India / Italy Mill',
    weight: '245 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Deep Earth',
    variants: [
      { id: 'pv_dc_v1', name: 'Texture View 1', colorHex: '#38241d', image: '/polyviscose/dark chocolate fabric 1.png' },
      { id: 'pv_dc_v2', name: 'Texture View 2', colorHex: '#291913', image: '/polyviscose/dark chocolate fabric 2.png' }
    ]
  },
  {
    id: 'pv_frosted_pink',
    name: 'Frosted Pink Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/frosted pink fabric 1.png',
    desc: 'Subtle frosted pale pink poly-viscose blend with an airy modern pastel aesthetic and soft viscose drape, ideal for contemporary suits and summer jackets.',
    origin: 'India / Italy Mill',
    weight: '235 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Pastel Luxe',
    variants: [
      { id: 'pv_fpk_v1', name: 'Texture View 1', colorHex: '#d8aab4', image: '/polyviscose/frosted pink fabric 1.png' },
      { id: 'pv_fpk_v2', name: 'Texture View 2', colorHex: '#c496a0', image: '/polyviscose/frosted pink fabric 2.png' }
    ]
  },
  {
    id: 'pv_oxblood',
    name: 'Oxblood Red Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/oxblood fabric 1.png',
    desc: 'Commanding rich oxblood crimson-brown poly-viscose fabric designed for bold evening statement pieces, dinner jackets, and bespoke trousers.',
    origin: 'India / Italy Mill',
    weight: '245 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Statement Luxury',
    variants: [
      { id: 'pv_ox_v1', name: 'Texture View 1', colorHex: '#52191e', image: '/polyviscose/oxblood fabric 1.png' },
      { id: 'pv_ox_v2', name: 'Texture View 2', colorHex: '#3d1115', image: '/polyviscose/oxblood fabric 2.png' }
    ]
  },
  {
    id: 'pv_raspberry_red',
    name: 'Raspberry Red Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/raspberry red fabric 1.png',
    desc: 'Lustrous vibrant raspberry red poly-viscose blend featuring jewel-like radiance, superb drape, and durable shape retention for party and festive tailoring.',
    origin: 'India / Italy Mill',
    weight: '240 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Festive Jewel',
    variants: [
      { id: 'pv_rr_v1', name: 'Texture View 1', colorHex: '#8b1e3f', image: '/polyviscose/raspberry red fabric 1.png' },
      { id: 'pv_rr_v2', name: 'Texture View 2', colorHex: '#731633', image: '/polyviscose/raspberry red fabric 2.png' }
    ]
  },
  {
    id: 'pv_rust_orange',
    name: 'Rust Orange Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/rust orange fabric 1.png',
    desc: 'Warm autumnal terracotta rust orange poly-viscose fabric. Richly saturated hue with structured resilience for safari jackets, overcoats, and festive blazers.',
    origin: 'India / Italy Mill',
    weight: '240 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Autumn Warmth',
    variants: [
      { id: 'pv_ro_v1', name: 'Texture View 1', colorHex: '#9c4323', image: '/polyviscose/rust orange fabric 1.png' },
      { id: 'pv_ro_v2', name: 'Texture View 2', colorHex: '#803419', image: '/polyviscose/rust orange fabric 2.png' }
    ]
  },
  {
    id: 'pv_teaberry_pink',
    name: 'Teaberry Pink Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/teaberry pink fabric 1.png',
    desc: 'Charming dusky teaberry pink poly-viscose cloth. Soft texture, flattering modern undertone, and excellent wrinkle recovery for stylish smart-casual attire.',
    origin: 'India / Italy Mill',
    weight: '235 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Dusk Rose',
    variants: [
      { id: 'pv_tp_v1', name: 'Texture View 1', colorHex: '#b25d74', image: '/polyviscose/teaberry pink fabric 1.png' },
      { id: 'pv_tp_v2', name: 'Texture View 2', colorHex: '#9c4d62', image: '/polyviscose/teaberry pink fabric 2.png' }
    ]
  },
  {
    id: 'pv_onyx_black',
    name: 'Onyx Black Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/black_polyviscose_1.jpg',
    desc: 'Deep jet black poly-viscose blend suiting cloth with clean weave structure, crisp drape, and complete wrinkle resistance for tuxedos and formal suits.',
    origin: 'India / Italy Mill',
    weight: '250 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Formal Classic',
    variants: [
      { id: 'pv_obk_v1', name: 'Texture View 1', colorHex: '#141416', image: '/polyviscose/black_polyviscose_1.jpg' }
    ]
  },
  {
    id: 'pv_imperial_burgundy',
    name: 'Imperial Burgundy Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/burgundy_polyviscose_1.jpg',
    desc: 'Rich imperial burgundy poly-viscose suiting with deep wine undertones and a refined silky finish for luxury dinner jackets and evening blazers.',
    origin: 'India / Italy Mill',
    weight: '245 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Evening Regal',
    variants: [
      { id: 'pv_ibg_v1', name: 'Texture View 1', colorHex: '#4d121e', image: '/polyviscose/burgundy_polyviscose_1.jpg' }
    ]
  },
  {
    id: 'pv_heritage_camel',
    name: 'Heritage Camel Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/camel_polyviscose_1.jpg',
    desc: 'Distinguished warm camel tan poly-viscose blend. Versatile neutral aesthetic with a resilient drape suited for overcoats and stylish daywear.',
    origin: 'India / Italy Mill',
    weight: '240 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Autumn Classic',
    variants: [
      { id: 'pv_hcm_v1', name: 'Texture View 1', colorHex: '#a8794f', image: '/polyviscose/camel_polyviscose_1.jpg' }
    ]
  },
  {
    id: 'pv_estate_charcoal',
    name: 'Estate Charcoal Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/charcoal_polyviscose_1.jpg',
    desc: 'Dense estate charcoal poly-viscose cloth offering sharp tailoring lines, long-lasting durability, and crease recovery for executive 2-piece suits.',
    origin: 'India / Italy Mill',
    weight: '250 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Executive Suiting',
    variants: [
      { id: 'pv_ech_v1', name: 'Texture View 1', colorHex: '#2b2d30', image: '/polyviscose/charcoal_polyviscose_1.jpg' }
    ]
  },
  {
    id: 'pv_royal_emerald',
    name: 'Royal Emerald Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/emerald_polyviscose_1.jpg',
    desc: 'Deep royal emerald green poly-viscose blend fabric featuring rich gem luster and supple drape for ceremonial and celebratory garments.',
    origin: 'India / Italy Mill',
    weight: '245 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Gemstone Luxury',
    variants: [
      { id: 'pv_rem_v1', name: 'Texture View 1', colorHex: '#163d2c', image: '/polyviscose/emerald_polyviscose_1.jpg' }
    ]
  },
  {
    id: 'pv_espresso_mocha',
    name: 'Espresso Mocha Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/mocha_polyviscose_1.jpg',
    desc: 'Deep warm espresso mocha poly-viscose cloth. Rich earthy elegance with high wrinkle resistance for sharp modern silhouettes.',
    origin: 'India / Italy Mill',
    weight: '240 gsm',
    threadCount: '65/35 High-Twill Blend',
    breathability: 'High',
    badge: 'Warm Earth',
    variants: [
      { id: 'pv_esm_v1', name: 'Texture View 1', colorHex: '#483327', image: '/polyviscose/mocha_polyviscose_1.jpg' }
    ]
  },
  {
    id: 'pv_admiral_navy',
    name: 'Admiral Navy Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/navy_polyviscose_1.jpg',
    desc: 'Authoritative deep admiral navy blue poly-viscose blend suiting fabric. Structured, comfortable, and tailored for executive leadership wear.',
    origin: 'India / Italy Mill',
    weight: '245 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Corporate Standard',
    variants: [
      { id: 'pv_anv_v1', name: 'Texture View 1', colorHex: '#162338', image: '/polyviscose/navy_polyviscose_1.jpg' }
    ]
  },
  {
    id: 'pv_savannah_olive',
    name: 'Savannah Olive Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/olive_polyviscose_1.jpg',
    desc: 'Muted savannah olive green poly-viscose blend. Subtle natural tones with durable weave and comfortable drape for safari jackets and casual trousers.',
    origin: 'India / Italy Mill',
    weight: '240 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Modern Earth',
    variants: [
      { id: 'pv_svo_v1', name: 'Texture View 1', colorHex: '#474f3b', image: '/polyviscose/olive_polyviscose_1.jpg' }
    ]
  },
  {
    id: 'pv_velvet_plum',
    name: 'Velvet Plum Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/plum_polyviscose_1.jpg',
    desc: 'Opulent velvet plum purple poly-viscose cloth. Deep chromatic intensity, smooth hand-feel, and crisp crease recovery for statement tailoring.',
    origin: 'India / Italy Mill',
    weight: '245 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Evening Velvet',
    variants: [
      { id: 'pv_vpl_v1', name: 'Texture View 1', colorHex: '#441d36', image: '/polyviscose/plum_polyviscose_1.jpg' }
    ]
  },
  {
    id: 'pv_sterling_silver',
    name: 'Sterling Silver Grey Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/silver_grey_polyviscose_1.jpg',
    desc: 'Contemporary luminous sterling silver-grey poly-viscose fabric with a fine sheen, crisp drape, and exceptional versatility across seasons.',
    origin: 'India / Italy Mill',
    weight: '235 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Silver Luxe',
    variants: [
      { id: 'pv_ssg_v1', name: 'Texture View 1', colorHex: '#9da3a6', image: '/polyviscose/silver_grey_polyviscose_1.jpg' }
    ]
  },
  {
    id: 'pv_nordic_slate',
    name: 'Nordic Slate Blue Poly-Viscose',
    category: 'polyviscose',
    patternClass: 'fabric-pattern-polyviscose',
    image: '/polyviscose/slate_blue_polyviscose_1.jpg',
    desc: 'Sophisticated Nordic slate blue poly-viscose blend. Subtle grey-blue character with all-day crease resistance for boardroom and evening wear.',
    origin: 'India / Italy Mill',
    weight: '240 gsm',
    threadCount: '65/35 High-Twist Twill',
    breathability: 'High',
    badge: 'Nordic Blue',
    variants: [
      { id: 'pv_nsb_v1', name: 'Texture View 1', colorHex: '#3c4e5e', image: '/polyviscose/slate_blue_polyviscose_1.jpg' }
    ]
  }
];

export default function Fabric() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cottonSubCategory, setCottonSubCategory] = useState('all');
  const [activeLightboxFabric, setActiveLightboxFabric] = useState(null);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [fullscreenIndex, setFullscreenIndex] = useState(null);
  const activeThumbRef = useRef(null);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);
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
    const matchesCottonSubCategory = 
      selectedCategory !== 'cotton' || 
      cottonSubCategory === 'all' || 
      fabric.subCategory === cottonSubCategory;
    return matchesSearch && matchesCategory && matchesCottonSubCategory;
  });

  // Flat array of all images across filtered fabrics for gallery navigation
  const allGalleryImages = useMemo(() => {
    const list = [];
    filteredFabrics.forEach((fabric) => {
      if (fabric.variants && fabric.variants.length > 0) {
        fabric.variants.forEach((v) => {
          list.push({
            id: `${fabric.id}-${v.id}`,
            fabricId: fabric.id,
            fabricName: fabric.name,
            variantId: v.id,
            variantName: v.name,
            image: v.image,
            origin: fabric.origin,
            badge: fabric.badge,
            desc: fabric.desc,
            weight: fabric.weight,
            threadCount: fabric.threadCount,
            breathability: fabric.breathability,
            category: fabric.category,
            patternClass: fabric.patternClass
          });
        });
      } else if (fabric.image) {
        list.push({
          id: `${fabric.id}-main`,
          fabricId: fabric.id,
          fabricName: fabric.name,
          variantId: null,
          variantName: '',
          image: fabric.image,
          origin: fabric.origin,
          badge: fabric.badge,
          desc: fabric.desc,
          weight: fabric.weight,
          threadCount: fabric.threadCount,
          breathability: fabric.breathability,
          category: fabric.category,
          patternClass: fabric.patternClass
        });
      }
    });
    return list;
  }, [filteredFabrics]);

  const openFullscreenForImage = (imageSrc, fabricId) => {
    let index = allGalleryImages.findIndex(
      (item) => item.image === imageSrc && (!fabricId || item.fabricId === fabricId)
    );
    if (index === -1 && imageSrc) {
      index = allGalleryImages.findIndex((item) => item.image === imageSrc);
    }
    if (index === -1 && fabricId) {
      index = allGalleryImages.findIndex((item) => item.fabricId === fabricId);
    }
    setFullscreenIndex(index !== -1 ? index : 0);
  };

  // Keyboard navigation
  useEffect(() => {
    if (fullscreenIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setFullscreenIndex((prev) => (prev === null ? null : (prev + 1) % allGalleryImages.length));
      } else if (e.key === 'ArrowLeft') {
        setFullscreenIndex((prev) => (prev === null ? null : (prev - 1 + allGalleryImages.length) % allGalleryImages.length));
      } else if (e.key === 'Escape') {
        setFullscreenIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenIndex, allGalleryImages.length]);

  // Thumbnail autoscroll into view
  useEffect(() => {
    if (fullscreenIndex !== null && activeThumbRef.current) {
      activeThumbRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [fullscreenIndex]);

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    touchEndXRef.current = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (diff > 50) {
      setFullscreenIndex((prev) => (prev === null ? null : (prev + 1) % allGalleryImages.length));
    } else if (diff < -50) {
      setFullscreenIndex((prev) => (prev === null ? null : (prev - 1 + allGalleryImages.length) % allGalleryImages.length));
    }
  };

  return (
    <div className="fabric-page-wrapper">

      <section className="section">
        {/* Search and Filters */}
        <div className="filter-bar">
          <div className="search-input-wrapper">
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search fabrics by name, mill, or origin..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-search-btn" onClick={() => setSearchTerm('')} title="Clear search">
                ✕
              </button>
            )}
          </div>
          <div className="filter-tabs-wrapper">
            <div className="filter-tabs">
              {['all', 'cotton', 'khaadi', 'linen', 'wool', 'silk', 'satin', 'armani', 'polyviscose', 'spoon', 'other'].map((cat) => (
                <button
                  key={cat}
                  className={`filter-tab ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  <span className="tab-label">
                    {cat === 'all'
                      ? 'All'
                      : cat === 'silk'
                      ? 'Silk'
                      : cat === 'wool'
                      ? 'Wool'
                      : cat === 'khaadi'
                      ? 'Khaadi'
                      : cat === 'other'
                      ? 'Others'
                      : cat === 'spoon'
                      ? 'Spun / Spoon'
                      : cat === 'satin'
                      ? 'Satin'
                      : cat === 'polyviscose'
                      ? 'Poly-Viscose'
                      : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </span>
                  {selectedCategory === cat && <span className="active-dot" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cotton Sub-Category Dropdown Bar */}
        {selectedCategory === 'cotton' && (
          <div className="cotton-subcategory-bar animate-fade-in">
            <div className="cotton-dropdown-group">
              <label htmlFor="cotton-dropdown-select" className="cotton-dropdown-label">
                Cotton Sub-Category:
              </label>
              <select
                id="cotton-dropdown-select"
                className="cotton-dropdown-select"
                value={cottonSubCategory}
                onChange={(e) => setCottonSubCategory(e.target.value)}
              >
                <option value="all">All Cotton Fabrics</option>
                <option value="pure-egyptian-giza-cotton">Pure Egyptian Giza Cotton</option>
                <option value="bamboo-cotton">Bamboo Cotton (Eco-Friendly Bamboo Blend)</option>
                <option value="linen-cotton">Linen Cotton (Linen-Cotton Blends)</option>
                <option value="pure-cotton">Pure Supima & Fine Cotton</option>
              </select>
            </div>

            <div className="cotton-pills-group">
              <button
                className={`cotton-pill-btn ${cottonSubCategory === 'all' ? 'active' : ''}`}
                onClick={() => setCottonSubCategory('all')}
              >
                All Cotton
              </button>
              <button
                className={`cotton-pill-btn ${cottonSubCategory === 'pure-egyptian-giza-cotton' ? 'active' : ''}`}
                onClick={() => setCottonSubCategory('pure-egyptian-giza-cotton')}
              >
                Pure Egyptian Giza Cotton
              </button>
              <button
                className={`cotton-pill-btn ${cottonSubCategory === 'bamboo-cotton' ? 'active' : ''}`}
                onClick={() => setCottonSubCategory('bamboo-cotton')}
              >
                Bamboo Cotton
              </button>
              <button
                className={`cotton-pill-btn ${cottonSubCategory === 'linen-cotton' ? 'active' : ''}`}
                onClick={() => setCottonSubCategory('linen-cotton')}
              >
                Linen Cotton
              </button>
              <button
                className={`cotton-pill-btn ${cottonSubCategory === 'pure-cotton' ? 'active' : ''}`}
                onClick={() => setCottonSubCategory('pure-cotton')}
              >
                Pure Cotton
              </button>
            </div>
          </div>
        )}

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
              const fabricImage = activeVariant?.image || fabric.image;
              return (
                <div key={fabric.id} className="fabric-card animate-fade-in">
                  <div 
                    className="fabric-sample-render" 
                    style={{ cursor: 'zoom-in', overflow: 'hidden', position: 'relative' }}
                    onClick={() => setActiveLightboxFabric({ ...fabric, activeVariant })}
                    title="Click to view full fabric swatch"
                  >
                    {fabricImage ? (
                      <img 
                        src={fabricImage} 
                        alt={fabric.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                      />
                    ) : (
                      <div 
                        className={fabric.patternClass}
                        style={{ width: '100%', height: '100%' }}
                      ></div>
                    )}
                    <span className="fabric-badge">{fabric.badge}</span>
                  </div>
                  <div className="fabric-info">
                    <div className="fabric-title-row">
                      <h3>{fabric.name}</h3>
                    </div>
                    <p className="fabric-description">{fabric.desc}</p>

                    {fabric.variants && fabric.variants.length > 0 && (
                      <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.8rem', marginBottom: '1rem' }}>
                        {fabric.variants.map((v) => {
                          const isSelected = activeVariantId === v.id;
                          return (
                            <button
                              key={v.id}
                              onClick={() => setSelectedVariants(prev => ({ ...prev, [fabric.id]: v.id }))}
                              style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                border: isSelected ? '2px solid var(--beige-gold)' : '1px solid rgba(255,255,255,0.2)',
                                cursor: 'pointer',
                                padding: 0,
                                opacity: isSelected ? 1 : 0.6,
                                transition: 'all 0.2s ease',
                                outline: 'none',
                                boxShadow: isSelected ? '0 0 10px rgba(255, 217, 190, 0.4)' : 'none',
                                transform: isSelected ? 'scale(1.05)' : 'scale(1)'
                              }}
                              title={v.name}
                            >
                              <img 
                                src={v.image} 
                                alt={v.name} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                              />
                            </button>
                          );
                        })}
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
                color: '#000000',
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
                marginBottom: '1rem',
                fontFamily: 'var(--font-serif)',
                textAlign: 'center'
              }}>
                {activeLightboxFabric.name}
              </h3>

              {/* Large swatch render box */}
              {(() => {
                const modalImgSrc = activeLightboxFabric.activeVariant?.image || activeLightboxFabric.image;
                return (
                  <div 
                    style={{
                      width: '100%',
                      height: '300px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '2px solid rgba(197, 168, 128, 0.4)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                      marginBottom: '1.5rem',
                      position: 'relative',
                      cursor: 'zoom-in'
                    }}
                    onClick={() => openFullscreenForImage(modalImgSrc, activeLightboxFabric.id)}
                    title="Click for full screen view"
                  >
                    {modalImgSrc ? (
                      <img 
                        src={modalImgSrc} 
                        alt={activeLightboxFabric.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s ease' }} 
                      />
                    ) : (
                      <div 
                        className={activeLightboxFabric.patternClass}
                        style={{ width: '100%', height: '100%' }}
                      ></div>
                    )}
                    <span className="fabric-badge" style={{ top: '1rem', right: '1rem' }}>
                      {activeLightboxFabric.badge}
                    </span>
                    <div 
                      style={{
                        position: 'absolute',
                        bottom: '0.8rem',
                        right: '0.8rem',
                        background: 'rgba(0, 0, 0, 0.7)',
                        backdropFilter: 'blur(4px)',
                        color: 'var(--beige-gold)',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        border: '1px solid rgba(197, 168, 128, 0.3)',
                        pointerEvents: 'none'
                      }}
                    >
                      Tap for Full Screen
                    </div>
                  </div>
                );
              })()}

              {activeLightboxFabric.variants && activeLightboxFabric.variants.length > 0 && (
                <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  {activeLightboxFabric.variants.map((v) => {
                    const isSelected = activeLightboxFabric.activeVariant?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => {
                          setActiveLightboxFabric(prev => ({ ...prev, activeVariant: v }));
                          setSelectedVariants(prev => ({ ...prev, [activeLightboxFabric.id]: v.id }));
                        }}
                        style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border: isSelected ? '2px solid var(--beige-gold)' : '1px solid rgba(255,255,255,0.2)',
                          cursor: 'pointer',
                          padding: 0,
                          opacity: isSelected ? 1 : 0.6,
                          transition: 'all 0.2s ease',
                          outline: 'none',
                          boxShadow: isSelected ? '0 0 12px rgba(255, 217, 190, 0.5)' : 'none',
                          transform: isSelected ? 'scale(1.05)' : 'scale(1)'
                        }}
                        title={v.name}
                      >
                        <img 
                          src={v.image} 
                          alt={v.name} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                        />
                      </button>
                    );
                  })}
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

      {/* ── Ultra Fullscreen Image Lightbox & Gallery Viewer ── */}
      {fullscreenIndex !== null && allGalleryImages.length > 0 && (() => {
        const currentItem = allGalleryImages[fullscreenIndex];
        return (
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(5, 12, 10, 0.96)',
              backdropFilter: 'blur(16px)',
              zIndex: 99999,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              animation: 'modalFadeIn 0.2s ease-out forwards',
              userSelect: 'none'
            }}
            onClick={() => setFullscreenIndex(null)}
          >
            {/* Top Controls Bar */}
            <div 
              style={{
                width: '100%',
                maxWidth: '1200px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem 1rem',
                zIndex: 10
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <h3 style={{ margin: 0, color: 'var(--beige-gold)', fontSize: '1.2rem', fontFamily: 'var(--font-serif)' }}>
                  {currentItem.fabricName} {currentItem.variantName ? `— ${currentItem.variantName}` : ''}
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                  Image {fullscreenIndex + 1} of {allGalleryImages.length}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <button
                  onClick={() => {
                    if (document.fullscreenElement) {
                      document.exitFullscreen().catch(() => {});
                    } else {
                      document.documentElement.requestFullscreen().catch(() => {});
                    }
                  }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#FFF',
                    borderRadius: '8px',
                    padding: '0.4rem 0.8rem',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    transition: 'all 0.2s ease'
                  }}
                  title="Toggle native full screen"
                >
                  ⛶ Expand
                </button>
                
                <button
                  onClick={() => setFullscreenIndex(null)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    border: 'none',
                    color: '#000000',
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    fontSize: '1.4rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 1,
                    transition: 'transform 0.2s ease'
                  }}
                  title="Close Full Screen (Esc)"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Main Image Container with Next / Prev Chevrons */}
            <div 
              style={{
                flex: 1,
                width: '100%',
                maxWidth: '1200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
                gap: '1rem',
                padding: '0.5rem'
              }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Previous Button */}
              <button
                onClick={() => setFullscreenIndex((prev) => (prev === null ? null : (prev - 1 + allGalleryImages.length) % allGalleryImages.length))}
                style={{
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(255, 217, 190, 0.3)',
                  color: 'var(--beige-gold)',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  fontSize: '1.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  zIndex: 5,
                  backdropFilter: 'blur(4px)',
                  transition: 'all 0.2s ease'
                }}
                title="Previous image (Left Arrow)"
              >
                ‹
              </button>

              {/* Center Active Image */}
              <div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                {currentItem.image ? (
                  <img
                    src={currentItem.image}
                    alt={currentItem.fabricName}
                    style={{
                      maxWidth: '100%',
                      maxHeight: 'calc(80vh - 120px)',
                      objectFit: 'contain',
                      borderRadius: '12px',
                      boxShadow: '0 25px 70px rgba(0,0,0,0.8)',
                      border: '1px solid rgba(197, 168, 128, 0.25)',
                      transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                  />
                ) : (
                  <div
                    className={currentItem.patternClass}
                    style={{ width: '400px', height: '400px', borderRadius: '12px' }}
                  ></div>
                )}
                <p style={{ marginTop: '0.8rem', color: '#E0E7E4', fontSize: '0.88rem', textAlign: 'center', maxWidth: '600px' }}>
                  {currentItem.desc}
                </p>
              </div>

              {/* Next Button */}
              <button
                onClick={() => setFullscreenIndex((prev) => (prev === null ? null : (prev + 1) % allGalleryImages.length))}
                style={{
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(255, 217, 190, 0.3)',
                  color: 'var(--beige-gold)',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  fontSize: '1.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  zIndex: 5,
                  backdropFilter: 'blur(4px)',
                  transition: 'all 0.2s ease'
                }}
                title="Next image (Right Arrow)"
              >
                ›
              </button>
            </div>

            {/* Bottom Horizontal Thumbnail Strip */}
            <div 
              style={{
                width: '100%',
                maxWidth: '1000px',
                display: 'flex',
                gap: '0.6rem',
                overflowX: 'auto',
                padding: '0.6rem 1rem',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                zIndex: 10,
                scrollbarWidth: 'thin'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {allGalleryImages.map((item, idx) => {
                const isSelected = idx === fullscreenIndex;
                return (
                  <button
                    key={item.id + '-' + idx}
                    ref={isSelected ? activeThumbRef : null}
                    onClick={() => setFullscreenIndex(idx)}
                    style={{
                      width: '64px',
                      height: '64px',
                      flexShrink: 0,
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: isSelected ? '2px solid var(--beige-gold)' : '1px solid rgba(255,255,255,0.2)',
                      cursor: 'pointer',
                      padding: 0,
                      opacity: isSelected ? 1 : 0.45,
                      transition: 'all 0.2s ease',
                      outline: 'none',
                      transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                      boxShadow: isSelected ? '0 0 14px rgba(255, 217, 190, 0.6)' : 'none'
                    }}
                    title={`${item.fabricName} ${item.variantName ? '(' + item.variantName + ')' : ''}`}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.fabricName}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    ) : (
                      <div className={item.patternClass} style={{ width: '100%', height: '100%' }}></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
