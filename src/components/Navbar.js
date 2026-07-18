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
    { name: 'AI Try-On', path: '/ai-tryon' },
    { name: 'About', path: '/about' }
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
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
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
            <li>
              <Link href="/my-bookings" className={`nav-link ${pathname === '/my-bookings' ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
                My Bookings
              </Link>
            </li>
            <li style={{ display: 'flex', alignItems: 'center' }}>
              <UserButton />
            </li>
          </Show>
        </ul>
      </div>
    </nav>
  );
}
