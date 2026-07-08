'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function ScissorCursor() {
  const [isSupported, setIsSupported] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [particles, setParticles] = useState([]);
  
  const cursorRef = useRef(null);
  const mouseCoords = useRef({ x: 0, y: 0 });
  const isVisible = useRef(false);

  // Check if device supports custom cursors (fine pointer/desktop)
  useEffect(() => {
    const checkSupport = () => {
      // Check if fine pointer is supported (standard mouse) and not touch-only
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      setIsSupported(hasFinePointer);
    };

    checkSupport();
    window.addEventListener('resize', checkSupport);
    return () => window.removeEventListener('resize', checkSupport);
  }, []);

  // Sync cursor position at maximum refresh rate (60fps/120fps/144fps)
  useEffect(() => {
    if (!isSupported) return;

    const handleMouseMove = (e) => {
      mouseCoords.current = { x: e.clientX, y: e.clientY };
      if (!isVisible.current) {
        isVisible.current = true;
        if (cursorRef.current) {
          cursorRef.current.style.opacity = '1';
        }
      }
    };

    const handleMouseLeave = () => {
      isVisible.current = false;
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
    };

    const handleMouseEnter = () => {
      isVisible.current = true;
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1';
      }
    };

    // Update positions via requestAnimationFrame for buttery smooth performance
    let animId;
    const updatePosition = () => {
      if (cursorRef.current && isVisible.current) {
        // Offset by -9px in X and Y to align the rotated (45deg) blade tip exactly with the pointer hotspot
        cursorRef.current.style.transform = `translate3d(${mouseCoords.current.x - 9}px, ${mouseCoords.current.y - 9}px, 0)`;
      }
      animId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    animId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isSupported]);

  // Click & Snip Action + Particle Spawning
  useEffect(() => {
    if (!isSupported) return;

    const spawnParticles = (x, y) => {
      const colors = ['#FFD9BE', '#ffffff', '#e2e8f0', '#FFD9BE'];
      const newParticles = Array.from({ length: 6 }).map((_, i) => {
        // Spread particles outwards from the scissor tip
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.0 + Math.random() * 2.5;
        return {
          id: `${Date.now()}-${i}-${Math.random()}`,
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5, // slightly upward vector
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 1.0,
          size: 3 + Math.random() * 4,
        };
      });
      setParticles((prev) => [...prev, ...newParticles].slice(-30)); // Cap particles limit
    };

    const handleMouseDown = (e) => {
      setClicking(true);
      spawnParticles(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      setClicking(false);
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isSupported]);

  // Hover detection for interactive items
  useEffect(() => {
    if (!isSupported) return;

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      // Check if target is a standard interactive element or has pointer cursor in computed styles
      const isInteractive = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setHovering(!!isInteractive);
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, [isSupported]);

  // Particle physics update loop
  useEffect(() => {
    if (particles.length === 0) return;

    let animId;
    const updatePhysics = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.1, // gravity pull
            life: p.life - 0.04,
          }))
          .filter((p) => p.life > 0)
      );
      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, [particles]);

  if (!isSupported) return null;

  return (
    <>
      {/* Custom Scissor Cursor DOM Element */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${hovering ? 'hovering' : ''} ${clicking ? 'clicking' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0, // initially hidden until mousemoves
          transition: 'opacity 0.25s ease-in-out',
        }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block', overflow: 'visible', transform: 'rotate(45deg)' }}
        >
          {/* Scissor Half 1 (Upper Blade & Lower Handle) */}
          <g className="scissor-half-1">
            {/* Upper Blade */}
            <path
              d="M 20 20 C 15 12, 8 13, 4 20 C 11 22, 17 21, 20 20 Z"
              fill="#ffffff"
            />
            {/* Connection Rod */}
            <path
              d="M 20 20 L 25 25"
              stroke="#ffffff"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            {/* Handle Ring with transparent hole */}
            <path
              d="M 28 28 m -6.5 0 a 6.5 6.5 0 1 0 13 0 a 6.5 6.5 0 1 0 -13 0 M 28 28 m -3.5 0 a 3.5 3.5 0 1 1 7 0 a 3.5 3.5 0 1 1 -7 0"
              fill="#ffffff"
              fillRule="evenodd"
            />
          </g>

          {/* Scissor Half 2 (Lower Blade & Upper Handle) */}
          <g className="scissor-half-2">
            {/* Lower Blade */}
            <path
              d="M 20 20 C 15 28, 8 27, 4 20 C 11 18, 17 19, 20 20 Z"
              fill="#ffffff"
            />
            {/* Connection Rod */}
            <path
              d="M 20 20 L 25 15"
              stroke="#ffffff"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            {/* Handle Ring with transparent hole */}
            <path
              d="M 28 12 m -6.5 0 a 6.5 6.5 0 1 0 13 0 a 6.5 6.5 0 1 0 -13 0 M 28 12 m -3.5 0 a 3.5 3.5 0 1 1 7 0 a 3.5 3.5 0 1 1 -7 0"
              fill="#ffffff"
              fillRule="evenodd"
            />
          </g>

          {/* Central Pivot Screw (emerald green dot matching page background) */}
          <circle
            cx="20"
            cy="20"
            r="1.8"
            fill="var(--emerald-deep)"
          />
        </svg>
      </div>

      {/* Render Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="scissor-particle"
          style={{
            position: 'fixed',
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: '50%',
            pointerEvents: 'none',
            opacity: p.life,
            transform: `scale(${p.life})`,
            zIndex: 99998,
          }}
        />
      ))}
    </>
  );
}
