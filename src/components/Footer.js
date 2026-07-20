import React from 'react';
import Link from 'next/link';
import Logo from './Logo';

export default function Footer({ onOpenBooking }) {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
            <Logo className="logo-icon" />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ margin: 0, color: 'var(--white)', fontFamily: 'var(--font-sans)', fontSize: '1.8rem', fontWeight: '400', letterSpacing: '3.5px', lineHeight: '1.1' }}>Tailors2U</h3>
              <span style={{ fontSize: '0.65rem', fontWeight: '500', opacity: 0.8, color: '#FFFFFF', letterSpacing: '0.05em', marginTop: '2px', lineHeight: '1.1' }}>Pvt. Ltd.</span>
            </div>
          </div>
          <p>
            Premium, bespoke tailoring and alterations delivered directly to your doorstep. We bring the luxury tailoring salon experience to your home or office.
          </p>
          <button className="cta-nav-button" onClick={onOpenBooking} suppressHydrationWarning>
            Book Free Consultation
          </button>
        </div>

        <div>
          <h4 className="footer-heading">Our Services</h4>
          <ul className="footer-links">
            <li><Link href="/alteration" className="footer-link">Bespoke Alterations</Link></li>
            <li><Link href="/fabric" className="footer-link">Premium Fabrics</Link></li>
            <li><Link href="/tailoring" className="footer-link">Custom Tailoring</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-heading">Tailoring Pages</h4>
          <ul className="footer-links">
            <li><Link href="/alteration" className="footer-link">Shirts & Pants</Link></li>
            <li><Link href="/alteration" className="footer-link">Kurtas & Ethnic</Link></li>
            <li><Link href="/tailoring" className="footer-link">Meet Our Tailors</Link></li>
            <li><Link href="/about" className="footer-link">About Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-heading">Contact & Hours</h4>
          <div className="footer-contact-info">
            <p><strong>Email:</strong> executive.tailors2u@gmail.com</p>
            <p><strong>Phone:</strong> +1 (800) TAILOR-2U</p>
            <p><strong>Hours:</strong> Mon - Sat: 8:00 AM - 8:00 PM</p>
            <p><strong>Service Area:</strong> Everywhere in Mumbai.</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Tailors2U Pvt. Ltd. All rights reserved.</p>
        <p>Premium Bespoke Tailoring Services</p>
      </div>
    </footer>
  );
}
