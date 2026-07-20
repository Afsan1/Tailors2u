'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignInButton, Show, UserButton } from '@clerk/nextjs';

export default function FloatingDock() {
  const pathname = usePathname();
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const dockLinks = [
    {
      name: 'Home',
      path: '/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="dock-icon">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      )
    },
    {
      name: 'Alteration',
      path: '/alteration',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="dock-icon">
          <circle cx="6" cy="6" r="3"/>
          <path d="M8.12 8.12 12 12"/>
          <circle cx="6" cy="18" r="3"/>
          <path d="M8.12 15.88 12 12"/>
          <line x1="20" y1="4" x2="10.8" y2="13.2"/>
          <line x1="16" y1="18" x2="10.8" y2="12.8"/>
        </svg>
      )
    },
    {
      name: 'Stitching',
      path: '/tailoring',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="dock-icon">
          <path d="M2 21h20"/>
          <path d="M12 3a3 3 0 0 0-3 3v2.5"/>
          <path d="M12 3a3 3 0 0 1 3 3v2.5"/>
          <path d="M12 8.5 4 14.5A1.5 1.5 0 0 0 3.3 15.75V18a1 1 0 0 0 1 1h15.4a1 1 0 0 0 1-1v-2.25a1.5 1.5 0 0 0-.7-1.25L12 8.5z"/>
        </svg>
      )
    },
    {
      name: 'AI Try-On',
      path: '/ai-tryon',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="dock-icon">
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
          <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5 5 3Z"/>
        </svg>
      )
    },
    {
      name: 'About',
      path: '/about',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="dock-icon">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
      )
    }
  ];

  return (
    <div className="floating-dock-wrapper">
      <div className="floating-dock-container">
        {dockLinks.map((link, idx) => {
          const isActive = pathname === link.path;
          return (
            <div
              key={link.name}
              className="dock-item-wrapper"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {hoveredIdx === idx && (
                <div className="dock-tooltip">{link.name}</div>
              )}
              <Link
                href={link.path}
                className={`dock-item ${isActive ? 'active' : ''}`}
                style={{
                  transform: hoveredIdx === idx ? 'scale(1.2)' : hoveredIdx !== null && Math.abs(hoveredIdx - idx) === 1 ? 'scale(1.1)' : 'scale(1)'
                }}
              >
                {link.icon}
              </Link>
            </div>
          );
        })}

        {/* clerk integration for auth routes */}
        <Show when="signed-out">
          <div
            className="dock-item-wrapper"
            onMouseEnter={() => setHoveredIdx(dockLinks.length)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {hoveredIdx === dockLinks.length && (
              <div className="dock-tooltip">Sign In</div>
            )}
            <SignInButton mode="modal">
              <button
                className="dock-item"
                style={{
                  transform: hoveredIdx === dockLinks.length ? 'scale(1.2)' : hoveredIdx !== null && Math.abs(hoveredIdx - dockLinks.length) === 1 ? 'scale(1.1)' : 'scale(1)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="dock-icon">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                  <polyline points="10 17 15 12 10 7"/>
                  <line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
              </button>
            </SignInButton>
          </div>
        </Show>

        <Show when="signed-in">
          {/* My Bookings Link */}
          <div
            className="dock-item-wrapper"
            onMouseEnter={() => setHoveredIdx(dockLinks.length)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {hoveredIdx === dockLinks.length && (
              <div className="dock-tooltip">Bookings</div>
            )}
            <Link
              href="/my-bookings"
              className={`dock-item ${pathname === '/my-bookings' ? 'active' : ''}`}
              style={{
                transform: hoveredIdx === dockLinks.length ? 'scale(1.2)' : hoveredIdx !== null && Math.abs(hoveredIdx - dockLinks.length) === 1 ? 'scale(1.1)' : 'scale(1)'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="dock-icon">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </Link>
          </div>

          {/* User Button */}
          <div
            className="dock-item-wrapper"
            onMouseEnter={() => setHoveredIdx(dockLinks.length + 1)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {hoveredIdx === dockLinks.length + 1 && (
              <div className="dock-tooltip">Profile</div>
            )}
            <div
              className="dock-item dock-user-btn"
              style={{
                transform: hoveredIdx === dockLinks.length + 1 ? 'scale(1.2)' : hoveredIdx !== null && Math.abs(hoveredIdx - (dockLinks.length + 1)) === 1 ? 'scale(1.1)' : 'scale(1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2px'
              }}
            >
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
}
