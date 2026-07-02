'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar({ onOpenBooking }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Alteration', path: '/alteration' },
    { name: 'Fabric', path: '/fabric' },
    { name: 'Tailoring', path: '/tailoring' },
    { name: 'AI Try-On', path: '/ai-tryon' }
  ];

  return (
    <nav className="navbar-wrapper">
      <div className="navbar-container">
        <Link href="/" className="logo">
          Tailors<span>2U</span>
        </Link>

        {/* Mobile menu toggle */}
        <button 
          className="menu-toggle" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <span style={{ transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
          <span style={{ opacity: isOpen ? 0 : 1 }}></span>
          <span style={{ transform: isOpen ? 'rotate(-45deg) translate(7px, -7px)' : 'none' }}></span>
        </button>

        {/* Links */}
        <ul className="nav-links" style={{ display: isOpen ? 'flex' : undefined, flexDirection: isOpen ? 'column' : undefined, position: isOpen ? 'absolute' : undefined, top: isOpen ? '100%' : undefined, left: isOpen ? 0 : undefined, width: isOpen ? '100%' : undefined, backgroundColor: isOpen ? 'var(--emerald-deep)' : undefined, padding: isOpen ? '2rem' : undefined, borderBottom: isOpen ? '1px solid var(--beige-gold)' : undefined }}>
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <li key={link.name}>
                <Link 
                  href={link.path} 
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
          <li>
            <button 
              className="cta-nav-button" 
              onClick={() => {
                setIsOpen(false);
                onOpenBooking();
              }}
            >
              Book a Tailor
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
