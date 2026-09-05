'use client';

import { useState } from 'react';
import { formatPrice } from '../lib/products';

const ORDER_STATUSES = [
  { key: 'ordered', label: 'Ordered', hours: 0 },
  { key: 'processing', label: 'Processing', hours: 24 },
  { key: 'shipped', label: 'Shipped', hours: 48 },
  { key: 'delivered', label: 'Delivered', hours: 72 },
];

export default function TrackPage() {
  const [orderNo, setOrderNo] = useState('');
  const [result, setResult] = useState<null | {
    order: any;
    currentStep: number;
  }>(null);
  const [notFound, setNotFound] = useState(false);

  const trackOrder = () => {
    if (!orderNo.trim()) return;
    const orders = JSON.parse(localStorage.getItem('culinaireOrders') || '[]');
    const order = orders.find((o: any) => o.orderNo === orderNo.trim());
    if (!order) {
      setResult(null);
      setNotFound(true);
      return;
    }
    setNotFound(false);

    const orderDate = new Date(order.date).getTime();
    const elapsed = Date.now() - orderDate;
    const hoursElapsed = elapsed / (1000 * 60 * 60);

    let currentStep = 0;
    if (hoursElapsed > 72) currentStep = 3;
    else if (hoursElapsed > 48) currentStep = 2;
    else if (hoursElapsed > 24) currentStep = 1;

    setResult({ order, currentStep });
  };

  return (
    <>
      <section className="page-hero">
        <div className="container"><h1>Track Your Order</h1></div>
      </section>
      <section className="section">
        <div className="container">
          <div className="track-box">
            <div className="track-input-group">
              <input
                type="text"
                placeholder="Enter your order number (e.g. CL-123456)"
                value={orderNo}
                onChange={(e) => setOrderNo(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && trackOrder()}
              />
              <button className="btn btn-gold" onClick={trackOrder}>Track</button>
            </div>

            {notFound && (
              <p style={{ textAlign: 'center', color: '#c0392b', marginTop: 16 }}>
                Order not found. Please check your order number.
              </p>
            )}

            {result && (
              <div style={{ marginTop: 24 }}>
                <div className="track-status-steps">
                  {ORDER_STATUSES.map((step, i) => (
                    <div key={step.key} className={`track-step ${i <= result.currentStep ? 'active' : ''}`}>
                      <div className="dot" />
                      <span>{step.label}</span>
                    </div>
                  ))}
                </div>

                <div style={{ background: '#faf6ef', borderRadius: 12, padding: 20, marginTop: 24 }}>
                  <h3 style={{ fontFamily: 'Georgia,serif', marginBottom: 12 }}>Order #{result.order.orderNo}</h3>
                  {result.order.items?.map((item: any, i: number) => (
                    <div className="summary-row" key={i}>
                      <span>{item.name} × {item.qty}</span>
                      <span>{formatPrice(item.price * item.qty)}</span>
                    </div>
                  ))}
                  <div className="summary-row total" style={{ marginTop: 10, paddingTop: 10 }}>
                    <span>Total</span>
                    <span>{formatPrice(result.order.total)}</span>
                  </div>
                  <div style={{ borderTop: '1px solid #f1e9dc', marginTop: 10, paddingTop: 10, fontSize: '0.85rem', color: '#6b6b6b' }}>
                    <p><strong>Delivery to:</strong> {result.order.customer?.name}</p>
                    <p><strong>Phone:</strong> {result.order.customer?.phone}</p>
                    <p><strong>Payment:</strong> {result.order.customer?.payment}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
