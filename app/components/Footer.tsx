'use client';

import Link from 'next/link';
import { MapPinIcon, PhoneIcon, MailIcon } from './Icons';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4 style={{ fontFamily: 'Georgia,serif', fontSize: '1.5rem', color: '#fff' }}>
              Culini<span style={{ color: '#c9a227' }}>aire</span>
            </h4>
            <p>Premium kitchenware for every kitchen. Quality, style, and function in every piece.</p>
          </div>
          <div>
            <h4>Shop</h4>
            <Link href="/shop">All Products</Link>
            <Link href="/shop" onClick={() => { if (typeof window !== 'undefined') localStorage.setItem('culFilter', 'Cookware'); }}>Cookware</Link>
            <Link href="/shop" onClick={() => { if (typeof window !== 'undefined') localStorage.setItem('culFilter', 'Dinnerware'); }}>Dinnerware</Link>
            <Link href="/shop" onClick={() => { if (typeof window !== 'undefined') localStorage.setItem('culFilter', 'Knives'); }}>Knives</Link>
          </div>
          <div>
            <h4>Company</h4>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/contact">FAQ</Link>
            <Link href="/contact">Shipping</Link>
          </div>
          <div>
            <h4>Contact</h4>
            <p style={{ display: 'flex', alignItems: 'center', gap: 8 }}><MapPinIcon size={16} color="#c9a227" /> Konongo, Ghana</p>
            <p style={{ display: 'flex', alignItems: 'center', gap: 8 }}><PhoneIcon size={16} color="#c9a227" /> 0245009447</p>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=owusumartha2005@gmail.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#f1e9dc' }}><MailIcon size={16} color="#c9a227" /> owusumartha2005@gmail.com</a>
          </div>
        </div>
        <div className="footer-bottom">© 2026 Culinaire. All rights reserved.</div>
      </div>
    </footer>
  );
}
