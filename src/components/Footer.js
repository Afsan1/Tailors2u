import React from 'react';
import Link from 'next/link';

export default function Footer({ onOpenBooking }) {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>Tailors<span>2U</span></h3>
          <p>
            Premium, bespoke tailoring and alterations delivered directly to your doorstep. We bring the luxury tailoring salon experience to your home or office.
          </p>
          <button className="cta-nav-button" onClick={onOpenBooking}>
            Book Free Consultation
          </button>
        </div>

        <div>
          <h4 className="footer-heading">Our Services</h4>
          <ul className="footer-links">
            <li><Link href="/alteration" className="footer-link">Bespoke Alterations</Link></li>
            <li><Link href="/fabric" className="footer-link">Premium Fabrics</Link></li>
            <li><Link href="/tailoring" className="footer-link">Custom Tailoring</Link></li>
            <li><Link href="/combo" className="footer-link">Combo Packages</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-heading">Tailoring Pages</h4>
          <ul className="footer-links">
            <li><Link href="/alteration" className="footer-link">Shirts & Pants</Link></li>
            <li><Link href="/alteration" className="footer-link">Kurtas & Ethnic</Link></li>
            <li><Link href="/tailoring" className="footer-link">Meet Our Tailors</Link></li>
            <li><Link href="/combo" className="footer-link">Standard, Premium & Luxury</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-heading">Contact & Hours</h4>
          <div className="footer-contact-info">
            <p><strong>Email:</strong> bespoke@tailors2u.com</p>
            <p><strong>Phone:</strong> +1 (800) TAILOR-2U</p>
            <p><strong>Hours:</strong> Mon - Sat: 8:00 AM - 8:00 PM</p>
            <p><strong>Service Area:</strong> Major metro areas. We travel to you!</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Tailors2U Bespoke. All rights reserved.</p>
        <p>Premium Bespoke Tailoring Services</p>
      </div>
    </footer>
  );
}
