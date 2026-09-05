'use client';

import { useState } from 'react';
import { useToast } from '../lib/contexts';

export default function WholesalePage() {
  const { showToast } = useToast();
  const [form, setForm] = useState({
    business: '', name: '', phone: '', email: '', products: '', quantity: '', message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.business || !form.name || !form.phone || !form.email) {
      showToast('Please fill in all required fields.');
      return;
    }
    const enquiries = JSON.parse(localStorage.getItem('culinaireEnquiries') || '[]');
    enquiries.push({ ...form, date: new Date().toISOString() });
    localStorage.setItem('culinaireEnquiries', JSON.stringify(enquiries));
    showToast('✓ Enquiry submitted! We will contact you soon.');
    setForm({ business: '', name: '', phone: '', email: '', products: '', quantity: '', message: '' });
  };

  return (
    <>
      <section className="page-hero">
        <div className="container"><h1>Wholesale & Bulk Orders</h1></div>
      </section>
      <section className="section">
        <div className="container">
          <div className="wholesale-banner" style={{ textAlign: 'center', padding: '40px 20px', background: '#1a1a1a', borderRadius: 12, color: '#fff', marginBottom: 40 }}>
            <h2 style={{ color: '#fff', marginBottom: 12 }}>Need Bulk Kitchenware?</h2>
            <p style={{ color: '#ccc', marginBottom: 20 }}>Special pricing for restaurants, hotels, and retailers. Get in touch for a custom quote.</p>
            <a href="tel:0245009447" className="btn btn-gold">📞 Call Us Now</a>
          </div>

          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Send Us Your Enquiry</h2>
            <form className="checkout-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Business Name</label>
                <input type="text" name="business" value={form.business} onChange={handleChange} placeholder="Your business name" required />
              </div>
              <div className="form-group">
                <label>Contact Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone number" required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email address" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Products Interested In</label>
                  <select name="products" value={form.products} onChange={handleChange}>
                    <option value="">Select category</option>
                    <option value="Cookware">Cookware</option>
                    <option value="Knives">Knives</option>
                    <option value="Dinnerware">Dinnerware</option>
                    <option value="Utensils">Utensils</option>
                    <option value="Appliances">Appliances</option>
                    <option value="Bakeware">Bakeware</option>
                    <option value="Decor">Decor</option>
                    <option value="Multiple">Multiple Categories</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Estimated Quantity</label>
                  <select name="quantity" value={form.quantity} onChange={handleChange}>
                    <option value="">Select quantity</option>
                    <option value="10-50">10 – 50 units</option>
                    <option value="50-100">50 – 100 units</option>
                    <option value="100-500">100 – 500 units</option>
                    <option value="500+">500+ units</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your requirements..." rows={4} />
              </div>
              <button type="submit" className="btn btn-gold btn-block">Submit Enquiry</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
