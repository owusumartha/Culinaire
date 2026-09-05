'use client';

import { useState } from 'react';

export default function FloatingButtons() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="floating-contact">
        <button className="float-btn whatsapp" onClick={() => setModalOpen(true)} aria-label="WhatsApp">
          <span className="tooltip">Scan QR to chat</span>💬
        </button>
        <a className="float-btn call" href="tel:0245009447" aria-label="Call us">
          <span className="tooltip">Call 0245009447</span>📞
        </a>
      </div>

      {modalOpen && (
        <div className="modal-overlay show" onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}>
          <div className="modal-box">
            <button className="modal-close" onClick={() => setModalOpen(false)} aria-label="Close">&times;</button>
            <h3>💬 Chat with Culinaire</h3>
            <p>Scan the QR code below, or tap the button to start a WhatsApp chat.</p>
            <div className="qr-container">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent('https://wa.me/233245009447?text=Hello%20Culinaire!')}`}
                alt="WhatsApp QR Code"
              />
            </div>
            <p className="qr-number">📞 0245009447</p>
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
