'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { formatPrice } from '../lib/products';
import { Order } from '../lib/types';

export default function ConfirmationPage() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('culinaireLastOrder') || 'null');
      setOrder(stored);
    } catch {
      setOrder(null);
    }
  }, []);

  if (!order) {
    return (
      <section className="section">
        <div className="container">
          <div className="empty-cart">
            <div className="icon">📦</div>
            <h3>No order found</h3>
            <p style={{ color: '#6b6b6b', marginBottom: 20 }}>You haven&apos;t placed an order yet.</p>
            <Link href="/shop" className="btn btn-gold">Browse Products</Link>
          </div>
        </div>
      </section>
    );
  }

  const customer = order.customer;
  const items = Array.isArray(order.items) ? order.items : [];
  const subtotal = Number(order.subtotal ?? items.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.qty) || 1), 0));
  const shipping = Number(order.shipping ?? (subtotal >= 1000 ? 0 : 50));
  const total = Number(order.total ?? subtotal + shipping);

  return (
    <section className="section">
      <div className="container">
        <div className="confirmation">
          <div style={{ fontSize: '4rem', color: '#27ae60', marginBottom: 16 }}>✓</div>
          <h2>Thank you, {customer.name ? customer.name.split(' ')[0] : 'Customer'}!</h2>
          <p>Your order has been placed successfully.</p>
          <div className="order-no">Order #{order.orderNo || 'N/A'}</div>
          <p style={{ marginTop: 8 }}>A confirmation has been sent to <strong>{customer.email || 'your email'}</strong></p>

          <div style={{ background: '#faf6ef', borderRadius: 12, padding: 20, margin: '24px auto', maxWidth: 420, textAlign: 'left' }}>
            <h3 style={{ fontFamily: 'Georgia,serif', marginBottom: 12 }}>Order Summary</h3>
            {items.map((item, i) => (
              <div className="summary-row" key={i}>
                <span>{item.name || 'Product'} × {item.qty || 1}</span>
                <span>{formatPrice((Number(item.price) || 0) * (Number(item.qty) || 1))}</span>
              </div>
            ))}
            <div className="summary-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span></div>
            <div className="summary-row total"><span>Total</span><span>{formatPrice(total)}</span></div>
            <div style={{ borderTop: '1px solid #f1e9dc', marginTop: 10, paddingTop: 10, fontSize: '0.85rem', color: '#6b6b6b' }}>
              <p><strong>Delivery to:</strong> {customer.name || 'Customer'}</p>
              <p><strong>Phone:</strong> {customer.phone || 'Not provided'}</p>
              <p><strong>Payment:</strong> {customer.payment || 'Not provided'}</p>
            </div>
          </div>

          <Link href="/shop" className="btn btn-gold">Continue Shopping</Link>
        </div>
      </div>
    </section>
  );
}
