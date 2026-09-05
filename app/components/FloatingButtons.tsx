'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChatIcon, PhoneIcon, HeartIcon, CartIcon } from './Icons';
import { useCart, useWishlist } from '../lib/contexts';

export default function FloatingButtons() {
  const [modalOpen, setModalOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <>
      <div className="floating-contact">
        <Link href="/wishlist" className="float-btn wishlist-float" aria-label="Wishlist">
          <HeartIcon size={22} filled color="#fff" />
          {wishlistCount > 0 && <span className="float-badge">{wishlistCount}</span>}
        </Link>
        <Link href="/cart" className="float-btn cart-float" aria-label="Cart">
          <CartIcon size={22} color="#fff" />
          {cartCount > 0 && <span className="float-badge">{cartCount}</span>}
        </Link>
        <button className="float-btn whatsapp" onClick={() => setModalOpen(true)} aria-label="WhatsApp">
          <span className="tooltip">Scan QR to chat</span>
          <ChatIcon size={24} color="#fff" />
        </button>
        <a className="float-btn call" href="tel:0245009447" aria-label="Call us">
          <span className="tooltip">Call 0245009447</span>
          <PhoneIcon size={24} color="#fff" />
        </a>
      </div>

      {modalOpen && (
        <div className="modal-overlay show" onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}>
          <div className="modal-box">
            <button className="modal-close" onClick={() => setModalOpen(false)} aria-label="Close">&times;</button>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><ChatIcon size={22} color="#c9a227" /> Chat with Culinaire</h3>
            <p>Scan the QR code below, or tap the button to start a WhatsApp chat.</p>
            <div className="qr-container">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent('https://wa.me/233245009447?text=Hello%20Culinaire!')}`}
                alt="WhatsApp QR Code"
              />
            </div>
            <p className="qr-number" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><PhoneIcon size={16} color="#c9a227" /> 0245009447</p>
            <a
              className="btn btn-gold btn-block"
              href="https://wa.me/233245009447?text=Hello%20Culinaire!"
              target="_blank"
              rel="noopener"
              style={{ marginTop: 10 }}
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}
