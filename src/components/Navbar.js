'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { SignInButton, Show, UserButton } from '@clerk/nextjs';

export default function Navbar({ onOpenBooking }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Alteration', path: '/alteration' },
    { name: 'Stitching', path: '/tailoring' },
    { name: 'AI Try-On', path: '/ai-tryon' }
  ];

  return (
    <nav className="navbar-wrapper">
      <div className="navbar-container">
        <Link href="/" className="logo">
          <Logo className="logo-icon" />
          <div className="logo-text-group">
            <span className="logo-brand">Tailors2U</span>
            <span className="logo-tagline">MEASURE &nbsp;|&nbsp; CRAFT &nbsp;|&nbsp; DELIVER</span>
          </div>
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
          <Show when="signed-out">
            <li>
              <SignInButton mode="modal">
                <button className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', padding: 0 }} onClick={() => setIsOpen(false)}>
                  Sign In
                </button>
              </SignInButton>
            </li>
          </Show>
          <Show when="signed-in">
            <li style={{ display: 'flex', alignItems: 'center' }}>
              <UserButton />
            </li>
          </Show>
        </ul>
      </div>
    </nav>
  );
}
