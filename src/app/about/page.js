'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './about.css';

export default function About() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState(0);
  
  // Horizontal scroll gallery index state
  const [horizCardIndex, setHorizCardIndex] = useState(0);
  const [horizTranslate, setHorizTranslate] = useState(0);

  // 2016 Sticky vertical scrolling slide state
  const [active2016Index, setActive2016Index] = useState(0);
  const stickyBlock2016Ref = useRef(null);

  const STORY_2016_SUB_ITEMS = [
    {
      title: 'The First Measurement',
      body: 'Tailors2U began with a single vision: luxury shouldn\'t demand compromise. We opened our first private workshop in South Mumbai, tailoring bespoke garments for individuals who appreciated unmatched precision but lacked the time for endless boutique fittings.',
      image: '/about_heritage.png',
      alt: 'Master tailor crafting pattern',
    },
    {
      title: 'Curating the Finest Fabrics',
      body: 'From the very beginning, we refused to settle for anything less than extraordinary. We traveled across Europe and Asia, building exclusive relationships with historic mills to source breathable linens, rich silks, and pure Egyptian cottons that elevate every garment.',
      image: '/armani_burgundy.png',
      alt: 'Premium fabrics selection',
    },
    {
      title: 'The Master Artisans',
      body: 'We brought together a team of master tailors, each with decades of experience passed down through generations. Their hands structure the chest canvas, sew the intricate lapels, and ensure every stitch embodies the pinnacle of sartorial elegance.',
      image: '/about_quality.png',
      alt: 'Tailor working on suit',
    },
  ];
  
  // Refs
  const horizContainerRef = useRef(null);
  const horizTrackRef = useRef(null);
  const mCircle1Ref = useRef(null);
  const mCircle2Ref = useRef(null);
  const velocityRow1Ref = useRef(null);
  const velocityRow2Ref = useRef(null);


  // Click Navigation for Horizontal Section
  const scrollHorizontal = (direction) => {
    if (direction === 'next') {
      setHorizCardIndex((prev) => Math.min(4, prev + 1));
    } else {
      setHorizCardIndex((prev) => Math.max(0, prev - 1));
    }
  };

  // Sync translation when active card index changes
  useEffect(() => {
    if (horizTrackRef.current) {
      const children = horizTrackRef.current.children;
      if (children && children[horizCardIndex]) {
        setHorizTranslate(-children[horizCardIndex].offsetLeft);
      }
    }
  }, [horizCardIndex]);

  useEffect(() => {
    // 1. Viewport observer for entry animations (runs once)
    const observerOptions = {
      root: null,
      rootMargin: '0px -10% -10% 0px',
      threshold: 0.1,
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          // If it's a blur-to-sharp container
          if (entry.target.classList.contains('blur-to-sharp-container')) {
            entry.target.classList.add('sharp');
          }
          // Unobserve after animating once
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    const animatedElements = document.querySelectorAll('.story-block, .value-card, .blur-to-sharp-container');
    animatedElements.forEach((el) => observer.observe(el));

    // 2. Scroll event tracker
    let lastScrollY = window.scrollY;
    let lastTimestamp = Date.now();
    let velocityTimeout = null;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTimestamp = Date.now();
      
      // Calculate Scroll Progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = (currentScrollY / docHeight) * 100;
        setScrollProgress(progress);
      }

      // Calculate Scroll Velocity
      const timeDiff = currentTimestamp - lastTimestamp;
      const scrollDiff = currentScrollY - lastScrollY;
      let calculatedVelocity = 0;
      if (timeDiff > 0) {
        calculatedVelocity = scrollDiff / timeDiff; // speed in pixels per millisecond
      }

      // Cap and set velocity
      const clampedVelocity = Math.max(-15, Math.min(15, calculatedVelocity * 8));
      setVelocity(clampedVelocity);

      // Decelerate velocity after scrolling stops
      if (velocityTimeout) clearTimeout(velocityTimeout);
      velocityTimeout = setTimeout(() => {
        setVelocity(0);
      }, 100);



      // Update refs
      lastScrollY = currentScrollY;
      lastTimestamp = currentTimestamp;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger initial check on load to position elements correctly
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      if (velocityTimeout) clearTimeout(velocityTimeout);
    };
  }, []);

  // 3. Mouse Movement Parallax (Desktop Only)
  useEffect(() => {
    const handleMouseMove = (e) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const xVal = (e.clientX / width - 0.5) * 2; // -1 to 1
      const yVal = (e.clientY / height - 0.5) * 2; // -1 to 1
      
      setMousePos({ x: xVal, y: yVal });
      
      if (mCircle1Ref.current) {
        mCircle1Ref.current.style.transform = `translate(${xVal * 30}px, ${yVal * 30}px)`;
      }
      if (mCircle2Ref.current) {
        mCircle2Ref.current.style.transform = `translate(${xVal * -45}px, ${yVal * -45}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // 4. Lock scroll when 2016 section is in view — page stays fixed until all 3 slides seen
  useEffect(() => {
    const TOTAL_SLIDES = STORY_2016_SUB_ITEMS.length;
    let currentIndex = 0;
    let isHijacking = false;
    let debounce = false;
    let savedScrollY = 0;
    let hasFinished = false;

    const block = stickyBlock2016Ref.current;
    if (!block) return;

    // --- Lock: smoothly scroll to match top of viewport, and block scroll events ---
    const lockScroll = () => {
      if (isHijacking) return;
      isHijacking = true;

      const rect = block.getBoundingClientRect();
      savedScrollY = window.scrollY + rect.top;
      
      // Snap scroll position so block top = viewport top (no visual jump)
      window.scrollTo({ top: savedScrollY, behavior: 'instant' });

      currentIndex = 0;
      setActive2016Index(0);
    };

    // --- Unlock: stop hijacking scroll events ---
    const unlockScroll = () => {
      if (!isHijacking) return;
      isHijacking = false;
      hasFinished = true;
    };

    let lastScrollY = window.scrollY;

    // --- Scroll listener: detect when section is centered and lock scroll ---
    const handleScroll = () => {
      if (isHijacking) return;

      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;
      lastScrollY = currentScrollY;

      const rect = block.getBoundingClientRect();
      const vh = window.innerHeight;

      // Reset finished state once section has fully exited viewport
      const outOfView = rect.bottom < 50 || rect.top > vh - 50;
      if (outOfView) {
        hasFinished = false;
      }

      if (hasFinished) return;

      // Only trigger lock when scrolling down
      if (!scrollingDown) return;

      // When the top of 2016 section is near top of viewport (e.g. within 20px)
      if (rect.top <= 20 && rect.top >= -20) {
        lockScroll();
      }
    };

    let isCurrentlyScrolling = false;
    let wheelEndTimeout = null;

    // --- Wheel event listener: cycles index, blocks screen scroll ---
    const handleWheel = (e) => {
      if (!isHijacking) return;
      
      // Stop the browser from scrolling the window
      e.preventDefault();
      e.stopPropagation();

      // Reset the wheel end detection
      clearTimeout(wheelEndTimeout);
      wheelEndTimeout = setTimeout(() => {
        isCurrentlyScrolling = false;
      }, 150);

      // If we are in the middle of a continuous scroll gesture, ignore it
      if (isCurrentlyScrolling) return;

      const goingDown = e.deltaY > 0;
      const goingUp = e.deltaY < 0;

      // Mark that we have started handling this gesture
      isCurrentlyScrolling = true;

      // Release lock on last slide going down
      if (goingDown && currentIndex >= TOTAL_SLIDES - 1) {
        unlockScroll();
        return;
      }
      
      // Release lock on first slide going up
      if (goingUp && currentIndex <= 0) {
        unlockScroll();
        return;
      }

      if (goingDown) {
        currentIndex = Math.min(TOTAL_SLIDES - 1, currentIndex + 1);
      } else if (goingUp) {
        currentIndex = Math.max(0, currentIndex - 1);
      }
      setActive2016Index(currentIndex);
    };

    // --- Block touchmove event to prevent swipe scrolling ---
    const handleTouch = (e) => {
      if (isHijacking) {
        e.preventDefault();
      }
    };

    // --- Key listener: block arrows, spacebar ---
    const handleKey = (e) => {
      if (!isHijacking) return;
      if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'ArrowUp' || e.key === 'PageDown' || e.key === 'PageUp') {
        e.preventDefault();
        
        const delta = (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') ? 1 : -1;
        handleWheel({ deltaY: delta, preventDefault: () => {}, stopPropagation: () => {} });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchmove', handleTouch, { passive: false });
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('keydown', handleKey);
      clearTimeout(wheelEndTimeout);
    };
  }, []);

  // 5. Scroll-Based Velocity Marquee Animation
  useEffect(() => {
    const baseSpeed = 0.5; // px per frame at idle
    const scrollMultiplier = 3; // how much scroll velocity boosts speed
    const damping = 0.95; // how quickly scroll boost decays

    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;
    let xOffset1 = 0;
    let xOffset2 = 0;
    let animationId;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;
      scrollVelocity = diff * scrollMultiplier;
      lastScrollY = currentScrollY;
    };

    const animate = () => {
      // Apply damping to scroll velocity
      scrollVelocity *= damping;

      // Row 1 moves left (negative direction)
      const speed1 = baseSpeed + Math.abs(scrollVelocity);
      xOffset1 -= speed1;

      // Row 2 moves right (positive direction)
      const speed2 = baseSpeed + Math.abs(scrollVelocity);
      xOffset2 += speed2;

      // Get the width of one "set" of text (total / 4 copies = 25%)
      if (velocityRow1Ref.current) {
        const totalWidth1 = velocityRow1Ref.current.scrollWidth;
        const singleSetWidth1 = totalWidth1 / 4;
        // Wrap around seamlessly
        if (Math.abs(xOffset1) >= singleSetWidth1) {
          xOffset1 += singleSetWidth1;
        }
        // Skew based on scroll velocity for a dynamic feel
        const skew = Math.max(-15, Math.min(15, scrollVelocity * 0.8));
        velocityRow1Ref.current.style.transform = `translate3d(${xOffset1}px, 0, 0) skewX(${skew}deg)`;
      }

      if (velocityRow2Ref.current) {
        const totalWidth2 = velocityRow2Ref.current.scrollWidth;
        const singleSetWidth2 = totalWidth2 / 4;
        // Wrap around seamlessly
        if (xOffset2 >= singleSetWidth2) {
          xOffset2 -= singleSetWidth2;
        }
        const skew = Math.max(-15, Math.min(15, -scrollVelocity * 0.8));
        velocityRow2Ref.current.style.transform = `translate3d(${xOffset2 - (velocityRow2Ref.current.scrollWidth / 4)}px, 0, 0) skewX(${skew}deg)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="about-wrapper porcelain-theme">
      {/* Scroll Progress Indicator */}
      <div className="scroll-progress-bar">
        <div className="scroll-progress-fill" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      {/* Hero Section */}
      <section className="hero-sec">
        <div className="hero-bg-shapes">
          <div className="hero-shape-1"></div>
          <div className="hero-shape-2"></div>
        </div>
        
        {/* Mouse Interactive Circles */}
        <div className="mouse-parallax-element m-circle-1" ref={mCircle1Ref}></div>
        <div className="mouse-parallax-element m-circle-2" ref={mCircle2Ref}></div>

        <div className="about-container hero-content-wrap">
          <span className="hero-subtitle">Our Legacy & Artistry</span>
          
          <div className="text-reveal-container">
            <h1 className="text-reveal-h1">Beauty In Every Stitch</h1>
          </div>
          
          <p className="hero-description">
            Tailors2U redefines luxury by delivering masterfully crafted, bespoke tailoring salon experiences directly to your doorstep. Explore our rich heritage of timeless elegance.
          </p>
        </div>
      </section>

      {/* Storytelling Timeline */}
      <section className="story-sec">
        <div className="about-container">
          {/* Centered Header */}
          <div className="story-header-center">
            <span>The Narrative</span>
            <h2>A Decade of Crafting Suits</h2>
          </div>
        </div>

        {/* Story List — must be direct child of section for sticky to work */}
        <div className="story-list">
          
          {/* Year Block 1 - Sticky Scroll Interactive Section */}
          <div className="story-block-sticky" ref={stickyBlock2016Ref}>
            {/* Sticky viewport */}
            <div className="story-block-viewport">
              <div className="story-block-inner">
                
                {/* Left Column: Text slides */}
                <div className="story-text-col">
                  <span className="story-year">2016</span>
                  <div className="story-text-slides">
                    {STORY_2016_SUB_ITEMS.map((item, idx) => (
                      <div 
                        key={idx} 
                        className={`story-text-slide ${active2016Index === idx ? 'active' : ''}`}
                      >
                        <h3>{item.title}</h3>
                        <p>{item.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Right Column: Image container with vertical moving track */}
                <div className="parallax-image-wrap blur-to-sharp-container">
                  <div 
                    className="vertical-image-track" 
                    style={{ transform: `translateY(-${active2016Index * 100}%)` }}
                  >
                    {STORY_2016_SUB_ITEMS.map((item, idx) => (
                      <div key={idx} className="vertical-image-slide">
                        <Image 
                          src={item.image} 
                          alt={item.alt} 
                          fill 
                          className="parallax-img"
                          sizes="(max-width: 1024px) 100vw, 800px"
                          priority={idx === 0}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Slide progress dots */}
                <div className="slide-progress-dots">
                  {STORY_2016_SUB_ITEMS.map((_, idx) => (
                    <div
                      key={idx}
                      className={`slide-dot ${active2016Index === idx ? 'active' : ''}`}
                    />
                  ))}
                </div>

              </div>
            </div>
          </div>

          {/* Year Block 2 */}
          <div className="story-block">
            <div className="story-text-col">
              <span className="story-year">2020</span>
              <h3>Perfecting the Doorstep Fitting</h3>
              <p>
                We adapted our processes to meet our clients exactly where they felt most comfortable. Launching our signature Doorstep Consultation, we equipped our expert fitters with luxury swatch books, precision calipers, and digital styling tablets, delivering the entire tailoring salon experience right to living rooms and corporate offices.
              </p>
            </div>
            <div className="parallax-image-wrap blur-to-sharp-container">
              <Image 
                src="/about_craftsmanship.png" 
                alt="Premium silk threads and measuring tape" 
                fill 
                className="parallax-img"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>
          </div>

          {/* Year Block 3 */}
          <div className="story-block">
            <div className="story-text-col">
              <span className="story-year">2026</span>
              <h3>AI Innovation meets Master Handwork</h3>
              <p>
                Today, we bridge centuries-old tailoring craftsmanship with modern technological magic. By integrating AI spatial estimation with manual measurement checks, we achieve an incredible 99.8% precision fit on the very first try. We continue to design suits, shirts, and ethnic wear that command attention, without demanding your time.
              </p>
            </div>
            <div className="parallax-image-wrap blur-to-sharp-container">
              <Image 
                src="/about_quality.png" 
                alt="Bespoke control mannequin check" 
                fill 
                className="parallax-img"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Horizontal Gallery Section */}
      <section className="horizontal-scroll-container" ref={horizContainerRef}>
        <div className="horizontal-sticky-box">
          {/* Navigation Buttons */}
          <button 
            className="horizontal-nav-btn horizontal-nav-left" 
            onClick={() => scrollHorizontal('prev')}
            disabled={horizCardIndex === 0}
            aria-label="Previous Slide"
          >
            ←
          </button>
          
          <button 
            className="horizontal-nav-btn horizontal-nav-right" 
            onClick={() => scrollHorizontal('next')}
            disabled={horizCardIndex === 4}
            aria-label="Next Slide"
          >
            →
          </button>

          <div className="horizontal-scroll-track" ref={horizTrackRef} style={{ transform: `translate3d(${horizTranslate}px, 0, 0)` }}>
            
            {/* Intro Card */}
            <div className="horizontal-intro">
              <h2>Our Atelier Journey</h2>
              <p>Scroll down to see the step-by-step process of how we turn raw fabrics into customized masterpieces.</p>
            </div>

            {/* Card 1 */}
            <div className="horizontal-card">
              <div className="horizontal-card-bg-gradient"></div>
              <span className="horizontal-card-num">01</span>
              <div>
                <h3>Fabric Curation</h3>
                <p>We source the finest Egyptian cottons, breathable linens, and luxury merino wools from historic mills globally.</p>
              </div>
              <div className="horizontal-card-img-wrap">
                <img 
                  src="/armani_burgundy.png" 
                  alt="Fine fabric rolls" 
                  className="horizontal-card-img"
                />
              </div>
            </div>

            {/* Card 2 */}
            <div className="horizontal-card">
              <div className="horizontal-card-bg-gradient"></div>
              <span className="horizontal-card-num">02</span>
              <div>
                <h3>Precision Drafting</h3>
                <p>A custom paper template is drafted from scratch based on 32 distinct bodily measurements to capture your exact stance.</p>
              </div>
              <div className="horizontal-card-img-wrap">
                <img 
                  src="/about_quality.png" 
                  alt="Precision mannequin" 
                  className="horizontal-card-img"
                />
              </div>
            </div>

            {/* Card 3 */}
            <div className="horizontal-card">
              <div className="horizontal-card-bg-gradient"></div>
              <span className="horizontal-card-num">03</span>
              <div>
                <h3>Bespoke Assembly</h3>
                <p>Our master tailors sew each panel, structure the chest canvas by hand, and finish buttons and lapels with meticulous care.</p>
              </div>
              <div className="horizontal-card-img-wrap">
                <img 
                  src="/about_heritage.png" 
                  alt="Crafting blazer details" 
                  className="horizontal-card-img"
                />
              </div>
            </div>

            {/* Card 4 */}
            <div className="horizontal-card">
              <div className="horizontal-card-bg-gradient"></div>
              <span className="horizontal-card-num">04</span>
              <div>
                <h3>Perfect Fit Fitting</h3>
                <p>Delivered directly to your door in 48 hours for alterations, or standard fitting schedules, ensuring your garment is immaculate.</p>
              </div>
              <div className="horizontal-card-img-wrap">
                <img 
                  src="/about_craftsmanship.png" 
                  alt="Tailor measuring tape close up" 
                  className="horizontal-card-img"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Scroll Velocity Moving Banner */}
      <section className="velocity-banner-wrap">
        {/* Row 1: scrolls left */}
        <div className="velocity-track velocity-row-1" ref={velocityRow1Ref}>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="velocity-text">
              CRAFTED BY HAND <span className="velocity-star">★</span> <span className="velocity-text-accent">99.8% PERFECT FIT</span> <span className="velocity-star">★</span> ELEGANT DESIGN <span className="velocity-star">★</span> <span className="velocity-text-accent">DOORSTEP LUXURY</span> <span className="velocity-star">★</span> INDIVIDUALLY MEASURED <span className="velocity-star">★</span>
            </div>
          ))}
        </div>
        {/* Row 2: scrolls right */}
        <div className="velocity-track velocity-row-2" ref={velocityRow2Ref}>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="velocity-text velocity-text-outline">
              BESPOKE TAILORING <span className="velocity-star">★</span> <span className="velocity-text-accent">DOORSTEP LUXURY</span> <span className="velocity-star">★</span> PREMIUM FABRICS <span className="velocity-star">★</span> <span className="velocity-text-accent">MASTER CRAFTED</span> <span className="velocity-star">★</span> TIMELESS STYLE <span className="velocity-star">★</span>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values (Glassmorphic Cards) */}
      <section className="values-sec">
        <div className="about-container">
          <div className="section-header-wrap">
            <span>Our Principles</span>
            <h2>What Guides the Scissors</h2>
          </div>
          
          <div className="values-grid">
            {/* Value 1 */}
            <div className="value-card">
              <div className="value-icon-box">📐</div>
              <h3>Obsessive Precision</h3>
              <p>We believe a single millimeter defines the difference between a good fit and a masterpiece. Our templates adapt to your unique silhouette.</p>
            </div>

            {/* Value 2 */}
            <div className="value-card">
              <div className="value-icon-box">🧵</div>
              <h3>Ethical Sourcing</h3>
              <p>We work exclusively with certified historic mills that prioritize environmental sustainability and premium, fair-labor fibers.</p>
            </div>

            {/* Value 3 */}
            <div className="value-card">
              <div className="value-icon-box">🤝</div>
              <h3>Complete Convenience</h3>
              <p>Luxury is time. By keeping consultations mobile and delivery fast, we ensure the custom tailoring process matches your busy life.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action Banner */}
      <section style={{ padding: '8rem 0', textAlign: 'center', borderTop: '1px solid rgba(255, 217, 190, 0.1)', background: 'radial-gradient(circle, rgba(12, 97, 75, 0.3) 0%, rgba(6, 78, 59, 0) 80%)' }}>
        <div className="about-container" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', color: 'var(--beige-gold)', marginBottom: '1.5rem' }}>Experience Custom Luxury</h2>
          <p style={{ color: '#c9e0d9', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: '1.8' }}>
            Book your doorstep measurement consultation today. Our Mediator will visit you with fine fabric catalogs and styling templates.
          </p>
          <Link href="/" className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>
            Book Fitting Appointment
          </Link>
        </div>
      </section>
    </div>
  );
}
